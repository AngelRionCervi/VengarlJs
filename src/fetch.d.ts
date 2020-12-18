declare const _default: (url: string, options?: any, autoExec?: boolean) => {
    req: Promise<unknown>;
    isLoading: () => boolean;
    getResponse: () => any;
    getError: () => any;
} | ((...args: any) => any)[];
export default _default;
