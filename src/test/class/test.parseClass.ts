import { expect } from "chai";
import * as dom from "dts-dom";
import * as fs from "fs";
import * as path from "path";
import { JSDocTsdParser } from "../../core/jsdoc-tsd-parser";
import { parse } from "querystring";

describe("JSDocTsdParser.parse.class", () => {
	let classData: TDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/class.json"), { encoding: "utf-8" }));
	expect(classData.length).to.eq(4);
	let classDataPrivateMembers: TDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/class_privateMembers.json"), { encoding: "utf-8" }));

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

	it("should create a private class member", () => {
		let parser = new JSDocTsdParser();
		parser.parse(classDataPrivateMembers);
		let results = parser.prepareResults();

		expect(results).haveOwnPropertyDescriptor("classWithPrivateMembers");
		let classDeclaration: dom.ClassDeclaration = results["classWithPrivateMembers"] as dom.ClassDeclaration;
		expect(classDeclaration.members.length).to.eq(3);

		let propertyDeclarations = classDeclaration.members.filter((member) => {
			return member.kind === "property";
		});
		expect(propertyDeclarations.length).to.eq(1);
		expect(propertyDeclarations[0].flags).to.eq(dom.DeclarationFlags.Private);
	});

	it("should create a private class member method", () => {
		let parser = new JSDocTsdParser();
		parser.parse(classDataPrivateMembers);
		let results = parser.prepareResults();

		expect(results).haveOwnPropertyDescriptor("classWithPrivateMembers");
		let classDeclaration: dom.ClassDeclaration = results["classWithPrivateMembers"] as dom.ClassDeclaration;
		expect(classDeclaration.members.length).to.eq(3);

		let methodDeclarations = classDeclaration.members.filter((member) => {
			return member.kind === "method";
		});
		expect(methodDeclarations.length).to.eq(1);
		expect(methodDeclarations[0].flags).to.eq(dom.DeclarationFlags.Private);
	});
})
