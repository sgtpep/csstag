'use strict';
const { css } = require('icss');

module.exports = ({ types }, options = {}) => {
  const tag = options.tag || 'css';
  return {
    name: 'htm',
    visitor: {
      TaggedTemplateExpression: path => {
        if (path.node.tag.name === tag) {
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
            console.error(
              path.buildCodeFrameError(
                'babel-plugin-icss can only process tagged templates without string interpolation. Consider using CSS custom properties (variables) instead.'
              ).toString()
            );
            process.exit(1)
          }
        }
      },
    },
  };
};
