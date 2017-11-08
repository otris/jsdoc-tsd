import { expect } from "chai";
import * as dom from "dts-dom";
import * as fs from "fs";
import * as path from "path";
import { JSDocTsdParser } from "../../core/jsdoc-tsd-parser";
import { parse } from "querystring";

describe("JSDocTsdParser.parse.member", () => {
	let classData: TDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/classMember.json"), { encoding: "utf-8" }));
	expect(classData.length).to.eq(3);

	it("should create a class with a number member", () => {
		let parser = new JSDocTsdParser();
		parser.parse(classData);

		let result = parser.prepareResults();
		expect(result).haveOwnPropertyDescriptor("myTestClass");

		let myClass: dom.ClassDeclaration = result["myTestClass"] as dom.ClassDeclaration;
		expect(myClass.members.length).to.equal(2);

		let myPropertyMember: dom.PropertyDeclaration = myClass.members[1] as dom.PropertyDeclaration;
		expect(myPropertyMember.name).to.eq("myNumberMember");
		expect(myPropertyMember.jsDocComment).to.eq("A simple number member");

		let unionType = myPropertyMember.type as dom.UnionType;
		expect(unionType.members.length).to.eq(1);
		expect(unionType.members[0]).to.eq(dom.type.number);
	});

});
