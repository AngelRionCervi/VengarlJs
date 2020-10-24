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
    addRules({className, rules} : {className: string, rules: string}, documentStyleSheet: any) {
        setTimeout(() => {
            documentStyleSheet.insertRule(`.${className} {${rules}}`, 0)
            console.log(documentStyleSheet.cssRules)
        })
        
    }
}
//`.${name} {${rules}}`

export default class {
    shadowContainer: any;
    styleQueue: any[];
    constructor(shadowContainer: any) {
        this.shadowContainer = shadowContainer;
        this.styleQueue = [];
    }
    parser(strings: string[], ...inputs: any[]) {
        const className: any = ("_generated-class-" + Math.random() * 1000).split(".").shift();
        const rules = strings.join("");
        const queueObj = {className, rules}
        this.styleQueue.push(queueObj)
        return className;
    }
    addCSS() {
        const documentStyleSheet = this.shadowContainer.styleSheets[0];
        while (this.styleQueue.length > 0) {
            const { className, rules} = this.styleQueue.shift();
            documentStyleSheet.insertRule(`.${className} {${rules}}`, 0)
        }
    }
}
