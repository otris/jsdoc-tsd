import { expect } from "chai";
import chai = require("chai");
import * as dom from "dts-dom";
import * as fs from "fs";
import * as path from "path";
import { JSDocTsdParser } from "../../src/core/jsdoc-tsd-parser";
import { parseData } from "../jsdoc-helper";
chai.should();

describe("JSDocTsdParser.parse.parameterWithProperties", () => {
	const interfaceData: TDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/propParams.json"), { encoding: "utf-8" }));
	expect(interfaceData.length).to.eq(4);

	it("should create a function with a parameter with properties", () => {
		const parser = new JSDocTsdParser();
		parser.parse(interfaceData);

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

	it("should create a function with an array of parameters with properties", () => {
		const parser = new JSDocTsdParser();
		parser.parse(interfaceData);

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

});
