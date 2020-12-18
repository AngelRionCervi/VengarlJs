import { createComp } from "../src/main";

export default createComp("test-comp2", ({ html, props, onAttached, useState }) => {
    const [name, setName] = useState("hi :)");
    const [fontSize, setFontSize] = useState("1");

    setFontSize("5");

    onAttached(() => {
        console.log("props attached", props);
    });

    const incName = () => {
        setName((baseVal: string) => baseVal + " welcome");
    }

    return () =>
        html`<div style="font-size: ${fontSize()}em">helllllo world</div>
        <div @click=${incName}>${name()}</div>`;
});
