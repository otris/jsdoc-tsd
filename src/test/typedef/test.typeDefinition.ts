import { expect } from "chai";
import * as dom from "dts-dom";
import * as fs from "fs";
import * as path from "path";
import { JSDocTsdParser } from "../../core/jsdoc-tsd-parser";

describe("JSDocTsdParser.parse.typedef", () => {
	it("Should create an interface", () => {
		const typeData: ITypedefDoclet = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/typedefinition.json"), { encoding: "utf-8" }));

		if (!typeData.properties) {
			throw new Error("The type defintion has no properties");
		}

		const parser = new JSDocTsdParser();
		parser.parse([typeData]);

		const result = parser.getResultItems();
		expect(result).haveOwnProperty(typeData.longname);

		const interfaceDeclarations: dom.InterfaceDeclaration[] = result[typeData.longname] as dom.InterfaceDeclaration[];
		expect(interfaceDeclarations.length).to.eq(1);
		expect(interfaceDeclarations[0].name).to.eq(typeData.name);
		expect(interfaceDeclarations[0].jsDocComment).to.eq("My other object");

		expect(interfaceDeclarations[0].members.length).to.eq(typeData.properties.length);
		const property: dom.PropertyDeclaration = interfaceDeclarations[0].members[0] as dom.PropertyDeclaration;
		expect(property.name).to.eq(typeData.properties[0].name);
		expect(property.jsDocComment).to.eq(typeData.properties[0].description);

		const unionType: dom.UnionType = property.type as dom.UnionType;
		expect(unionType.members.length).to.eq(1);
		expect(unionType.members[0]).to.eq(typeData.properties[0].type.names[0] as dom.Type);
	});

	it("should create an interface with an optional property", () => {
		const typeData: ITypedefDoclet[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "data/typedefinition_optional.json"), { encoding: "utf-8" }));
		expect(typeData.length).to.eq(1);

		const typeDefinition: ITypedefDoclet = typeData[0];

		if (!typeDefinition.properties) {
			throw new Error("Property 'properties' not defined");
		}

		expect(typeDefinition.properties.length).to.equal(1);
		expect(typeDefinition.properties[0].optional).to.equal(true);

		const parser = new JSDocTsdParser();
		parser.parse(typeData);

		const result = parser.prepareResults();
		expect(result).haveOwnPropertyDescriptor("someOtherObject");

		const interfaceDeclaration: dom.InterfaceDeclaration = result.someOtherObject as dom.InterfaceDeclaration;
		expect(interfaceDeclaration.members.length).to.eq(1);

		const optionalMember = interfaceDeclaration.members[0];
		expect(optionalMember.flags).to.eq(dom.DeclarationFlags.Optional);
	});
});
