import { expect } from "chai";
import * as dom from "dts-dom";
import * as fs from "fs";
import * as path from "path";
import { JSDocTsdParser } from "../../core/jsdoc-tsd-parser";

describe("JSDocTsdParser.parse.topLevelFunction", () => {
	it("should create a function as top level declaration", () => {
		let functionData: IFunctionDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/function_topLevel.json"), {encoding: "utf-8" }));
		let parser = new JSDocTsdParser();
		parser.parse(functionData);

		let result = parser.getResultItems();
		expect(result).haveOwnProperty(functionData[0].longname);

		let functionDeclarations = result[functionData[0].longname];
		expect(functionDeclarations.length).to.equals(1);

		let functionDeclaration = functionDeclarations[0] as dom.FunctionDeclaration;
		expect(functionDeclaration.kind).to.equals("function");
		expect(functionDeclaration.name).to.equals(functionData[0].name);

		expect(functionDeclaration.returnType).to.equals(dom.type.void);
	});
});
