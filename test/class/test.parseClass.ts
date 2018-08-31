import { expect } from "chai";
import * as dom from "dts-dom";
import * as fs from "fs";
import * as path from "path";
import { parse } from "querystring";
import { JSDocTsdParser } from "../../src/core/jsdoc-tsd-parser";

describe("JSDocTsdParser.parse.class", () => {
	const emptyClassData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/emptyClass.json"), { encoding: "utf-8" }))[0] as TDoclet;
	const classConstructorStringParam = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/class_constructorStringParam.json"), { encoding: "utf-8" }))[0] as TDoclet;
	const classData: TDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/class.json"), { encoding: "utf-8" }));
	expect(classData.length).to.eq(4);
	const classDataPrivateMembers: TDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/class_privateMembers.json"), { encoding: "utf-8" }));
	const templateClassData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/templateClass.json"), { encoding: "utf-8" }))[0] as TDoclet;
	const templateClassWithCustomValueData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/templateClassWithCustomValue.json"), { encoding: "utf-8" })) as TDoclet[];

	it("should parse a class definition with the correct name", () => {
		const parser = new JSDocTsdParser();
		parser.parse([emptyClassData]);
		const results = parser.getResultItems();
		const classDeclarations: dom.ClassDeclaration[] = results[emptyClassData.longname] as dom.ClassDeclaration[];

		expect(classDeclarations.length).to.eq(1);
		const classDeclaration = classDeclarations[0];
		expect(classDeclaration.name).to.eq(emptyClassData.name);
	});

	it("should parse the jsdoc comment and add it to the constructor declaration", () => {
		const comment = `/**
		 * My Class
		 * @param {string} myParam My param description
		 * @class
		 */`;
		const myClass = JSON.parse(JSON.stringify(emptyClassData));
		myClass.comment = comment;

		const parser = new JSDocTsdParser();
		parser.parse([myClass]);
		const results = parser.getResultItems();
		const classDeclarations: dom.ClassDeclaration	= results[emptyClassData.longname][0] as dom.ClassDeclaration;

		expect(classDeclarations.members.length).to.eq(1);
		const constr: dom.ConstructorDeclaration = classDeclarations.members[0] as dom.ConstructorDeclaration;
		expect(constr.jsDocComment).to.eq("My Class\n@param myParam My param description");
	});

	it("should add an constructor with no params to the class members", () => {
		const parser = new JSDocTsdParser();
		parser.parse([emptyClassData]);
		const results = parser.getResultItems();
		const classDeclarations: dom.ClassDeclaration	= results[emptyClassData.longname][0] as dom.ClassDeclaration;
		expect(classDeclarations.members.length).to.eq(1);

		const constr: dom.ConstructorDeclaration = classDeclarations.members[0] as dom.ConstructorDeclaration;
		expect(constr.parameters.length).to.eq(0);
	});

	it("should add an constructor with a string param to the class members", () => {
		const parser = new JSDocTsdParser();
		parser.parse([classConstructorStringParam]);
		const results = parser.getResultItems();
		const classDeclarations: dom.ClassDeclaration	= results[emptyClassData.longname][0] as dom.ClassDeclaration;
		const constr: dom.ConstructorDeclaration = classDeclarations.members[0] as dom.ConstructorDeclaration;
		expect(constr.parameters.length).to.eq(1);

		const unionType: dom.UnionType = constr.parameters[0].type as dom.UnionType;
		expect(unionType.members.length).to.eq(1);
		expect(unionType.members[0]).to.eq(dom.type.string);
	});

	it("should create a private class member", () => {
		const parser = new JSDocTsdParser();
		parser.parse(classDataPrivateMembers);
		const results = parser.prepareResults();

		expect(results).haveOwnPropertyDescriptor("classWithPrivateMembers");
		const classDeclaration: dom.ClassDeclaration = results.classWithPrivateMembers as dom.ClassDeclaration;
		expect(classDeclaration.members.length).to.eq(3);

		const propertyDeclarations = classDeclaration.members.filter((member) => {
			return member.kind === "property";
		});
		expect(propertyDeclarations.length).to.eq(1);
		expect(propertyDeclarations[0].flags).to.eq(dom.DeclarationFlags.Private);
	});

	it("should create a private class member method", () => {
		const parser = new JSDocTsdParser();
		parser.parse(classDataPrivateMembers);
		const results = parser.prepareResults();

		expect(results).haveOwnPropertyDescriptor("classWithPrivateMembers");
		const classDeclaration: dom.ClassDeclaration = results.classWithPrivateMembers as dom.ClassDeclaration;
		expect(classDeclaration.members.length).to.eq(3);

		const methodDeclarations = classDeclaration.members.filter((member) => {
			return member.kind === "method";
		});
		expect(methodDeclarations.length).to.eq(1);
		expect(methodDeclarations[0].flags).to.eq(dom.DeclarationFlags.Private);
	});

	it("should create a generic template class", () => {
		const parser = new JSDocTsdParser();
		parser.parse([templateClassData]);
		const results = parser.prepareResults();

		expect(results).haveOwnPropertyDescriptor("MyTemplateClass");
		const classDeclaration: dom.ClassDeclaration = results.MyTemplateClass as dom.ClassDeclaration;
		expect(classDeclaration.typeParameters.length).to.eq(1);

		const typeParameter = classDeclaration.typeParameters[0];
		expect(typeParameter.name).to.eq("T");
	});

	it("should create a generic template class with custom value", () => {
		const parser = new JSDocTsdParser();
		parser.parse(templateClassWithCustomValueData);
		const results = parser.prepareResults();

		expect(results).haveOwnPropertyDescriptor("ITemplateInterface");
		const interfaceDeclaration: dom.InterfaceDeclaration = results.ITemplateInterface as dom.InterfaceDeclaration;

		expect(results).haveOwnPropertyDescriptor("MyTemplateClass");
		const classDeclaration: dom.ClassDeclaration = results.MyTemplateClass as dom.ClassDeclaration;
		expect(classDeclaration.typeParameters.length).to.eq(1);

		const typeParameter = classDeclaration.typeParameters[0];
		expect(typeParameter.name).to.eq(`T extends keyof ${interfaceDeclaration.name}`);
	});
});
