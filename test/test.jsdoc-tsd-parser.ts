import { expect } from "chai";
import chai = require("chai");
import * as dom from "dts-dom";
import { JSDocTsdParser } from "../src/core/jsdoc-tsd-parser";
import { parseData } from "./jsdoc-helper";
chai.should();

describe("General tests for the jsdoc-tsd-parser", () => {
	it("Should not matter in which order items are parsed", async () => {
		// If the member is parsed before the top level declaration,
		// the plugin should still be able to successfully resolve
		// membership
		const data = await parseData(`
			/**
			 * @function Fuu
			 * @memberof Bar
			 */

			 /**
			  * @namespace Bar
			  */
		`);

		const parser = new JSDocTsdParser();
		parser.parse(data);

		const result = parser.resolveMembership();
		result.should.include.keys("Bar");
		result.should.not.include.keys("Fuu");

		const namespace = result.get("Bar") as dom.NamespaceDeclaration;
		expect(namespace.members.length).to.equal(1);
		expect(namespace.members[0].name).to.equal("Fuu");
	});

	it("should throw an error if a not existing parsed item is requested", () => {
		const parser = new JSDocTsdParser();
		expect(parser.getParsedItem.bind(parser, "notExisting"))
			.to.throw(`Item with name 'notExisting' not found in result items`);
	});

	it("should not parse annotation 'file'", async () => {
		const data = await parseData(`
			/**
			 * @file Fuuu
			 */
		`);

		const parser = new JSDocTsdParser();
		parser.parse(data);
		const result = parser.resolveMembership();
		expect(result.size).to.equal(0);
	});
});
