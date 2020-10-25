interface useFetch {
    loading: boolean;
    __exec(arg0: string, optionsCopy: any): Promise<any>;
    response: null | Promise<any>;
    error: any;
}

export default class {
    public options: any;
    public url: null | string;
    _loading: boolean;
    _response: any;
    _error: any;

    constructor() {
        this._response = null;
        this._error = null;
        this._loading = false;
        this.options = {};
        this.url = null;
    }

    public init(url: string, options: any) {
        Object.assign(this.options, options);
        this.url = url;
        return {
            get: this.get.bind(this),
            post: this.post.bind(this),
            getResponse: () => this._response,
            isLoading: () => this._loading,
            getError: () => this._error,
        };
    }

    private async __exec(url: string, options: any) {
        return fetch(url, options)
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

    public async get(endpoint: string = ""): Promise<any> {
        const optionsCopy = { ...this.options };
        optionsCopy.method = "get";
        this._loading = true;
        console.log("thisloading", this._loading);
        return await this.__exec(`${this.url}${endpoint}`, this.options);
    }

    public post(data: any, endpoint: string = ""): any {
        const optionsCopy = { ...this.options };
        optionsCopy.method = "post";
        this._loading = true;
        optionsCopy.body = JSON.stringify(data);
        return this.__exec(`${this.url}${endpoint}`, this.options);
    }
}
