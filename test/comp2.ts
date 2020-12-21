import { createComp } from "../src/main";

export default createComp("test-one", ({ html, props, onAttached, useState }) => {
    const [getNumber, setNumber] = useState(0);

    const [fontSize, setFontSize] = useState("1");
    setFontSize("2");

    onAttached(() => {
        console.log("props attached", props);
    });

    const incNumber = () => {
        setNumber((baseVal: string) => baseVal + 1);
    };

    return () =>
        html`<button @click=${incNumber} style="font-size: ${fontSize()}em">add</button>
            <span style="font-size: ${fontSize()}em">${getNumber()}</span>`;
});
