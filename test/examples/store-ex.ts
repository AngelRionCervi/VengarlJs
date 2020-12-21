import { createComp } from "../../src/main";

export default createComp("test-store", ({ html, useGlobal }) => {
    const [name, setName] = useGlobal("globalKey");
    setName("something else");
    return () => html` <div>${name()}</div>`;
});
