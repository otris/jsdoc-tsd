import chai = require("chai");
import { expect } from "chai";
import * as dom from "dts-dom";
import { JSDocTsdParser } from "../src/core/jsdoc-tsd-parser";
import { parseData } from "./jsdoc-helper";
import { Configuration } from "../src/core/Configuration";
chai.should();

describe("General tests for the parser", () => {
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
		const result = parser.resolveMembershipAndExtends();
		expect(result.size).to.equal(0);
	});

	it("Should not duplicate members by resolving membership multiple times", async () => {
		const data = await parseData(`
			/**
			 * @class
			 */
			function A() {
				/** @type {number} */
				this.memberOfA = 0;
			}

			/**
			 * @class
			 * @extends A
			 */
			function B() {
				/** @type {number} */
				this.memberOfB = 0;
			}
		`);

		const parser = new JSDocTsdParser();
		parser.parse(data);

		// Call resolveMembership twice. Before the fixes, members were duplicated
		let results = parser.resolveMembershipAndExtends();
		results = parser.resolveMembershipAndExtends();

		results.should.include.keys("A");
		results.should.include.keys("B");

		const classA = results.get("A") as dom.ClassDeclaration;
		// @ts-ignore
		const classAMemberNames = classA.members.filter((member) => member.kind === "property").map((member) => member.name);
		expect(classAMemberNames).to.deep.equal([
			"memberOfA",
		]);

		const classB = results.get("B") as dom.ClassDeclaration;

		// @ts-ignore
		const classBMemberNames = classB.members.filter((member) => member.kind === "property").map((member) => member.name);
		expect(classBMemberNames).to.deep.equal([
			"memberOfB",
		]);
	});

	it("should ignore undocumented members by default", async () => {
		const data = await parseData(`
			var myCustomNamespace = {};
		`);

		const parser = new JSDocTsdParser();
		parser.parse(data);
		const result = parser.resolveMembershipAndExtends();
		expect(result.size).to.equal(0);
	});

	it("should not ignore undocumented members if configured", async () => {
		const data = await parseData(`
			var myCustomNamespace = {};
		`);

		const config = new Configuration();
		config.skipUndocumented = false;
		const parser = new JSDocTsdParser(config);
		parser.parse(data);
		const result = parser.resolveMembershipAndExtends();
		expect(result.size).to.equal(1);
		result.should.include.keys("myCustomNamespace");
	});
});
