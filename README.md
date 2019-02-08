# csstag

[![Build Status](https://travis-ci.org/sgtpep/csstag.svg?branch=master)](https://travis-ci.org/sgtpep/csstag)

[Tagged template](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates) for [CSS Modules](https://github.com/css-modules/css-modules):

```javascript
import css from 'csstag';
const styles = css`.root { color: red; }`;
<div class={styles.root}></div>
```

Demo: https://sgtpep.github.io/csstag/demo/.

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
