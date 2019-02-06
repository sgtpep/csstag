import localByDefault from 'postcss-modules-local-by-default';
import modulesParser from 'postcss-modules-parser';
import modulesScope from 'postcss-modules-scope';
import postcss from 'postcss';

export const appendStyles = function() {
  const style = document.createElement('style');
  style.textContent = (this || styles).join('\n');
  document.head.appendChild(style);
};

let id = 1;
let instance;
export const css = function(strings, ...keys) {
  let options = {};
  Array.isArray(strings) ||
    ([options, strings, keys] = [strings, keys[0], keys.slice(1)]);
  instance ||
    (instance = postcss([
      ...(options.pluginsBefore || []),
      localByDefault(options.localByDefault),
      modulesScope(options.modulesScope),
      modulesParser(options.modulesParser),
      ...(options.plugins || []),
    ]));
  const result = instance.process(
    strings
      .map((string, index) => (index ? keys[index - 1] : '') + string)
      .join(''),
    {
      from: (options.prefix || 'style') + id++,
      ...options.process,
    }
  );
  (this || styles).push(result.toString());
  return result.root.tokens;
};

export const resetStyles = function() {
  return (this || styles).splice(0, (this || styles).length);
};

export const styles = [];

export default css;
