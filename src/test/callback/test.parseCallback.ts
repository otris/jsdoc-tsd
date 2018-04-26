import { expect } from "chai";
import * as fs from "fs";
import * as path from "path";
import * as dom from "dts-dom";
import { JSDocTsdParser } from "../../core/jsdoc-tsd-parser";

describe("JSDocTsdParser.parse.callback", () => {
	let callbackData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/callback.json"), { encoding: "utf-8" }))[0] as TDoclet;

	it("should parse callback and output a type definition", () => {
		let parser = new JSDocTsdParser();
		parser.parse([callbackData]);

		let results = parser.getResultItems();
		let callbackDeclarations: dom.TypeAliasDeclaration[] = results[callbackData.longname] as dom.TypeAliasDeclaration[];
		let out = parser.resolveResults();
		expect(callbackDeclarations.length).to.eq(1);
		let callbackDeclaration = callbackDeclarations[0];
		expect(callbackDeclaration.name).to.eq("myCallback");
		expect(callbackDeclaration.kind).to.eq("alias");

		let type = callbackDeclaration.type;
		let typedefData = callbackData as ITypedefDoclet;
		if (typedefData.params && typedefData.returns) {
			let expectedType = dom.create.functionType([
				dom.create.parameter(typedefData.params[0].name, dom.create.union([typedefData.params[0].type.names[0] as dom.Type]))
			], dom.create.union([typedefData.returns[0].type.names[0] as dom.Type]));

			expect(callbackDeclaration.type).to.deep.equal(expectedType);
		} else {
			throw new Error("Callback data has no params or return value");
		}
	});
});
