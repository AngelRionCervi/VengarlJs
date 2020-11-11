import { createComp, store, addGlobalCSS } from "../src/main";


export default createComp("test-comp2", ({ createState, html, props, self, onAttached, css, nc, cx, attributes, useGlobal, useState }: any) => {
    const [name, setName] = useState("hello :)");
    const [fontSize, setFontSize] = useState("1");
    const [gval, setGval] = useGlobal("globalKey");
    
    setName((baseVal: any) => baseVal + " welcome", ({updated, value}: any) => {
        console.log("local fn + cb", updated, value)
    });
    setFontSize("5");

    setGval((oldval: any) => oldval + " ::::::::)", ({ updated, value }: any) => {
        console.log("global fn + cb",updated, value)
    });

    onAttached(() => {
        
        // @ts-ignore
    });

    const mix = () =>
        cx(
            nc(
                "k",
                css`
                    font-size: ${fontSize()}em;
                `
            ),
            nc(
                "l",
                css`
                    text-decoration: underline;
                `
            )
        );

    const clazz = () => nc("nm-1", mix());

    return () =>
        html`<div>helllllo ${name()} ${gval()}</div>
            <div class=${clazz()}>blablabla</div>`;
});
