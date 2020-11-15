function transformTag(strings: TemplateStringsArray,  values: any[]) {
    console.log("template", strings, values);

    const newStrings: string[] = [];
    const newValues: any[] = [];

    let lastDefinedTag: string | null = null;
    let pushNext = true;

    for (let u = 0; u < values.length; u++) {
        const val = values[u];
        if (val?.type === "scopedElement") {
            let string = `${strings[u]}${val.tag}${strings[u+1]}`;
      
            newStrings.push(string);
            if (lastDefinedTag !== val.tag) {
                const el = val.define();
                console.log("el", el)
                lastDefinedTag = val.tag;
            }
            
            pushNext = false;
        } else {
            if (pushNext === true) {
                newStrings.push(strings[u]);
                
            } else {
                pushNext = true;
            }
            newValues.push(values[u])
        }
    }
    if (pushNext) {
        newStrings.push(strings[strings.length - 1]);
    }
    
    console.log("NEW template", newStrings, newValues);
        
    return [newStrings, ...values];
}

export default (html: any) => {
    return (strings: TemplateStringsArray, ...values: string[]) => html.apply(null, transformTag(strings, values));
}