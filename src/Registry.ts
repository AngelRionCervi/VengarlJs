class Registry {
    _registry: Map<string, number>;

    constructor() {
        this._registry = new Map();
    }

    private __add(tagName: string): number {
        const occurences = this._registry.get(tagName);
        if (occurences) {
            this._registry.set(tagName, occurences + 1);
        } else {
            this._registry.set(tagName, 0);
        }
        return this._registry.get(tagName) ?? 0;
    }

    public getTag(tagName: string): string {
        const occurences = this.__add(tagName);
        const newTag = `${tagName}n${occurences}`;
        return newTag;
    }

    public addRootTagName(tagName: string): void {
        if (this._registry.has(tagName)) {
            throw new Error(`App root tag name "${tagName}" is already declared`);
        }
        this._registry.set(tagName, 0);
    }

}

export default new Registry();