import { expect } from "chai";
import * as dom from "dts-dom";
import * as fs from "fs";
import * as path from "path";
import { JSDocTsdParser } from "../../src/core/jsdoc-tsd-parser";

describe("JSDocTsdParser.parse.enum", () => {
	const enumData: TDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/enum.json"), { encoding: "utf-8" }));
	expect(enumData.length).to.eq(3);
	const enumInNamespaceData: TDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/enumInNamespace.json"), { encoding: "utf-8" }));

	it("Should should create an enum declartation", () => {

		const parser = new JSDocTsdParser();
		parser.parse(enumData);
		const enumDeclarations: dom.EnumDeclaration[] = parser.getParsedItem(enumData[0].longname) as dom.EnumDeclaration[];

		expect(enumDeclarations.length).to.eq(1);
		const enumDeclaration = enumDeclarations[0];
		expect(enumDeclaration.constant).to.eq((enumData[0].kind === "constant"));
		expect(enumDeclaration.jsDocComment).to.eq("Stupid enum member");
		expect(enumDeclaration.members.length).to.eq(2);
		expect(enumDeclaration.name).to.eq(enumData[0].name);

		let member = enumDeclaration.members[0];
		expect(member.jsDocComment).to.eq("Stupid enum value 1");
		expect(member.name).to.eq(enumData[1].name);
		expect(member.value).to.eq(enumData[1].defaultvalue);

		member = enumDeclaration.members[1];
		expect(member.jsDocComment).to.eq("Stupid enum value 2");
		expect(member.name).to.eq(enumData[2].name);
		expect(member.value).to.eq(enumData[2].defaultvalue);
	});

	it("should add the enum member only once", () => {
		const enumMembers = enumData.filter((data) => {
			return !(data as any).isEnum;
		});
		expect(enumMembers.length).to.eq(2);

		const parser = new JSDocTsdParser();
		parser.parse(enumData);

		const result = parser.prepareResults();
		expect(result).haveOwnPropertyDescriptor("myStupidEnum");

		const enumDeclaration: dom.EnumDeclaration = result.myStupidEnum as dom.EnumDeclaration;
		expect(enumDeclaration.members.length).to.eq(2);
	});

	it("should add the enum member to a namespace", () => {
		const parser = new JSDocTsdParser();
		parser.parse(enumInNamespaceData);

		const result = parser.prepareResults();
		expect(result).haveOwnPropertyDescriptor("myNamespace");

		const namespace = result.myNamespace as dom.NamespaceDeclaration;
		expect(namespace.members.length).to.eq(1);

		const enumMember: dom.EnumDeclaration = namespace.members[0] as any;
		expect(enumMember.name).to.eq("MyEnum");
		expect(enumMember.members.length).to.eq(2);
		expect(enumMember.members[0].name).to.eq("VAL1");
		expect(enumMember.members[1].name).to.eq("VAL2");
	});
});
