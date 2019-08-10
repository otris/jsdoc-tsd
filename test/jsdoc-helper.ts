import { writeFileSync, unlinkSync } from "fs";

/**
 * Parses a file and returns the JSDoc-comments as JSON
 * @param filePath Path to a .js file
 */
export async function parseFile(filePath: string): Promise<TDoclet[]> {
	return new Promise((resolve, reject) => {
		const parser = require("jsdoc3-parser");
		parser(filePath, function(error: Error | null, ast: any) {
			if (error) {
				reject(error);
			} else {
				resolve(ast);
			}
		});
	});
}

export async function parseData(sourceCode: string): Promise<TDoclet[]> {
	const tmpFilePath = ".tmpData.js";
	writeFileSync(tmpFilePath, sourceCode);

	try {
		const result = await parseFile(tmpFilePath);
		return result;
	} finally {
		unlinkSync(tmpFilePath);
	}
}
