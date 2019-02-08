import css, { appendStyles } from '../index.min.js';

const color = '#2980b9';
const styles = css`
  @value radius: 0.5em;

  .outlined {
    border-radius: radius;
    border: 3px solid ${color};
  }

  .frame {
    composes: outlined;
  }
`;

css`
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

  :global(body) > :last-child {
    flex: 1;
  }
`;

appendStyles();
document.body.innerHTML += `
  <iframe class="${styles.frame}" src="index.js"></iframe>
`;
