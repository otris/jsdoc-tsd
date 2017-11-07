import { expect } from "chai";
import * as dom from "dts-dom";
import * as fs from "fs";
import * as path from "path";
import { JSDocTsdParser } from "../../core/jsdoc-tsd-parser";

describe("JSDocTsdParser.parse.function", () => {
	it("should create a function dom object", () => {
		let functionData: IFunctionDoclet = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/function.json"), { encoding: "utf-8" }));
		let parser = new JSDocTsdParser();
		parser.parse([functionData]);

		let result = parser.getResultItems();
		expect(result).haveOwnProperty(functionData.longname);

		let functionDeclarations = result[functionData.longname];
		expect(functionDeclarations.length).to.equals(1);

		let functionDeclaration = functionDeclarations[0] as dom.FunctionDeclaration;
		expect(functionDeclaration.kind).to.equals("function");
		expect(functionDeclaration.name).to.equals(functionData.name);

		if (functionData.params) {
			expect(functionDeclaration.parameters.length).to.equals(functionData.params.length);
		}

		expect(functionDeclaration.returnType).to.equals(dom.type.void);
	});

	it("should create one single dom function declaration", () => {
		let functionData: IFunctionDoclet = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/function_singleParamType.json"), { encoding: "utf-8" }));

		if (functionData.params) {
			expect(functionData.params.length).to.equals(1);
			expect(functionData.params[0].type.names.length).to.equals(1);

			let parser = new JSDocTsdParser();
			parser.parse([functionData]);

			let result = parser.getResultItems();
			let functionDeclarations = result[functionData.longname];
			expect(functionDeclarations.length).to.equals(1);

			let functionDeclaration = functionDeclarations[0] as dom.FunctionDeclaration;
			expect(functionDeclaration.parameters[0].type).to.equals(functionData.params[0].type.names[0]);
		} else {
			throw new Error("Sample function has no params");
		}
	});

	it("should create 2 dom function declarations", () => {
		let functionData: IFunctionDoclet = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/function_multipleParamTypes.json"), { encoding: "utf-8" }));

		if (functionData.params) {
			expect(functionData.params.length).to.eq(1);
			expect(functionData.params[0].type.names.length).eq(2);

			let parser = new JSDocTsdParser();
			parser.parse([functionData]);

			let result = parser.getResultItems();
			let functionDeclarations: dom.FunctionDeclaration[] = result[functionData.longname] as dom.FunctionDeclaration[];
			expect(functionDeclarations.length).to.equal(2);

			expect(functionDeclarations[0].parameters[0].type).to.eq(functionData.params[0].type.names[0]);
			expect(functionDeclarations[1].parameters[0].type).to.eq(functionData.params[0].type.names[1]);
		} else {
			throw new Error("Sample function has no params");
		}
	});

	it("should create a single dom function declaration with return value 'void'", () => {
		let functionData: IFunctionDoclet = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/function.json"), { encoding: "utf-8" }));
		expect(functionData.returns).to.be.undefined;

		let parser = new JSDocTsdParser();
		parser.parse([functionData]);

		let result = parser.getResultItems();
		let functionDeclarations: dom.FunctionDeclaration[] = result[functionData.longname] as dom.FunctionDeclaration[];
		expect(functionDeclarations.length).to.equal(1);
		expect(functionDeclarations[0].returnType).to.eq(dom.type.void);

		// add a parameter to the function
		functionData.params = [
			{
				name: "myParam",
				type: {
					names: [
						"string"
					]
				},
				comment: "..",
				description: ".."
			}
		];

		parser = new JSDocTsdParser();
		parser.parse([functionData]);

		result = parser.getResultItems();
		functionDeclarations = result[functionData.longname] as dom.FunctionDeclaration[];
		expect(functionDeclarations.length).to.equal(1);
		expect(functionDeclarations[0].returnType).to.eq(dom.type.void);
	});

	it("should create a single dom function declaration with return value 'string'", () => {
		let functionData: IFunctionDoclet = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/function_singleParamType.json"), { encoding: "utf-8" }));

		if (!functionData.returns) {
			throw new Error("The function data has no return value");
		}

		expect(functionData.returns.length).to.equal(1);
		expect(functionData.returns[0].type.names.length).to.equal(1);
		expect(functionData.returns[0].type.names[0]).to.equal(dom.type.string);

		let parser = new JSDocTsdParser();
		parser.parse([functionData]);

		let result = parser.getResultItems();
		let functionDeclarations: dom.FunctionDeclaration[] = result[functionData.longname] as dom.FunctionDeclaration[];
		expect(functionDeclarations.length).to.equal(1);
		expect(functionDeclarations[0].returnType).to.eq(dom.type.string);

		// add a parameter to the function
		functionData.params = [
			{
				name: "myParam",
				type: {
					names: [
						"string"
					]
				},
				comment: "..",
				description: ".."
			}
		];

		parser = new JSDocTsdParser();
		parser.parse([functionData]);

		result = parser.getResultItems();
		functionDeclarations = result[functionData.longname] as dom.FunctionDeclaration[];
		expect(functionDeclarations.length).to.equal(1);
		expect(functionDeclarations[0].returnType).to.eq(dom.type.string);
	});

	it("should create a single dom function declaration with return value 'string'", () => {
		let functionData: IFunctionDoclet = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/function_singleParamType.json"), { encoding: "utf-8" }));

		if (!functionData.returns) {
			throw new Error("The function data has no return value");
		}

		expect(functionData.returns.length).to.equal(1);
		expect(functionData.returns[0].type.names.length).to.equal(1);
		expect(functionData.returns[0].type.names[0]).to.equal(dom.type.string);
		functionData.returns[0].type.names.push(dom.type.number.toString());

		let parser = new JSDocTsdParser();
		parser.parse([functionData]);

		let result = parser.getResultItems();
		let functionDeclarations: dom.FunctionDeclaration[] = result[functionData.longname] as dom.FunctionDeclaration[];
		expect(functionDeclarations.length).to.equal(2);
		expect(functionDeclarations[0].returnType).to.eq(dom.type.string);
		expect(functionDeclarations[1].returnType).to.eq(dom.type.number);

		// add a parameter to the function
		functionData.params = [
			{
				name: "myParam",
				type: {
					names: [
						"string"
					]
				},
				comment: "..",
				description: ".."
			}
		];

		parser = new JSDocTsdParser();
		parser.parse([functionData]);

		result = parser.getResultItems();
		functionDeclarations = result[functionData.longname] as dom.FunctionDeclaration[];
		expect(functionDeclarations.length).to.equal(2);
		expect(functionDeclarations[0].returnType).to.eq(dom.type.string);
		expect(functionDeclarations[1].returnType).to.eq(dom.type.number);
	});

	it("Should handle multiple represantations of type 'array'", () => {
		let functionData: IFunctionDoclet = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/function_singleParamType.json"), { encoding: "utf-8" }));

		if (!functionData.returns) {
			throw new Error("The function data has no return value");
		}

		expect(functionData.returns.length).to.equal(1);
		expect(functionData.returns[0].type.names.length).to.equal(1);

		// add different array parameters to the function
		functionData.params = [
			{
				name: "param1",
				type: {
					names: [
						"Array.<string>",
						"array.<boolean>",
						"object[]",
						"array",
						"Array",
						"[]",
						"*[]",
						"Array.<*>",
						"array.<*>"
					]
				},
				comment: "..",
				description: ".."
			}
		];

		let parser = new JSDocTsdParser();
		parser.parse([functionData]);

		let result = parser.getResultItems();
		let functionDeclarations = result[functionData.longname] as dom.FunctionDeclaration[];
		expect(functionDeclarations.length).to.equal(functionData.params[0].type.names.length);

		// ensure that every type is mapped correctly
		expect(JSON.stringify(functionDeclarations[0].parameters[0].type)).to.eq(JSON.stringify(dom.type.array(dom.type.string)));
		expect(JSON.stringify(functionDeclarations[1].parameters[0].type)).to.eq(JSON.stringify(dom.type.array(dom.type.boolean)));
		expect(JSON.stringify(functionDeclarations[2].parameters[0].type)).to.eq(JSON.stringify(dom.type.array(dom.type.object)));
		expect(functionDeclarations[3].parameters[0].type).to.eq(dom.type.any);
		expect(functionDeclarations[4].parameters[0].type).to.eq(dom.type.any);
		expect(functionDeclarations[5].parameters[0].type).to.eq(dom.type.any);
		expect(functionDeclarations[6].parameters[0].type).to.eq(dom.type.any);
		expect(functionDeclarations[7].parameters[0].type).to.eq(dom.type.any);
		expect(functionDeclarations[8].parameters[0].type).to.eq(dom.type.any);
	});

	it("Should handle multiple represantations of type 'boolean'", () => {
		let functionData: IFunctionDoclet = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/function_singleParamType.json"), { encoding: "utf-8" }));

		if (!functionData.returns) {
			throw new Error("The function data has no return value");
		}

		expect(functionData.returns.length).to.equal(1);
		expect(functionData.returns[0].type.names.length).to.equal(1);

		// add different boolean parameters to the function
		functionData.params = [
			{
				name: "param1",
				type: {
					names: [
						"bool",
						"boolean",
						"bool[]",
						"boolean[]"
					]
				},
				comment: "..",
				description: ".."
			}
		];

		let parser = new JSDocTsdParser();
		parser.parse([functionData]);

		let result = parser.getResultItems();
		let functionDeclarations = result[functionData.longname] as dom.FunctionDeclaration[];
		expect(functionDeclarations.length).to.equal(functionData.params[0].type.names.length);

		// ensure that every type is mapped correctly
		expect(functionDeclarations[0].parameters[0].type).to.eq(dom.type.boolean);
		expect(functionDeclarations[1].parameters[0].type).to.eq(dom.type.boolean);
		expect(JSON.stringify(functionDeclarations[2].parameters[0].type)).to.eq(JSON.stringify(dom.type.array(dom.type.boolean)));
		expect(JSON.stringify(functionDeclarations[3].parameters[0].type)).to.eq(JSON.stringify(dom.type.array(dom.type.boolean)));
	});

	it("should map array values to dom.type.array-Values", () => {
		let functionData: IFunctionDoclet = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/function.json"), { encoding: "utf-8" }));

		let primitiveTypeValues = [
			"string",
			"number",
			"boolean",
			"any",
			"void",
			"object",
			"null",
			"undefined",
			"true",
			"false"
		];

		for (let primitiveTypeValue of primitiveTypeValues) {
			functionData.returns = [
				{
					description: "..",
					type: {
						names: [
							primitiveTypeValue
						]
					}
				}
			];

			let parser = new JSDocTsdParser();
			parser.parse([functionData]);

			let functionDeclarations = parser.getResultItems()[functionData.longname] as dom.FunctionDeclaration[];
			expect(functionDeclarations.length).to.eq(1);
			expect(functionDeclarations[0].returnType).to.eq(primitiveTypeValue as dom.Type);
		}

		// do the same with arrays
		for (let primitiveTypeValue of primitiveTypeValues) {
			functionData.returns = [
				{
					description: "..",
					type: {
						names: [
							primitiveTypeValue + "[]",
							"Array.<" + primitiveTypeValue + ">"
						]
					}
				}
			];

			let parser = new JSDocTsdParser();
			parser.parse([functionData]);

			let functionDeclarations = parser.getResultItems()[functionData.longname] as dom.FunctionDeclaration[];
			expect(functionDeclarations.length).to.eq(2);

			expect(JSON.stringify(functionDeclarations[0].returnType)).to.eq(JSON.stringify(dom.type.array(primitiveTypeValue as dom.Type)));
			expect(JSON.stringify(functionDeclarations[1].returnType)).to.eq(JSON.stringify(dom.type.array(primitiveTypeValue as dom.Type)));
		}
	});

	it("should create a function with jsdoc comments", () => {
		let functionData: IFunctionDoclet = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/function_multipleParamTypes.json"), { encoding: "utf-8" }));
		let parser = new JSDocTsdParser();
		parser.parse([functionData]);

		let result = parser.getResultItems();

		let functionDeclarations: dom.FunctionDeclaration[] = result[functionData.longname] as dom.FunctionDeclaration[];
		expect(functionDeclarations.length).to.equals(2);

		let functionDescription = `Function with different parameter types\n@param param1 A fancy parameter`;

		for (let functionDeclaration of functionDeclarations) {
			expect(functionDeclaration.jsDocComment).to.equals(functionDescription);
		}

		// ensure that non function specific jsdoc comments will be removed
		functionData.comment = `
		/**
		 * A function
		 * @param {string} bla blub
		 * @returns {boolean} bla
		 * @throws {string} error
		 * @memberof abc.def
		 * @private
		 * @static
		 * @function
		 */`;

		parser = new JSDocTsdParser();
		parser.parse([functionData]);
		result = parser.getResultItems();
		functionDeclarations = result[functionData.longname] as dom.FunctionDeclaration[];

		let functionDeclaration = functionDeclarations[0];
		functionDescription = `A function\n@param bla blub\n@throws {string} error`;
		expect(functionDeclarations.length).to.equals(2);
		expect(functionDeclaration.jsDocComment).to.equals(functionDescription);
	});

	it("should create a function with jsdoc comments", () => {
		let functionData: IFunctionDoclet = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/function_multipleParamTypes.json"), { encoding: "utf-8" }));
		let parser = new JSDocTsdParser();
		parser.parse([functionData]);

		let result = parser.getResultItems();

		let functionDeclarations: dom.FunctionDeclaration[] = result[functionData.longname] as dom.FunctionDeclaration[];
		expect(functionDeclarations.length).to.equals(2);

		let functionDescription = `Function with different parameter types\n@param param1 A fancy parameter`;

		for (let functionDeclaration of functionDeclarations) {
			expect(functionDeclaration.jsDocComment).to.equals(functionDescription);
		}

		// ensure that non function specific jsdoc comments will be removed
		functionData.comment = `
		/**
		 * A function
		 * @param {string} bla blub
		 * @returns {boolean} bla
		 * @throws {string} error
		 * @memberof abc.def
		 * @private
		 * @static
		 * @function
		 */`;

		parser = new JSDocTsdParser();
		parser.parse([functionData]);
		result = parser.getResultItems();
		functionDeclarations = result[functionData.longname] as dom.FunctionDeclaration[];

		let functionDeclaration = functionDeclarations[0];
		functionDescription = `A function\n@param bla blub\n@throws {string} error`;
		expect(functionDeclarations.length).to.equals(2);
		expect(functionDeclaration.jsDocComment).to.equals(functionDescription);
	});
});
