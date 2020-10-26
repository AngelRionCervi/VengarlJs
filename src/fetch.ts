const __exec = (url: string, options: any) => {
    let _loading: boolean = true;
    let _error: any = null;
    let _response: any = null;
    return {
        req: fetch(url, options)
            .then((res) => {
                _loading = false;
                _response = res;
                return res.json();
            })
            .catch((err) => {
                _loading = false;
                _error = err;
                return err;
            }),
        loading: () => _loading,
        response: () => _response,
        error: () => _error,
    };
};

const __execAll = (urls: any, options: any) => {
    let keys: any = null;
    if (!Array.isArray(urls)) {
        keys = Object.keys(urls);
        urls = Object.values(urls);
    }
    let _loading: boolean = true;
    let _error: any = null;
    let _response: any = null;
    const initReq = Promise.all(
        urls.map((u: any) => {
            const { req } = __exec(u, options);
            return req;
        })
    )
        .then((res) => {
            _response = res;
            _loading = false;
            return res;
        })
        .catch((err) => {
            _loading = false;
            _error = err;
        });
    return {
        req: new Promise((resolve, reject) => {
            if (keys !== null) {
                const obj: any = {};
                return initReq
                    .then((res: any) => {
                        res.forEach((r: any, i: number) => {
                            obj[keys[i]] = r;
                        });
                        return resolve(obj);
                    })
                    .catch((err) => {
                        return reject(err);
                    });
            }
            return initReq
                .then((res: any) => {
                    return resolve(res);
                })
                .catch((err) => {
                    return reject(err);
                });
        }),
        loading: () => _loading,
        response: () => _response,
        error: () => _error,
    };
};

const autoFetcher = (url: string | string[], options: any) => {
    if (typeof url === "string") {
        const { req, loading, response, error } = __exec(url, options);
        return { req, loading, response, error };
    }
    const { req, loading, response, error } = __execAll(url, options);
    return { req, loading, response, error };
};

const fetcher = (url: string, options: any) => {
    const __start = (endpoint: string | string[], cb: Function, options: any) => {
        if (typeof endpoint === "string") {
            const newUrl = `${url}${endpoint}`;
            const { req, loading, response, error } = __exec(newUrl, options);
            return cb({ req, loading, error, response });
        }
        const newUrls = endpoint.map((end) => `${url}${end}`);
        const { req, loading, response, error } = __execAll(newUrls, options);
        return cb({ req, loading, error, response });
    };

    const __getArgsGet = (args: any[]): [string | string[], Function] => {
        let endpoint: string | string[] = "";
        let cb: Function = () => null;
        if (args.length === 2) {
            endpoint = args[0];
            cb = args[1];
        } else if (args.length === 1) {
            cb = args[0];
        } else if (args.length === 0) {
            throw new Error(`"post function needs at least 1 argument, a callback function"`);
        }
        return [endpoint, cb];
    };

    const __getArgsPost = (args: any[]): [any, string | string[], Function] => {
        let data: any;
        let endpoint: string | string[] = "";
        let cb: Function = () => null;
        if (args.length === 3) {
            data = args[0];
            endpoint = args[1];
            cb = args[2];
        } else if (args.length === 2) {
            data = args[0];
            cb = args[2];
        } else if (args.length <= 1) {
            throw new Error(
                `"post function needs at least 2 arguments, 1 : the data to post in object format, 2 : a callback function"`
            );
        }
        return [data, endpoint, cb];
    };

    const get = (...args: any) => {
        const [endpoint, cb] = __getArgsGet(args);
        const newOptions = { ...options, method: "get" };
        return __start(endpoint, cb, newOptions);
    };

    const post = (...args: any[]) => {
        const [data, endpoint, cb] = __getArgsPost(args);
        const newOptions = { ...options, body: JSON.stringify(data), method: "post" };
        return __start(endpoint, cb, newOptions);
    };
    return [get, post];
};

export default (url: string, options: any = {}, autoExec: boolean = false) => {
    if (autoExec) {
        return autoFetcher(url, options);
    }
    return fetcher(url, options);
};
