import { createComp } from "../../src/main";

export default createComp("test-one", ({ html, css, cx, nc, useState }) => {
    const style1 = (size: number) => css`
        font-size: ${size}em;
    `;

    const style2 = css`
        text-decoration: underline;
    `;

    const style3 = css`
        color: green;
    `;

    const style4 = css`
        text-shadow: 2px 2px blue;
    `;

    const [, update] = useState(null);
    setInterval(() => {
        update();
    }, 400)

    return () =>
        html`
            <div class=${nc("hey", cx(style1, { [style2]: true, [style3]: true }, { [style4]: true }))}>
                hey
            </div>
        `;
});
