import { expect } from "chai";
import * as dom from "dts-dom";
import * as fs from "fs";
import * as path from "path";
import { JSDocTsdParser } from "../core/jsdoc-tsd-parser";

describe("JSDocTsdParser.parse.exampleProject", () => {
	it("Should parse the example project", () => {
		let data: TDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../exampleProject/jsdoc-results.json"), { encoding: "utf-8" }));

		let parser = new JSDocTsdParser();
		parser.parse(data);
		let result = parser.resolveResults();
		console.log(result);
	});
});
