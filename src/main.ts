import { html, render } from "lit-html";
import { injectGlobal } from "emotion";
import createEmotion from "create-emotion";
import store from "./store";
import { setPath, keyExists } from "./helpers";

export { store, injectGlobal as globalCSS };

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
            emotionShadow: any;

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

                this.emotionShadow = document.createElement("div");
                this.emotionShadow.id = "emotion-shadow";
                //this.shadowRootAccessor.appendChild(this.emotionShadow);

                const {
                    flush,
                    hydrate,
                    cx,
                    merge,
                    getRegisteredStyles,
                    injectGlobal,
                    keyframes,
                    css,
                    sheet,
                    cache,
                } = createEmotion({ container: this.emotionShadow });

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
                    css,
                    cx,
                    keyframes,
                    props: this.props,
                    self: this,
                });
                this.cycleBeforeFirstRender();
                this.cycleBeforeRender();
                render(html`${this.emotionShadow}${this.htmlTemplate()}`, this.shadowRootAccessor);
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
                    render(html`${this.emotionShadow}${this.htmlTemplate()}`, this.shadowRootAccessor);
                    this.cycleAfterRender();
                    return curCall.cb ? curCall.cb() : undefined;
                }
                const styleContainer = document.createElement("STYLE");
                this.shadowRootAccessor.appendChild(styleContainer);
            }

            connectedCallback() {
                this.attached = true;
                this.execSetStateQueue();
                this.cycleAfterAttached();
                const styleContainer = this.shadowRootAccessor.querySelector("#emotion-shadow");
                if (styleContainer && styleContainer.children) {
                    for (let u = 0; u < styleContainer.children.length; u++) {
                        const clone = styleContainer.children[u].cloneNode(true);
                        this.shadowRootAccessor.appendChild(clone);
                    }
                    styleContainer.remove();
                }
            }

            disconnectedCallback() {
                this.cycleAfterRemoved();
            }
        }
    );
}
