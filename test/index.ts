import { createComp, store } from "../src/main";

createComp("test-comp", ({ createState, html, css: dd }: any) => {
    const { state, setState } = createState({name: "world"});
    setState("name", "world :)")

    const red = dd`color: red; font-size: 4em;`

    return () => html`<div class=${red}>helllllo ${state.name}</div>`;
});
