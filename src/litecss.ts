import uniqid from "short-unique-id";
const uid = new uniqid({ length: 8 });

function buildTemplate(strings: TemplateStringsArray, inputs: string[], safe: boolean = false): string {
    const regex = safe ? /(\r\n|\n|\r)/gm : /(\r\n|\n|\r|\s)/gm
    return strings.reduce((acc: string, rule: string, index: number) => {
        rule = rule.replace(regex, "");
        return `${acc}${rule}${inputs[index] ?? ""}`;
    }, "");
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
    public parser(strings: TemplateStringsArray, ...inputs: string[]): string {
        const rules = buildTemplate(strings, inputs);
        const className = this.__createNewClass(rules);
        return className;
    }
    public cx(...args: any[]): string { // test + ne pas exiger un array pour obj[key]
        if (args.length === 1) {
            const obj = args[0];
            return Object.keys(obj).reduce((acc: string, key: string): string => {
                const bool = key === "true";
                if (bool && Array.isArray(obj[key])) {
                    return (
                        acc +
                        obj[key].reduce((a: string, clazz: string): string => {
                            return `${a} ${clazz}`;
                        }, "")
                    );
                }
                return `${acc}${bool ? obj[key] : ""}`;
            }, "");
        } else {
            const rules = args.reduce((acc: string, className: string): string => {
                return `${acc}${this.generatedClasses.get(className)}`;
            }, "");
            return this.__createNewClass(rules);
        }
    }
    public injectRawCSS(strings: TemplateStringsArray, ...inputs: string[]): void {
        this.injectedStyle += buildTemplate(strings, inputs, true);
    }
    public addCSS(): void {
        const styleSheetEl = this.shadowContainer.querySelector("style");
        styleSheetEl.innerHTML += this.injectedStyle;
    }
    public execQueue(): void {
        const styleSheetEl = this.shadowContainer.querySelector("style");
        while (this.styleQueue.length > 0) {
            styleSheetEl.innerHTML += this.styleQueue.pop();
        }
    }
    public namespaceCSS(namespace: string, newClassName: string): string {
        if (this.namespaces.has(namespace)) {
            const styleSheetEl: HTMLStyleElement | null = this.shadowContainer.querySelector("style");
            if (styleSheetEl === null) {
                throw new Error(`css ids must be unique, got multiple "${namespace}" ids declared at once`)
            }
            const namespaceClass: any = this.namespaces.get(namespace);
            const rules = this.generatedClasses.get(namespaceClass);
            styleSheetEl.innerHTML = styleSheetEl.innerHTML.replace(`.${namespaceClass}{${rules}}`, "");
            this.generatedClasses.delete(namespaceClass);
            this.namespaces.set(namespace, newClassName);
        } else {
            this.namespaces.set(namespace, newClassName);
        }
        return newClassName;
    }
}

export function addGlobalCSS(strings: TemplateStringsArray, ...inputs: string[]): void {
    const styleEl = document.querySelector("style");
    if (!styleEl) return;
    styleEl.innerHTML += buildTemplate(strings, inputs, true);
}
