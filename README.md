# HashScroll

Finds all #hash links and scrolls on click to matching element with `id="hash"`.  
Use with JavaScript or TypeScript.

## Install

```sh
npm -i @sunixzs/hashscroll
```

... or ...

```sh
yarn add @sunixzs/hashscroll
```

## Use

```ts
const hs = require("@sunixzs/hashscroll");

new hs.HashScroll();
```

... or ...

```ts
import { HashScroll } from "@sunixzs/hashscroll";

new HashScroll();
```

## API

```ts
/**
 * @param topOffset Either a number: 'space to top window border' or an element to get the height from before scrolling.
 * @param linkElementsOrSelector Either anchor elements or a selector string link "nav a"
 */
constructor(
    topOffsetOrElement: number | Element = 0,
    linkElementsOrSelector: NodeListOf<HTMLAnchorElement> | string = "a"
){}

/**
 * Setter for 'space to top'
 * @param topOffsetOrElement Either a number: 'space to top window border' or an element to get the height from before
 */
setTopOffset(topOffsetOrElement: number | Element): this {}

/**
 * Checks, if the hash in href of a link has a target element.
 * @param link
 */
linkTarget(link: Element): Element | null {}

/**
 * Scrolls the page to the target element.
 * @param target
 */
scrollTo(target: Element | null): void {}
```

## Example with some options

```ts
const hs = require("@sunixzs/hashscroll");

let hashScroll = new hs.HashScroll(0, "nav a");

const setTop = function () {
    let header = document.querySelector("header");
    hashScroll.setTopOffset(header ? header.clientHeight : 0);
};

let t = 0;
window.addEventListener("resize", function () {
    if (t) {
        window.clearTimeout(t);
    }
    t = window.setTimeout(setTop, 100);
});
```

Or let the script observe the header height:

```ts
const hs = require("@sunixzs/hashscroll");

let hashScroll = new hs.HashScroll(document.querySelector("header"), "nav a");
```
