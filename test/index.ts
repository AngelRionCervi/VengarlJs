import { createComp, store } from "../src/main";

createComp("test-comp", ({ createState, html, css }: any) => {
    const { state, setState } = createState({name: "world"});
    setState("name", "world :)")

    const red = css`color: red;`

    return () => html`<div class=${red}>helllllo ${state.name}</div>`;
});
