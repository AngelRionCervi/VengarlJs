import { html, render } from "lit-html";
import store from "./store";
import { setPath, keyExists } from "./helpers";
import LiteCSS, { addGlobalCSS } from "./litecss";

export { store, addGlobalCSS };

const errors = {
    notAttached: () => new Error("ShadowRoot isn't yet attached to the dom yet, listen to onAttached lifecycle event"),
    unknowStateKey: (key: string, obj: any) =>
        new Error(`key "${key}" isn't present on state with keys : "${Object.keys(obj).join(", ")}"`),
};

export function createComp(name: string, defineComp: Function) {
    customElements.define(
        name,
        class extends HTMLElement {
            private storeSymbol: symbol;
            private attached: any;
            private props: any;
            htmlTemplate: any;
            setStateQueue: any[];
            shadowRootAccessor: ShadowRoot;
            setState: (key: string, val: any, cb?: Function | undefined) => any;
            cycleBeforeFirstRender: Function;
            cycleAfterAttached: Function;
            cycleBeforeRender: Function;
            cycleAfterRender: Function;
            cycleAfterRemoved: Function;
            liteCSS: LiteCSS;
            styleEl: HTMLStyleElement;

            constructor() {
                super();
                this.storeSymbol = Symbol();
                this.attached = false;
                this.setStateQueue = [];

                this.cycleBeforeRender = () => undefined;
                this.cycleAfterRender = () => undefined;
                this.cycleBeforeFirstRender = () => undefined;
                this.cycleAfterAttached = () => undefined;
                this.cycleAfterRemoved = () => undefined;
                this.setState = () => undefined;

                const beforeFirstRender = (cb: Function) => (this.cycleBeforeFirstRender = cb);
                const beforeRender = (cb: Function) => (this.cycleBeforeRender = cb);
                const onRender = (cb: Function) => (this.cycleAfterRender = cb);
                const onAttached = (cb: Function) => (this.cycleAfterAttached = cb);
                const onRemove = (cb: Function) => (this.cycleAfterRemoved = cb);

                this.shadowRootAccessor = this.attachShadow({ mode: "open" });
                this.liteCSS = new LiteCSS(this.shadowRootAccessor);
                this.styleEl = document.createElement("style");

                const createState = (initState = {}) => {
                    store.__add(this.storeSymbol, { ctx: this, state: initState });
                    this.setState = (key: string, val: any, cb?: Function) => {
                        this.setStateQueue.push({ key, val, cb });
                        if (this.attached) {
                            this.execSetStateQueue();
                        }
                    };
                    return { state: store.__get(this.storeSymbol), setState: this.setState };
                };

                const useGlobal = (key: string) => {
                    store.subscribeToGlobal(key, this.storeSymbol);
                    return store.getGlobal()[key].val;
                };

                const query = (key: string) => {
                    if (this.attached) {
                        return this.shadowRootAccessor.querySelector(key);
                    }
                    throw errors.notAttached();
                };

                const queryAll = (key: string) => {
                    if (this.attached) {
                        return this.shadowRootAccessor.querySelectorAll(key);
                    }
                    throw errors.notAttached();
                };

                //const css = this.liteCSS.parser.bind(this.liteCSS);
                
                this.htmlTemplate = defineComp({
                    createState,
                    onAttached,
                    beforeFirstRender,
                    onRender,
                    beforeRender,
                    onRemove,
                    useGlobal,
                    html,
                    query,
                    queryAll,
                    css: this.liteCSS.parser.bind(this.liteCSS),
                    cx: this.liteCSS.cx.bind(this.liteCSS),
                    props: this.props,
                    self: this,
                });
                this.cycleBeforeFirstRender();
                this.cycleBeforeRender();
                this.__renderElement()
                this.cycleAfterRender();
            }

            execSetStateQueue() {
                while (this.setStateQueue.length > 0) {
                    const storeObj = store.__get(this.storeSymbol);
                    const curCall = this.setStateQueue.shift();
                    if (!keyExists(storeObj, curCall.key)) {
                        throw errors.unknowStateKey(curCall.key, storeObj);
                    }
                    setPath(storeObj, curCall.key, curCall.val);
                    this.cycleBeforeRender();
                    this.__renderElement()
                    this.cycleAfterRender();
                    return curCall.cb ? curCall.cb() : undefined;
                }
            }

            __renderElement() {
                render(html`${this.styleEl}${this.htmlTemplate()}`, this.shadowRootAccessor);
                this.liteCSS.addCSS();
            }

            connectedCallback() {
                this.attached = true;
                this.execSetStateQueue();
                this.cycleAfterAttached();
            }

            disconnectedCallback() {
                this.cycleAfterRemoved();
            }
        }
    );
}
