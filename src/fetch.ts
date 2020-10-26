class Exec {
    private _loading: boolean;
    private _error: Error | null;
    private _response: Response | null;
    public req: Promise<any> | undefined;
    constructor() {
        this._loading = true;
        this._error = null;
        this._response = null;
    }
    init(url: string, options: any) {
        this._loading = true;
        this._error = null;
        this._response = null;
        this.req = fetch(url, options)
            .then((res) => {
                this._loading = false;
                this._response = res;
                return res.json();
            })
            .catch((err) => {
                this._loading = false;
                this._error = err;
                return err;
            });
    }
    loading = () => this._loading;
    response = () => this._response;
    error = () => this._error;
}

const autoFetcher = (url: string | string[], options: any) => {
    if (!Array.isArray(url)) {
        const exec = new Exec();
        exec.init(url, options);
        return { req: exec.req, loading: exec.loading, error: exec.error, response: exec.response };
    }

    let loading = true;
    let error = null;
    let response = null;
    const req = Promise.all(url.map((u) => {
        const exec = new Exec();
        exec.init(u, options);
        return exec.req;
    })).then((res) => {
        response = res;
        loading = false;
        return res;
    }).catch((err) => {
        loading = false;
        error = err;
    })
    return { req, loading: () => loading, error, response };
};

const fetcher = (url: string, options: any) => {
    const get = (endpoint: string = "", cb: Function) => {
        const exec = new Exec();
        const newUrl = `${url}${endpoint}`;
        const newOptions = { ...options, method: "get" };
        exec.init(newUrl, newOptions);
        return cb({ req: exec.req, loading: exec.loading, error: exec.error, response: exec.response });
    };
    const post = (data: any, endpoint: string = "", cb: Function) => {
        const exec = new Exec();
        const newUrl = `${url}${endpoint}`;
        const newOptions = { ...options, body: JSON.stringify(data), method: "post" };
        exec.init(newUrl, newOptions);
        return cb({ req: exec.req, loading: exec.loading, error: exec.error, response: exec.response });
    };
    return [get, post];
};

export default (url: string, options: any = {}, autoExec: boolean = false) => {
    if (autoExec) {
        return autoFetcher(url, options);
    }
    return fetcher(url, options);
};
