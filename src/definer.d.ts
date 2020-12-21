declare const _default: (name: string, constructor: Function) => {
    name: string;
    type: string;
    getUniqTag(inc?: number): string;
    register(clazz: any, name: string): any;
    define(): any;
};
export default _default;
