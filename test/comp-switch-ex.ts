import { createComp } from "../src/main";

const button1 = createComp("awesome-button1", ({ html }) => {
    return () => html`<button>button 1</button>`;
});

const button2 = createComp("awesome-button2", ({ html }) => {
    return () => html`<button>button 2 :^)</button>`;
});

export default createComp(
    "btn-switch",
    ({ html, useState }) => {
        const [btn, setBtn] = useState(button1);

        const switchButton = () => {
            setBtn(btn().name === "awesome-button1" ? button2 : button1);
        };

        return () => {
            return html`
            <button @click=${switchButton}>switch</button>
            <${btn()}></${btn()}>`;
        };
    }
);
