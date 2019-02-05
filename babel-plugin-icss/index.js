'use strict';
const { css } = require('icss');

module.exports = ({ types }, options = {}) => {
  const tag =
    options.tag && options.tag[0] === '/'
      ? new RegExp(
          options.tag.replace(/^\/(.*)\/.*?$/, '$1'),
          options.tag.replace(/^\/.*\//, '')
        )
      : options.tag || 'css';
  return {
    name: 'htm',
    visitor: {
      TaggedTemplateExpression: path => {
        if (
          typeof tag === 'string'
            ? path.node.tag.name === tag
            : tag.test(path.node.tag.name)
        ) {
          if (path.node.quasi.quasis.length === 1) {
            path.replaceWith(
              types.objectExpression(
                Object.entries(css([path.node.quasi.quasis[0].value.raw])).map(
                  ([key, value]) =>
                    types.objectProperty(
                      key.match(/(^\d|[^a-z0-9_$])/i)
                        ? types.stringLiteral(key)
                        : types.identifier(key),
                      types.stringLiteral(value)
                    )
                )
              )
            );
          } else {
            console.warn(
              path.buildCodeFrameError(
                'babel-plugin-icss can only process tagged templates without string interpolation. Use CSS custom properties (variables) instead.'
              )
            );
            path.remove();
          }
        }
      },
    },
  };
};
