interface namedQuery {
    [key: string]: string;
}

type endpoint = string | string[] | namedQuery;

const __fetch = (url: string, options: any) => {
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
        isLoading: () => _loading,
        getResponse: () => _response,
        getError: () => _error,
    };
};

const __exec = (urls: any, options: any) => {
    if (typeof urls === "string") {
        urls = [urls];
    }
    let keys: any = null;
    if (!Array.isArray(urls)) {
        keys = Object.keys(urls);
        urls = Object.values(urls);
    }
    let _loading: boolean = true;
    let errorsCb: any = [];
    let responsesCb: any = [];
    let _errors: any = keys !== null ? {} : [];
    let _responses: any = keys !== null ? {} : [];
    const initReq = Promise.all(
        urls.map((u: any, i: number) => {
            let o: any = options;
            if (Array.isArray(options) && options[i] !== undefined) {
                o = options[i];
            }
            const { req, getResponse, getError } = __fetch(u, o);
            responsesCb.push(getResponse);
            errorsCb.push(getError);
            return req;
        })
    )
        .then((res) => {
            return res;
        })
        .catch((err) => {
            return err;
        })
        .finally(() => {
            _loading = false;
            [responsesCb, errorsCb].forEach((cbs: Function[], index: number) => {
                const conObj = index === 0 ? _responses : _errors;
                cbs.forEach((r: Function, i: number) => {
                    if (keys !== null) {
                        conObj[keys[i]] = r();
                    } else {
                        conObj.push(r());
                    }
                });
            });
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
        isLoading: () => _loading,
        getResponse: () => _responses,
        getError: () => _errors,
    };
};

const autoFetcher = (url: endpoint, options: any) => {
    const { req, isLoading, getResponse, getError } = __exec(url, options);
    return { req, isLoading, getResponse, getError };
};

const fetcher = (url: string, options: any) => {
    const __start = (endpoint: endpoint, cb: Function, options: any) => {
        let newUrls: any = "";
        if (typeof endpoint === "string") {
            newUrls = `${url}${endpoint}`;
        } else {
            if (Array.isArray(endpoint)) {
                newUrls = endpoint.map((end) => `${url}${end}`);
            } else {
                newUrls = {};
                Object.keys(endpoint).forEach((key) => {
                    newUrls[key] = `${url}${endpoint[key]}`;
                });
            }
        }
        const { req, isLoading, getResponse, getError } = __exec(newUrls, options);
        return cb({ req, isLoading, getResponse, getError });
    };

    const __getArgsGet = (args: any[]): [any, Function] => {
        let endpoint: any = "";
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
            cb = args[1];
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
        let newOptions: any;
        if (Array.isArray(data)) {
            newOptions = data.reduce((acc, d) => {
                return [...acc, { ...options, body: JSON.stringify(d), method: "post" }];
            }, []);
        } else {
            newOptions = { ...options, body: JSON.stringify(data), method: "post" };
        }
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
