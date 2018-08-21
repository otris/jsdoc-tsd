import { expect } from "chai";
import * as dom from "dts-dom";
import * as fs from "fs";
import * as path from "path";
import { JSDocTsdParser } from "../../core/jsdoc-tsd-parser";

describe("JSDocTsdParser.parse.callback", () => {
	const callbackData = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/callback.json"), { encoding: "utf-8" }))[0] as TDoclet;

	it("should parse callback and output a type definition", () => {
		const parser = new JSDocTsdParser();
		parser.parse([callbackData]);

		const results = parser.getResultItems();
		const callbackDeclarations: dom.TypeAliasDeclaration[] = results[callbackData.longname] as dom.TypeAliasDeclaration[];
		const out = parser.resolveResults();
		expect(callbackDeclarations.length).to.eq(1);
		const callbackDeclaration = callbackDeclarations[0];
		expect(callbackDeclaration.name).to.eq("myCallback");
		expect(callbackDeclaration.kind).to.eq("alias");

		const type = callbackDeclaration.type;
		const typedefData = callbackData as ITypedefDoclet;
		if (typedefData.params && typedefData.returns) {
			const expectedType = dom.create.functionType([
				dom.create.parameter(typedefData.params[0].name, dom.create.union([typedefData.params[0].type.names[0] as dom.Type])),
			], dom.create.union([typedefData.returns[0].type.names[0] as dom.Type]));

			expect(callbackDeclaration.type).to.deep.equal(expectedType);
		} else {
			throw new Error("Callback data has no params or return value");
		}
	});
});
