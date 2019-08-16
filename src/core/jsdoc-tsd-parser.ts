import * as dom from "dts-dom";
import { ParameterFlags } from "dts-dom";
import { writeFileSync } from "fs";
import { Configuration } from "./Configuration";

/* tslint:disable:no-var-requires */
// These modules only exports a function, so require is necessary here
const jsdocCommentParser = require("comment-parser");
/* tslint:enable:no-var-requires */

export interface IParsedJSDocItem {
	longname: string;
	memberof?: string;
	parsed: dom.DeclarationBase;
}

export class JSDocTsdParser {

	/**
	 * Maps the access flags from JSDoc to declaration flags of dts-dom
	 */
	private accessFlagMap: { [key: string]: dom.DeclarationFlags } = {
		private: dom.DeclarationFlags.Private,
		protected: dom.DeclarationFlags.Protected,
		public: dom.DeclarationFlags.None,
	};

	/**
	 * Configuration of of this template.
	 */
	private config: Configuration;

	/**
	 * JSDoc items which were parsed from the passed in taffy db
	 */
	private jsdocItems: TDoclet[];

	/**
	 * Tranformed JSDoc items (to declaration bases) which can
	 * be passed in to dts-dom for output the d.ts-file.
	 *
	 * The membership is not resolved. JSDoc allows a lot of bullshit.
	 * E. g. items with same name of different types can be added. This
	 * is not valid in typescript, but we will simply ignore this to enforce
	 * the user of this module to correct their JSDoc comments. For that reason
	 * we store all items with same longname (Pattern: <membership>.<name>) in
	 * an array. Once all items are parsed, we can resolve the memberships
	 * (@see resolveMembership).
	 */
	private parsedItems: Map<string, IParsedJSDocItem[]>;

	constructor(config?: Configuration) {
		this.parsedItems = new Map();
		this.jsdocItems = [];
		this.config = config || new Configuration();
	}

	/**
	 * Creates the type definition file as string
	 * @param targetPath If passed, the output will be written to the passed file path
	 */
	public generateTypeDefinition(targetPath?: string): string {
		let output = "";

		const results = this.resolveMembership();
		for (const [longname, item] of results.entries()) {
			try {
				output += dom.emit(item);
			} catch (err) {
				this.log(`Unexpected error. Please report this error on github!\nCan't emit item ${longname}: ${err}\n\n${JSON.stringify(item, null, "\t")}`, console.error);
				const jsdocItems = this.jsdocItems.filter((elem) => {
					return (elem.hasOwnProperty("name") && elem.name.endsWith(longname)) || (elem.hasOwnProperty("longname") && elem.longname === longname);
				});
				this.log(`JSDoc items: \n${JSON.stringify(jsdocItems, null, "\t")}`);
			}
		}

		if (targetPath) {
			writeFileSync(targetPath, output);
		}

		return output;
	}

	/**
	 * Returns the parsed Declaration Base of an jsdoc item
	 * @param name The longname of the jsdoc item (name including membership, e.g. "myNamespace.myMember")
	 * @throws {Error} When no item with this name was parsed
	 */
	public getParsedItem(name: string): dom.DeclarationBase[] {
		const item = this.parsedItems.get(name);
		if (item) {
			return item.map((i) => i.parsed);
		} else {
			throw new Error(`Item with name '${name}' not found in result items`);
		}
	}

	/**
	 * Returns all parsed Declaration Bases
	 */
	public getParsedItems(): Map<string, dom.DeclarationBase[]> {
		const entries = [...this.parsedItems.entries()];
		const newEntries = entries.map((entry) => {
			return [entry[0], entry[1].map((i) => i.parsed)];
		});

		// @ts-ignore
		return new Map(newEntries);
	}

	public parse(jsdocItems: TDoclet[]) {
		this.jsdocItems = [];

		for (const item of jsdocItems) {
			if (this.evaluateSinceTag(item.since) && !item.ignore && !this.config.ignoreScope(item.scope) && (!item.comment || !(item.comment.match("@type ") && item.scope === "inner"))) {
				const parsedItems: IParsedJSDocItem[] = this.parsedItems.get(item.longname) || [];
				if (parsedItems.length === 0) {
					this.jsdocItems.push(item);
				}

				const parsedItem: dom.DeclarationBase | null = this.parseJSDocItem(item);
				if (parsedItem) {
					if (item.kind !== "class") {
						parsedItem.jsDocComment = this.cleanJSDocComment(item.comment);
					}

					this.handleFlags(item, parsedItem);
					this.handleTags(item, parsedItem);
					parsedItems.push({
						longname: item.longname,
						memberof: item.memberof,
						parsed: parsedItem,
					});
					this.parsedItems.set(item.longname, parsedItems);
				}
			}
		}
	}

	/**
	 * Resolves the membership of all parsed items. For example a namspace member will be
	 * added to the member-property of the parsed namespace, if the namespace was parsed.
	 * Otherwise the member will be added to the top level declaration.
	 * @returns Map with the top level declarations and resolved memberships. The key is the
	 *          long name of the item, the value is the @see {dom.TopLevelDeclaration}
	 */
	public resolveMembership(): Map<string, dom.TopLevelDeclaration> {
		const domTopLevelDeclarations: Map<string, dom.TopLevelDeclaration> = new Map();
		for (const parsedItems of this.parsedItems.values()) {
			for (const parsedItem of parsedItems) {
				if (parsedItem.memberof) {
					// @todo Do not pass the domTopLevelDeclarations but the parsedItems map.
					//       Maybe the parent item was not processed yet, then it will not be
					//       found
					const parentItem = this.findParentItem(parsedItem.memberof, domTopLevelDeclarations);

					if (parentItem) {
						// add the items we parsed before as a member of the top level declaration
						const dtsItem = parsedItem.parsed;
						switch (parentItem.kind) {
							case "namespace":
								this.resolveNamespaceMembership(dtsItem as dom.NamespaceMember, parentItem);
								break;

							case "class":
								this.resolveClassMembership(dtsItem as dom.ClassMember, parentItem);
								break;

							case "enum":
								this.resolveEnumMembership(dtsItem as dom.EnumMemberDeclaration, parentItem);
								break;

							case "interface":
								this.resolveInterfaceMembership(dtsItem as dom.ObjectTypeMember, parentItem);
								break;

							case "module":
								this.resolveModuleMembership(dtsItem as dom.ModuleMember, parentItem);
								break;

							default:
								// parent type not supported
								this.log(`Can't add member '${parsedItem.longname}' to parent item '${(parentItem as any).name}'. Unsupported parent member type: '${parentItem.kind}'.`, this.log);
								break;
						}
					} else {
						this.log("Missing top level declaration '" + parsedItem.memberof + "' for member '" + parsedItem.longname + "'.", console.warn);
					}
				} else {
					// member has no parent, add the item as top-level declaration
					if (!domTopLevelDeclarations.has(parsedItem.longname)) {
						domTopLevelDeclarations.set(
							parsedItem.longname,
							parsedItem.parsed as dom.TopLevelDeclaration,
						);
					}
				}
			}
		}

		return domTopLevelDeclarations;
	}

	/**
	 * Creates the comment for the jsdoc item
	 * @param comment The complete comment text of the item
	 * @param addExample Indicates if examples should be omitted or not
	 */
	private cleanJSDocComment(comment: string | undefined, addExample = false): string {
		const tagsToPass = new Map([
			["author", true],
			["copyright", true],
			["deprecated", true],
			["example", addExample],
			["returns", true],
			["see", true],
			["throws", true],
			["todo", true],
			["param", true],
			["tutorial", true],
			["variation", true],
			["version", true],
			["license", true],
		]);

		let cleanedComment = "";
		const parsedComments = jsdocCommentParser(comment);
		if (parsedComments.length > 0) { // This should be maximum 1 element (except you pass more than one jsdoc comment, which is here never the case)
			const parsedComment = parsedComments[0];

			// First, add the description
			// The comment parser removes the " * " by line breaks, so we have to add these again
			let itemDescription = "";
			if (parsedComment.description.length > 0) {
				itemDescription = parsedComment.description;
			}

			// Then add all tags as we receive them
			for (const annotation of parsedComment.tags) {
				if (tagsToPass.has(annotation.tag) && tagsToPass.get(annotation.tag)) {
					cleanedComment += "\n@" + annotation.tag;

					const tagValue = (annotation.name + " " + annotation.description).trim();
					if (tagValue.length > 0) {
						// The comment parser removes the " * " by line breaks, so we have to add these again
						// The format everything well, we insert as much spaces as the annotation name + 2, because
						// of the "@" char and a white space
						let spacesToInsert = annotation.tag.length + 2;
						if (annotation.name === "param") {
							spacesToInsert += annotation.name.length;
						}

						cleanedComment += " " + tagValue.replace(/\r?\n/g, "\n" + " ".repeat(spacesToInsert));
					}
				} else if (annotation.tag === "description") {
					itemDescription = annotation.name + " " + annotation.description;
				}
			}

			if (itemDescription.length > 0) {
				cleanedComment = itemDescription.replace(/\r?\n/g, "\n") + cleanedComment;
			}
		}

		return cleanedComment;
	}

	/**
	 * Creates parameters for functions, constructors etc.
	 * @todo This function needs to be refactored.
	 * @param params
	 * @param functionName
	 */
	private createDomParams(params: IDocletProp[], functionName?: string): dom.Parameter[] {
		const domParams: dom.Parameter[] = [];
		let typeDef: ITypedefDoclet | undefined;
		let propParam: IDocletProp | undefined;

		for (let i = 0; i < params.length; i++) {
			const param = params[i];
			const paramIsProperty = (param.name.indexOf(".") > 0);
			const nextParamIsProperty = (i + 1 < params.length) && (params[i + 1].name.indexOf(".") > 0);
			const lastParam = (i + 1 === params.length);
			let domParam: dom.Parameter | undefined;

			// check the type of the parameter
			if (!paramIsProperty && nextParamIsProperty) {
				// the parameter is a parameter with properties

				// remember the parameter
				propParam = param;

				// create a new typedef
				typeDef = {
					kind: "typedef",
					longname: functionName + "_" + param.name,
					meta: param.meta,
					name: functionName + "_" + param.name,
					properties: [],
					scope: "",
					type: param.type,
				};
				this.jsdocItems.push(typeDef);

			} else if (paramIsProperty) {
				// the parameter is a property

				if (!typeDef || !typeDef.properties) {
					throw new Error(`Parent of property ${param.name} is missing or incorrect`);
				}

				// add the property to the typedef
				const prop: IDocletProp = {
					comment: param.comment,
					description: param.description,
					name: param.name.substr(param.name.indexOf(".") + 1),
					type: param.type,
				};
				typeDef.properties.push(prop);

				if (lastParam || !nextParamIsProperty) {
					// the parameter is the last property

					if (!propParam) {
						throw new Error(`Parent of property ${param.name} is missing or incorrect`);
					}

					// create an interface from the typedef
					const domInterface: dom.InterfaceDeclaration = this.parseTypeDefinition(typeDef) as dom.InterfaceDeclaration;
					this.parsedItems.set(typeDef.longname, [{
						longname: typeDef.longname,
						memberof: typeDef.memberof,
						parsed: domInterface,
					}]);

					// create the parameter with the interface as type
					let interfaceType;
					const matchArray = typeDef.type.names[0].match(/(?:Array\.<([^>]+)>)|(?:([^\[]*)\[\])/i);
					if (matchArray) {
						interfaceType = dom.create.array(domInterface);
					} else {
						interfaceType = dom.create.typeParameter(typeDef.name, domInterface);
					}

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

	/**
	 * Uses the configured version comparator to check if the passed since tag is in range of the
	 * configured latest since tag.
	 * @param sinceTag
	 */
	private evaluateSinceTag(sinceTag: string | undefined) {
		if (typeof sinceTag === "string" && sinceTag !== "") {
			return this.config.compareVersions(sinceTag, this.config.latestVersion);
		} else {
			return true;
		}
	}

	/**
	 * Tries to find the parent item of the passed jsdoc item
	 * @param parentItemLongname Long name of the searched item
	 * @param domTopLevelDeclarations Source items to search in
	 */
	private findParentItem(parentItemLongname: string, domTopLevelDeclarations: Map<string, dom.TopLevelDeclaration>): dom.TopLevelDeclaration | undefined {
		// we have to find the parent item
		let parentItem: dom.TopLevelDeclaration | undefined;

		if (parentItemLongname) {
			const parentItemNames = parentItemLongname.split(".");
			parentItemNames.forEach((name, index) => {

				if (index < 1) {
					parentItem = domTopLevelDeclarations.get(name);

					if (!parentItem) {
						if (this.parsedItems.has(name)) {
							const parsedItem = (this.parsedItems.get(name) as IParsedJSDocItem[])[0];
							domTopLevelDeclarations.set(name, parsedItem.parsed as dom.TopLevelDeclaration);
							parentItem = domTopLevelDeclarations.get(name);
						}
					}
				} else if (parentItem) {
					const parentItemAsNamespace = parentItem as dom.NamespaceDeclaration;
					parentItemAsNamespace.members.some((item) => {
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

	/**
	 * Determines the return value of a function declaration
	 * @param jsdocItem
	 */
	private getFunctionReturnValue(jsdocItem: IFunctionDoclet): dom.Type {
		let functionReturnValue: dom.Type;

		if (jsdocItem.returns && jsdocItem.returns.length > 0) {
			if (jsdocItem.returns[0].type) {
				functionReturnValue = this.mapTypesToUnion(jsdocItem.returns[0].type.names);
			} else {
				// the jsdoc comment is incomplete, there is no type information for the return value
				this.log(`Invalid return type. Check the documentation of function ${jsdocItem.longname}`);
				functionReturnValue = dom.type.any;
			}
		} else {
			// If no return value was specified, the function has implicity the return type "void"
			functionReturnValue = dom.type.void;
		}

		return functionReturnValue;
	}

	/**
	 * Sets the correct export flags to the declaration base.
	 */
	private handleFlags(doclet: any, obj: dom.DeclarationBase | dom.Parameter) {
		obj.flags = dom.DeclarationFlags.None;

		obj.flags |= this.accessFlagMap[doclet.access];
		obj.flags |= doclet.optional || doclet.defaultvalue !== undefined ? dom.ParameterFlags.Optional : dom.DeclarationFlags.None;
		obj.flags |= doclet.variable ? dom.ParameterFlags.Rest : dom.DeclarationFlags.None;
		obj.flags |= doclet.virtual ? dom.DeclarationFlags.Abstract : dom.DeclarationFlags.None;
		obj.flags |= doclet.readonly ? dom.DeclarationFlags.ReadOnly : dom.DeclarationFlags.None;
		obj.flags |= doclet.scope === "static" ? dom.DeclarationFlags.Static : dom.DeclarationFlags.None;

		const cast = obj as any;
		if (doclet.optional && cast.kind === "property" && cast.flags === ParameterFlags.Optional) {
			obj.flags = dom.DeclarationFlags.Optional;
		}
	}

	/**
	 * Handler for template-functions.
	 */
	private handleTags(doclet: IDocletBase, obj: any) {
		if (doclet.tags) {
			for (const tag of doclet.tags) {
				switch (tag.title) {
					case "template":
						if (obj.typeParameters) {
							obj.typeParameters.push(
								dom.create.typeParameter(tag.value),
							);
						}
						break;
				}
			}
		}
	}

	private log(message: string, logFunc: (msg: string) => void = console.log) {
		if (!process.env.NO_CONSOLE) {
			logFunc(message);
		}
	}

	private mapTypesToUnion(types: string[]): dom.UnionType {
		const domTypes: dom.Type[] = [];
		for (const type of types) {
			domTypes.push(this.mapVariableType(type));
		}

		return dom.create.union(domTypes);
	}

	private mapVariableType(variableType: string) {
		// resolve array types
		// jsdoc will provide arrays always as "Array.<>" if it's typed or as "Array" if it's not typed
		let resultType: dom.Type = dom.type.any;
		while (/^Array/i.test(variableType)) {
			// it's an array, check if it's typed
			//                                           Array.< (bllaaa|bla)  >
			const arrayTypeMatches = variableType.match(/Array\.<(\(?[\w|~:]+\)?)>/i); // @todo: can contain namepaths
			if (arrayTypeMatches && arrayTypeMatches[1]) {
				const arrayTypeString: string = arrayTypeMatches[1];
				const arrayType = (arrayTypeString.toLowerCase() === "array") ? dom.type.array(dom.type.any) : this.mapVariableTypeString(arrayTypeString);
				resultType = (resultType === dom.type.any)
					? dom.type.array(arrayType)
					: dom.type.array(resultType); // nested array

				// remove the string from the variable type (nested arrays)
				const regExp = new RegExp(`Array.<${arrayTypeString.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&")}>`, "i");
				variableType = variableType.replace(regExp, "");
			} else {
				resultType = dom.type.array(resultType);

				// remove the array keyword
				variableType = variableType.replace(/^Array(\.<)?/i, "");
			}
		}

		if (resultType === dom.type.any) {
			// check if it's an object type (Object.<string, number>)
			const objectTypeMatches = variableType.match(/^Object\.<([^,]+),\s?([^>]+)>$/);
			if (objectTypeMatches && objectTypeMatches.length === 3) {
				resultType = `{ [key: ${objectTypeMatches[1]}]: ${objectTypeMatches[2]} }` as dom.Type;
			} else {
				resultType = this.mapVariableTypeString(variableType);
			}
		}

		return resultType;
	}

	private mapVariableTypeString(variableType: string): dom.Type {
		let resultTypeStr: string = "";
		let resultType: dom.Type | null = null;
		if (variableType === "bool") {
			resultTypeStr = "boolean";
		} else if (variableType === "function") {
			resultTypeStr = "Function";
		} else if (variableType === "*") {
			resultTypeStr = "any";
		} else {
			// check if it's a module member
			// e.g. module:<moduleName> or module:<moduleName>~<moduleMember>
			const moduleMemberMatches = variableType.match(/^module:([^~]+)~?(.*)$/);
			if (moduleMemberMatches) {
				const moduleName = moduleMemberMatches[1];
				const memberName = (moduleMemberMatches.length === 3) ? moduleMemberMatches[2] : null;
				resultTypeStr = moduleName;
				if (memberName) {
					resultTypeStr += `.${memberName}`;
				}
			}

			// check if it's a union type
			if (!resultTypeStr && !resultType && variableType.indexOf("|") > -1) {
				variableType = variableType.replace(/\(|\)/g, "");
				resultType = this.mapTypesToUnion(variableType.split("|"));
			}

			// check if it's a type parameter
			// e.g. "Promise.<*>" (JSDoc always separate the type with a dot)
			const typeParameterMatches = variableType.match(/^([^<.]+)\.<([^>]+)>$/);
			if (!resultTypeStr && !resultType && typeParameterMatches && typeParameterMatches.length === 3) {
				// it's not a pretty nice solution, but it works for now
				resultType = dom.create.typeParameter(
					`${typeParameterMatches[1]}<${this.mapVariableType(typeParameterMatches[2]).toString()}>`,
				);
			}
		}

		if (!resultType) {
			resultType = (resultTypeStr || variableType) as dom.Type;
		}

		return resultType;
	}

	private parseClass(jsdocItem: IClassDoclet, domClass?: dom.ClassDeclaration): dom.DeclarationBase {
		if (!domClass) {
			domClass = dom.create.class(jsdocItem.name);
			domClass.jsDocComment = jsdocItem.classdesc;
		}

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

	private parseConstant(jsdocItem: IMemberDoclet) {
		if (jsdocItem.isEnum) {
			throw new Error(`item ${jsdocItem.longname} is an enum`);
		}

		let propertyType: dom.Type = dom.type.any;
		if (jsdocItem.type && jsdocItem.type.names.length > 0) {
			propertyType = this.mapTypesToUnion(jsdocItem.type.names);
		}

		return dom.create.const(jsdocItem.name, propertyType);
	}

	private parseEnum(jsdocItem: IMemberDoclet): dom.DeclarationBase {
		if (!jsdocItem.isEnum) {
			throw new Error(`item ${jsdocItem.longname} is not an enum`);
		}

		const domEnum: dom.EnumDeclaration = dom.create.enum(jsdocItem.name, (jsdocItem.kind === "constant"));
		if (jsdocItem.properties) {
			for (const property of jsdocItem.properties) {
				const domEnumMember: dom.EnumMemberDeclaration = dom.create.enumValue(property.name, property.defaultvalue);
				domEnumMember.jsDocComment = this.cleanJSDocComment(property.comment);
				domEnum.members.push(domEnumMember);
			}
		}

		return domEnum;
	}

	private parseFunction(jsdocItem: IFunctionDoclet): dom.DeclarationBase {
		const functionReturnValue: dom.Type = this.getFunctionReturnValue(jsdocItem);
		let domFunction: dom.FunctionDeclaration;
		if (jsdocItem.this) {
			jsdocItem.params = jsdocItem.params || [];
			jsdocItem.params.unshift({
				comment: "",
				description: "",
				name: "this",
				type: {
					names: [jsdocItem.this],
				},
			});
		}

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

	/**
	 * Converts a JSDoc item to a declaration base which can be printed
	 * with the dts-dom module in a declaration file.
	 *
	 * The resulting item can be passed to dts-dom.emit which will then
	 * output the item in the declaration file.
	 * @param item JSDoc item from the taffy DB
	 */
	private parseJSDocItem(item: TDoclet): dom.DeclarationBase | null {
		switch (item.kind) {
			case "function":
				return this.parseFunction(item as IFunctionDoclet);

			case "constant":
				return this.parseConstant(item as IMemberDoclet);

			case "member":
				if (item.isEnum) {
					return this.parseEnum(item as IMemberDoclet);
				} else {
					return this.parseMember(item as IMemberDoclet);
				}

			case "namespace":
				return this.parseNamespace(item as INamespaceDoclet);

			case "typedef":
				return this.parseTypeDefinition(item as ITypedefDoclet);

			case "class":
				let parsedItems: IParsedJSDocItem[];
				if (this.parsedItems.has(item.longname) && (parsedItems = this.parsedItems.get(item.longname) as IParsedJSDocItem[]).length === 1) {
					// class is already created, only add the constructor to the class
					this.parseClass(item as IClassDoclet, parsedItems[0].parsed as dom.ClassDeclaration);
					return null;
				} else {
					return this.parseClass(item as IClassDoclet);
				}

			case "interface":
				return this.parseInterface(item as IClassDoclet);

			case "module":
				return this.parseModule(item as INamespaceDoclet);

			// suppress warnings for this type
			case "file":
				return null;

			default:
				if ((item as any).kind !== "package") {
					this.log(`Unsupported jsdoc item kind: ${item.kind} (item name: ${item.longname})`);
				}
				return null;
		}
	}

	private parseMember(jsdocItem: IMemberDoclet) {
		if (jsdocItem.isEnum) {
			throw new Error(`item ${jsdocItem.longname} is an enum`);
		}

		let propertyType: dom.Type = dom.type.any;
		if (jsdocItem.type && jsdocItem.type.names.length > 0) {
			propertyType = this.mapTypesToUnion(jsdocItem.type.names);
		}

		return dom.create.property(jsdocItem.name, propertyType);
	}

	private parseModule(jsdocItem: INamespaceDoclet) {
		return dom.create.module(jsdocItem.name);
	}

	private parseNamespace(jsdocItem: INamespaceDoclet): dom.DeclarationBase {
		return dom.create.namespace(jsdocItem.name);
	}

	private parseTypeAliasDefinition(jsdocItem: ITypedefDoclet): dom.TypeAliasDeclaration {
		// get the type of our type definition
		let type: dom.Type;
		if (jsdocItem.params) {
			// the type definition is a function type, so we have to create a function type
			// with the dts-dom module
			type = dom.create.functionType(
				this.createDomParams(jsdocItem.params, jsdocItem.name),
				this.getFunctionReturnValue(jsdocItem as any),
			);
		} else {
			type = this.mapVariableType(jsdocItem.type.names[0]);
		}

		return dom.create.alias(
			jsdocItem.name,
			type,
		);
	}

	private parseTypeDefinition(jsdocItem: ITypedefDoclet): dom.DeclarationBase | null {
		let result: dom.DeclarationBase | null = null;
		if (jsdocItem.type && jsdocItem.type && jsdocItem.type.names.length > 0) {
			const typedefType = jsdocItem.type.names[0].toLowerCase();
			if (typedefType === "function") {
				result = this.parseTypeDefinitionAsFunction(jsdocItem);
			} else if (typedefType === "object") {
				result = this.parseTypeDefinitionAsObject(jsdocItem);
			} else {
				result = this.parseTypeDefinitionAsType(jsdocItem);
			}
		} else {
			// No type specified (@typedef <Name> instead of @typedef {<type>} <Name>)
			// We assume that it's of type object
			result = this.parseTypeDefinitionAsObject(jsdocItem);
		}

		return result;
	}

	private parseTypeDefinitionAsFunction(jsdocItem: ITypedefDoclet): dom.TypeAliasDeclaration {
		// if the jsdoc item has a property "type", we can be sure that it isn't a typedef
		// which should be mapped to an interface. Instead we create a typeAlias-Declaration
		return this.parseTypeAliasDefinition(jsdocItem);
	}

	private parseTypeDefinitionAsObject(jsdocItem: ITypedefDoclet): dom.InterfaceDeclaration {
		const domInterface: dom.InterfaceDeclaration = dom.create.interface(jsdocItem.name);

		if (jsdocItem.properties) {
			for (const property of jsdocItem.properties) {
				let propertyType: dom.Type = dom.type.any;
				if (property.type) {
					propertyType = this.mapTypesToUnion(property.type.names);
				}

				const domProperty = dom.create.property(property.name, propertyType);
				domProperty.jsDocComment = property.description;
				this.handleFlags(property, domProperty);

				domInterface.members.push(domProperty);
			}
		}

		return domInterface;
	}

	private parseTypeDefinitionAsType(jsdocItem: ITypedefDoclet): dom.TypeAliasDeclaration | null {
		let result = null;
		if (jsdocItem.properties) {
			this.log(`Invalid typedef. Typedef type is '${jsdocItem.type.names[0]}' and properties are defined.
			Properties are only allowed for type definitions of type 'object': ${JSON.stringify(jsdocItem)}`);
		} else {
			result = dom.create.alias(jsdocItem.name, jsdocItem.type.names.join("|") as dom.Type);
		}

		return result;
	}

	/**
	 * Adds the class item to the class
	 * @param classMember The parsed class member item
	 * @param parsedClass The parsed class item
	 */
	private resolveClassMembership(classMember: dom.ClassMember, parsedClass: dom.ClassDeclaration) {
		let classMemberToAdd: dom.ClassMember | null = null;
		const kind = classMember.kind;
		switch (kind) {
			// @ts-ignore
			case "function":
				// Classes can only contain method declarations
				const classMemberFunction = (classMember as unknown) as dom.FunctionDeclaration;
				classMemberToAdd = this.transformFunctionDeclarationToMethod(classMemberFunction);
				break;

			case "index-signature":
			case "constructor":
			case "property":
			case "method":
				classMemberToAdd = classMember;
				break;

			default:
				this.log(`Can't add member '${(classMember as any).name}' to parent item '${(parsedClass as any).name}'. Unsupported member type: '${kind}'`);
				break;
		}

		if (classMemberToAdd) {
			parsedClass.members.push(classMemberToAdd);
		}
	}

	/**
	 * Adds the enum item to the parent enum
	 * @param enumMember The parsed enum member item
	 * @param parsedEnum The parsed enum item
	 */
	private resolveEnumMembership(enumMember: dom.EnumMemberDeclaration, parsedEnum: dom.EnumDeclaration) {
		// enum members can already exists
		const enumMemberExists = parsedEnum.members.some((member) => {
			return member.name === enumMember.name;
		});

		if (!enumMemberExists) {
			parsedEnum.members.push(enumMember);
		}
	}

	/**
	 * Adds the interface member to it's parent interface
	 * @param interfaceMember The parsed interface member
	 * @param parsedInterface The parsed interface
	 */
	private resolveInterfaceMembership(interfaceMember: dom.ObjectTypeMember, parsedInterface: dom.InterfaceDeclaration) {
		let interfaceMemberToAdd: dom.ObjectTypeMember | null = null;
		switch (interfaceMember.kind) {
			// @ts-ignore
			case "function":
				// Interfaces can only have method declarations as members
				interfaceMemberToAdd = this.transformFunctionDeclarationToMethod(interfaceMember);
				break;

			case "property":
				interfaceMemberToAdd = interfaceMember;
				break;

			default:
				this.log(`Can't add member '${(interfaceMember as any).name}' to parent item '${(parsedInterface as any).name}'. Unsupported member type: '${interfaceMember.kind}'`);
				break;
		}

		if (interfaceMemberToAdd) {
			parsedInterface.members.push(interfaceMember);
		}
	}

	/**
	 * Adds the member item to it's parent module
	 * @param moduleMember The parsed module member item
	 * @param parsedModule The parsed module item
	 */
	private resolveModuleMembership(moduleMember: dom.ModuleMember, parsedModule: dom.ModuleDeclaration) {
		let moduleMemberToAdd: dom.ModuleMember | null = null;
		switch (moduleMember.kind) {
			// @ts-ignore
			case "property":
				this.resolveModuleMembership(
					this.transformPropertyDeclarationToVariable(moduleMember),
					parsedModule,
				);
				break;

			case "function":
			case "alias":
			case "interface":
			case "class":
			case "namespace":
			case "const":
			case "var":
				moduleMemberToAdd = moduleMember;
				break;

			default:
				this.log(`Can't add member '${(moduleMember as any).name}' to parent item '${(parsedModule as any).name}'. Unsupported member type: '${moduleMember.kind}'`);
				break;
		}

		if (moduleMemberToAdd) {
			if (parsedModule.flags && ((parsedModule.flags & dom.DeclarationFlags.Export) || (parsedModule.flags & dom.DeclarationFlags.Static))) {
				moduleMemberToAdd.flags = dom.DeclarationFlags.Export;
			}

			parsedModule.members.push(moduleMemberToAdd);
		}
	}

	/**
	 * Adds the namespace member item to it's parent namespace
	 * @param namespaceMember The parsed namespace member
	 * @param parsedNamespace The parsed namespace item
	 */
	private resolveNamespaceMembership(namespaceMember: dom.NamespaceMember, parsedNamespace: dom.NamespaceDeclaration) {
		let namespaceMemberToAdd: dom.NamespaceMember | null = null;
		switch (namespaceMember.kind) {
			// @ts-ignore
			case "property":
				namespaceMemberToAdd = this.transformPropertyDeclarationToVariable(namespaceMember);
				break;

			case "function":
				// if (!dtsItem.flags || 0 === (dtsItem.flags & dom.DeclarationFlags.Private)) {
				// 	namespaceMember.flags = dom.DeclarationFlags.Export;
				// }
				namespaceMemberToAdd = namespaceMember;
				break;

			// @ts-ignore
			case "enum":
			case "interface":
			case "class":
			case "namespace":
			case "var":
			case "alias":
			case "const":
				namespaceMemberToAdd = namespaceMember;
				break;

			default:
				this.log(`Can't add member '${(namespaceMember as any).name}' to parent item '${parsedNamespace.name}'. Unsupported member type: '${(namespaceMember as any).kind}'`);
				break;
		}

		if (namespaceMemberToAdd) {
			if (namespaceMember.flags && ((namespaceMember.flags & dom.DeclarationFlags.Export) || (namespaceMember.flags & dom.DeclarationFlags.Static))) {
				namespaceMember.flags = dom.DeclarationFlags.Export;
			}

			parsedNamespace.members.push(namespaceMemberToAdd);
		}
	}

	/**
	 * Transforms a method declaration to a function declaration.
	 * @param functionDeclaration
	 */
	private transformFunctionDeclarationToMethod(functionDeclaration: dom.FunctionDeclaration): dom.MethodDeclaration {
		const methodDeclaration = dom.create.method(
			functionDeclaration.name,
			functionDeclaration.parameters,
			functionDeclaration.returnType,
			functionDeclaration.flags,
		);

		methodDeclaration.typeParameters = functionDeclaration.typeParameters;
		methodDeclaration.comment = functionDeclaration.comment;
		methodDeclaration.jsDocComment = functionDeclaration.jsDocComment;
		return methodDeclaration;
	}

	/**
	 * Transforms a property declaration to a variable declaration.
	 * @param propertyDeclaration
	 */
	private transformPropertyDeclarationToVariable(propertyDeclaration: dom.PropertyDeclaration): dom.VariableDeclaration {
		const variableDeclaration = dom.create.variable(
			propertyDeclaration.name,
			propertyDeclaration.type,
		);

		variableDeclaration.comment = propertyDeclaration.comment;
		variableDeclaration.flags = propertyDeclaration.flags;
		variableDeclaration.jsDocComment = propertyDeclaration.jsDocComment;
		return variableDeclaration;
	}
}
