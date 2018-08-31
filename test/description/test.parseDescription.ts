import { expect } from "chai";
import * as dom from "dts-dom";
import * as fs from "fs";
import * as path from "path";
import { JSDocTsdParser } from "../../src/core/jsdoc-tsd-parser";

describe("JSDocTsdParser.cleanJSDocComment", () => {
	const classData: TDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/description.json"), { encoding: "utf-8" }));

	it("should handle multi line description and example", () => {
		const parser = new JSDocTsdParser();
		parser.parse(classData);

		const result = parser.prepareResults();
		expect(result).haveOwnPropertyDescriptor("MyClass");

		const parsedClass: dom.ClassDeclaration = result.MyClass as dom.ClassDeclaration;
		expect(parsedClass.members.length).to.eq(2);

		// parsedClass.members[0] is constructor
		const methodDeclaration: dom.MethodDeclaration = parsedClass.members[1] as dom.MethodDeclaration;
		// description should be at the beginning
		expect(methodDeclaration.jsDocComment).to.eq("My long description\nfirst line\nsecond line\nthird line\n@param myParamter My string parameter\n@returns My return value");
	});
});
