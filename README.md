## @maroun-baydoun/use-media-query
##### Listen to media query matches in React

[![npm version](https://badge.fury.io/js/%40maroun-baydoun%2Fuse-media-query.svg)](https://badge.fury.io/js/%40maroun-baydoun%2Fuse-media-query)


#### Install

```
npm i @maroun-baydoun/use-media-query
```
Or

```
yarn add @maroun-baydoun/use-media-query
```

> expects  `react >= 16.8.0` to be installed as a peer dependency.

#### Use

```ts
import useMediaQuery from "@maroun-baydoun/use-media-query";

const MyComponent = () => {

    const matches = useMediaQuery("only screen and (min-width: 1024px)");

    return matches ? "It matches!" : "No match (yet)";
}
```

#### Browser Compatibility

This library relies on the `window.matchMedia` API. Compatible browsers can be found  [here](https://caniuse.com/#feat=matchmedia "Can I use matchMedia?"). 