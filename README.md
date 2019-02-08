# csstag

[![Build Status](https://travis-ci.org/sgtpep/csstag.svg?branch=master)](https://travis-ci.org/sgtpep/csstag)

[Tagged template](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates) for [CSS Modules](https://github.com/css-modules/css-modules):

```javascript
import css from 'csstag';
const styles = css`
  .root {
    color: red;
  }
`;
<div class={styles.root} />;
```

Demo: https://sgtpep.github.io/csstag/demo/.

## Benefits over other CSS-in-JS libraries

- The majority of of [CSS-in-JS](https://github.com/tuchk4/awesome-css-in-js) libraries are opinionated and bloated, while `csstag` relies only on [CSS Modules](https://github.com/css-modules/css-modules) which is a widely adopted and well-understood open specification very close to standard CSS with a number of implementations.
- With CSS Modules you can write any valid CSS.
- It's framework ignostic and may be used together with [React](https://reactjs.org/), [Preact](https://preactjs.com/), any other library or framework or no framework at all.
- Has zero dependencies (it made possible by bundling them in one file).
- Provided also as a native ES module which can be imported directly in browser without bundlers: `import css from './node_modules/csstag/index.min.js';` or `import css from 'https://unpkg.com/csstag';`
- Can by transpiled away on building for production and replaced with static CSS using a [Babel](https://babeljs.io/) plugin [babel-plugin-csstag](https://github.com/sgtpep/csstag/tree/master/babel-plugin-csstag).

## Installation

### Using `npm`

```shell
npm install csstag
```

### Using `yarn`

```shell
yarn add csstag
```

## Importing

### From Node.js

```shelljavascript
const { css } = require('csstag');
```

Or from `.mjs`:

```javascript
import css from 'csstag';
```

### From a bundler ([webpack](https://webpack.js.org/), etc.)

```javascript
import css from 'csstag';
```

### From a browser

If you don't use a bundler ([webpack](https://webpack.js.org/), etc.) but prefer native [ES6 modules](http://exploringjs.com/es6/ch_modules.html) instead (`<script type="module"></script>`):

```javascript
import css from './node_modules/csstag/index.min.js';
```

Or use [unpkg](https://unpkg.com/) CDN:

```javascript
import css from 'https://unpkg.com/csstag';
```

## Usage

Once imported you can declare a CSS module as a tagged template using the tag function `css`:

```javascript
import css, { appendStyles } from 'csstag';

const styles = css`
  .foo {
    color: red;
  }
  .bar {
    color: blue;
  }
`;
```

It returns an object with all exported class names in it:

```javascript
console.log(styles);
// outputs: { foo: 'csstag__foo___LTk0O', bar: 'csstag__bar___LTk0O' }
```

The module `csstag` contains the array of compiled styles called `styles` which gets populated with a new item every time `css` tag function is being called and now contains:

```javascript
[
  `.csstag__foo___LTk0O {
    color: red;
  }
  .csstag__bar___LTk0O {
    color: blue;
  }`,
];
```

You may want to append all newly added items from that array as a style sheet as `<style>` in your document's `<head>` using the function `appendStyles` imported earlier (in React-like projects it makes sense to call it together with `render()` in your entry point):

```javascript
appendStyles();
```

If you're using [Prettier](https://prettier.io/) it will format the CSS code inside `css` tag function.

`csstag` itself comes as a bundle containing some heavy-weight packages like [PostCSS](https://postcss.org/) and has a size of ~100K minimized. To exclude it from your production code and leave only transpiled styles you might use a [Babel](https://babeljs.io/) plugin [babel-plugin-csstag](https://github.com/sgtpep/csstag/tree/master/babel-plugin-csstag).

## API

- `css`: A main tag function itself which can by imported as a default or named import.
- `appendStyles()`: Appends all style sheets built from recent uses of `css` tag function as `<style> in your document's`<head>`. The consecutive calls to this function will produce no effect until next calls to`css`tag function. Uses`popStyles()` internally.
- `popStyles()`: Empties and returns a list of style sheets built from recent uses of `css` tag function.
- `styles`: A list of recently built style sheets for a direct access.

If you don't like storing a list of built style sheets in `csstag` module's `styles` array, or you're dealing, for instance, with multiple applications at once, you may create new functions bound to any other array using `.bind()`:

```javascript
import csstag, { appendStyles } from 'csstag';

const styles = [];
const css = csstag.bind(styles);
css`
  .root {
    color: red;
  }
`;
appendStyles.bind(styles)();
```

## Options

TODO
