import * as fs from "fs";
import * as path from "path";
import * as shelljs from "shelljs";
import { JSDocTsdParser } from "./jsdoc-tsd-parser";

/**
 * Entry-Point of jsdoc. Gets called by the jsdoc-module to generate the docs.
 * @param {TAFFY} data - The TaffyDB containing the data that jsdoc parsed.
 * @param {*} opts - Options passed into jsdoc.
 */
export function publish(data: any, opts: any) {
	// remove undocumented stuff.
	data({ undocumented: true }).remove();

	// get the jsdoc results
	const jsdocResults = data().get();

	// parse the results
	let parser = new JSDocTsdParser();
	parser.parse(jsdocResults);

	// Write the output
	var outputDir, outputFilePath;
	if (opts.destination.endsWith(".d.ts")) {
		outputFilePath = opts.destination;
		outputDir = path.dirname(outputFilePath);
	} else {
		outputDir = opts.destination;
		outputFilePath = path.join(outputDir, "jsdoc-results.d.ts");
	}

	if (!fs.existsSync(outputDir)) {
		try {
			shelljs.mkdir("-p", outputDir);
		} catch (err) {
			throw new Error("Can't create output directory '" + outputDir + "': " + err);
		}
	}

	try {
		fs.writeFileSync(outputFilePath, parser.resolveResults());
	} catch (err) {
		throw new Error("Can't write results to file '" + outputFilePath + "': " + err);
	}
}
