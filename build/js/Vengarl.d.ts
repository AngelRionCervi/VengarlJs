declare module 'vengarl/src/definer' {
  const _default: (name: string, constructor: Function) => {
      name: string;
      type: string;
      getUniqTag(inc?: number): string;
      register(clazz: any, name: string): any;
      define(): any;
  };
  export default _default;

}
declare module 'vengarl/src/fetch' {
  const _default: (url: string, options?: any, autoExec?: boolean) => {
      req: Promise<unknown>;
      isLoading: () => boolean;
      getResponse: () => any;
      getError: () => any;
  } | ((...args: any) => any)[];
  export default _default;

}
declare module 'vengarl/src/litHtmlWrapper' {
  const _default: (html: any) => (strings: TemplateStringsArray, ...values: string[]) => any;
  export default _default;

}
declare module 'vengarl/src/litecss' {
  export default class {
      shadowContainer: any;
      styleQueue: string[];
      generatedClasses: Map<string, string>;
      injectedStyle: string;
      namespaces: Map<string, string>;
      constructor(shadowContainer: any);
      private __createNewClass;
      parser(strings: TemplateStringsArray, ...inputs: string[]): string;
      cx(...args: any[]): string;
      injectRawCSS(strings: TemplateStringsArray, ...inputs: string[]): void;
      addCSS(): void;
      execQueue(): void;
      namespaceCSS(namespace: string, newClassName: string): string;
  }
  export function addGlobalCSS(strings: TemplateStringsArray, ...inputs: string[]): void;

}
declare module 'vengarl/src/main' {
  import store from "vengarl/src/store";
  import { addGlobalCSS } from "vengarl/src/litecss";
  type DefineComp = (c: {
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
      fetcher: Function;
      attributes: any;
      css: Function;
      rawCss: Function;
      cx: Function;
      nc: Function;
      props: any;
      self: any;
  }) => () => [string[], ...any[]];
  function createComp(name: string, defineComp: DefineComp, main?: boolean): void | {
      name: string;
      type: string;
      getUniqTag(inc?: number): string;
      register(clazz: any, name: string): any;
      define(): any;
  };
  export { createComp, store, addGlobalCSS };

}
declare module 'vengarl/src/store' {
  const _default: {
      __add(symbol: symbol, foreignContext: any): object;
      __get(symbol: symbol): any;
      __addToExisting(symbol: symbol, addedState: any): object;
      __replace(symbolState: symbol, symbolKey: symbol, newVal: any): any;
      remove(symbol: symbol): object;
      createGlobalState(obj: any): object;
      subscribeToGlobal(key: string, symbol: symbol): object;
      setGlobal(key: string, val: any): boolean;
      getGlobal(key?: string | null): any;
      getGlobalValues(): any;
      getGlobalState(): object;
  };
  export default _default;

}
declare module 'vengarl/test/comp2' {
  const _default: void | {
      name: string;
      type: string;
      getUniqTag(inc?: number): string;
      register(clazz: any, name: string): any;
      define(): any;
  };
  export default _default;

}
declare module 'vengarl/test/examples/comp-switch-ex' {
  const _default: void | {
      name: string;
      type: string;
      getUniqTag(inc?: number): string;
      register(clazz: any, name: string): any;
      define(): any;
  };
  export default _default;

}
declare module 'vengarl/test/examples/store-ex' {
  const _default: void | {
      name: string;
      type: string;
      getUniqTag(inc?: number): string;
      register(clazz: any, name: string): any;
      define(): any;
  };
  export default _default;

}
declare module 'vengarl/test/index' {
  import "./state";

}
declare module 'vengarl/test/state' {
  const _default: object;
  export default _default;

}
declare module 'vengarl' {
  import main = require('vengarl/index');
  export = main;
}