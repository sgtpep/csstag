import css, { styles as allStyles } from 'csstag';

const color = 'red';
const styles = css`
  .foo {
    color: ${color};
  }
`;
// eslint-disable-next-line no-console
console.log(styles);
// eslint-disable-next-line no-console
console.log(allStyles[0]);
