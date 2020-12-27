import uniqid from "short-unique-id";

type CondClassName = { [key: string]: string };
type CxArg = string | CondClassName;

const uid = new uniqid({ length: 8 });

function buildTemplate(strings: TemplateStringsArray, inputs: string[]): string {
    const regex = /(\r\n|\n|\r)/gm;
    return strings.reduce((acc: string, rule: string, index: number) => {
        rule = rule.replace(regex, "");
        return `${acc}${rule}${inputs[index] ?? ""}`;
    }, "");
}

function isObject(obj: any) {
    return !!obj && obj.constructor === Object;
}

export default class {
    shadowContainer: any;
    styleQueue: string[];
    generatedClasses: Map<string, string>;
    injectedStyle: string;
    namespaces: Map<string, string>;
    constructor(shadowContainer: any) {
        this.shadowContainer = shadowContainer;
        this.styleQueue = [];
        this.injectedStyle = "";
        this.generatedClasses = new Map();
        this.namespaces = new Map();
    }
    private __createNewClass(rules: string): string {
        const className: string = `_${uid()}`;
        const newClass = `.${className}{${rules}}`;
        this.generatedClasses.set(className, rules);
        this.styleQueue.push(newClass);
        return className;
    }
    private _getSheet(): HTMLStyleElement {
        return this.shadowContainer.querySelector("style");
    }
    public parser(strings: TemplateStringsArray, ...inputs: string[]): string {
        const rules = buildTemplate(strings, inputs);
        const className = this.__createNewClass(rules);
        return className;
    }
    public injectRawCSS(strings: TemplateStringsArray, ...inputs: string[]): void {
        this.injectedStyle += buildTemplate(strings, inputs);
    }
    public addCSS(): void {
        this._getSheet().innerHTML += this.injectedStyle;
    }
    public execQueue(): void {
        const styleSheetEl = this._getSheet();
        while (this.styleQueue.length > 0) {
            styleSheetEl.innerHTML += this.styleQueue.pop();
        }
    }
    public cx(...args: CxArg[]): string {
        const getClassRules = (className: string) => {
            const cRules = this.generatedClasses.get(className);
            if (!cRules) {
                throw new Error(`Could not find className ${className}`);
            }
            return cRules;
        };
        const rules = args.reduce((acc: string, className: CxArg): string => {
            if (typeof className === "string") {
                const cRules = getClassRules(className);
                return `${acc}${cRules}`;
            } else if (isObject(className)) {
                const condClasses = Object.entries(className).reduce((a, [key, val]): string => {
                    if (val) {
                        const cRules = getClassRules(key);
                        return `${a}${cRules}`;
                    }
                    return `${a}`;
                }, "");
                return `${acc}${condClasses}`;
            }
            throw new Error(
                `cx arguments must either be a string or an object : {[boolean]: string}`
            );
        }, "");
        return this.__createNewClass(rules);
    }
    public namespaceCSS(namespace: string, newClassName: string): string {
        if (this.namespaces.has(namespace)) {
            const styleSheetEl = this._getSheet() || null;
            if (styleSheetEl === null) {
                throw new Error(
                    `css ids must be unique, got multiple "${namespace}" ids declared at once`
                );
            }
            const namespaceClass = this.namespaces.get(namespace);
            if (!namespaceClass) {
                throw new Error(`can't find css namespace: "${namespace}"`);
            }
            const rules = this.generatedClasses.get(namespaceClass);
            styleSheetEl.innerHTML = styleSheetEl.innerHTML.replace(
                `.${namespaceClass}{${rules}}`,
                ""
            );
            this.generatedClasses.delete(namespaceClass);
            this.namespaces.set(namespace, newClassName);
        } else {
            this.namespaces.set(namespace, newClassName);
        }
        return newClassName;
    }
}

export function addGlobalCss(strings: TemplateStringsArray, ...inputs: string[]): void {
    const styleEl = document.querySelector("style");
    if (!styleEl) return;
    styleEl.innerHTML += buildTemplate(strings, inputs);
}
