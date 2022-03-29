import { expect } from "chai";
import chai = require("chai");
import * as dom from "dts-dom";
import * as fs from "fs";
import * as path from "path";
import { JSDocTsdParser } from "../../src/core/jsdoc-tsd-parser";
import { parseData } from "../jsdoc-helper";
chai.should();

describe("JSDocTsdParser.parse.parameterWithProperties", () => {
	it("should create a function with a parameter with properties", async () => {
		const parser = new JSDocTsdParser();
		const data = await parseData(`
			/**
			 * My test interface
			 * @interface myTestInterface
			 */

			/**
			 * A simple function
			 * @memberof myTestInterface
			 * @function mySimpleFunction
			 * @param {object} propertyParameter My parameter with properties
			 * @param {string} propertyParameter.myProperty1 Description of myProperty1
			 * @param {number} propertyParameter.myProperty2 Description of myProperty2
			 */

			/**
			 * Assign the project to a list of employees
			 * @memberof myTestInterface
			 * @function myEmployeeFunction
			 * @param {Object[]} employees - The employees who are responsible for the project
			 * @param {string} employees[].name - The name of an employee
			 * @param {string} employees[].department - The employee's department
			 */
		`);
		parser.parse(data);

		const result = parser.resolveMembershipAndExtends();
		result.should.include.keys("myTestInterface");
		result.should.include.keys("mySimpleFunction_propertyParameter");

		const parsedInterface: dom.InterfaceDeclaration = result.get("myTestInterface") as dom.InterfaceDeclaration;
		expect(parsedInterface.members.length).to.eq(2);

		const paramInterface: dom.InterfaceDeclaration = result.get("mySimpleFunction_propertyParameter") as dom.InterfaceDeclaration;

		const methodDeclaration: dom.MethodDeclaration = parsedInterface.members[0] as dom.MethodDeclaration;
		expect(methodDeclaration.jsDocComment).to.eq(`A simple function
@param propertyParameter My parameter with properties
@param propertyParameter.myProperty1 Description of myProperty1
@param propertyParameter.myProperty2 Description of myProperty2`);

		const parameters: dom.Parameter[] = methodDeclaration.parameters;
		expect(parameters.length).to.eq(1);

		const interfaceType = dom.create.typeParameter("mySimpleFunction_propertyParameter", paramInterface);
		expect(parameters[0].type).to.eql(interfaceType);
	});

	it("should create a function with an array of parameters with properties", async () => {
		const parser = new JSDocTsdParser();
		const data = await parseData(`
			/**
			 * My test interface
			 * @interface myTestInterface
			 */

			/**
			 * A simple function
			 * @memberof myTestInterface
			 * @function mySimpleFunction
			 * @param {object} propertyParameter My parameter with properties
			 * @param {string} propertyParameter.myProperty1 Description of myProperty1
			 * @param {number} propertyParameter.myProperty2 Description of myProperty2
			 */

			/**
			 * Assign the project to a list of employees
			 * @memberof myTestInterface
			 * @function myEmployeeFunction
			 * @param {Object[]} employees - The employees who are responsible for the project
			 * @param {string} employees[].name - The name of an employee
			 * @param {string} employees[].department - The employee's department
			 */
		`);
		parser.parse(data);

		const result = parser.resolveMembershipAndExtends();
		result.should.include.keys("myTestInterface");
		result.should.include.keys("myEmployeeFunction_employees");

		const parsedInterface: dom.InterfaceDeclaration = result.get("myTestInterface") as dom.InterfaceDeclaration;
		expect(parsedInterface.members.length).to.eq(2);

		const paramInterface: dom.InterfaceDeclaration = result.get("myEmployeeFunction_employees") as dom.InterfaceDeclaration;

		const methodDeclaration: dom.MethodDeclaration = parsedInterface.members[1] as dom.MethodDeclaration;
		expect(methodDeclaration.jsDocComment).to.eq(`Assign the project to a list of employees
@param employees - The employees who are responsible for the project
@param employees[].name - The name of an employee
@param employees[].department - The employee's department`);

		const parameters: dom.Parameter[] = methodDeclaration.parameters;
		expect(parameters.length).to.eq(1);

		const interfaceType = dom.create.array(paramInterface);
		expect(parameters[0].type).to.eql(interfaceType);
	});

	it("should map property params if it's an array", async () => {
		const data = await parseData(`
			/**
			 * @function Fuu
			 * @param bar {object[]} Because of an error this was an array of type null
			 * @param bar[].fuubar {string}
			 */
		`);

		const parser = new JSDocTsdParser();
		parser.parse(data);

		const result = parser.resolveMembershipAndExtends();
		const functionFuu = result.get("Fuu") as dom.FunctionDeclaration;

		const arrayParam = functionFuu.parameters[0];
		expect(arrayParam.type).to.be.an("object");

		const arrType = arrayParam.type as dom.ArrayTypeReference;
		expect(arrType.kind).to.equal("array");

		const interfaceType: dom.InterfaceDeclaration = arrType.type as dom.InterfaceDeclaration;
		expect(interfaceType.name).to.equal("Fuu_bar");
		console.log(parser.generateTypeDefinition());
	});

	it("should map property params if it's an array", async () => {
		const data = await parseData(`
		/**
		 * TestFunction
		 * @param {object[]} fuu an array of objects
		 * @param {string} fuu[].id id
		 * @function TestFunction
		 */
		`);

		const parser = new JSDocTsdParser();
		parser.parse(data);

		const result = parser.resolveMembershipAndExtends();
		const functionFuu = result.get("TestFunction") as dom.FunctionDeclaration;

		const arrayParam = functionFuu.parameters[0];
		const arrType = arrayParam.type as dom.ArrayTypeReference;
		expect(arrType.kind).to.equal("array");
		expect(arrType.type).to.be.an("object");

		const interfaceType = arrType.type as dom.InterfaceDeclaration;
		expect(interfaceType.name).to.equal("TestFunction_fuu");
	});

	it("should parse an optional property param", async () => {
		const data = await parseData(`
			/**
			 * My awesome function
			 * @param {string} param1 my first param
			 * @param {object} [param2] my optional param
			 * @param {string} param2.prop1 prop 1 is mandatory
			 * @param {number} [param3.prop2] prop2 is optional
			 */
			function myAwesomeFunction(param1, param2) {}
		`);

		const parser = new JSDocTsdParser();
		parser.parse(data);

		const result = parser.resolveMembershipAndExtends();
		expect([...result.keys()]).to.include("myAwesomeFunction");
		const functionDeclaration: dom.FunctionDeclaration = result.get("myAwesomeFunction") as dom.FunctionDeclaration;
		const params = functionDeclaration.parameters;
		expect(params.length).to.equal(2);

		const param2 = params[1];
		expect(param2.flags, "Param not optional").to.equal(dom.DeclarationFlags.Private);

		const typeParam = param2 as unknown as dom.TypeParameter;
		const interfaceDeclaration = result.get((typeParam as any).type.name) as dom.InterfaceDeclaration;
		expect((interfaceDeclaration.members[0] as dom.PropertyDeclaration).name).to.equal("prop1");
		expect((interfaceDeclaration.members[0] as dom.PropertyDeclaration).flags).to.equal(dom.DeclarationFlags.None);
		expect((interfaceDeclaration.members[1] as dom.PropertyDeclaration).name).to.equal("prop2");
		expect((interfaceDeclaration.members[1] as dom.PropertyDeclaration).flags).to.equal(dom.DeclarationFlags.Optional);

	})

});
