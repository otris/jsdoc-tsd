import { expect } from "chai";
import chai = require("chai");
import * as dom from "dts-dom";
import * as fs from "fs";
import * as path from "path";
import { parse } from "querystring";
import { JSDocTsdParser } from "../../src/core/jsdoc-tsd-parser";
import { parseData } from "../jsdoc-helper";
chai.should();

describe("JSDocTsdParser.parse.module", () => {
	const moduleData: TDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/module.json"), { encoding: "utf-8" }));
	expect(moduleData.length).to.eq(4);

	it("should parse a module definition", () => {
		const parser = new JSDocTsdParser();
		parser.parse(moduleData);

		const results = parser.getParsedItems();
		const moduleDeclarations: dom.ModuleDeclaration[] = parser.getParsedItem(moduleData[2].longname) as dom.ModuleDeclaration[];

		expect(moduleDeclarations.length).to.eq(1);
		const moduleDeclaration = moduleDeclarations[0];
		expect(moduleDeclaration.jsDocComment).to.eq("my module");
		expect(moduleDeclaration.name).to.eq(moduleData[2].name);
	});

	it("should create a function member of an module", () => {
		const parser = new JSDocTsdParser();
		parser.parse(moduleData);

		const result = parser.resolveMembershipAndExtends();
		result.should.include.keys("module:myModule");

		const parsedModule: dom.ModuleDeclaration = result.get("module:myModule") as dom.ModuleDeclaration;
		expect(parsedModule.members.length).to.eq(2);

		const functionDeclaration: dom.FunctionDeclaration = parsedModule.members[1] as dom.FunctionDeclaration;
		expect(functionDeclaration.jsDocComment).to.eq("my module function\n@param param1 first param\n@param param2 second param\n@returns function return value");
	});

	it("should create a number member of an module", () => {
		const parser = new JSDocTsdParser();
		parser.parse(moduleData);

		const result = parser.resolveMembershipAndExtends();
		result.should.include.keys("module:myModule");

		const parsedModule: dom.ModuleDeclaration = result.get("module:myModule") as dom.ModuleDeclaration;
		expect(parsedModule.members.length).to.eq(2);

		const variableMember: dom.VariableDeclaration = parsedModule.members[0] as dom.VariableDeclaration;
		expect(variableMember.name).to.eq("moduleMember");
		expect(variableMember.jsDocComment).to.eq("my module member");

		const unionType = variableMember.type as dom.UnionType;
		expect(unionType.members.length).to.eq(1);
		expect(unionType.members[0]).to.eq(dom.type.string);
	});
	it("should transform module members successfully (#52)", async () => {
		const data = await parseData(`
			/**
			 * @module Fuu
			 */

			 /**
			  * @typedef {Object} bar
			  * @property {string} FuuBar
			  * @memberof module:Fuu
			  */

			/**
			 * @function testFunction
			 * @returns {module:Fuu~bar}
			 */
		`);

		const parser = new JSDocTsdParser();
		parser.parse(data);

		const result = parser.resolveMembershipAndExtends();
		expect([...result.keys()]).to.include("module:Fuu");

		const moduleDeclaration: dom.ModuleDeclaration = result.get("module:Fuu") as dom.ModuleDeclaration;

		// @ts-ignore
		const functionDeclaration: dom.FunctionDeclaration = moduleDeclaration.members.filter((member) => member.name === "testFunction")[0];
		const returnType = (functionDeclaration.returnType as dom.UnionType).members[0];
		expect(returnType).to.equal("bar");
	});

	it("should transform module members as arrays successfully (#52)", async () => {
		const data = await parseData(`
			/**
			 * @module Fuu
			 */

			 /**
			  * @typedef {Object} bar
			  * @property {string} FuuBar
			  * @memberof module:Fuu
			  */

			/**
			 * @function testFunction
			 * @returns {module:Fuu~bar[]}
			 */
		`);

		const parser = new JSDocTsdParser();
		parser.parse(data);

		const result = parser.resolveMembershipAndExtends();
		expect([...result.keys()]).to.include("module:Fuu");

		const moduleDeclaration: dom.ModuleDeclaration = result.get("module:Fuu") as dom.ModuleDeclaration;

		// @ts-ignore
		const functionDeclaration: dom.FunctionDeclaration = moduleDeclaration.members.filter((member) => member.name === "testFunction")[0];
		const returnType = (functionDeclaration.returnType as dom.UnionType).members[0] as dom.ArrayTypeReference;
		expect(returnType.kind).to.equal("array");
		expect(returnType.type).to.equal("Fuu.bar");
	});

	it("should parse module enums", async () => {
		const data = await parseData(`
			/**
			 * @module Fuu
			 */

			/**
			 * @enum {string} bar
			 * @memberof module:Fuu
			 */
			var bar = {
				FUU: "BAR",
				BAR: "FUU"
			};
		`);

		const parser = new JSDocTsdParser();
		parser.parse(data);

		const result = parser.resolveMembershipAndExtends();
		expect([...result.keys()]).to.include("module:Fuu");
		const moduleDeclaration: dom.ModuleDeclaration = result.get("module:Fuu") as dom.ModuleDeclaration;

		// @ts-ignore
		const enumDeclaration: dom.EnumDeclaration = moduleDeclaration.members[0] as dom.EnumDeclaration;
		expect(enumDeclaration.members.length).to.be.greaterThan(0);
		expect(enumDeclaration.members[0].name).to.equal("FUU");
		expect(enumDeclaration.members[0].value).to.equal("BAR");
		expect(enumDeclaration.members[1].name).to.equal("BAR");
		expect(enumDeclaration.members[1].value).to.equal("FUU");
	})
});
