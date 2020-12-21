declare const _default: {
    __add(symbol: symbol, foreignContext: any): object;
    __get(symbol: symbol): any;
    __addToExisting(symbol: symbol, addedState: any): object;
    __replace(symbolState: symbol, symbolKey: symbol, newVal: any): any;
    remove(symbol: symbol): object;
    createGlobalState(obj: any): object;
    subscribeToGlobal(key: string, symbol: symbol): object;
    setGlobal(key: string, val: any): boolean;
    getGlobal(key?: string): any;
    getGlobalValues(): any;
    getGlobalState(): object;
};
export default _default;
