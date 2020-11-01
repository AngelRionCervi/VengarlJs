import { createComp, store, addGlobalCSS } from "../src/main";

createComp("test-comp2", ({ createState, html, props, self, onAttached }: any) => {
    const {
        state,
        setState,
    } = createState({ name: "world", cond: true });
    setState("name", "world :)");


    onAttached(() => {
        console.log(props())
    })

    
    return () =>
        html`<div>helllllo ${state.name}</div>
            <div>blablabla</div>`;
});