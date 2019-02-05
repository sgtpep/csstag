import localByDefault from 'postcss-modules-local-by-default';
import modulesParser from 'postcss-modules-parser';
import modulesScope from 'postcss-modules-scope';
import postcss from 'postcss';

export const append = function() {
  const style = document.createElement('style');
  style.textContent = (this || styles).join('\n');
  document.head.appendChild(style);
};

let process;
export const css = function(strings, ...keys) {
  process ||
    ({ process } = postcss([
      localByDefault(),
      modulesScope(),
      modulesParser(),
    ]));
  const result = process(
    strings
      .map((string, index) => (index ? keys[index - 1] : '') + string)
      .join('')
  );
  (this || styles).push(result.toString());
  return result.root.tokens;
};

export const reset = function() {
  return (this || styles).splice(0, (this || styles).length);
};

export const styles = [];

export default css;
