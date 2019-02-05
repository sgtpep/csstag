import localByDefault from 'postcss-modules-local-by-default';
import modulesParser from 'postcss-modules-parser';
import modulesScope from 'postcss-modules-scope';
import postcss from 'postcss';

export const append = () => {
  const style = document.createElement('style');
  style.textContent = styles.join('\n');
  document.head.appendChild(style);
};

export const styles = [];

export default (strings, ...keys) => {
  const result = postcss([
    localByDefault(),
    modulesScope(),
    modulesParser(),
  ]).process(
    strings
      .map((string, index) => (index ? keys[index - 1] : '') + string)
      .join('')
  );
  styles.push(result.toString());
  return result.root.tokens;
};
