import { expect } from "chai";
import * as dom from "dts-dom";
import * as fs from "fs";
import * as path from "path";
import { parse } from "querystring";
import { JSDocTsdParser, IParsedJSDocItem } from "../../src/core/jsdoc-tsd-parser";

describe("JSDocTsdParser.parse.overloading", () => {
	const classData: TDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/overloading.json"), { encoding: "utf-8" }));
	expect(classData.length).to.eq(5);

	it("should add the jsdoc comment to the constructor description and the classdesc tag to the class description", () => {
		const parser = new JSDocTsdParser();
		parser.parse(classData);

		const classDeclarations: dom.ClassDeclaration[] = parser.getResultItem(classData[0].longname) as dom.ClassDeclaration[];
		expect(classDeclarations.length).to.eq(1);

		expect(classDeclarations[0].jsDocComment).to.eq("Class description");
		const classDeclaration = classDeclarations[0];
		expect(classDeclaration.members.length).to.eq(2);

		const constructor1: dom.ConstructorDeclaration = classDeclaration.members[0] as dom.ConstructorDeclaration;
		expect(constructor1.jsDocComment).to.eq("Description of constructor with parameter\n@param constructorParam Description of the constructor parameter");
		const constructor2: dom.ConstructorDeclaration = classDeclaration.members[1] as dom.ConstructorDeclaration;
		expect(constructor2.jsDocComment).to.eq("Description of constructor without parameter");
	});

	it("should add two constructors with different parameters to the class members", () => {
		const parser = new JSDocTsdParser();
		parser.parse(classData);

		const classDeclarations: dom.ClassDeclaration[] = parser.getResultItem(classData[0].longname) as dom.ClassDeclaration[];
		expect(classDeclarations.length).to.eq(1);
		const classDeclaration = classDeclarations[0];
		expect(classDeclaration.members.length).to.eq(2);

		const constructor1: dom.ConstructorDeclaration = classDeclaration.members[0] as dom.ConstructorDeclaration;
		expect(constructor1.parameters.length).to.eq(1);
		const unionType: dom.UnionType = constructor1.parameters[0].type as dom.UnionType;
		expect(unionType.members.length).to.eq(1);
		expect(unionType.members[0]).to.eq(dom.type.string);
		const constructor2: dom.ConstructorDeclaration = classDeclaration.members[1] as dom.ConstructorDeclaration;
		expect(constructor2.parameters.length).to.eq(0);
	});
});
