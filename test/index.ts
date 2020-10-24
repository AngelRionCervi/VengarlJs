import { createComp, store, addGlobalCSS } from "../src/main";

const black = "black";

addGlobalCSS`
    body {
        background-color: ${black};
    }
`

createComp("test-comp", ({ createState, html, css: dd }: any) => {
    const { state, setState } = createState({name: "world"});
    setState("name", "world :)")

    const color = "red";
    const style = dd`color: ${color}; font-size: 4em;`

    return () => html`<div class=${style}>helllllo ${state.name}</div>`;
});
