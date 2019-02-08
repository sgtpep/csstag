import css, { styles as allStyles } from 'csstag';

const color = 'red';
const styles = css`
  .foo {
    color: ${color};
  }
`;
console.log(styles);
console.log(allStyles[0]);
