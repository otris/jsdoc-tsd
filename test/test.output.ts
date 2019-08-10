import { expect } from "chai";
import { existsSync, unlinkSync } from "fs";
import { JSDocTsdParser } from "../src/core/jsdoc-tsd-parser";
import { parseData } from "./jsdoc-helper";

describe("Tests for the output of the parser", () => {
	it("should write out the declaration file to the passed path", async () => {
		const parser = new JSDocTsdParser();
		const data = await parseData(`/** @typedef {number|string} StringOrNumberType */`);

		parser.parse(data);
		const targetPath = ".testOutput.d.ts";
		parser.generateTypeDefinition(targetPath);
		try {
			expect(existsSync(targetPath)).to.be.true;
		} finally {
			unlinkSync(targetPath);
		}
	});
});
