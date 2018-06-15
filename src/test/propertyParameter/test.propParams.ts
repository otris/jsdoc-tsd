import { expect } from "chai";
import * as dom from "dts-dom";
import * as fs from "fs";
import * as path from "path";
import { JSDocTsdParser } from "../../core/jsdoc-tsd-parser";
import { parse } from "querystring";

describe("JSDocTsdParser.parse.parameterWithProperties", () => {
	let interfaceData: TDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/propParams.json"), { encoding: "utf-8" }));
	expect(interfaceData.length).to.eq(4);

	it("should create a function with a parameter with properties", () => {
		let parser = new JSDocTsdParser();
		parser.parse(interfaceData);

		let result = parser.prepareResults();
		expect(result).haveOwnPropertyDescriptor("myTestInterface");
		expect(result).haveOwnPropertyDescriptor("mySimpleFunction_propertyParameter");
		
		let parsedInterface: dom.InterfaceDeclaration = result["myTestInterface"] as dom.InterfaceDeclaration;
		expect(parsedInterface.members.length).to.eq(2);

		let paramInterface: dom.InterfaceDeclaration = result["mySimpleFunction_propertyParameter"] as dom.InterfaceDeclaration;

		let methodDeclaration: dom.MethodDeclaration = parsedInterface.members[0] as dom.MethodDeclaration;
		expect(methodDeclaration.jsDocComment).to.eq("A simple function\n@param propertyParameter My parameter with properties\n@param propertyParameter.myProperty1 Description of myProperty1\n@param propertyParameter.myProperty2 Description of myProperty2");

		let parameters: dom.Parameter[] = methodDeclaration.parameters;
		expect(parameters.length).to.eq(1);

		let interfaceType = dom.create.typeParameter("mySimpleFunction_propertyParameter", paramInterface);
		expect(parameters[0].type).to.eql(interfaceType);
	});

	it("should create a function with an array of parameters with properties", () => {
		let parser = new JSDocTsdParser();
		parser.parse(interfaceData);

		let result = parser.prepareResults();
		expect(result).haveOwnPropertyDescriptor("myTestInterface");
		expect(result).haveOwnPropertyDescriptor("myEmployeeFunction_employees");
		
		let parsedInterface: dom.InterfaceDeclaration = result["myTestInterface"] as dom.InterfaceDeclaration;
		expect(parsedInterface.members.length).to.eq(2);

		let paramInterface: dom.InterfaceDeclaration = result["myEmployeeFunction_employees"] as dom.InterfaceDeclaration;

		let methodDeclaration: dom.MethodDeclaration = parsedInterface.members[1] as dom.MethodDeclaration;
		expect(methodDeclaration.jsDocComment).to.eq("Assign the project to a list of employees\n@param employees - The employees who are responsible for the project\n@param employees[].name - The name of an employee\n@param employees[].department - The employee's department");

		let parameters: dom.Parameter[] = methodDeclaration.parameters;
		expect(parameters.length).to.eq(1);

		let interfaceType = dom.create.array(paramInterface);
		expect(parameters[0].type).to.eql(interfaceType);
	});
});
