import { expect } from "chai";
import * as fs from "fs";
import * as path from "path";
import * as shelljs from "shelljs";
import { execSync } from "child_process";

describe("Tests for different cmd calls", () => {
	it("Should write the output to the passed destination folder", () => {
		let targetFolder = "build/testFolder";
		if (fs.existsSync(targetFolder)) {
			shelljs.rm("-rf", targetFolder);
		}

		let command = `node node_modules/jsdoc/jsdoc -r exampleProject/src -t src-out/core -d ${targetFolder}`;
		execSync(command);

		expect(fs.existsSync(targetFolder)).to.be.true;
		expect(fs.existsSync(path.join(targetFolder, "jsdoc-results.d.ts")));
	});

	it("Should write the output to the passed destination folder with the passed file name", () => {
		let targetFolder = "build/testFolder";
		let targetFilePath = path.join(targetFolder, "test-test-test.d.ts");
		if (fs.existsSync(targetFolder)) {
			shelljs.rm("-rf", targetFolder);
		}

		let command = `node node_modules/jsdoc/jsdoc -r exampleProject/src -t src-out/core -d ${targetFilePath}`;
		execSync(command);

		expect(fs.existsSync(targetFilePath));
	});
});
