import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import commonJS from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  input: '.',
  output: {
    file: 'bundle.js',
    format: 'cjs',
  },
  plugins: [
    alias({
      csstag: 'node_modules/babel-plugin-csstag/csstag.js',
    }),
    babel({
      plugins: ['babel-plugin-csstag'],
      presets: ['@babel/env'],
    }),
    commonJS(),
    nodeResolve(),
  ],
};
