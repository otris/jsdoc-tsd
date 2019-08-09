import * as fs from "fs";
import * as path from "path";

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

	// Write the results to the example folder
	fs.writeFileSync(path.resolve(__dirname, "exampleProject/jsdoc-results.json"), JSON.stringify(jsdocResults, null, "\t"));
}
