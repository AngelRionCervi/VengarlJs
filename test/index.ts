import { createComp } from "../src/main";
import SomeComponent from "./examples/comp-switch-ex";
import SomeOtherComponent from "./examples/style-ex";
import "./state";

createComp(
    "app-root",
    ({ html }) => {
        return () => html`
        <${SomeComponent}></${SomeComponent}>
        <${SomeOtherComponent}></${SomeOtherComponent}>
        `;
    },
    true
);
