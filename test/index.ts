import { createComp } from "../src/main";
import SomeComponent from "./comp-switch-ex";

createComp(
    "app-root",
    ({ html }) => {
        return () => html`
        <${SomeComponent}></${SomeComponent}>`;
    },
    true
);
