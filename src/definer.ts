export default (name: string, constructor: Function) => {
    const _registry = new Map();
    return {
        type: "scopedElement",
        getUniqTag(inc: number = 0): string {
            let newTag = `${name}_${inc}`;
            if (customElements.get(newTag)) {
                return this.getUniqTag(inc + 1);
            }
            return newTag;
        },
        register(clazz: any, name: string) {
            const existingTag = _registry.get(clazz);

            if (existingTag) {
                return existingTag;
            } else {
                _registry.set(clazz, name);
            }

            return this.getUniqTag();
        },
        define() {
            const clazz = constructor();
            const tag = this.register(clazz, name);
            Promise.resolve().then(() => {
                if (!customElements.get(tag)) {
                    customElements.define(tag, clazz);
                }
            });
            return tag;
        },
    };
}