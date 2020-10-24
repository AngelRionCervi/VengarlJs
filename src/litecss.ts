import uniqid from "short-unique-id";
const uid = new uniqid({ length: 8 });

function buildTemplate(strings: TemplateStringsArray, inputs: string[]): string {
    return strings.reduce((acc: string, rule: string, index: number) => {
        rule = rule.replace(/(\r\n|\n|\r|\s)/gm, "");
        return `${acc}${rule}${inputs[index] ?? ""}`;
    }, "");
}

export default class {
    shadowContainer: any;
    styleQueue: string[];
    generatedClasses: Map<string, string>;
    constructor(shadowContainer: any) {
        this.shadowContainer = shadowContainer;
        this.styleQueue = [];
        this.generatedClasses = new Map();
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
    public cx(...args: any[]): string {
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
            const className = this.__createNewClass(rules);
            return className;
        }
    }
    public addCSS(): void {
        const styleSheetEl = this.shadowContainer.querySelector("style");
        while (this.styleQueue.length > 0) {
            const newClass: any = this.styleQueue.shift();
            styleSheetEl.innerHTML += newClass;
        }
    }
}

export function addGlobalCSS(strings: TemplateStringsArray, ...inputs: string[]): void {
    const styleEl = document.querySelector("style");
    if (!styleEl) return;
    styleEl.innerHTML += buildTemplate(strings, inputs);
}
