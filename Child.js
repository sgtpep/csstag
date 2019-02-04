import css from './css.js';
import html from './html.js';

export default () =>
  html`
    <div class=${style.root}>TODO</div>
  `;

const styles = css`
  .root {
    color: gray;
  }
`;
