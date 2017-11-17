import * as dom from "dts-dom";

export class JSDocTsdParser {

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
				this.jsdocItems.push(item);
				this.resultItems[item.longname] = [];

				switch (item.kind) {
					case "function":
						this.parseFunction(item as IFunctionDoclet);
						break;

					case "member":
						if (item.isEnum) {
							this.parseEnum(item as IMemberDoclet);
						} else {
							this.parseMember(item as IMemberDoclet);
						}
						break;

					case "namespace":
						this.parseNamespace(item as INamespaceDoclet);
						break;

					case "typedef":
						this.parseTypeDefinition(item as ITypedefDoclet);
						break;

					case "file":
						// suppress warnings for this type
						break;

					case "class":
						this.parseClass(item as IClassDoclet);
						break;

					default:
						console.warn(`Unsupported jsdoc item kind: ${item.kind} (item name: ${item.longname})`);
						break;
				}
			}
		});
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

	private createDomParams(params: IDocletProp[]): dom.Parameter[] {
		let domParams: dom.Parameter[] = [];

		params.forEach((param) => {
			let domParam: dom.Parameter;

			if (param.type && param.type.names.length > 0) {
				domParam = dom.create.parameter(param.name, this.mapTypesToUnion(param.type.names));
			} else {
				// the param has no type => map to "any"
				domParam = dom.create.parameter(param.name, dom.type.any);
			}

			if (param.optional) {
				domParam.flags = dom.ParameterFlags.Optional;
			}

			domParams.push(domParam);
		});

		return domParams;
	}

	private cleanJSDocComment(comment: string | undefined): string {
		let cleanLines = [];

		if (comment) {
			for (let line of comment.split(/\r?\n/)) {
				let cleanedLine = line.trim()
					.replace(/^\/\*\*\s?/, "") // JSDoc-Header ("/**")
					.replace(/\s*\*\/\s?$/, "") // JSDoc-Footer ("*/")
					.replace(/^\*\s?/, "") // Line ("*")
					.replace(/@param\s\{[^\}]+\}/g, "@param") // Parameter-Types
					.trim();

				// ignore everything that is not part of the function description in tsd-files
				if (cleanedLine && (cleanedLine.startsWith("@param") || cleanedLine.startsWith("@throws") || !cleanedLine.startsWith("@"))) {
					cleanLines.push(cleanedLine);
				}
			}
		}

		return cleanLines.join("\n");
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

	private parseClass(jsdocItem: IClassDoclet) {
		let domClass: dom.ClassDeclaration = dom.create.class(jsdocItem.name);
		domClass.jsDocComment = this.cleanJSDocComment(jsdocItem.description);
		this.resultItems[jsdocItem.longname].push(domClass);

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
	}

	private parseEnum(jsdocItem: IMemberDoclet) {
		if (!jsdocItem.isEnum) {
			throw new Error(`item ${jsdocItem.longname} is not an enum`);
		}

		let domEnum: dom.EnumDeclaration = dom.create.enum(jsdocItem.name, (jsdocItem.kind === "constant"));
		domEnum.jsDocComment = this.cleanJSDocComment(jsdocItem.description);

		if (jsdocItem.properties) {
			for (let property of jsdocItem.properties) {
				let domEnumMember: dom.EnumMemberDeclaration = dom.create.enumValue(property.name, property.defaultvalue);
				domEnumMember.jsDocComment = this.cleanJSDocComment(property.description);
				domEnum.members.push(domEnumMember);
			}
		}

		this.resultItems[jsdocItem.longname].push(domEnum);
	}

	private parseFunction(jsdocItem: IFunctionDoclet) {
		let functionReturnValue: dom.Type;

		if (jsdocItem.returns && jsdocItem.returns.length > 0) {
			if (jsdocItem.returns[0].type) {
				functionReturnValue = this.mapTypesToUnion(jsdocItem.returns[0].type.names);
			} else {
				// the jsdoc comment is incomplete, there is no type information for the return value
				functionReturnValue = dom.type.any;
			}
		} else {
			functionReturnValue =  dom.type.void;
		}

		let domFunction: dom.FunctionDeclaration;
		if (jsdocItem.params && jsdocItem.params.length > 0) {
			domFunction = dom.create.function(jsdocItem.name, this.createDomParams(jsdocItem.params), functionReturnValue);
		} else {
			// no params => create a single function declaration
			domFunction = dom.create.function(jsdocItem.name, [], functionReturnValue);
		}

		domFunction.jsDocComment = this.cleanJSDocComment(jsdocItem.comment);
		this.resultItems[jsdocItem.longname].push(domFunction);
	}

	private parseMember(jsdocItem: IMemberDoclet) {
		if (jsdocItem.isEnum) {
			throw new Error(`item ${jsdocItem.longname} is an enum`);
		}

		if (jsdocItem.type && jsdocItem.type.names.length > 0) {
			let domTypes: dom.Type[] = [];
			jsdocItem.type.names.forEach((typeName) => {
				domTypes.push(this.mapVariableType(typeName));
			});

			let propertyDeclaration: dom.PropertyDeclaration = dom.create.property(jsdocItem.name, dom.create.union(domTypes));
			propertyDeclaration.jsDocComment = this.cleanJSDocComment(jsdocItem.description);
			this.resultItems[jsdocItem.longname].push(propertyDeclaration);
		} else {
			let propertyDeclaration: dom.PropertyDeclaration = dom.create.property(jsdocItem.name, dom.type.any);
			propertyDeclaration.jsDocComment = this.cleanJSDocComment(jsdocItem.description);
			this.resultItems[jsdocItem.longname].push(propertyDeclaration);
		}
	}

	private parseNamespace(jsdocItem: INamespaceDoclet) {
		let domNamespace = dom.create.namespace(jsdocItem.name);
		domNamespace.jsDocComment = this.cleanJSDocComment(jsdocItem.comment).replace(/@namespace[^\r\n]+\r?\n/, "");
		this.resultItems[jsdocItem.longname].push(domNamespace);
	}

	private parseTypeDefinition(jsdocItem: ITypedefDoclet) {
		let domInterface: dom.InterfaceDeclaration = dom.create.interface(jsdocItem.name);
		domInterface.jsDocComment = this.cleanJSDocComment(jsdocItem.comment);

		if (jsdocItem.properties) {
			for (let property of jsdocItem.properties) {
				if (property.type) {
					for (let propertyType of property.type.names) {
						let domProperty = dom.create.property(property.name, this.mapVariableType(propertyType));
						domProperty.jsDocComment = this.cleanJSDocComment(property.description);

						if (property.optional) {
							domProperty.flags = dom.DeclarationFlags.Optional;
						}

						domInterface.members.push(domProperty);
					}
				}
			}
		}

		this.resultItems[jsdocItem.longname].push(domInterface);
	}

	public prepareResults(): { [key: string]: dom.TopLevelDeclaration } {
		let domTopLevelDeclarations: { [key: string]: dom.TopLevelDeclaration } = {};

		for (let jsdocItem of this.jsdocItems) {
			// is this item a member of any other item?
			if (jsdocItem.memberof) {
				// we have to find the parent item
				let parentItem: dom.TopLevelDeclaration = {} as dom.TopLevelDeclaration;

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
										let functionDeclaration: any = classMember as any;
										classMember = {
											kind: "method",
											name: functionDeclaration.name,
											parameters: functionDeclaration.parameters,
											returnType: functionDeclaration.returnType,
											typeParameters: functionDeclaration.typeParameters
										};

										classMember.jsDocComment = functionDeclaration.jsDocComment;
										break;
								}

								(parentItem as dom.ClassDeclaration).members.push(classMember);
								break;

							case "enum":
								// enum members can already exist	
								let foundItem = parentItem.members.filter((member) => {
									return member.name === (parsedItem as dom.EnumMemberDeclaration).name;
								}).length > 0;

								if (!foundItem) {
									parentItem.members.push(parsedItem as dom.EnumMemberDeclaration);
								}
								break;

							default:
								// missing the top level declaration
								console.warn(`Can't add member '${jsdocItem.longname}' to parent item '${(parentItem as any).longname}'. Unsupported parent member type: '${parentItem.kind}'. Insert this item as a top level declaration`);

								if (!domTopLevelDeclarations[jsdocItem.longname]) {
									domTopLevelDeclarations[jsdocItem.longname] = parsedItem as dom.TopLevelDeclaration;
								}
								break;
						}
					}
				} else {
					// missing the top level declaration
					console.warn("Missing top level declaration '" + jsdocItem.memberof + "' for member '" + jsdocItem.longname + "'. Insert this member as a top level declaration.");

					for (let parsedItem of this.resultItems[jsdocItem.longname]) {
						if (!domTopLevelDeclarations[jsdocItem.longname]) {
							domTopLevelDeclarations[jsdocItem.longname] = parsedItem as dom.TopLevelDeclaration;
						}
					}
				}
			} else {
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
}
