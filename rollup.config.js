import commonJS from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import nodeBuiltins from 'rollup-plugin-node-builtins';
import nodeResolve from 'rollup-plugin-node-resolve';
import virtual from 'rollup-plugin-virtual';
import { spawn } from 'child_process';
import { terser } from 'rollup-plugin-terser';

const banner = `
var process = typeof process === 'undefined' ? { argv: [], env: {} } : process;
var global = typeof window === 'undefined' ? typeof global === 'undefined' ? typeof self === 'undefined' ? {} : self : global : window;
`;

export default {
  input: 'src/index.js',
  onwarn: message =>
    message.message.startsWith('Circular dependency:') ||
    // eslint-disable-next-line no-console
    console.warn(message.toString()),
  output: [
    {
      exports: 'named',
      file: 'index.cjs.min.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      banner,
      file: 'index.esm.min.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    {
      buildStart: () =>
        spawn('rm', [
          '-fr',
          'node_modules/postcss-modules-parser/node_modules/postcss',
        ]),
    },
    virtual(
      ['chalk', 'source-map', 'supports-color'].reduce(
        (option, id) => ({ ...option, [id]: '' }),
        {}
      )
    ),

    commonJS(),
    json(),
    nodeBuiltins(),
    nodeResolve(),

    {
      name: 'patch',
      renderChunk: code => ({
        code: [['container', 'rule'], ['cssSyntaxError', 'input']].reduce(
          (code, [name1, name2]) => {
            const start = code.indexOf(`\nvar ${name1} = `);
            const string = `\nunwrapExports(${name1});`;
            const end = code.indexOf(string, start) + string.length;
            const position = code.indexOf(`\nvar ${name2} = `);
            return (
              code.slice(0, position) +
              code.slice(start, end) +
              code.slice(position, start) +
              code.slice(end)
            );
          },
          code
        ),
        map: null,
      }),
    },

    terser(),
  ],
};
