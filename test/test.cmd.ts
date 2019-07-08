import { expect } from "chai";
import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import * as shelljs from "shelljs";

describe("Tests for different cmd calls", () => {
	it("Should write the output to the passed destination folder", () => {
		const targetFolder = "build/testFolder";
		if (fs.existsSync(targetFolder)) {
			shelljs.rm("-rf", targetFolder);
		}

		const command = `node node_modules/jsdoc/jsdoc -r exampleProject/src -t src-out/ -d ${targetFolder}`;
		execSync(command);

		expect(fs.existsSync(targetFolder)).to.be.true;
		expect(fs.existsSync(path.join(targetFolder, "jsdoc-results.d.ts")));
	});

	it("Should write the output to the passed destination folder with the passed file name", () => {
		const targetFolder = "build/testFolder";
		const targetFilePath = path.join(targetFolder, "test-test-test.d.ts");
		if (fs.existsSync(targetFolder)) {
			shelljs.rm("-rf", targetFolder);
		}

		const command = `node node_modules/jsdoc/jsdoc -r exampleProject/src -t src-out -d ${targetFilePath}`;
		execSync(command);

		expect(fs.existsSync(targetFilePath));
	});
});
