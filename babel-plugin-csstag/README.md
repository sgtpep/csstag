# babel-plugin-csstag

[![Build Status](https://travis-ci.org/sgtpep/csstag.svg?branch=master)](https://travis-ci.org/sgtpep/csstag)

[Babel](https://babeljs.io/) plugin for transpiling [csstag](https://github.com/sgtpep/csstag)'s `css` tag function calls to static CSS for production.

You can find examples for [rollup](https://rollupjs.org/) and [webpack](https://webpack.js.org/) here: https://github.com/sgtpep/csstag/tree/master/babel-plugin-csstag/examples.

## Usage with rollup

In `rollup.config.js` override imports of `csstag` with a replacement stub script `node_modules/babel-plugin-csstag/csstag.js` (replace an object key `csstag` with an exact import path that you used in your app, which may also be `'./node_modules/csstag/index.min.js'`):

```javascript
import alias from 'rollup-plugin-alias';
...
  plugins: {
    ...
    alias({
      csstag: 'node_modules/babel-plugin-csstag/csstag.js',
    }),
    ...
  },
...
```

In `rollup.config.js` enable a Babel plugin `babel-plugin-csstag`:

```javascript
import babel from 'rollup-plugin-babel';
...
  plugins: {
    ...
    babel({
      plugins: ['babel-plugin-csstag'],
      presets: ['@babel/env'],
    }),
    ...
  },
...
```

## Usage with webpack

In `webpack.config.js` override imports of `csstag` with a replacement stub script `babel-plugin-csstag/csstag`:

```javascript
...
  resolve: {
    alias: {
      csstag: 'babel-plugin-csstag/csstag',
    },
  },
...
```

In `webpack.config.js` enable a Babel plugin `babel-plugin-csstag`:

```javascript
import babel from 'rollup-plugin-babel';
...
  module: {
    rules: [
      ...
      {
        exclude: /\/node_modules\//,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['babel-plugin-csstag'],
            presets: ['@babel/env'],
          },
        },
      },
      ...
    ],
  },
...
```

## Options

To pass options add an object with them to your Babel config:

```javascript
...
plugins: ['babel-plugin-csstag', { tag: 'custom' }],
...
```

- `tag`: A name of a tag function if you used something other than `css` (default: `css`).

All other provided options will be passed to `csstag` as is. They should be the same as ones you used in runtime if any.
