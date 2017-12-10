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
		expect(interfaceDeclaration.jsDocComment).to.eq("My test interface");
		expect(interfaceDeclaration.name).to.eq(interfaceData[0].name);
	});

	it("should create a function member of an interface", () => {
		let parser = new JSDocTsdParser();
		parser.parse(interfaceData);

		let result = parser.prepareResults();
		expect(result).haveOwnPropertyDescriptor("myTestInterface");

		let parsedInterface: dom.InterfaceDeclaration = result["myTestInterface"] as dom.InterfaceDeclaration;
		expect(parsedInterface.members.length).to.eq(2);

		let methodDeclaration: dom.MethodDeclaration = parsedInterface.members[1] as dom.MethodDeclaration;
		expect(methodDeclaration.jsDocComment).to.eq("A simple function\n@param myParamter My string parameter");
	});

	it("should create a number member of an interface", () => {
		let parser = new JSDocTsdParser();
		parser.parse(interfaceData);
		
		let result = parser.prepareResults();
		expect(result).haveOwnPropertyDescriptor("myTestInterface");

		let parsedInterface: dom.InterfaceDeclaration = result["myTestInterface"] as dom.InterfaceDeclaration;
		expect(parsedInterface.members.length).to.eq(2);

		let myPropertyMember: dom.PropertyDeclaration = parsedInterface.members[0] as dom.PropertyDeclaration;
		expect(myPropertyMember.name).to.eq("myNumberMember");
		expect(myPropertyMember.jsDocComment).to.eq("A simple number member");

		let unionType = myPropertyMember.type as dom.UnionType;
		expect(unionType.members.length).to.eq(2);
		expect(unionType.members[0]).to.eq(dom.type.number);
		expect(unionType.members[1]).to.eq(dom.type.string);
	});
});
