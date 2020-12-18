declare const _default: (name: string, constructor: Function) => {
    type: string;
    getUniqTag(inc?: number): string;
    register(clazz: any, name: string): any;
    define(): any;
};
export default _default;
