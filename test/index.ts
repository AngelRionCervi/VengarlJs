import { createComp, store, addGlobalCSS } from "../src/main";
import "./state";
import comp2 from "./comp2";

const black = "darkgrey";

addGlobalCSS`
    body {
        background-color: ${black};
    }
    .globalText {
        margin: 50px;
    }
`;

export const button = createComp("awesome-button", ({html, props}: any) => {
    return () => html`<button>awesome</button>`
})

createComp("test-comp", ({ createState, html, css, cx, fetcher, beforeFirstRender, rawCss, scopedComp, useGlobal }: any) => {

    const [global, setGlobal] = useGlobal("globalKey");

    const style = css`
        font-size: 3em;
    `;

    const join1 = css`
        color: blue;
    `;

    const join2 = css`
        font-size: 5em;
    `;


    rawCss`
    p {
        animation-duration: 1s;
        animation-name: slidein;
      }
      
      @keyframes slidein {
        from {
          margin-left: 100%;
          width: 300%;
        }
        75% {
          font-size: 300%;
          margin-left: 25%;
          width: 150%;
        }
      
        to {
          margin-left: 0%;
          width: 100%;
        }
      }`;

    const getStyle = () => {
        return css`
            font-size: 3em;
        `;
    };
    const hihi = () => {
        console.log("hihi");
    };
    
    return () => {
        return html`<div>${global()} in another comp</div>
        <${comp2} someAttr="someValue" .props=${{hihi}}></${comp2}>`
    }
        
}, true);

// <${comp2} someAttr="someValue" .props=${{hihi}}></${comp2}>

// beforeFirstRender(() => {
//     // const { req, loading, getResponse } = fetcher(
//     //     {
//     //         get1: "https://jsonplaceholder.typicode.com/todos/1",
//     //         get2: "https://jsonplaceholder.typicode.com/todos/2",
//     //     },
//     //     {},
//     //     true
//     // );
//     // req.then((res: any) => {
//     //     console.log(res, getResponse());
//     // })

//     // const [get, post] = fetcher("http://dummy.restapiexample.com/api/v1");

//     // get(["/employee/1", "/employee/3"], ({ req, isLoading, getResponse }: any) => {
//     //     console.log(isLoading());
//     //     console.log(getResponse());
//     //     req.then((res: any) => {
//     //         console.log("res", res);
//     //         console.log(isLoading());
//     //         console.log(getResponse());
//     //     });
//     // });

//     // console.log(loading())
//     // req.then((res: any) => {
//     //     console.log(res)
//     //     console.log(loading())
//     // })

//     // const [ get, post ] = fetcher('https://jsonplaceholder.typicode.com', {});

//     // get("/todos/1", async ({req, loading, response}: any) => {
//     //     console.log(loading())
//     //     const data = await req;
//     //     console.log(loading(), data, response())
//     // })
//     // get("/todos/2", async ({req, loading, response}: any) => {
//     //     const data = await req;
//     //     //console.log(data, response)
//     // })

//     // get("/todos/1").then((data: any) => {
//     //     console.log("getTodo/1", getResponse(), data)
//     // })
//     // get("/todos/2").then((data: any) => {
//     //     console.log("getTodo/2", getResponse(), data)
//     // })
//     // post({somedata: "yes"}, "/posts").then((data: any) => {
//     //     console.log("post todos1", getResponse(), data)
//     // })
// });
