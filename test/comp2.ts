import { createComp, store, addGlobalCSS } from "../src/main";

import gState from "./state";

export default createComp("test-comp2", ({ createState, html, props, self, onAttached, css, nc, cx, attributes, useGlobal }: any) => {
    const { state, setState } = createState({ name: "world", cond: true, fontSize: 1, globalKey: useGlobal("globalKey") });
    setState("name", "world :)");

    onAttached(() => {
        // @ts-ignore
        gState.setGlobal("globalKey", "secondValue :)")
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
        html`<div>helllllo ${state.name} ${state.globalKey}</div>
            <div class=${clazz()}>blablabla</div>`;
});
