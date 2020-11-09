import { createComp, store, addGlobalCSS } from "../src/main";

export default createComp("test-comp2", ({ createState, html, props, self, onAttached, css, nc, cx, attributes }: any) => {
    const { state, setState } = createState({ name: "world", cond: true, fontSize: 1 });
    setState("name", "world :)");
    console.log(props);
    console.log(attributes);
    onAttached(() => {
        console.log(props);
    });

    const mix = () =>
        cx(
            nc(
                "k",
                css`
                    font-size: ${state.fontSize}em;
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
        html`<div>helllllo ${state.name}</div>
            <div class=${clazz()}>blablabla</div>`;
});
