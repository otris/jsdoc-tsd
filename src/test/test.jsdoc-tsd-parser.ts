import { expect } from "chai";
import * as dom from "dts-dom";
import * as fs from "fs";
import * as path from "path";
import { JSDocTsdParser } from "../core/jsdoc-tsd-parser";

describe("JSDocTsdParser.parse.namespace", () => {
	it("should create a namespace dom object", () => {
		let namespace: INamespaceDoclet = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/namespace.json"), { encoding: "utf-8" }));
		let parser = new JSDocTsdParser();
		parser.parse([namespace]);

		let result = parser.getResultItems();
		expect(result).haveOwnProperty(namespace.longname);

		let namespaceDeclaration = result[namespace.longname] as dom.NamespaceDeclaration;
		expect(namespaceDeclaration.kind).to.equals("namespace");
		expect(namespaceDeclaration.name).to.equals(namespace.longname);
		expect(namespaceDeclaration.members.length).to.equals(0);
	});
});
