 # VengarlJs

VengarlJs is a small js library that allows you to easily create web components with the native custom elements API and manipulate them.
It's built on top of lit-html and is heavily inspired by careHtml and React.

```typescript
import { createComp } from "@elonbezos/vengarljs";

export default createComp("test-one", ({ html, props, onAttached, useState }) => {
    const [getNumber, setNumber] = useState(0);
    const [fontSize, setFontSize] = useState("1");
    setFontSize("2");

    onAttached(() => {
        console.log("props attached", props);
    });

    const incNumber = () => {
        setNumber((baseVal: string) => baseVal + 1);
    };

    return () =>
        html`<button @click=${incNumber} style="font-size: ${fontSize()}em">add</button>
            <span style="font-size: ${fontSize()}em">${getNumber()}</span>`;
});
```

## createComp

The imported function `createComp` is the bread and butter of the library, it requires 2 arguments (or 3 to make a root component, you will understand why later).
The first one is the name of the custom element with a "-" as required by the specification, 
the second one is a function that gets immediately executed with an object as argument.

The object contains different properties :

### 1. Lifecycle callbacks

```typescript
onAttached(() => {
   console.log(“element attached”);
});
```

every lifecycle function takes a function as argument.

`beforeFirstRender`: invoked before the first render of the component.

`beforeRender`: invoked before every render of the component.

`onRender`: invoked after every render of the component.

`onAttached`: invoked when `connectedCallback` is called.

`onRemove`: invoked when `disconnectedCallback` is called.


### 2. Hooks

```typescript
const [getFontSize, setFontSize] = useState("1");
setFontSize("5");
```

`useState`: takes anything as argument and returns a `[getter, setter]` pair.

`useGlobal`: takes a string as argument that needs to be a key of a store object and returns a `[getter, setter]` pair of the associated value.


Everytime a setter function is invoked, the return template function (from the first example) :

```typescript
return () =>
    html`<button @click=${incNumber} style="font-size: ${fontSize()}em">add</button>
        <span style="font-size: ${fontSize()}em">${getNumber()}</span>`;
```
is called and lit-html takes care of the rendering


### 3. Utilities

`query`: takes a string selector as argument and query an element inside the shadow-dom of the element.

```typescript
const foo = query("#bar");
```

`queryAll`: same as query but return an array of the matched elements.

`css`: a small very wip css in js solution. WIP


```typescript
const className = css`
       color: blue;
   `
return () => html`<button class=${className}>hello world</button>`
```

`rawCss`: used to inject raw css in a shadow-dom `<style></style>` element. WIP

```typescript
rawCss`
    @keyframes slidein {
       from {
         margin-left: 100%;
       }
       to {
         margin-left: 0%;
       }
     }
`;

```

`cx`: allows to conditionally attribute css classes or combines them (inspired by classNames from [JedWatson](https://github.com/JedWatson/classnames)). WIP

`nc`: takes an id and a css class as argument and allows to rebuild a class while replacing the previous css rules. WIP

`fetcher` a small addition to the fetch api build to handle multiple requests as one. WIP


### 4. Attributes / props / this

`attributes`: The attributes passed to the custom element with lit-html.

`props`: The properties passed to the custom element with lit-html.

`self`: The `this` referring to the custom element's context.


## Store

Vengarl can store data globally and make use of it as well as change it.

A store object can be created and imported as soon as possible (before any component using it are initialized)

store.js
```typescript
import { store } from "@elonbezos/vengarljs";
 
store.createGlobalState({ globalKey: "some global value"})
 
export default store.getGlobalState();
```

index.js
```typescript
import { createComp } from "@elonbezos/vengarljs";
import "./store";
```

Then it can be utilised this way: 

Read `globalKey`
```typescript
export default createComp("test-store", ({ html, useGlobal }) => {
    const [getName] = useGlobal("globalKey");
    return () => html` <div>${getName()}</div>`;
});
```

Read and set `globalKey`

```typescript
export default createComp("test-store", ({ html, useGlobal }) => {
   const [getName, setName] = useGlobal("globalKey");
   setName("something else");
   return () => html` <div>${getName()}</div>`;
});

```
`getName()` now returns `something else`.
 All the other components that subscribed to `globalKey` will also rerender with the new value.
 
Being build on top of lit-html, all the [lit-html syntaxe](https://lit-html.polymer-project.org/guide/writing-templates#add-event-listeners) is available for listening to events, passing props, ect...


## Quickstart guide

### 1: Installation

Instal the library `npm install @elonbezos/vengarljs`.


### 2: Create a root element

```typescript
import { createComp } from "@elonbezos/vengarljs";
import SomeComponent from "./examples/comp-switch-ex";
import SomeOtherComponent from "./examples/store-ex";

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
```

If you make use of a store, dont forget to add it in the imports.

Note: you dont need to import anything from this file if you just want to use the `useGlobal` feature in `createComp`.

```typescript
import "./store";
```

Notice the third argument of createComp `true`. This means that this is a root component that we write ourselfs in an index.html file.

```html
<body>
    <app-root></app-root>
</body>
```

The other components will be children of the root component.

For those familiar, this is close to the index.js generated by Create React App.


### 3. Create components !

```typescript
export const awesomeButton = createComp("awesome-button", ({ html }) => {
    return () => html`<button>this button is awesome</button>`;
});
```

...and use them in other files :

```typescript
import { awesomeButton } from "./components/awesomeButton";

export default createComp("add-comment", ({ html, useState }) => {

    return () => {
        return html`
            <button @click=${switchButton}>switch</button>
            <${awesomeButton}></${awesomeButton}>`;
    };
});
```

You can even swap between components :

```typescript
import { button1, button2 } from "./components/awesomeButton";

export default createComp("btn-switch", ({ html, useState }) => {
    const [btn, setBtn] = useState(button1);

    const switchButton = () => {
        setBtn(btn().name === "awesome-button1" ? button2 : button1);
    };

    return () => html`
       <button @click=${switchButton}>switch</button>
       <${btn()}></${btn()}>`;
});

```


## Suggestions

If you have any suggestions or comments to make, don't hesitate to open an issue, make a pr or contact me.

Also English isn't my first language so don't hesitate to tell me if the wording is incorrect.


___ 

Warning: this is a very unfinished, unpolished and probably buggy piece of code.

___

## Credits

[bishmish](https://github.com/bashmish/carehtml) for careHtml

Google polymer team for lit-html


