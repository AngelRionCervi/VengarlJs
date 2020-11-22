function transform(strings: TemplateStringsArray, values: any[]) {
    const newStrings: string[] = [];
    const newValues: any[] = [];

    let pushNext = true;

    for (let u = 0; u < values.length; u++) {
        const val = values[u];
        if (val?.type === "scopedElement") {

            const tag = val.define();

            if (!pushNext) {
                const string = `${tag}${strings[u + 1]}`;
                newStrings[newStrings.length - 1] += string;
            } else {
                const string = `${strings[u]}${tag}${strings[u + 1]}`;
                newStrings.push(string);
            }
            pushNext = false;
        } else {
            if (pushNext) {
                newStrings.push(strings[u]);
            } else {
                pushNext = true;
            }
            newValues.push(values[u]);
        }
    }
    
    if (pushNext) {
        newStrings.push(strings[strings.length - 1]);
    }
    
    return [newStrings, ...newValues];
}

export default (html: any) => {
    return (strings: TemplateStringsArray, ...values: string[]) => html.apply(null, transform(strings, values));
};
