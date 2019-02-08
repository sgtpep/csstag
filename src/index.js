import localByDefault from 'postcss-modules-local-by-default';
import modulesParser from 'postcss-modules-parser';
import modulesScope from 'postcss-modules-scope';
import modulesValues from 'postcss-modules-values';
import postcss from 'postcss';

export const appendStyles = function() {
  const style = document.createElement('style');
  style.textContent = popStyles.bind(this).join('\n');
  document.head.appendChild(style);
};

const base64 = string =>
  typeof btoa === 'undefined'
    ? // eslint-disable-next-line no-undef
      Buffer.from(string.toString()).toString('base64')
    : btoa(string);

const boundStyles = function() {
  return Array.isArray(this) ? this : styles;
};

let instance;
export const css = function(strings, ...keys) {
  if (typeof strings === 'string') {
    throw new Error(
      'When using `babel-plugin-csstag` you also need to alias the module `csstag` to `babel-plugin-csstag/csstag`.'
    );
  }
  let options = {};
  Array.isArray(strings) || ([options, strings, ...keys] = [strings, ...keys]);
  instance ||
    (instance = postcss([
      ...(options.pluginsBefore || []),
      modulesValues(options.modulesValues),
      localByDefault(options.localByDefault),
      modulesScope({
        generateScopedName: (name, path) =>
          `${options.prefix || 'csstag'}__${name}___${path.replace(/^\//, '')}`,
        ...options.modulesScope,
      }),
      modulesParser(options.modulesParser),
      ...(options.plugins || []),
    ]));
  const style = strings
    .map((string, index) => (index ? keys[index - 1] : '') + string)
    .join('');
  const result = instance.process(style, {
    from: base64(hashCode(style)).slice(0, 5),
    ...options.process,
  });
  boundStyles.call(this).push(result.toString());
  return result.root.tokens;
};

const hashCode = string =>
  [...string].reduce(
    (hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) | 0,
    0
  );

export const popStyles = function() {
  const boundStyles = boundStyles.call(this);
  return boundStyles.splice(0, boundStyles.length);
};

export const styles = [];

export default css;
