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
}
