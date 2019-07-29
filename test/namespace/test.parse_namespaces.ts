import { expect } from "chai";
import * as dom from "dts-dom";
import * as fs from "fs";
import * as path from "path";
import { JSDocTsdParser } from "../../src/core/jsdoc-tsd-parser";

describe("JSDocTsdParser.parse.namespace", () => {
	const namespace: INamespaceDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/namespace.json"), { encoding: "utf-8" }));
	expect(namespace.length).to.eq(3);

	it("should create a namespace dom object", () => {
		const parser = new JSDocTsdParser();
		parser.parse(namespace);

		const namespaceDeclarations = parser.getParsedItem(namespace[0].longname);
		expect(namespaceDeclarations.length).to.equals(1);

		const namespaceDeclaration = namespaceDeclarations[0] as dom.NamespaceDeclaration;
		expect(namespaceDeclaration.kind).to.equals("namespace");
		expect(namespaceDeclaration.name).to.equals(namespace[0].longname);
	});

	it("should create a number constant in a namespace", () => {
		const parser = new JSDocTsdParser();
		parser.parse(namespace);

		const members = parser.getParsedItem(namespace[1].longname);
		expect(members.length).to.equals(1);

		const member = members[0] as dom.ConstDeclaration;
		expect(member.kind).to.equals("const");
		expect(member.name).to.equals("CONSTANT1");
	});
});
