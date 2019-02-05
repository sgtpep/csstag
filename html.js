import htm from './node_modules/htm/dist/htm.mjs';
import { h } from './node_modules/preact/dist/preact.mjs';

export * from './node_modules/preact/dist/preact.mjs';
export const html = htm.bind(h);
export { default as css, append as appendStyles } from './index.min.js';
export default html;
