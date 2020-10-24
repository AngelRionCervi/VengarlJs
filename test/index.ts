import { createComp, store } from "../src/main";

store.createGlobalState({
    car: "Nissan GTR",
});

const gState = store.getGlobalState();

createComp("test-comp", ({ createState, html, useGlobal, css }: any) => {
    const { state, setState } = createState({ name: "world", car: useGlobal("car"), carShown: false });
    setState("name", "world :)");

    const showCar = () => {
        if (!state.carShown) {
            setState("carShown", true);
        } else {
            setState("carShown", false);
        }
    };

    const buttonStyles = css`
        color: white;
        font-size: 16px;
        background-color: blue;
        &:hover {
            background-color: purple;
        }
    `;

    return () =>
        html`<div
                class=${css`
                    background-color: hotpink;
                    &:hover {
                        color: blue;
                    }
                `}
            >
                helllllo ${state.name}
            </div>
            <p>
                ${(() => {
                    if (state.carShown) return html`${state.car}`;
                    else return "";
                })()}
            </p> `;
});
// <!-- <button class=${buttonStyles} @click=${showCar}>${state.carShown ? "hide card" : "show car"}</button> -->