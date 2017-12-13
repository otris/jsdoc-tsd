import { expect } from "chai";
import * as dom from "dts-dom";
import * as fs from "fs";
import * as path from "path";
import { JSDocTsdParser } from "../core/jsdoc-tsd-parser";

describe("Test for parsing the since tag", () => {
	let emptyClassData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "class/data/emptyClass.json"), { encoding: "utf-8" }))[0] as TDoclet;

	it("should add the class definition if no since tag is set", () => {
		let myClass: TDoclet = JSON.parse(JSON.stringify(emptyClassData));
		myClass.since = "";
		myClass.name = myClass.longname = "MyTestClass";

		let parser = new JSDocTsdParser();
		parser.parse([myClass]);

		let results = parser.getResultItems();
		expect(results).haveOwnPropertyDescriptor("MyTestClass");

		// The same behavior if the tag is undefined
		myClass.since = undefined;
		myClass.name = myClass.longname = "MyTestClass";

		parser = new JSDocTsdParser();
		parser.parse([myClass]);

		results = parser.getResultItems();
		expect(results).haveOwnPropertyDescriptor("MyTestClass");
	});

	it("should add the class definition if the tag is a valid semver tag and no latest tag is configured", () => {
		let myClass: TDoclet = JSON.parse(JSON.stringify(emptyClassData));
		myClass.since = "v1.0.0";
		myClass.name = myClass.longname = "MyTestClass";

		let parser = new JSDocTsdParser();
		parser.parse([myClass]);

		let results = parser.getResultItems();
		expect(results).haveOwnPropertyDescriptor("MyTestClass");

		// same for other representation
		myClass.since = "1.0.0";
		myClass.name = myClass.longname = "MyTestClass";

		parser = new JSDocTsdParser();
		parser.parse([myClass]);

		results = parser.getResultItems();
		expect(results).haveOwnPropertyDescriptor("MyTestClass");
	});

	it("should add the class definition if the tag is a valid semver tag and the latest tag is bigger than the since tag", () => {
		let myClass: TDoclet = JSON.parse(JSON.stringify(emptyClassData));
		myClass.since = "v1.0.0";
		myClass.name = myClass.longname = "MyTestClass";

		let parserConfig = {
			latestVersion: "v1.1.0"
		};
		let parser = new JSDocTsdParser(parserConfig);
		parser.parse([myClass]);

		let results = parser.getResultItems();
		expect(results).haveOwnPropertyDescriptor("MyTestClass");

		// same for other representation
		myClass.since = "1.0.0";
		myClass.name = myClass.longname = "MyTestClass";

		parser = new JSDocTsdParser(parserConfig);
		parser.parse([myClass]);

		results = parser.getResultItems();
		expect(results).haveOwnPropertyDescriptor("MyTestClass");
	});

	it("should add the class definition if the tag is a valid semver tag with multi-digit numbers", () => {
		let myClass: TDoclet = JSON.parse(JSON.stringify(emptyClassData));
		myClass.since = "v1.0.0";
		myClass.name = myClass.longname = "MyTestClass";

		let parserConfig = {
			latestVersion: "v1.1.0"
		};
		let parser = new JSDocTsdParser(parserConfig);
		parser.parse([myClass]);

		let results = parser.getResultItems();
		expect(results).haveOwnPropertyDescriptor("MyTestClass");

		// same for other representation
		myClass.since = "1.0.12";
		myClass.name = myClass.longname = "MyTestClass";

		parser = new JSDocTsdParser(parserConfig);
		parser.parse([myClass]);

		results = parser.getResultItems();
		expect(results).haveOwnPropertyDescriptor("MyTestClass");
	});

	it("should not add the class definition if the tag is not a valid semver tag and no custom comparator is set", () => {
		let myClass: TDoclet = JSON.parse(JSON.stringify(emptyClassData));
		myClass.since = "abc";
		myClass.name = myClass.longname = "MyTestClass";

		let parser = new JSDocTsdParser();
		parser.parse([myClass]);

		let results = parser.getResultItems();
		expect(Object.keys(results).length).to.eq(0);
	});

	it("should use the comparator function if it's passed as function", () => {
		let myClass: TDoclet = JSON.parse(JSON.stringify(emptyClassData));
		myClass.since = "abc";
		myClass.name = myClass.longname = "MyTestClass";

		let parserConfig = {
			versionComparator: (taggedVersion: string, latestVersion: string): boolean => {
				return false;
			}
		};
		let parser = new JSDocTsdParser(parserConfig);
		parser.parse([myClass]);

		let results = parser.getResultItems();
		expect(Object.keys(results).length).to.eq(0);

		// opposite test
		parserConfig = {
			versionComparator: (taggedVersion: string, latestVersion: string): boolean => {
				return true;
			}
		};
		parser = new JSDocTsdParser(parserConfig);
		parser.parse([myClass]);

		results = parser.getResultItems();
		expect(results).haveOwnPropertyDescriptor("MyTestClass");
	});

	it("should use the comparator function if it's passed as JavaScript file", () => {
		let myClass: TDoclet = JSON.parse(JSON.stringify(emptyClassData));
		myClass.since = "abc";
		myClass.name = myClass.longname = "MyTestClass";

		let parserConfig = {
			versionComparator: "C:/projekte/jsdoc-tsd/src/test/versionComparators/versionComparatorFalse.js"
		};
		let parser = new JSDocTsdParser(parserConfig);
		parser.parse([myClass]);

		let results = parser.getResultItems();
		expect(Object.keys(results).length).to.eq(0);

		// opposite test
		parserConfig = {
			versionComparator: "C:/projekte/jsdoc-tsd/src/test/versionComparators/versionComparatorTrue.js"
		};
		parser = new JSDocTsdParser(parserConfig);
		parser.parse([myClass]);

		results = parser.getResultItems();
		expect(results).haveOwnPropertyDescriptor("MyTestClass");
	});

	it("should pass the config values to the comparator function", () => {
		let myClass: TDoclet = JSON.parse(JSON.stringify(emptyClassData));
		myClass.since = "abc";
		myClass.name = myClass.longname = "MyTestClass";

		let parserConfig = {
			latestVersion: "def",
			versionComparator: (taggedVersion: string, latestVersion: string): boolean => {
				return taggedVersion === "abc" && latestVersion === "def";
			}
		};
		let parser = new JSDocTsdParser(parserConfig);
		parser.parse([myClass]);
		
		let results = parser.getResultItems();
		expect(results).haveOwnPropertyDescriptor("MyTestClass");
		
		// opposite test
		parserConfig.versionComparator = (taggedVersion: string, latestVersion: string): boolean => {
			return taggedVersion !== "abc" && latestVersion !== "def";
		};
		parser = new JSDocTsdParser(parserConfig);
		parser.parse([myClass]);
		
		results = parser.getResultItems();
		expect(Object.keys(results).length).to.eq(0);
	});

});
