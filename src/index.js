import localByDefault from 'postcss-modules-local-by-default';
import modulesParser from 'postcss-modules-parser';
import modulesScope from 'postcss-modules-scope';
import postcss from 'postcss';

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
  console.log(result.toString());
  return result.root.tokens;
};
