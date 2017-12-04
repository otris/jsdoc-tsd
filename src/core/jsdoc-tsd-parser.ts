import * as dom from "dts-dom";
import { ParameterFlags, TypeParameter, InterfaceDeclaration } from "dts-dom";

export class JSDocTsdParser {

	private accessFlagMap: { [key: string]: dom.DeclarationFlags } = {
		public: dom.DeclarationFlags.None,
		private: dom.DeclarationFlags.Private,
		protected: dom.DeclarationFlags.Protected,
	};
	private jsdocItems: TDoclet[];
	private resultItems: {
		[key: string]: dom.DeclarationBase[];
	};

	constructor() {
		this.resultItems = {};
	}

	public getResultItems() {
		return this.resultItems;
	}

	public parse(jsdocItems: TDoclet[]) {
		this.jsdocItems = [];

		jsdocItems.forEach((item) => {
			if (!item.ignore) {
				let parsedItem: dom.DeclarationBase = {};
				this.jsdocItems.push(item);
				this.resultItems[item.longname] = [];

				switch (item.kind) {
					case "function":
						parsedItem = this.parseFunction(item as IFunctionDoclet);
						break;

					case "member":
						if (item.isEnum) {
							parsedItem = this.parseEnum(item as IMemberDoclet);
						} else {
							parsedItem = this.parseMember(item as IMemberDoclet);
						}
						break;

					case "namespace":
						parsedItem = this.parseNamespace(item as INamespaceDoclet);
						break;

					case "typedef":
						parsedItem = this.parseTypeDefinition(item as ITypedefDoclet);
						break;

					case "file":
						// suppress warnings for this type
						break;

					case "class":
						// IClassDoclet with kind 'class'
						parsedItem = this.parseClass(item as IClassDoclet);
						break;

					case "interface":
						// IClassDoclet with kind 'interface'
						parsedItem = this.parseInterface(item as IClassDoclet);
						break;

					default:
						console.warn(`Unsupported jsdoc item kind: ${item.kind} (item name: ${item.longname})`);
						break;
				}

				parsedItem.jsDocComment = this.cleanJSDocComment(item.comment);
				this.handleFlags(item, parsedItem);
				this.resultItems[item.longname].push(parsedItem);
			}
		});
	}

	public prepareResults(): { [key: string]: dom.TopLevelDeclaration } {
		let domTopLevelDeclarations: { [key: string]: dom.TopLevelDeclaration } = {};

		for (let jsdocItem of this.jsdocItems) {
			let parentItem = this.findParentItem(jsdocItem, domTopLevelDeclarations);

			if (parentItem) {
				// add the items we parsed before as a member of the top level declaration
				for (let parsedItem of this.resultItems[jsdocItem.longname]) {
					switch (parentItem.kind) {
						case "namespace":
							(parentItem as dom.NamespaceDeclaration).members.push(parsedItem as dom.NamespaceMember);
							break;

						case "class":
							let classMember = parsedItem as dom.ClassMember;

							switch ((classMember as any).kind) {
								case "function":
									let functionDeclaration: dom.FunctionDeclaration = classMember as any;
									classMember = dom.create.method(
										functionDeclaration.name,
										functionDeclaration.parameters,
										functionDeclaration.returnType,
										functionDeclaration.flags
									);

									classMember.typeParameters = functionDeclaration.typeParameters;
									classMember.comment = functionDeclaration.comment;
									classMember.jsDocComment = functionDeclaration.jsDocComment;
									break;
							}

							(parentItem as dom.ClassDeclaration).members.push(classMember);
							break;

						case "enum":
							// enum members can already exists
							let foundItem = parentItem.members.filter((member) => {
								return member.name === (parsedItem as dom.EnumMemberDeclaration).name;
							}).length > 0;

							if (!foundItem) {
								parentItem.members.push(parsedItem as dom.EnumMemberDeclaration);
							}
							break;

						case "interface":
							let objectTypeMember = parsedItem as dom.ObjectTypeMember;

							switch ((objectTypeMember as any).kind) {
								case "function":
									let functionDeclaration: dom.FunctionDeclaration = objectTypeMember as any;
									objectTypeMember = dom.create.method(
										functionDeclaration.name,
										functionDeclaration.parameters,
										functionDeclaration.returnType,
										functionDeclaration.flags
									);

									objectTypeMember.typeParameters = functionDeclaration.typeParameters;
									objectTypeMember.comment = functionDeclaration.comment;
									objectTypeMember.jsDocComment = functionDeclaration.jsDocComment;
									break;

								case "property":
									// ok, nothing to change
									break;

								default:
									console.warn("Can't add member '${parsedItem.longname}' to parent item '${(parentItem as any).longname}'. Unsupported member type: '${parsedItem.kind}'");
									break;
							}

							(parentItem as dom.InterfaceDeclaration).members.push(objectTypeMember);
							break;

						default:
							// missing the top level declaration
							// tslint:disable-next-line:max-line-length
							console.warn(`Can't add member '${jsdocItem.longname}' to parent item '${(parentItem as any).longname}'. Unsupported parent member type: '${parentItem.kind}'. Insert this item as a top level declaration`);

							if (!domTopLevelDeclarations[jsdocItem.longname]) {
								domTopLevelDeclarations[jsdocItem.longname] = parsedItem as dom.TopLevelDeclaration;
							}
							break;
					}
				}
			} else {
				if (jsdocItem.memberof) {
					// missing the top level declaration
					console.warn("Missing top level declaration '" + jsdocItem.memberof + "' for member '" + jsdocItem.longname + "'. Insert this member as a top level declaration.");
				}

				// add this item as a top level declaration
				for (let parsedItem of this.resultItems[jsdocItem.longname]) {
					if (!domTopLevelDeclarations[jsdocItem.longname]) {
						domTopLevelDeclarations[jsdocItem.longname] = parsedItem as dom.TopLevelDeclaration;
					}
				}
			}
		}

		return domTopLevelDeclarations;
	}

	public resolveResults(): string {
		let output = "";

		let results = this.prepareResults();
		Object.keys(results).forEach((key) => {
			try {
				output += dom.emit(results[key]);
			} catch (err) {
				console.error(`Unexpected error. Please report this error on github!\nCan't emit item ${key}: ${err}\n\n${JSON.stringify(results[key], null, "\t")}`);
			}
		});

		return output;
	}

	private cleanJSDocComment(comment: string | undefined, addExample = false): string {
		let cleanLines = [];
		let descriptionLines: string[] = [];
		let exampleLines: string[] = [];
		let description = false;
		let example = false;

		if (comment) {
			for (let line of comment.split(/\r?\n/)) {
				let cleanedLine = line.trim()
					.replace(/^\/\*\*\s?/, "") // JSDoc-Header ("/**")
					.replace(/\s*\*\/\s?$/, "") // JSDoc-Footer ("*/")
					.replace(/^\*\s?/, "") // Line ("*")
					.replace(/@param\s\{[^\}]+\}/g, "@param") // Parameter-Types
					.trim();

				// ignore everything that is not part of the function description in tsd-files
				// tslint:disable-next-line:max-line-length
				if (cleanedLine && (cleanedLine.startsWith("@param") || cleanedLine.startsWith("@throws") || cleanedLine.startsWith("@description") || cleanedLine.startsWith("@example") || !cleanedLine.startsWith("@"))) {
					if (cleanedLine.startsWith("@")) {
						description = false;
						example = false;
					}
					if (cleanedLine.startsWith("@description")) {
						cleanedLine = cleanedLine.replace("@description ", "");
						description = true;
					} else if (cleanedLine.startsWith("@example")) {
						example = true;
					}

					if (description) {
						descriptionLines.push(cleanedLine);
					} else if (example) {
						exampleLines.push(cleanedLine);
					} else {
						cleanLines.push(cleanedLine);
					}
				}
			}
		}

		let lines = "";
		if (descriptionLines.length > 0) {
			lines = lines + descriptionLines.join("\n");
		}
		if (cleanLines.length > 0) {
			if (lines !== "") {
				lines = lines + "\n";
			}
			lines = lines + cleanLines.join("\n");
		}
		if (addExample && exampleLines.length > 0) {
			if (lines !== "") {
				lines = lines + "\n";
			}
			lines = lines + exampleLines.join("\n");
		}

		return lines;
	}


	private createDomParams(params: IDocletProp[], functionName?: string): dom.Parameter[] {
		let domParams: dom.Parameter[] = [];
		let typeDef: ITypedefDoclet | undefined;
		let propParam: IDocletProp | undefined;

		for (let i=0; i<params.length; i++) {
			let param = params[i];
			let paramIsProperty = (param.name.indexOf(".") > 0);
			let nextParamIsProperty = (i+1 < params.length) && (params[i+1].name.indexOf(".") > 0);
			let lastParam = (i+1 === params.length);
			let domParam: dom.Parameter | undefined;
			
			// check the type of the parameter
			if (!paramIsProperty && nextParamIsProperty) {
				// the parameter is a parameter with properties

				// remember the parameter
				propParam = param;

				// create a new typedef
				typeDef = {
					kind: "typedef",
					type: param.type,
					meta: param.meta,
					name: functionName + "_" + param.name,
					scope: "",
					longname: functionName + "_" + param.name,
					properties: []
				};
				this.jsdocItems.push(typeDef);
				
			} else if (paramIsProperty) {
				// the parameter is a property

				if (!typeDef || !typeDef.properties) {
					throw `Parent of property ${param.name} is missing or incorrect`;
				}

				// add the property to the typedef
				let prop: IDocletProp = {
					type: param.type,
					name: param.name.substr(param.name.indexOf(".") + 1),
					description: param.description,
					comment: param.comment
				};
				typeDef.properties.push(prop);

				if (lastParam || !nextParamIsProperty) {
					// the parameter is the last property

					if(!propParam) {
						throw `Parent of property ${param.name} is missing or incorrect`;
					}

					// create an interface from the typedef
					let domInterface: dom.InterfaceDeclaration = this.parseTypeDefinition(typeDef) as dom.InterfaceDeclaration;
					this.resultItems[typeDef.longname] = [domInterface];

					// create the parameter with the interface as type
					let interfaceType = dom.create.typeParameter(typeDef.name, domInterface);
					domParam = dom.create.parameter(propParam.name, interfaceType);
				}

			} else if (param.type && param.type.names.length > 0) {
				// the param has a simple type
				domParam = dom.create.parameter(param.name, this.mapTypesToUnion(param.type.names));

			} else {
				// the param has no type => map to "any"
				domParam = dom.create.parameter(param.name, dom.type.any);
			}

			if (domParam) {
				if (param.optional) {
					domParam.flags = dom.ParameterFlags.Optional;
				}
	
				this.handleFlags(param, domParam);
				domParams.push(domParam);
			}
		}

		return domParams;
	}

	private findParentItem(jsdocItem: TDoclet, domTopLevelDeclarations: { [key: string]: dom.TopLevelDeclaration }): dom.TopLevelDeclaration {
		// we have to find the parent item
		let parentItem: dom.TopLevelDeclaration = {} as dom.TopLevelDeclaration;

		if (jsdocItem.memberof) {
			let parentItemNames = jsdocItem.memberof.split(".");
			parentItemNames.forEach((name, index) => {

				if (index < 1) {
					parentItem = domTopLevelDeclarations[name];

					if (!parentItem) {
						if (this.resultItems[name]) {
							domTopLevelDeclarations[name] = this.resultItems[name][0] as dom.TopLevelDeclaration;
							parentItem = domTopLevelDeclarations[name];
						}
					}
				} else if (parentItem) {
					let parentItemAsNamespace = parentItem as dom.NamespaceDeclaration;
					let parentItemName = "";
					for (let i = 0; i < index; i++) {
						if (i > 0) {
							parentItemName += ".";
						}

						parentItemName += parentItemNames[i];
					}

					let itemFound = parentItemAsNamespace.members.some((item) => {
						if (item.name === name) {
							parentItem = item;

							return true;
						} else {
							return false;
						}
					});
				}
			}, this);
		}

		return parentItem;
	}

	private handleFlags(doclet: any, obj: dom.DeclarationBase | dom.Parameter) {
		obj.flags = dom.DeclarationFlags.None;

		obj.flags |= this.accessFlagMap[doclet.access];
		obj.flags |= doclet.optional || doclet.defaultvalue !== undefined ? dom.ParameterFlags.Optional : dom.DeclarationFlags.None;
		obj.flags |= doclet.variable ? dom.ParameterFlags.Rest : dom.DeclarationFlags.None;
		obj.flags |= doclet.virtual ? dom.DeclarationFlags.Abstract : dom.DeclarationFlags.None;
		obj.flags |= doclet.readonly ? dom.DeclarationFlags.ReadOnly : dom.DeclarationFlags.None;
		obj.flags |= doclet.scope === "static" ? dom.DeclarationFlags.Static : dom.DeclarationFlags.None;

		let cast = obj as any;
		if (doclet.optional && cast.kind === "property" && cast.flags === ParameterFlags.Optional) {
			obj.flags = dom.DeclarationFlags.Optional;
		}
	}

	private mapTypesToUnion(types: string[]): dom.UnionType {
		let domTypes: dom.Type[] = [];

		types.forEach((type) => {
			domTypes.push(this.mapVariableType(type));
		});

		return dom.create.union(domTypes);
	}

	private mapVariableType(variableType: string) {
		let matches = variableType.match(/(?:Array\.<([^>]+)>)|(?:([^\[]*)\[\])/i);

		if (matches) {
			let type = matches[1] || matches[2];

			if (type === "*" || type === "") {
				// wrong type definition
				return dom.type.any;
			} else {
				if (type === "bool") {
					type = "boolean";
				}

				return dom.type.array(type as dom.Type);
			}
		} else {
			if (variableType.match(/array/i) || variableType === "*") {
				return dom.type.any;
			} else {
				if (variableType === "bool") {
					variableType = "boolean";
				}

				return variableType as dom.Type;
			}
		}
	}

	private parseClass(jsdocItem: IClassDoclet): dom.DeclarationBase {
		let domClass: dom.ClassDeclaration = dom.create.class(jsdocItem.name);

		// Add the constructor
		let constructorDeclaration: dom.ConstructorDeclaration;
		if (jsdocItem.params && jsdocItem.params.length > 0) {
			constructorDeclaration = dom.create.constructor(this.createDomParams(jsdocItem.params));
		} else {
			// no params
			constructorDeclaration = dom.create.constructor([]);
		}

		constructorDeclaration.jsDocComment = this.cleanJSDocComment(jsdocItem.comment);
		domClass.members.push(constructorDeclaration);

		return domClass;
	}

	private parseEnum(jsdocItem: IMemberDoclet): dom.DeclarationBase {
		if (!jsdocItem.isEnum) {
			throw new Error(`item ${jsdocItem.longname} is not an enum`);
		}

		let domEnum: dom.EnumDeclaration = dom.create.enum(jsdocItem.name, (jsdocItem.kind === "constant"));
		if (jsdocItem.properties) {
			for (let property of jsdocItem.properties) {
				let domEnumMember: dom.EnumMemberDeclaration = dom.create.enumValue(property.name, property.defaultvalue);
				domEnumMember.jsDocComment = this.cleanJSDocComment(property.description);
				domEnum.members.push(domEnumMember);
			}
		}

		return domEnum;
	}

	private parseFunction(jsdocItem: IFunctionDoclet): dom.DeclarationBase {
		let functionReturnValue: dom.Type;

		if (jsdocItem.returns && jsdocItem.returns.length > 0) {
			if (jsdocItem.returns[0].type) {
				functionReturnValue = this.mapTypesToUnion(jsdocItem.returns[0].type.names);
			} else {
				// the jsdoc comment is incomplete, there is no type information for the return value
				functionReturnValue = dom.type.any;
			}
		} else {
			functionReturnValue = dom.type.void;
		}

		let domFunction: dom.FunctionDeclaration;
		if (jsdocItem.params && jsdocItem.params.length > 0) {
			domFunction = dom.create.function(jsdocItem.name, this.createDomParams(jsdocItem.params, jsdocItem.name), functionReturnValue);
		} else {
			// no params => create a single function declaration
			domFunction = dom.create.function(jsdocItem.name, [], functionReturnValue);
		}

		return domFunction;
	}

	private parseInterface(jsdocItem: IClassDoclet) {
		return dom.create.interface(jsdocItem.name);
	}

	private parseMember(jsdocItem: IMemberDoclet) {
		if (jsdocItem.isEnum) {
			throw new Error(`item ${jsdocItem.longname} is an enum`);
		}

		let propertyType: dom.Type = dom.type.any;
		if (jsdocItem.type && jsdocItem.type.names.length > 0) {
			let domTypes: dom.Type[] = [];
			jsdocItem.type.names.forEach((typeName) => {
				domTypes.push(this.mapVariableType(typeName));
			});

			propertyType = dom.create.union(domTypes);
		}

		return dom.create.property(jsdocItem.name, propertyType);
	}

	private parseNamespace(jsdocItem: INamespaceDoclet): dom.DeclarationBase {
		return dom.create.namespace(jsdocItem.name);
	}

	private parseTypeDefinition(jsdocItem: ITypedefDoclet): dom.DeclarationBase {
		let domInterface: dom.InterfaceDeclaration = dom.create.interface(jsdocItem.name);

		if (jsdocItem.properties) {
			for (let property of jsdocItem.properties) {
				let propertyType: dom.Type = dom.type.any;
				if (property.type) {
					propertyType = this.mapTypesToUnion(property.type.names);
				}

				let domProperty = dom.create.property(property.name, propertyType);
				domProperty.jsDocComment = this.cleanJSDocComment(property.comment) || property.description; // normally the property 'comment' is for these types empty
				this.handleFlags(property, domProperty);

				domInterface.members.push(domProperty);
			}
		}

		return domInterface;
	}

}
