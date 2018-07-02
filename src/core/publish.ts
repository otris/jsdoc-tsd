import * as fs from "fs";
import * as path from "path";
import * as shelljs from "shelljs";
import { JSDocTsdParser } from "./jsdoc-tsd-parser";
import * as helper from "jsdoc/util/templateHelper";

/**
 * Entry-Point of jsdoc. Gets called by the jsdoc-module to generate the docs.
 * @param {TAFFY} data - The TaffyDB containing the data that jsdoc parsed.
 * @param {*} opts - Options passed into jsdoc.
 */
export function publish(data: any, opts: any) {
	// remove undocumented stuff.
	data({ undocumented: true }).remove();

	// remove members that will not be included in the output
	data = helper.prune(data);

	// get the jsdoc results
	const jsdocResults = data().get();

	let parser;
	if (opts.configure) {
		parser = new JSDocTsdParser(JSON.parse(fs.readFileSync(opts.configure, { encoding: "utf-8" })));
	} else {
		parser = new JSDocTsdParser();
	}

	// parse the results
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
