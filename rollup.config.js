import commonJS from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import nodeBuiltins from 'rollup-plugin-node-builtins';
import nodeResolve from 'rollup-plugin-node-resolve';
import { spawn } from 'child_process';

export default {
  input: 'src/index.js',
  output: {
    banner: `
const process = { argv: [], env: {} };
var global = typeof global === 'undefined' ? window : global;
`,
    file: 'dist/index.js',
    format: 'esm',
  },
  plugins: [
    {
      buildStart: () =>
        spawn('rm', [
          '-fr',
          'node_modules/postcss-modules-parser/node_modules/postcss',
        ]),
    },
    commonJS(),
    json(),
    nodeBuiltins(),
    nodeResolve(),
    {
      renderChunk: (code, chunk, options) => {
        const start = code.indexOf('\nvar container = ');
        const string = '\nunwrapExports(container);';
        const end = code.indexOf(string, start) + string.length;
        const position = code.indexOf('\nvar rule = ');
        return (
          code.slice(0, position) +
          code.slice(start, end) +
          code.slice(position, start) +
          code.slice(end)
        );
      },
    },
  ],
};
