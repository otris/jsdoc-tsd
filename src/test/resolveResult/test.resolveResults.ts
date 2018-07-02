import { expect } from "chai";
import * as dom from "dts-dom";
import * as fs from "fs";
import * as path from "path";
import { JSDocTsdParser } from "../../core/jsdoc-tsd-parser";

describe("JSDocTsdParser.resolveResults.function", () => {
	it("should not generate a function because memberof tag is invalid", () => {
		let functionData: IFunctionDoclet = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../function/data/function.json"), { encoding: "utf-8" }));
		let parser = new JSDocTsdParser();
		parser.parse([functionData]);

		let result = parser.resolveResults();
		expect(result).to.equals("");
	});
});

describe("JSDocTsdParser.resolveResults.functionInNamespace", () => {
	it("should generate a function inside of a namespace", () => {
		let dataToParse: TDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/functionInNamespace.json"), { encoding: "utf-8" }));
		let parser = new JSDocTsdParser();
		parser.parse(dataToParse);

		let result = parser.resolveResults();
		expect(result).to.equals(fs.readFileSync(path.resolve(__dirname, "results/functionInNamespace.d.ts"), {encoding: "utf-8"}));
	});
});
