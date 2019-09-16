import chai = require("chai");
import { expect } from "chai";
import * as dom from "dts-dom";
import { JSDocTsdParser } from "../../src/core/jsdoc-tsd-parser";
import { parseData } from "../jsdoc-helper";
chai.should();

describe("Tests for declaring types", () => {
	it("should declare a type", async () => {
		const data = await parseData(`
			/**
			 * @typedef {number|string} NumberLike
			 */
		`);

		const parser = new JSDocTsdParser();
		parser.parse(data);

		const result = parser.resolveMembershipAndExtends();
		result.should.include.keys("NumberLike");

		const typeAlias = result.get("NumberLike") as dom.TypeAliasDeclaration;
		expect(typeAlias.type).to.equal("number|string");
	});
});
