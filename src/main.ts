import { html, render } from "lit-html";
import store from "./store";
import { setPath, keyExists } from "./helpers";
import LiteCSS, { addGlobalCSS } from "./litecss";
import fetcher from "./fetch";

const ERRORS = {
    notAttached: () => new Error("ShadowRoot isn't yet attached to the dom yet, listen to onAttached lifecycle event"),
    unknowStateKey: (key: string, obj: any) =>
        new Error(`key "${key}" isn't present on state with keys : "${Object.keys(obj).join(", ")}"`),
};

(function startup() {
    if (!document.querySelector("style")) {
        document.head.appendChild(document.createElement("style"));
    }
})();

function createComp(name: string, defineComp: Function, main: boolean = false) {
    class VenComp extends HTMLElement {
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
        shadowStyleEl: undefined | Node;
        childrenComponents: any[];

        constructor() {
            super();
            this.storeSymbol = Symbol();
            this.attached = false;
            this.setStateQueue = [];
            this.childrenComponents = [];

            this.cycleBeforeRender = () => undefined;
            this.cycleAfterRender = () => undefined;
            this.cycleBeforeFirstRender = () => undefined;
            this.cycleAfterAttached = () => undefined;
            this.cycleAfterRemoved = () => undefined;

            const beforeFirstRender = (cb: Function) => (this.cycleBeforeFirstRender = cb);
            const beforeRender = (cb: Function) => (this.cycleBeforeRender = cb);
            const onRender = (cb: Function) => (this.cycleAfterRender = cb);
            const onAttached = (cb: Function) => (this.cycleAfterAttached = cb);
            const onRemove = (cb: Function) => (this.cycleAfterRemoved = cb);

            this.shadowRootAccessor = this.attachShadow({ mode: "open" });
            this.liteCSS = new LiteCSS(this.shadowRootAccessor);
            this.shadowStyleEl = document.querySelector("style")?.cloneNode(true);

            store.__add(this.storeSymbol, { ctx: this, state: {} });
            this.setState = (key: string, val: any, cb?: Function) => {
                this.setStateQueue.push({ key, val, cb });
                if (this.attached) {
                    this.__execSetStateQueue();
                    this.liteCSS.execQueue();
                }
            };

            const createState = (initState = {}) => {
                store.__addToExisting(this.storeSymbol, initState);
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
                throw ERRORS.notAttached();
            };

            const queryAll = (key: string) => {
                if (this.attached) {
                    return this.shadowRootAccessor.querySelectorAll(key);
                }
                throw ERRORS.notAttached();
            };

            const scopedComp = (obj: { [key: string]: Function }) => {
                this.childrenComponents.push(obj);
            };

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
                fetcher,
                scopedComp,
                attributes: this.attributes,
                css: this.liteCSS.parser.bind(this.liteCSS),
                rawCss: this.liteCSS.injectRawCSS.bind(this.liteCSS),
                cx: this.liteCSS.cx.bind(this.liteCSS),
                nc: this.liteCSS.namespaceCSS.bind(this.liteCSS),
                props: this.props,
                self: this,
            });

            this.cycleBeforeFirstRender();
            this.cycleBeforeRender();
            this.__renderElement();
            this.cycleAfterRender();
        }

        private __execSetStateQueue() {
            while (this.setStateQueue.length > 0) {
                const storeObj = store.__get(this.storeSymbol);
                const curCall = this.setStateQueue.pop();
                if (!keyExists(storeObj, curCall.key)) {
                    throw ERRORS.unknowStateKey(curCall.key, storeObj);
                }
                setPath(storeObj, curCall.key, curCall.val);
                this.cycleBeforeRender();
                this.__renderElement();
                this.cycleAfterRender();
                return curCall.cb ? curCall.cb() : undefined;
            }
        }

        private __renderElement() {
            render(html`${this.shadowStyleEl}${this.htmlTemplate()}`, this.shadowRootAccessor);
        }

        private __connectScopedChildren() {
            this.childrenComponents.forEach((children) => {
                Object.keys(children).forEach((compName: string) => {
                    children[compName]();
                });
            });
        }

        connectedCallback() {
            this.attached = true;
            this.__execSetStateQueue();
            this.cycleAfterAttached();
            this.liteCSS.addCSS();
            this.liteCSS.execQueue();
            this.__connectScopedChildren();
        }

        disconnectedCallback() {
            this.cycleAfterRemoved();
        }
    }
    if (main === true) {
        return customElements.define(name, VenComp);
    }
    return () => customElements.define(name, VenComp);
}

export { createComp, store, addGlobalCSS };
