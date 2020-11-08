import { createComp, store, addGlobalCSS } from "../src/main";

createComp("test-comp2", ({ createState, html, props, self, onAttached, css, nc, cx }: any) => {
    const { state, setState } = createState({ name: "world", cond: true, fontSize: 1 });
    setState("name", "world :)");

    onAttached(() => {
        console.log(props());
        setInterval(() => {
            setState("fontSize", state.fontSize + 1);
        }, 1000);
    });

    const mix = () => cx(
        nc("k", css`
            font-size: 5em;
        `),
        nc("l", css`
            text-decoration: underline;
        `)
    )

    const clazz = () =>
        nc(
            "nm-1",
            mix()
        );

    return () =>
        html`<div>helllllo ${state.name}</div>
            <div class=${clazz()}>blablabla</div>`;
});
