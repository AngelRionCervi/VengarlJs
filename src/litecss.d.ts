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
export declare function addGlobalCSS(strings: TemplateStringsArray, ...inputs: string[]): void;
