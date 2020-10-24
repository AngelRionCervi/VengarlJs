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
        return `${acc}${rule}${inputs[index] ?? ""}`
    }, "")
}

export default class {
    shadowContainer: any;
    styleQueue: string[];
    constructor(shadowContainer: any) {
        this.shadowContainer = shadowContainer;
        this.styleQueue = [];
    }
    parser(strings: TemplateStringsArray, ...inputs: any[]) {
        const className: any = ("_generated-class-" + Math.random() * 1000).split(".").shift();
        const rules = buildTemplate(strings, inputs);
        const newClass = `.${className} {${rules}}`;
        this.styleQueue.push(newClass);
        return className;
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
    console.log(strings, inputs)
    let styleEl = document.querySelector("style");
    if (!styleEl) {
        styleEl = document.createElement("style");
        document.head.appendChild(styleEl);
    }
    styleEl.innerHTML += buildTemplate(strings, inputs);
}
