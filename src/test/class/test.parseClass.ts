import { expect } from "chai";
import * as dom from "dts-dom";
import * as fs from "fs";
import * as path from "path";
import { JSDocTsdParser } from "../../core/jsdoc-tsd-parser";
import { parse } from "querystring";

describe("JSDocTsdParser.parse.class", () => {
	let classData: TDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/class.json"), { encoding: "utf-8" }));
	expect(classData.length).to.eq(4);

	it("should parse a class definition", () => {
		let parser = new JSDocTsdParser();
		parser.parse(classData);
		let results = parser.getResultItems();
		let classDeclarations: dom.ClassDeclaration[] = results[classData[0].longname] as dom.ClassDeclaration[];

		expect(classDeclarations.length).to.eq(1);
		let classDeclaration = classDeclarations[0];
		expect(classDeclaration.jsDocComment).to.eq("My test class");
		expect(classDeclaration.name).to.eq(classData[0].name);
	});

	it("should create a function member of a class", () => {
		let parser = new JSDocTsdParser();
		parser.parse(classData);
		let results = parser.getResultItems();
		let classDeclarations: dom.ClassDeclaration[] = results[classData[0].longname] as dom.ClassDeclaration[];

		let result = parser.prepareResults();
		expect(result).haveOwnPropertyDescriptor("myTestClass");

		let parsedClass: dom.ClassDeclaration = result["myTestClass"] as dom.ClassDeclaration;
		expect(parsedClass.members.length).to.eq(3);

		let methodDeclaration: dom.MethodDeclaration = parsedClass.members[2] as dom.MethodDeclaration;
		expect(methodDeclaration.jsDocComment).to.eq("A simple function");
	});
})
