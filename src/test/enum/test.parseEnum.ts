import { expect } from "chai";
import * as dom from "dts-dom";
import * as fs from "fs";
import * as path from "path";
import { JSDocTsdParser } from "../../core/jsdoc-tsd-parser";

describe("JSDocTsdParser.parse.enum", () => {
	it("Should should create an enum declartation", () => {
		let enumData: TDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/enum.json"), { encoding: "utf-8" }));
		expect(enumData.length).to.eq(3);

		let parser = new JSDocTsdParser();
		parser.parse(enumData);
		let results = parser.getResultItems();
		let enumDeclarations: dom.EnumDeclaration[] = results[enumData[0].longname] as dom.EnumDeclaration[];

		expect(enumDeclarations.length).to.eq(1);
		let enumDeclaration = enumDeclarations[0];
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
})