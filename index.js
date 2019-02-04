import requireCSSModule from './require-css-module.js';

const css = `
.root {
  color: red;
}
`;
const styles = requireCSSModule(css);
console.log(styles);
console.log(styles.toString());

//console.log(requireCSSModule(, {}));
//import App from './App.js';
//import html from './html.js';
//import { render } from '../node_modules/preact/dist/preact.mjs';
//
//render(
//  html`
//    <App/ >
//  `,
//  document.body
//);
