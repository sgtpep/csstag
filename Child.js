import css from './dist/index.mjs';
import html from './html.js';

export default () =>
  html`
    <div class=${styles.root}>TODO</div>
  `;

const styles = css`
  .root {
    color: gray;
  }
`;
