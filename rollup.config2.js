import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';

export default {
  input: 'main.js',
  output: {
    file: 'temp.js',
    format: 'iife',
  },
  plugins: [
    alias({ './index.min.js': './babel-plugin-icss/stub.js' }),
    babel({
      plugins: ['./babel-plugin-icss'],
      presets: ['@babel/env'],
    }),
  ],
};
