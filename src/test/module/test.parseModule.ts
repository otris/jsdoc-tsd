import { expect } from "chai";
import * as dom from "dts-dom";
import * as fs from "fs";
import * as path from "path";
import { JSDocTsdParser } from "../../core/jsdoc-tsd-parser";
import { parse } from "querystring";

describe("JSDocTsdParser.parse.module", () => {
	let moduleData: TDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/module.json"), { encoding: "utf-8" }));
	expect(moduleData.length).to.eq(4);

	it("should parse a module definition", () => {
		let parser = new JSDocTsdParser();
		parser.parse(moduleData);
		let results = parser.getResultItems();
		let moduleDeclarations: dom.ModuleDeclaration[] = results[moduleData[0].longname] as dom.ModuleDeclaration[];

		expect(moduleDeclarations.length).to.eq(1);
		let moduleDeclaration = moduleDeclarations[0];
		expect(moduleDeclaration.jsDocComment).to.eq("My module description.");
		expect(moduleDeclaration.name).to.eq(moduleData[0].name);
	});

	it("should create a function member of a module", () => {
		let parser = new JSDocTsdParser();
		parser.parse(moduleData);
		let results = parser.getResultItems();
		let moduleDeclarations: dom.ModuleDeclaration[] = results[moduleData[0].longname] as dom.ModuleDeclaration[];

		let result = parser.prepareResults();
		expect(result).haveOwnPropertyDescriptor("module:myModule");

		let parsedModule: dom.ModuleDeclaration = result["module:myModule"] as dom.ModuleDeclaration;
		expect(parsedModule.members.length).to.eq(2);

		let functionDeclaration: dom.FunctionDeclaration = parsedModule.members[1] as dom.FunctionDeclaration;
		expect(functionDeclaration.jsDocComment).to.eq("@description Module function description.\n@param param1 Description of param1.\n@param param2 Description of param2.");
	});
})
