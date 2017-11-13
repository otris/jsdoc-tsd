import { expect } from "chai";
import * as dom from "dts-dom";
import * as fs from "fs";
import * as path from "path";
import { JSDocTsdParser } from "../../core/jsdoc-tsd-parser";
import { parse } from "querystring";

describe("JSDocTsdParser.parse.interface", () => {
	let interfaceData: TDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/interface.json"), { encoding: "utf-8" }));
	expect(interfaceData.length).to.eq(4);

	it("should parse a interface definition", () => {
		let parser = new JSDocTsdParser();
		parser.parse(interfaceData);
		let results = parser.getResultItems();
		let interfaceDeclarations: dom.InterfaceDeclaration[] = results[interfaceData[0].longname] as dom.InterfaceDeclaration[];

		expect(interfaceDeclarations.length).to.eq(1);
		let interfaceDeclaration = interfaceDeclarations[0];
		expect(interfaceDeclaration.jsDocComment).to.eq("My interface description");
		expect(interfaceDeclaration.name).to.eq(interfaceData[0].name);
	});

	it("should create a function member of a interface", () => {
		let parser = new JSDocTsdParser();
		parser.parse(interfaceData);
		let results = parser.getResultItems();
		let interfaceDeclarations: dom.InterfaceDeclaration[] = results[interfaceData[0].longname] as dom.InterfaceDeclaration[];

		let result = parser.prepareResults();
		expect(result).haveOwnPropertyDescriptor("MyInterface");

		let parsedInterface: dom.InterfaceDeclaration = result["MyInterface"] as dom.InterfaceDeclaration;
		expect(parsedInterface.members.length).to.eq(2);

		let functionDeclaration: dom.ObjectTypeMember = parsedInterface.members[1] as dom.ObjectTypeMember;
		expect(functionDeclaration.jsDocComment).to.eq("@description Interface function description\n@param param1 First parameter description\n@param param2 Second parameter description");
	});
})
