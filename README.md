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
