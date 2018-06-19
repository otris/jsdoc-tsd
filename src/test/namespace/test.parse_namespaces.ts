import { expect } from "chai";
import * as dom from "dts-dom";
import * as fs from "fs";
import * as path from "path";
import { JSDocTsdParser } from "../../core/jsdoc-tsd-parser";

describe("JSDocTsdParser.parse.namespace", () => {
	let namespace: INamespaceDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/namespace.json"), { encoding: "utf-8" }));
	expect(namespace.length).to.eq(3);

	it("should create a namespace dom object", () => {
		let parser = new JSDocTsdParser();
		parser.parse(namespace);

		let results = parser.getResultItems();

		expect(results).haveOwnProperty(namespace[0].longname);

		let namespaceDeclarations = results[namespace[0].longname];
		expect(namespaceDeclarations.length).to.equals(1);

		let namespaceDeclaration = namespaceDeclarations[0] as dom.NamespaceDeclaration;
		expect(namespaceDeclaration.kind).to.equals("namespace");
		expect(namespaceDeclaration.name).to.equals(namespace[0].longname);
	});

	it("should create a number constant in a namespace", () => {
		let parser = new JSDocTsdParser();
		parser.parse(namespace);
		
		let results = parser.getResultItems();
		expect(results).haveOwnProperty(namespace[1].longname);

		let members = results[namespace[1].longname];
		expect(members.length).to.equals(1);

		let member = members[0] as dom.ConstDeclaration;
		expect(member.kind).to.equals("const");
		expect(member.name).to.equals("CONSTANT1");
	});
});
