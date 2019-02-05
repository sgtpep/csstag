import App from './App.js';
import html, { appendStyles, render } from './html.js';

appendStyles();
render(
  html`
    <${App}/ >
  `,
  document.body
);
