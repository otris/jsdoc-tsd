import { expect } from "chai";
import * as dom from "dts-dom";
import * as fs from "fs";
import * as path from "path";
import { JSDocTsdParser } from "../../core/jsdoc-tsd-parser";
import { parse } from "querystring";

describe("JSDocTsdParser.parse.overloading", () => {
	let classData: TDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/overloading.json"), { encoding: "utf-8" }));
	expect(classData.length).to.eq(5);

	it("should add the jsdoc comment to the constructor description and the classdesc tag to the class description", () => {
		let parser = new JSDocTsdParser();
		parser.parse(classData);
        let results = parser.getResultItems();

		let classDeclarations: dom.ClassDeclaration[] = results[classData[0].longname] as dom.ClassDeclaration[];
        expect(classDeclarations.length).to.eq(1);
        
		expect(classDeclarations[0].jsDocComment).to.eq("Class description");
		let classDeclaration = classDeclarations[0];
		expect(classDeclaration.members.length).to.eq(2);
		
		let constructor1: dom.ConstructorDeclaration = classDeclaration.members[0] as dom.ConstructorDeclaration;
		expect(constructor1.jsDocComment).to.eq("Description of constructor with parameter\n@param constructorParam Description of the constructor parameter");
		let constructor2: dom.ConstructorDeclaration = classDeclaration.members[1] as dom.ConstructorDeclaration;
		expect(constructor2.jsDocComment).to.eq("Description of constructor without parameter");
	});

	it("should add two constructors with different parameters to the class members", () => {
		let parser = new JSDocTsdParser();
		parser.parse(classData);
		let results = parser.getResultItems();
		let classDeclarations: dom.ClassDeclaration[] = results[classData[0].longname] as dom.ClassDeclaration[];
		expect(classDeclarations.length).to.eq(1);
		let classDeclaration = classDeclarations[0];
		expect(classDeclaration.members.length).to.eq(2);

		let constructor1: dom.ConstructorDeclaration = classDeclaration.members[0] as dom.ConstructorDeclaration;
		expect(constructor1.parameters.length).to.eq(1);
		let unionType: dom.UnionType = constructor1.parameters[0].type as dom.UnionType;
		expect(unionType.members.length).to.eq(1);
		expect(unionType.members[0]).to.eq(dom.type.string);
		let constructor2: dom.ConstructorDeclaration = classDeclaration.members[1] as dom.ConstructorDeclaration;
		expect(constructor2.parameters.length).to.eq(0);
	});
});
