import chai = require("chai");
import { expect } from "chai";
import { JSDocTsdParser } from "../src/core/jsdoc-tsd-parser";
chai.should();

describe("General tests for the parser", () => {
	it("should throw an error if a not existing parsed item is requested", () => {
		const parser = new JSDocTsdParser();
		expect(parser.getParsedItem.bind(parser, "notExisting"))
			.to.throw(`Item with name 'notExisting' not found in result items`);
	});
	});
});
