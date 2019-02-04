import requireCSSModule from './require-css-module.js';

export default (strings, ...keys) =>
    strings
      .map((string, index) => (index ? keys[index - 1] : '') + string)
      .join('')
