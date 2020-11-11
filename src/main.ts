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
        cycleBeforeFirstRender: Function;
        cycleAfterAttached: Function;
        cycleBeforeRender: Function;
        cycleAfterRender: Function;
        cycleAfterRemoved: Function;
        liteCSS: LiteCSS;
        shadowStyleEl: undefined | Node;
        childrenComponents: any[];
        __prepareUpdate: () => void;

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

            this.__prepareUpdate = (): boolean => {
                if (this.attached) {
                    this.setStateQueue.push("update");
                    this.__execSetStateQueue();
                    this.liteCSS.execQueue();
                    return true;
                } else if (this.setStateQueue.length === 0) {
                    this.setStateQueue.push("update");
                    return false;
                }
                return false;
            };

            const useState = (initVal: any) => {
                const key = Symbol();
                store.__addToExisting(this.storeSymbol, { [key]: initVal });
                const getter = (cb?: Function) => {
                    const res = store.__get(this.storeSymbol)[key];
                    return cb ? cb(res) : res;
                };
                const setter = (val: any, cb?: Function) => {
                    if (typeof val !== "function") {
                        store.__replace(this.storeSymbol, key, val);
                    } else {
                        store.__replace(this.storeSymbol, key, val(getter()));
                    }
                    const updated = this.__prepareUpdate();
                    const value = store.__get(this.storeSymbol)[key];
                    return cb ? cb({ updated, value }) : value;
                };
                return [getter, setter];
            };

            const useGlobal = (key: string) => {
                store.subscribeToGlobal(key, this.storeSymbol);
                const getter = (cb?: Function) => {
                    const res = store.getGlobal()[key].val;
                    return cb ? cb(res) : res;
                };
                const setter = (val: any, cb?: Function) => {
                    let updated = false;
                    if (typeof val !== "function") {
                        updated = store.setGlobal(key, val);
                    } else {
                        updated = store.setGlobal(key, val(getter()));
                    }
                    const value = store.getGlobal()[key].val;
                    return cb ? cb({ updated, value }) : value;
                };
                return [getter, setter];
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
                useState,
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

        private __execSetStateQueue(): Function | void {
            while (this.setStateQueue.length > 0) {
                this.setStateQueue.pop();
                this.cycleBeforeRender();
                this.__renderElement();
                this.cycleAfterRender();
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
