import App from './App.js';
import html, { render } from './html.js';
import { append } from './dist/index.js';

append();
render(
  html`
    <${App}/ >
  `,
  document.body
);
