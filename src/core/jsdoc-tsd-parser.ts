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
		this.jsdocItems = jsdocItems;

		jsdocItems.forEach((item) => {
			this.resultItems[item.longname] = [];

			switch (item.kind) {
				case "function":
					this.parseFunction(item as IFunctionDoclet);
					break;

				case "namespace":
					this.parseNamespace(item as INamespaceDoclet);
					break;

				default:
					console.warn(`Unsupported jsdoc item kind: ${item.kind}`);
					break;
			}
		});
	}

	public resolveResults(): string {
		let output = "";

		let results = this.prepareResults();
		Object.keys(results).forEach((key) => {
			output += dom.emit(results[key]);
		});

		return output;
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

	private mapVariableType(variableType: string) {
		let matches = variableType.match(/(?:Array\.<([^>]+)>)|(?:([^\[]*)\[\])/i);

		if (matches) {
			let type = matches[1] || matches[2];

			if (type === "*" || type === "") {
				// wrong type definition
				return dom.type.any;
			} else {
				return dom.type.array(type as dom.Type);
			}
		} else {
			if (variableType.match(/array/i) || variableType === "*") {
				return dom.type.any;
			} else {
				return variableType as dom.Type;
			}
		}
	}

	private parseFunction(jsdocItem: IFunctionDoclet) {
		let functionReturnValues: dom.Type[] = [];

		if (jsdocItem.returns && jsdocItem.returns.length > 0) {
			if (jsdocItem.returns[0].type) {
				jsdocItem.returns[0].type.names.forEach((returnType) => {
					functionReturnValues.push(this.mapVariableType(returnType));
				});
			} else {
				// the jsdoc comment is incomplete, there is no type information for the return value
				functionReturnValues.push(dom.type.any);
			}
		} else {
			functionReturnValues.push(dom.type.void);
		}

		if (jsdocItem.params && jsdocItem.params.length > 0) {
			let jsdocItemParams: IDocletProp[] = jsdocItem.params || [];

			// if a parameter has different types we have create multiple function declarations
			let paramsWithMultipleTypes = jsdocItem.params.filter((param) => {
				return param.type.names.length > 1;
			});

			if (paramsWithMultipleTypes.length > 0) {
				// the function has parameters with multiple types
				for (let param of paramsWithMultipleTypes) {
					param.type.names.forEach((paramType, index) => {
						let functionParams: dom.Parameter[] = [];

						jsdocItemParams.forEach((singleTypeParam) => {
							let domParam: dom.Parameter = {} as dom.Parameter;

							if (singleTypeParam.name === param.name) {
								domParam = dom.create.parameter(param.name, this.mapVariableType(paramType));
							} else {
								domParam = dom.create.parameter(singleTypeParam.name, this.mapVariableType(singleTypeParam.type.names[0]));
							}

							functionParams.push(domParam);
						});

						for (let returnType of functionReturnValues) {
							let domFunction = dom.create.function(jsdocItem.name, functionParams, returnType);
							domFunction.jsDocComment = this.cleanJSDocComment(jsdocItem.comment);
							this.resultItems[jsdocItem.longname].push(domFunction);
						}
					}, this);
				}
			} else {
				let params: dom.Parameter[] = [];

				jsdocItem.params.forEach((param) => {
					// We know that the parameter can only have on type
					params.push(dom.create.parameter(param.name, this.mapVariableType(param.type.names[0])));
				});

				for (let returnType of functionReturnValues) {
					let domFunction = dom.create.function(jsdocItem.name, params, returnType);
					domFunction.jsDocComment = this.cleanJSDocComment(jsdocItem.comment);
					this.resultItems[jsdocItem.longname].push(domFunction);
				}
			}
		} else {
			// no params => create a single function declaration
			for (let returnType of functionReturnValues) {
				let domFunction = dom.create.function(jsdocItem.name, [], returnType);
				domFunction.jsDocComment = this.cleanJSDocComment(jsdocItem.comment);
				this.resultItems[jsdocItem.longname].push(domFunction);
			}
		}
	}

	private parseNamespace(jsdocItem: INamespaceDoclet) {
		let domNamespace = dom.create.namespace(jsdocItem.name);
		domNamespace.jsDocComment = this.cleanJSDocComment(jsdocItem.comment).replace(/@namespace[^\r\n]+\r?\n/, "");
		this.resultItems[jsdocItem.longname].push(domNamespace);
	}

	private prepareResults(): { [key: string]: dom.TopLevelDeclaration } {
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
						// TODO: For now it works only with namespaces, we have to switch the types
						if (parentItem.kind === "namespace") {
							(parentItem as dom.NamespaceDeclaration).members.push(parsedItem as dom.NamespaceMember);
						} else {
							// missing the top level declaration
							console.warn("Missing top level declaration '" + jsdocItem.memberof + "' for member '" + jsdocItem.longname + "'. Insert this member as a top level declaration.");

							if (!domTopLevelDeclarations[jsdocItem.longname]) {
								domTopLevelDeclarations[jsdocItem.longname] = parsedItem as dom.TopLevelDeclaration;
							}
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
