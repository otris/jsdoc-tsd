import { expect } from "chai";
import * as dom from "dts-dom";
import * as fs from "fs";
import * as path from "path";
import { JSDocTsdParser } from "../../src/core/jsdoc-tsd-parser";
import { parseData } from "../jsdoc-helper";

describe("Tests for the type mapping from jsdoc types to typescript types", () => {
	const singleUntypedArray: ITypedefDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/singleUntypedArray.json"), { encoding: "utf-8" }));
	const twoDimensionalUntypedArray: ITypedefDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/twoDimensionalUntypedArray.json"), { encoding: "utf-8" }));
	const threeDimensionalUntypedArray: ITypedefDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/threeDimensionalUntypedArray.json"), { encoding: "utf-8" }));
	const singleStringArray: ITypedefDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/singleStringArray.json"), { encoding: "utf-8" }));
	const fourDimensionalStringArray: ITypedefDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/fourDimensionalStringArray.json"), { encoding: "utf-8" }));
	const twoDimensionalUnionTypeArray: ITypedefDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/twoDimensionalUnionTypeArray.json"), { encoding: "utf-8" }));
	const functionWithGenericReturnValue: ITypedefDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/functionWithGenericReturnValue.json"), { encoding: "utf-8" }));
	const functionWithGenericParameter: ITypedefDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/functionWithGenericParameter.json"), { encoding: "utf-8" }));
	const objectKeyAndPropertyDescription: ITypedefDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/objectKeyAndPropertyDescription.json"), { encoding: "utf-8" }));

	it("should map single untyped arrays", () => {
		const parser = new JSDocTsdParser();
		parser.parse(singleUntypedArray);
		const resultItems = parser.getParsedItems();

		const functionDeclaration: dom.FunctionDeclaration = parser.getParsedItem("myFunction")[0] as dom.FunctionDeclaration;
		const functionParamType: dom.Type = (functionDeclaration.parameters[0].type as dom.UnionType).members[0];
		const expectedParmType = dom.type.array(dom.type.any);
		expect(functionParamType).to.deep.eq(expectedParmType);
	});

	it("should map 2 dimensional untyped arrays", () => {
		const parser = new JSDocTsdParser();
		parser.parse(twoDimensionalUntypedArray);
		const resultItems = parser.getParsedItems();

		const functionDeclaration: dom.FunctionDeclaration = parser.getParsedItem("myFunction")[0] as dom.FunctionDeclaration;
		const functionParamType: dom.Type = (functionDeclaration.parameters[0].type as dom.UnionType).members[0];
		const expectedParmType = dom.type.array(dom.type.array(dom.type.any));
		expect(functionParamType).to.deep.eq(expectedParmType);
	});

	it("should map 3 dimensional untyped arrays", () => {
		const parser = new JSDocTsdParser();
		parser.parse(threeDimensionalUntypedArray);
		const resultItems = parser.getParsedItems();

		const functionDeclaration: dom.FunctionDeclaration = parser.getParsedItem("myFunction")[0] as dom.FunctionDeclaration;
		const functionParamType: dom.Type = (functionDeclaration.parameters[0].type as dom.UnionType).members[0];
		const expectedParmType = dom.type.array(dom.type.array(dom.type.array(dom.type.any)));
		expect(functionParamType).to.deep.eq(expectedParmType);
	});

	it("should map single typed arrays", () => {
		const parser = new JSDocTsdParser();
		parser.parse(singleStringArray);
		const resultItems = parser.getParsedItems();

		const functionDeclaration: dom.FunctionDeclaration = parser.getParsedItem("myFunction")[0] as dom.FunctionDeclaration;
		const functionParamType: dom.Type = (functionDeclaration.parameters[0].type as dom.UnionType).members[0];
		const expectedParmType = dom.type.array(dom.type.string);
		expect(functionParamType).to.deep.eq(expectedParmType);
	});

	it("should map four dimensional typed arrays", () => {
		const parser = new JSDocTsdParser();
		parser.parse(fourDimensionalStringArray);
		const resultItems = parser.getParsedItems();

		const functionDeclaration: dom.FunctionDeclaration = parser.getParsedItem("myFunction")[0] as dom.FunctionDeclaration;
		const functionParamType: dom.Type = (functionDeclaration.parameters[0].type as dom.UnionType).members[0];
		const expectedParmType = dom.type.array(dom.type.array(dom.type.array(dom.type.array(dom.type.string))));
		expect(functionParamType).to.deep.eq(expectedParmType);
	});

	it("should map two dimensional typed arrays with union types", () => {
		const parser = new JSDocTsdParser();
		parser.parse(twoDimensionalUnionTypeArray);
		const resultItems = parser.getParsedItems();

		const functionDeclaration: dom.FunctionDeclaration = parser.getParsedItem("myFunction")[0] as dom.FunctionDeclaration;
		const functionParamType: dom.Type = (functionDeclaration.parameters[0].type as dom.UnionType).members[0];
		const expectedParmType = dom.type.array(dom.type.array(dom.create.union([dom.type.string, dom.type.number])));
		expect(functionParamType).to.deep.eq(expectedParmType);
	});

	it("should map generic types for function return values", () => {
		const parser = new JSDocTsdParser();
		parser.parse(functionWithGenericReturnValue);
		const resultItems = parser.getParsedItems();

		const functionDeclaration: dom.FunctionDeclaration = parser.getParsedItem("f1")[0] as dom.FunctionDeclaration;
		const functionReturnType: dom.Type = (functionDeclaration.returnType as dom.UnionType).members[0];
		const expectedReturnType = dom.create.typeParameter("Promise<any>");
		expect(functionReturnType).to.deep.eq(expectedReturnType);
	});

	it("should map generic types for function parameters", () => {
		const parser = new JSDocTsdParser();
		parser.parse(functionWithGenericParameter);
		const resultItems = parser.getParsedItems();

		const functionDeclaration: dom.FunctionDeclaration = parser.getParsedItem("f1")[0] as dom.FunctionDeclaration;
		const functionParamType: dom.Type = (functionDeclaration.parameters[0].type as dom.UnionType).members[0];
		const expectedParmType = dom.create.typeParameter("Promise<any>");
		expect(functionParamType).to.deep.eq(expectedParmType);
	});

	it("should transform object key and property descriptions", () => {
		const parser = new JSDocTsdParser();
		parser.parse(objectKeyAndPropertyDescription);
		const resultItems = parser.getParsedItems();

		const functionDeclaration: dom.FunctionDeclaration = parser.getParsedItem("test")[0] as dom.FunctionDeclaration;
		const functionParamType: dom.Type = (functionDeclaration.parameters[0].type as dom.UnionType).members[0];
		const expectedParmType = "{ [key: string]: myCustomType }";
		expect(functionParamType).to.deep.eq(expectedParmType);
	});

	it("should map parameters without type to 'any'", async () => {
		const data = await parseData(`
			/**
			 * @function Fuu
			 * @param bar
			 */
		`);

		const parser = new JSDocTsdParser();
		parser.parse(data);

		const result = parser.resolveMembershipAndExtends();
		const functionFuu = result.get("Fuu") as dom.FunctionDeclaration;

		expect(functionFuu.parameters.length).to.equal(1);
		const paramBar = functionFuu.parameters[0];
		expect(paramBar.name).to.equal("bar");
		expect(paramBar.type).to.equal(dom.type.any);
	});

	it("should map functions with incomplete return annotation to any", async () => {
		const data = await parseData(`
			/**
			 * @function Fuu
			 * @returns Description of return value without specifying type
			 */
		`);

		const parser = new JSDocTsdParser();
		parser.parse(data);

		const result = parser.resolveMembershipAndExtends();
		const functionFuu = result.get("Fuu") as dom.FunctionDeclaration;
		expect(functionFuu.returnType).to.equal(dom.type.any);
	});

	it("should map type 'function' to 'Function'", async () => {
		const data = await parseData(`
			/**
			 * @function Fuu
			 * @param bar {function}
			 */
		`);

		const parser = new JSDocTsdParser();
		parser.parse(data);

		const result = parser.resolveMembershipAndExtends();
		const functionFuu = result.get("Fuu") as dom.FunctionDeclaration;

		expect(functionFuu.parameters.length).to.equal(1);
		const paramBar = functionFuu.parameters[0];
		expect(paramBar.name).to.equal("bar");

		const union = paramBar.type as dom.UnionType;
		expect(union.members[0]).to.equal("Function");
	});

	it("should map type null to string null", async () => {
		const data = await parseData(`
			/**
			 * @function Fuu
			 * @param bar {null}
			 */
		`);

		const parser = new JSDocTsdParser();
		parser.parse(data);

		const result = parser.resolveMembershipAndExtends();
		const functionFuu = result.get("Fuu") as dom.FunctionDeclaration;

		expect(functionFuu.parameters.length).to.equal(1);
		const paramBar = functionFuu.parameters[0];
		expect(paramBar.name).to.equal("bar");

		const union = paramBar.type as dom.UnionType;
		expect(union.members[0]).to.equal(dom.type.null);
	});

	it("should map type external to any", async () => {
		const data = await parseData(`
			/**
			 * @function Fuu
			 * @param {external:Element} bar
			 */
		`);

		const parser = new JSDocTsdParser();
		parser.parse(data);

		const result = parser.resolveMembershipAndExtends();
		const functionFuu = result.get("Fuu") as dom.FunctionDeclaration;

		expect(functionFuu.parameters.length).to.equal(1);
		const paramBar = functionFuu.parameters[0];
		expect(paramBar.name).to.equal("bar");

		const union = paramBar.type as dom.UnionType;
		expect(union.members[0]).to.equal(dom.type.any);
	});

	it("should map type external to any", async () => {
		const data = await parseData(`
			/**
			 * @module MyModule
			 */

			/**
			 * @typedef {Object} MyTypedef
			 * @property {string} prop1
			 * @memberof module:MyModule
			 */

			/**
			 * @function myFunction
			 * @param {module:MyModule.MyTypedef} param1
			 * @memberof module:MyModule
			 */
		`);

		const parser = new JSDocTsdParser();
		parser.parse(data);
		const result = parser.resolveMembershipAndExtends();
		const myModule = result.get("module:MyModule") as dom.ModuleDeclaration;
		const functionDeclaration = myModule.members[1] as dom.FunctionDeclaration;
		expect(functionDeclaration.parameters.length).to.equal(1);

		const param = functionDeclaration.parameters[0];
		const union = param.type as dom.UnionType;
		expect(union.members[0]).to.equal("MyTypedef")
	});

	it("should not trim context info from type if the type is equal to the context", async () => {
		const data = await parseData(`
			/**
			 * @namespace MyNamespace
			 */

			/**
			 * @class MyClass
			 * @memberof MyNamespace
			 */
			function MyClass() {
				/**
				 * @param {MyNamespace.MyClass} param1
				 * @memberof MyNamespace.MyClass
				 */
				function myFunction(param1) {

				}
			}
		`);

		const parser = new JSDocTsdParser();
		parser.parse(data);
		const result = parser.resolveMembershipAndExtends();
		const myNamespace = result.get("MyNamespace") as dom.NamespaceDeclaration;
		const myClass = myNamespace.members[0] as dom.ClassDeclaration;
		expect(myClass.members.length).to.equal(2);

		const functionDeclaration = myClass.members[1] as dom.MethodDeclaration;
		const param = functionDeclaration.parameters[0];
		const union = param.type as dom.UnionType;
		expect(union.members[0]).to.equal("MyClass")
	});
});
