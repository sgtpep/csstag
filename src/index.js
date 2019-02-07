import localByDefault from 'postcss-modules-local-by-default';
import modulesParser from 'postcss-modules-parser';
import modulesScope from 'postcss-modules-scope';
import modulesValues from 'postcss-modules-values';
import postcss from 'postcss';

export const appendStyles = function() {
  const style = document.createElement('style');
  style.textContent = boundStyles.call(this).join('\n');
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
  let options = {};
  Array.isArray(strings) || ([options, strings, ...keys] = [strings, ...keys]);
  keys.length &&
    !options.ignoreInterpolation &&
    // eslint-disable-next-line no-console
    console.warn(
      '`csstag` discourages from using string interpolation in tagged templates, because it makes it impossible to strip off heavyweight `csstag` module on bundling for production using `babel-plugin-csstag`. To suppress this warning pass an option `ignoreInterpolation`.'
    );
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

export const resetStyles = function() {
  const boundStyles = boundStyles.call(this);
  return boundStyles.splice(0, boundStyles.length);
};

export const styles = [];

export default css;
