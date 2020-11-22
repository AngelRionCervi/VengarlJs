import { html as litHtml, render } from "lit-html";
import store from "./store";
import LiteCSS, { addGlobalCSS } from "./litecss";
import fetcher from "./fetch";
import litWrap from "./litHtmlWrapper";
import definer from "./definer";

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
    const constructor = () =>
        class extends HTMLElement {
            private storeSymbol: symbol;
            private attached: any;
            private props: any;
            htmlTemplate: any;
            shadowRootAccessor: ShadowRoot;
            cycleBeforeFirstRender: Function;
            cycleAfterAttached: Function;
            cycleBeforeRender: Function;
            cycleAfterRender: Function;
            cycleAfterRemoved: Function;
            liteCSS: LiteCSS;
            shadowStyleEl: undefined | Node;
            childrenComponents: any[];
            name: string;
            __prepareUpdate: () => void;
            shouldUpdate: boolean;

            constructor() {
                super();
                this.storeSymbol = Symbol();
                this.attached = false;
                this.shouldUpdate = false;
                this.childrenComponents = [];
                this.name = name;

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
                        this.shouldUpdate = true;
                        this.__execSetStateQueue();
                        this.liteCSS.execQueue();
                        return true;
                    } else {
                        this.shouldUpdate = true;
                        return false;
                    }
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
                    this.childrenComponents.push(...Object.values(obj));
                };

                this.htmlTemplate = defineComp({
                    useState,
                    onAttached,
                    beforeFirstRender,
                    onRender,
                    beforeRender,
                    onRemove,
                    useGlobal,
                    html: litWrap(litHtml),
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
                if (this.shouldUpdate) {
                    this.cycleBeforeRender();
                    this.__renderElement();
                    this.cycleAfterRender();
                    this.shouldUpdate = false;
                }
            }

            private __renderElement() {
                render(litHtml`${this.shadowStyleEl}${this.htmlTemplate()}`, this.shadowRootAccessor);
            }

            connectedCallback() {
                this.attached = true;
                this.__execSetStateQueue();
                this.cycleAfterAttached();
                this.liteCSS.addCSS();
                this.liteCSS.execQueue();
            }

            disconnectedCallback() {
                this.cycleAfterRemoved();
            }
        };

    if (main === true) {
        return customElements.define(name, constructor());
    }

    return definer(name, constructor);
}

export { createComp, store, addGlobalCSS };
