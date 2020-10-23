import { createComp, store } from "../src/main";

createComp("test-comp", ({ createState, html }: any) => {
    const { state, setState } = createState({name: "world"});
    setState("name", "world :)")

    return () => html`helllllo ${state.name}`;
});
