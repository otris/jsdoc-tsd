import * as dom from "dts-dom";

export class JSDocTsdParser {

	private resultItems: {
		[key: string]: dom.DeclarationBase;
	};

	constructor() {
		this.resultItems = {};
	}

	public getResultItems() {
		return this.resultItems;
	}

	public parse(jsdocItems: TDoclet[]) {

		jsdocItems.forEach((item) => {
			switch (item.kind) {
				case "namespace":
					this.parseNamespace(item as INamespaceDoclet);
					break;

				default:
					throw new Error(`Unsupported jsdoc item kind: ${item.kind}`);
			}
		});
	}

	private parseNamespace(jsdocItem: INamespaceDoclet) {
		this.resultItems[jsdocItem.longname] = dom.create.namespace(jsdocItem.name);
	}
}
