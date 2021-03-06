import store from "./store";
import { addGlobalCSS } from "./litecss";
declare type DefineComp = (c: {
    useState: (key: any) => [Function, Function];
    onAttached: Function;
    beforeFirstRender: Function;
    onRender: Function;
    beforeRender: Function;
    onRemove: Function;
    useGlobal: (key: string) => [Function, Function];
    html: Function;
    query: Function;
    queryAll: Function;
    attributes: any;
    css: Function;
    rawCss: Function;
    cx: Function;
    nc: Function;
    props: any;
    self: any;
}) => () => [string[], ...any[]];
declare function createComp(name: string, defineComp: DefineComp, main?: boolean): void | {
    name: string;
    type: string;
    getUniqTag(inc?: number): string;
    register(clazz: any, name: string): any;
    define(): any;
};
export { createComp, store, addGlobalCSS };
