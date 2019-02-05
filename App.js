import Child from './Child.js';
import css from './dist/index.mjs';
import html from './html.js';

export default () =>
  html`
    <div class=${styles.root}><${Child} /></div>
  `;

const styles = css`
  .root {
    border: 1px solid;
  }
`;
