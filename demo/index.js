import css, { appendStyles } from '../index.min.js';

const styles = css`
  @value color: red;

  :global(body) {
    bottom: 0;
    display: flex;
    flex-direction: column;
    left: 0;
    margin-top: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  .outlined {
    border: 3px solid color;
  }

  .frame {
    composes: outlined;
    flex: 1;
  }
`;

document.body.innerHTML += `
  <iframe class="${styles.frame}" src="index.js"></iframe>
`;
appendStyles();
