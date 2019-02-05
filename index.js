import App from './App.js';
import html, { render } from './html.js';

render(
  html`
    <${App}/ >
  `,
  document.body
);
