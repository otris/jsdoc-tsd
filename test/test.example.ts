import { expect } from "chai";
import { execSync } from "child_process";
import * as dom from "dts-dom";
import * as fs from "fs";
import * as path from "path";
import { JSDocTsdParser } from "../src/core/jsdoc-tsd-parser";

describe("JSDocTsdParser.parse.exampleProject", () => {
	it("Should parse the example project", () => {
		const a = execSync("npm run parse-example");
		const data: TDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../exampleProject/jsdoc-results.json"), { encoding: "utf-8" }));

		const parser = new JSDocTsdParser();
		parser.parse(data);
		const result = parser.resolveResults();
		console.log(result);
	});
});
