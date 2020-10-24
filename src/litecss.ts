import uniqid from "short-unique-id";
const uid = new uniqid({ length: 8 });

class StyleSheet {
    // classes: any[];
    // sheet: string;
    // container: any;
    constructor() {
        // this.classes = [];
        // this.sheet = "";
        // this.container = container;
    }
    // private __build() {
    //     this.sheet = this.classes.reduce((acc, clazz) => {
    //         return `${acc} ${clazz}`;
    //     }, "");
    //     this.container.innerHTML = this.sheet;
    // }
    // addClass(clazz: string) {
    //     this.classes.push(clazz);
    // }
    // buildClass(name: string, rules: string) {
    //     const clazz = `.${name} {
    //         ${rules}
    //     }`;
    //     this.addClass(clazz);
    //     this.__build();
    // }
    // addRules(newClass: string, styleSheetEl: HTMLStyleElement) {
    //     styleSheetEl.innerHTML += `\n${newClass}`;
    // }
}
//`.${name} {${rules}}`

function buildTemplate(strings: TemplateStringsArray, inputs: string[]) {
    return strings.reduce((acc, rule, index) => {
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
    parser(strings: TemplateStringsArray, ...inputs: any[]) {
        const className: string = `_${uid()}`;
        const rules = buildTemplate(strings, inputs);
        const newClass = `.${className} {${rules}}`;
        this.generatedClasses.set(className, rules);
        this.styleQueue.push(newClass);
        return className;
    }
    cx(...args: any[]) {
        if (args.length === 1) {
            const obj = args[0];
            return Object.keys(obj).reduce((acc: string, key: string): string => {
                const bool = key === "true";
                if (bool && Array.isArray(obj[key])) {
                    return (
                        `${acc} ` +
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
            const className: string = `m_${uid()}`;
            const newClass = `.${className} {${rules}}`;
            this.styleQueue.push(newClass);
            return className;
        }
    }
    addCSS() {
        const styleSheetEl = this.shadowContainer.querySelector("style");
        while (this.styleQueue.length > 0) {
            const newClass: any = this.styleQueue.shift();
            styleSheetEl.innerHTML += newClass;
        }
    }
}

export function addGlobalCSS(strings: TemplateStringsArray, ...inputs: any[]) {
    let styleEl = document.querySelector("style");
    if (!styleEl) {
        styleEl = document.createElement("style");
        document.head.appendChild(styleEl);
    }
    styleEl.innerHTML += buildTemplate(strings, inputs);
}
