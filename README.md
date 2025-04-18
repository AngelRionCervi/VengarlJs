 # VengarlJs

VengarlJs is a small js library that allows you to easily create web components with the native custom elements API and manipulate them.
It's built on top of lit-html and is heavily inspired by careHtml and React.

```typescript
import { createComp } from "vengarljs";

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


## Quickstart guide

### 1. Installation

Instal the library `npm install vengarljs`.

### 2. Create a component

```typescript
export const awesomeButton = createComp("awesome-button", ({ html }) => {
    return () => html`<button>this button is awesome</button>`;
});
```

### 3. Create a root component

```typescript
import { createComp } from "vengarljs";
import { awesomeButton } from "./awesomeButton";

createComp(
    "app-root",
    ({ html }) => {
        return () => html`
        <div>hello world</div>
        <${awesomeButton}></${awesomeButton}>
        `;
    },
    true
);
```

Notice the third argument of createComp `true`. This means that this is a root component that we have to write ourselfs in an index.html file :

```html
<body>
    <app-root></app-root>
</body>
```

The other components will be children of the root component.

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

If you make use of a store (see below), dont forget to add it in the imports of the root component.

Note: you dont need to import anything from a store object if you just want to use the `useGlobal` feature in `createComp` calls.

```typescript
import "./store";
```

## createComp

The imported function `createComp` is the bread and butter of the library, it requires 2 arguments (or 3 to make a root component).
The first one is the name of the custom element with a "-" as required by the HTML specification, 
the second one is a function that gets executed with an object as argument.

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

`css`: a small css in js solution (see below in styling section).

`rawCss`: used to inject raw css in a shadow-dom `<style></style>` element.

`cx`: allows to conditionally attribute css classes or combines them into one (inspired by classNames from [JedWatson](https://github.com/JedWatson/classnames)).

`nc`: takes an id and a css class as argument and allows to rebuild a class while replacing the previous css rules.


### 4. Attributes / props / this

`attributes`: The attributes passed to the custom element with lit-html.

`props`: The properties passed to the custom element with lit-html.

`self`: The `this` referring to the custom element's context.


## Store

Vengarl can store data globally and make use of it as well as change it.

A store object can be created and imported as soon as possible (before any component using it are initialized)

store.js
```typescript
import { store } from "vengarljs";
 
store.createGlobalState({ globalKey: "some global value"})
 
export default store.getGlobalState();
```

index.js
```typescript
import { createComp } from "vengarljs";
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

Read and write `globalKey`
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

## Styling

Since Vengarl uses shadow dom, styling must be declared in the component itself.

To answer this, 3 functions are exported designed to make styling easy.

### css

css is a tag function that allow us to declare css rules and returns a generated class name to use in html.

```typescript
const style = css`
    font-size: 4em;
`;
```

### cx

cx allows to combine classes and output a new className.
It accepts either strings as arguments or objects with keys being the class names and values a boolean for conditional combining.

```typescript
const style1 = css`
        font-size: 4em;
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

const style = cx(style1, { [style2]: true, [style3]: true }, { [style4]: true });
```

### nc

The template being rerendered after each state change, generating a new class this way :

```typescript
const style1 = (size: number) => css`
    font-size: ${size}em;
`;

return () =>
     html`
        <div class=${style1(size)}>
            hey
        </div>
    `;
```

would add new lines in the components style element without replacing the old ones.
To prevent that we can use the nc function that identifies a set of css rules and replaces them when it gets called again.

```typescript
const style1 = (size: number) => nc("hey-text", css`
    font-size: ${size}em;
`);
```

(It would be cool to have this behavior as default, but I can't find a way to make this work without rewriting all the css rules of the component every time a class is regenrated).

### rawCss

As the name implies, it allows to inject raw css to the component's style element.

```typescript
rawCss`
    @keyframes slidein {
        from {
            width: 30%;
        }
        to {
            width: 100%;
        }
    }
`;
```

Useful for keyframes, font-face and media queries.

### addGlobalCss

Second named import of the library alongside createComp.

Allows the css to be available globally by all components (the styling is automatically copied in all component style elements).

```typescript
import { createComp, addGlobalCss } from "vengarljs";

addGlobalCss`
    @keyframes slidein {
        from {
            width: 30%;
        }
        to {
            width: 100%;
        }
    }
`;
```


## Suggestions

If you have any suggestions or comments to make, don't hesitate to open an issue, make a pr or contact me.

Also English isn't my first language so don't hesitate to tell me if the wording is incorrect.


___ 

Warning: this is a very unfinished, unpolished and probably buggy piece of code.

___

## Credits

bishmish for [careHtml](https://github.com/bashmish/carehtml);
jeanlescure for [short-unique-id](https://www.npmjs.com/package/short-unique-id);

Google polymer team for lit-html


