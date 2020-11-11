interface entry {
    val: any;
    corStates: symbol[];
}

const storeInstance = () => {
    const store = new Map();
    const globalKey = "globals";
    store.set(globalKey, {});
    return {
        __add(symbol: symbol, foreignContext: any): object {
            store.set(symbol, foreignContext);
            return this;
        },
        __get(symbol: symbol): any {
            if (!store.has(symbol)) return this;
            return store.get(symbol).state;
        },
        __addToExisting(symbol: symbol, addedState: any): object {
            const existingState = store.get(symbol).state;
            const newState = {...existingState, ...addedState};
            store.get(symbol).state = newState;
            return this;
        },
        __replace(symbolState: symbol, symbolKey: symbol, newVal: any) {
            const state = store.get(symbolState).state;
            state[symbolKey] = newVal;
            return this;
        },
        // __replaceGlobal(symbolState: symbol, key: string, val: any) {
        //     this.getGlobal()
        // },
        remove(symbol: symbol): object {
            store.delete(symbol);
            return this;
        },
        createGlobalState(obj: any): object {
            for (const [key, val] of Object.entries(obj)) {
                if (typeof val === "function") {
                    this.getGlobal()[key] = val;
                    continue;
                }
                const entry: entry = { val, corStates: [] };
                this.getGlobal()[key] = entry;
            }
            return this;
        },
        subscribeToGlobal(key: string, symbol: symbol): object {
            const glob = this.getGlobal();
            if (!glob.hasOwnProperty(key)) {
                throw new Error(`The global state object doesn't have a "${key}" key.`)
            }
            glob[key].corStates.push(symbol);
            return this;
        },
        setGlobal(key: string, val: any) {
            let entry: entry = this.getGlobal()[key];
            if (!entry) {
                entry = { val, corStates: [] };
                this.getGlobal()[key] = entry.val;
            } // else 
            entry.val = val;
            if (entry.corStates.length === 0) return false;
            entry.corStates.forEach((symbol: symbol) => {
                const ctx = store.get(symbol).ctx;
                ctx.__prepareUpdate();
            });
            return true;
        },
        getGlobal(key: string | null = null): any {
            if (!key) return store.get(globalKey);
            return store.get(globalKey)[key].val;
        },
        getGlobalValues() {
            const obj: any = {};
            let [key, entry] : [null | string, any] = [null, null];
            for ([key, entry] of Object.entries(this.getGlobal())) {
                if (entry.hasOwnProperty("val")) {
                    obj[key] = entry.val;
                    continue;
                }
                obj[key] = entry;
            }
            return obj;
        },
        getGlobalState(): object {
            return {
                ...this.getGlobalValues(),
                setGlobal: this.setGlobal, 
                getGlobal: this.getGlobal,
            };
        },
    };
};

export default storeInstance();
