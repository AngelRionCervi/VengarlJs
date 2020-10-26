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

createComp("test-comp", ({ createState, html, css, cx, fetcher, beforeFirstRender }: any) => {
    const {
        state: { name, cond },
        setState,
    } = createState({ name: "world", cond: true });
    setState("name", "world :)");

    const color = "red";
    const style = css`
        color: ${color};
        font-size: 3em;
    `;
    const style2 = css`
        text-decoration: overline;
    `;

    const join1 = css`
        color: blue;
    `;
    const join2 = css`
        text-decoration: underline;
        font-size: 5em;
    `;

    beforeFirstRender(() => {
        const { req, loading, getResponse } = fetcher(
            {
                get1: "https://jsonplaceholder.typicode.com/todos/1",
                get2: "https://jsonplaceholder.typicode.com/todos/2",
            },
            {},
            true
        );
        req.then((res: any) => {
            console.log(res, getResponse())
        })

        const [get, post] = fetcher("http://dummy.restapiexample.com/api/v1");

        

        get(["/employee/1", "/employee/3"], ({ req, isLoading, getResponse }: any) => {
            console.log(isLoading());
            console.log(getResponse());
            req.then((res: any) => {
                console.log("res", res);
                console.log(isLoading());
                console.log(getResponse());
            });
        });

        // console.log(loading())
        // req.then((res: any) => {
        //     console.log(res)
        //     console.log(loading())
        // })

        // const [ get, post ] = fetcher('https://jsonplaceholder.typicode.com', {});

        // get("/todos/1", async ({req, loading, response}: any) => {
        //     console.log(loading())
        //     const data = await req;
        //     console.log(loading(), data, response())
        // })
        // get("/todos/2", async ({req, loading, response}: any) => {
        //     const data = await req;
        //     //console.log(data, response)
        // })

        // get("/todos/1").then((data: any) => {
        //     console.log("getTodo/1", getResponse(), data)
        // })
        // get("/todos/2").then((data: any) => {
        //     console.log("getTodo/2", getResponse(), data)
        // })
        // post({somedata: "yes"}, "/posts").then((data: any) => {
        //     console.log("post todos1", getResponse(), data)
        // })
    });

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
