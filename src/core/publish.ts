import * as fs from "fs";
import * as helper from "jsdoc/util/templateHelper";
import * as path from "path";
import * as shelljs from "shelljs";
import { Configuration } from "./Configuration";
import { JSDocTsdParser } from "./jsdoc-tsd-parser";

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
		const config = new Configuration(opts.configure);
		parser = new JSDocTsdParser(config);
	} else {
		parser = new JSDocTsdParser();
	}

	// parse the results
	parser.parse(jsdocResults);

	// Write the output
	let outputDir, outputFilePath;
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
		fs.writeFileSync(outputFilePath, parser.generateTypeDefinition());
	} catch (err) {
		throw new Error("Can't write results to file '" + outputFilePath + "': " + err.stack);
	}
}
