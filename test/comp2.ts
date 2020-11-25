import { createComp, store, addGlobalCSS } from "../src/main";
import { button } from "./index";


export default createComp("test-comp2", ({ html, props, onAttached, css, nc, cx, useGlobal, useState }: any) => {
    const [name, setName] = useState("hello :)");
    const [fontSize, setFontSize] = useState("1");
    //const [gval, setGval] = useGlobal("globalKey");
    
    console.log("PROSP BEFORE", props)
    setName((baseVal: any) => baseVal + " welcome", ({updated, value}: any) => {
        console.log("local fn + cb", updated, value)
    });
    setFontSize("5");

    // setGval((oldval: any) => oldval + " ::::::::)", ({ updated, value }: any) => {
    //     //console.log("global fn + cb",updated, value)
    // });

    onAttached(() => {
        console.log("PROSP ATTACHED", props)
    });

    const mix = () =>
        cx(
            nc(
                "k",
                css`
                    font-size: ${fontSize}em;
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
        html`<div>helllllo</div>
            <div>blablabla</div>
            <${button}></${button}>
            <slot></slot>`;
});
