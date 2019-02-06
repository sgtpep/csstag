import css, { appendStyles } from '../index.min.js';

const styles = css`
  :global(html),
  :global(body),
  .frame {
    height: 100%;
  }

  :global(body) {
    margin: 0;
  }

  .frame {
    border: 3px solid red;
    box-sizing: border-box;
    display: block;
    width: 100%;
  }
`;

document.body.innerHTML = `
  <iframe class="${styles.frame}" src="index.js"></iframe>
`;
appendStyles();
