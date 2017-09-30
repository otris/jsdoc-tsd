import * as fs from "fs";
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
	if (!fs.existsSync("build")) {
		fs.mkdirSync("build");
	}

	fs.writeFileSync("build/jsdoc-results.d.ts", parser.resolveResults());
}
