import { expect } from "chai";
import chai = require("chai");
import * as dom from "dts-dom";
import * as fs from "fs";
import * as path from "path";
import { Configuration } from "../src/core/Configuration";
import { JSDocTsdParser } from "../src/core/jsdoc-tsd-parser";
import { parseFile } from "./jsdoc-helper";
chai.should();

describe("Test for parsing the since tag", () => {
	let emptyClassData: TDoclet;
	const classData: TDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "class/data/class.json"), { encoding: "utf-8" }));
	expect(classData.length).to.eq(4);

	before(async () => {
		emptyClassData = (await parseFile(path.join(__dirname, "class/data/emptyClass.js")))[0];
	});

	it("should add the class definition if no since tag is set", () => {
		const myClass: TDoclet = JSON.parse(JSON.stringify(emptyClassData));
		myClass.since = "";
		myClass.name = myClass.longname = "MyTestClass";

		let parser = new JSDocTsdParser();
		parser.parse([myClass]);

		let results = parser.getParsedItems();
		results.should.have.key("MyTestClass");

		// The same behavior if the tag is undefined
		myClass.since = undefined;
		myClass.name = myClass.longname = "MyTestClass";

		parser = new JSDocTsdParser();
		parser.parse([myClass]);

		results = parser.getParsedItems();
		results.should.have.key("MyTestClass");
	});

	it("should add the class definition if the tag is a valid semver tag and no latest tag is configured", () => {
		const myClass: TDoclet = JSON.parse(JSON.stringify(emptyClassData));
		myClass.since = "v1.0.0";
		myClass.name = myClass.longname = "MyTestClass";

		let parser = new JSDocTsdParser();
		parser.parse([myClass]);

		let results = parser.getParsedItems();
		results.should.have.key("MyTestClass");

		// same for other representation
		myClass.since = "1.0.0";
		myClass.name = myClass.longname = "MyTestClass";

		parser = new JSDocTsdParser();
		parser.parse([myClass]);

		results = parser.getParsedItems();
		results.should.have.key("MyTestClass");
	});

	it("should add the class definition if the tag is a valid semver tag and the latest tag is bigger than the since tag", () => {
		const myClass: TDoclet = JSON.parse(JSON.stringify(emptyClassData));

		// latest verion > since
		myClass.since = "v1.0.0";
		myClass.name = myClass.longname = "MyTestClass";

		const parserConfig = new Configuration();
		parserConfig.latestVersion = "v1.1.0";
		let parser = new JSDocTsdParser(parserConfig);
		parser.parse([myClass]);

		let results = parser.getParsedItems();
		results.should.have.key("MyTestClass");

		// latest verion < since
		myClass.since = "v1.1.0";
		myClass.name = myClass.longname = "MyTestClass";

		parserConfig.latestVersion = "v1.0.0";
		parser = new JSDocTsdParser(parserConfig);
		parser.parse([myClass]);

		results = parser.getParsedItems();
		expect(Object.keys(results).length).to.eq(0);

		// latest verion > since for other representation
		myClass.since = "1.0.0";
		myClass.name = myClass.longname = "MyTestClass";

		parser = new JSDocTsdParser(parserConfig);
		parser.parse([myClass]);

		results = parser.getParsedItems();
		results.should.have.key("MyTestClass");
	});

	it("should add the class members if the tag is a valid semver tag and the latest tag is bigger than the since tag", () => {
		const myClass: TDoclet[] = JSON.parse(JSON.stringify(classData));
		expect(myClass.length).to.eq(4);

		// latest version > since
		myClass[0].since = "v1.0.0";

		const parserConfig = new Configuration();
		parserConfig.latestVersion = "v1.1.0";
		let parser = new JSDocTsdParser(parserConfig);
		parser.parse(myClass);

		let result = parser.prepareResults();
		expect(result).haveOwnPropertyDescriptor("myTestClass");
		const classDeclaration: dom.ClassDeclaration = result.myTestClass as dom.ClassDeclaration;
		expect(classDeclaration.members.length).to.eq(3);

		// latest version < since
		myClass[0].since = "v1.1.0";

		parserConfig.latestVersion = "v1.0.0";
		parser = new JSDocTsdParser(parserConfig);
		parser.parse(myClass);

		result = parser.prepareResults();
		expect(Object.keys(result).length).to.eq(0);
	});

	it("should add the class definition if the tag is a valid semver tag with multi-digit numbers", () => {
		const myClass: TDoclet = JSON.parse(JSON.stringify(emptyClassData));
		myClass.since = "v1.0.0";
		myClass.name = myClass.longname = "MyTestClass";

		const parserConfig = new Configuration();
		parserConfig.latestVersion = "v1.1.0";
		let parser = new JSDocTsdParser(parserConfig);
		parser.parse([myClass]);

		let results = parser.getParsedItems();
		results.should.have.key("MyTestClass");

		// same for other representation
		myClass.since = "1.0.12";
		myClass.name = myClass.longname = "MyTestClass";

		parser = new JSDocTsdParser(parserConfig);
		parser.parse([myClass]);

		results = parser.getParsedItems();
		results.should.have.key("MyTestClass");
	});

	it("should not add the class definition if the tag is not a valid semver tag and no custom comparator is set", () => {
		const myClass: TDoclet = JSON.parse(JSON.stringify(emptyClassData));
		myClass.since = "abc";
		myClass.name = myClass.longname = "MyTestClass";

		const parser = new JSDocTsdParser();
		parser.parse([myClass]);

		const results = parser.getParsedItems();
		expect(Object.keys(results).length).to.eq(0);
	});

	it("should use the comparator function if it's passed as function", () => {
		const myClass: TDoclet = JSON.parse(JSON.stringify(emptyClassData));
		myClass.since = "abc";
		myClass.name = myClass.longname = "MyTestClass";

		const parserConfig = new Configuration();
		parserConfig.versionComparator = (taggedVersion: string, latestVersion: string): boolean => {
			return false;
		};
		let parser = new JSDocTsdParser(parserConfig);
		parser.parse([myClass]);

		let results = parser.getParsedItems();
		expect(Object.keys(results).length).to.eq(0);

		// opposite test
		parserConfig.versionComparator = (taggedVersion: string, latestVersion: string): boolean => {
			return true;
		};
		parser = new JSDocTsdParser(parserConfig);
		parser.parse([myClass]);

		results = parser.getParsedItems();
		results.should.have.key("MyTestClass");
	});

	it("should use the comparator function if it's passed as JavaScript file", () => {
		const myClass: TDoclet = JSON.parse(JSON.stringify(emptyClassData));
		myClass.since = "abc";
		myClass.name = myClass.longname = "MyTestClass";

		const parserConfig = new Configuration();
		parserConfig.versionComparator = path.resolve(__dirname, "versionComparators/versionComparatorFalse.js");
		let parser = new JSDocTsdParser(parserConfig);
		parser.parse([myClass]);

		let results = parser.getParsedItems();
		expect(Object.keys(results).length).to.eq(0);

		// opposite test
		parserConfig.versionComparator = path.resolve(__dirname, "versionComparators/versionComparatorTrue.js");
		parser = new JSDocTsdParser(parserConfig);
		parser.parse([myClass]);

		results = parser.getParsedItems();
		results.should.have.key("MyTestClass");
	});

	it("should pass the config values to the comparator function", () => {
		const myClass: TDoclet = JSON.parse(JSON.stringify(emptyClassData));
		myClass.since = "abc";
		myClass.name = myClass.longname = "MyTestClass";

		const parserConfig = new Configuration();
		parserConfig.latestVersion = "def";
		parserConfig.versionComparator = (taggedVersion: string, latestVersion: string): boolean => {
			return taggedVersion === "abc" && latestVersion === "def";
		};
		let parser = new JSDocTsdParser(parserConfig);
		parser.parse([myClass]);

		let results = parser.getParsedItems();
		results.should.have.key("MyTestClass");

		// opposite test
		parserConfig.versionComparator = (taggedVersion: string, latestVersion: string): boolean => {
			return taggedVersion !== "abc" && latestVersion !== "def";
		};
		parser = new JSDocTsdParser(parserConfig);
		parser.parse([myClass]);

		results = parser.getParsedItems();
		expect(Object.keys(results).length).to.eq(0);
	});

});
