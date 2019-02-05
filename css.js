import requireCSSModule from './require-css-module.js';

export default (strings, ...keys) => {
  const styles = requireCSSModule(
    strings
      .map((string, index) => (index ? keys[index - 1] : '') + string)
      .join('')
  );
  console.log(styles.toString());
  return styles;
};
