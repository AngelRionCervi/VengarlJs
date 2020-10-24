import { createComp, store, addGlobalCSS } from "../src/main";

const black = "darkgrey";

addGlobalCSS`
    body {
        background-color: ${black};
    }
    .globalText {
        margin: 50px;
    }
`;

createComp("test-comp", ({ createState, html, css, cx }: any) => {
    const {
        state: { name, cond },
        setState,
    } = createState({ name: "world", cond: true });
    setState("name", "world :)");

    const color = "red";
    const style = css`color: ${color}; font-size: 3em;`;
    const style2 = css`text-decoration: overline;`;

    const join1 = css`color: blue;`;
    const join2 = css`text-decoration: underline; font-size: 5em;`;

    return () =>
        html`<div class=${cx({ [cond]: cx(join2, style, style2) }) + " globalText"}>helllllo ${name}</div>
            <div class=${cx(join1, join2)}>blablabla</div>`;
});

createComp("test-comp2", ({ createState, html }: any) => {
    const {
        state: { name, cond },
        setState,
    } = createState({ name: "world", cond: true });
    setState("name", "world :)");

    return () =>
        html`<div>helllllo ${name}</div>
            <div>blablabla</div>`;
});
