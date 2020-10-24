import { createComp, store, addGlobalCSS } from "../src/main";

const black = "darkgrey";

addGlobalCSS`
    body {
        background-color: ${black};
    }
`;

createComp("test-comp", ({ createState, html, css: dd, cx }: any) => {
    const { state, setState } = createState({ name: "world", cond: true });
    setState("name", "world :)");

    const color = "red";
    const style = dd`color: ${color}; font-size: 4em;`;
    const style2 = dd`text-decoration: underline;`;

    const join1 = dd`color: blue;`;
    const join2 = dd`text-decoration: underline; font-size: 5em;`;

    return () =>
        html`<div class=${cx({ [state.cond]: [style, style2] })}>helllllo ${state.name}</div>
            <div class=${cx(join1, join2)}>blablabla</div>`;
});
