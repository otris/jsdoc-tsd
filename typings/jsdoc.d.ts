/// <reference path='dts-jsdoc.d.ts' />
/// <reference path='taffydb.d.ts' />

declare type TDocletDb = ITaffyInstance<TDoclet>;

declare module 'jsdoc/env' {
    interface ITemplates {
        jsdoc2tsd: ITemplateConfig;
    }

    interface IConf {
        templates: ITemplates;
    }

    export const conf: IConf;
}

declare module 'jsdoc/util/templateHelper' {
    export function find(data: TDocletDb, query: any): (TDoclet | IPackageDoclet)[];
    /**
     * Remove members that will not be included in the output, including:
     * + Undocumented members.
     * + Members tagged `@ignore`.
     * + Members of anonymous classes.
     * + Members tagged `@private`, unless the `private` option is enabled.
     * + Members tagged with anything other than specified by the `access` options.
     *
     * @param data The TaffyDB database to prune.
     * @returns The pruned database.
     */
    export function prune(data: TDocletDb): TDocletDb;
}


/**
 * Doclet Base and util types
 */
declare interface IDocletType {
    names: string[];
}

declare interface IDocletProp {
    type: IDocletType;
    name: string;
    description: string;
    comment: string;
    defaultvalue?: string;
    meta?: any;
    optional?: boolean;
    variable?: boolean;
}

declare interface IDocletReturn {
    type: IDocletType;
    description: string;
}

declare interface IDocletCode {
    id: string;
    name: string;
    type: string;
    value?: string;
    paramnames?: string[];
}

declare interface IDocletMeta {
    range: number[];
    filename: string;
    lineno: number;
    path: string;
    code: IDocletCode;
}

declare interface IDocletTag {
    originalTitle: string;
    title: string;
    text: string;
    value: string;
}

declare interface IDocletBase {
    meta: IDocletMeta;
    name: string;
    scope: string;
    longname: string;
    tags?: IDocletTag[];
    memberof?: string;
    see?: string;
    access?: ('public' | 'private' | 'protected');
    examples?: string;
    deprecated?: string;
    defaultvalue?: string;
    comment?: string;
    description?: string;
    ignore?: boolean;
    undocumented?: boolean;
    properties?: IDocletProp[];
    inherited?: boolean;
    since?: string;
}

/**
 * Specific doclet types
 */
declare interface IClassDoclet extends IDocletBase {
    kind: 'class' | 'interface' | 'mixin';
    params?: IDocletProp[];
    augments?: string[];
    implements?: string[];
    mixes?: string[];
    virtual?: boolean;
    classdesc?: string;
    hideconstructor?: boolean;
}

declare interface IFileDoclet extends IDocletBase {
    kind: 'file';
}

declare interface IFunctionDoclet extends IDocletBase {
    kind: 'function';
    params?: IDocletProp[];
    returns?: IDocletReturn[];
    override?: boolean;
    virtual?: string[];
    this: string;
}

declare interface IMemberDoclet extends IDocletBase {
    kind: 'member' | 'constant';
    readonly: boolean;
    isEnum: boolean;
    type: IDocletType;
}

declare interface INamespaceDoclet extends IDocletBase {
    kind: 'namespace' | 'module';
}

declare interface ITypedefDoclet extends IDocletBase {
    kind: 'typedef';
    type: IDocletType;

    // function typedef
    params?: IDocletProp[];
    returns?: IDocletReturn[];
}

declare interface IPackageDoclet {
    kind: 'package';
    longname: string;
    files: string[];
    name?: string;
}

declare type TDoclet = (
    IClassDoclet
    | IFileDoclet
    | IFunctionDoclet
    | IMemberDoclet
    | INamespaceDoclet
    | ITypedefDoclet
);
