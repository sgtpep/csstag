'use strict';
const { css, styles } = require('csstag');

module.exports = ({ types }, options = {}) => {
  const tag = options.tag || 'css';
  return {
    name: 'htm',
    visitor: {
      TaggedTemplateExpression: path => {
        if (path.node.tag.name === tag) {
          if (path.node.quasi.quasis.length === 1) {
            path.replaceWith(
              types.callExpression(types.identifier(tag), [
                types.objectExpression(
                  Object.entries(
                    css(options, [path.node.quasi.quasis[0].value.raw])
                  ).map(([key, value]) =>
                    types.objectProperty(
                      key.match(/(^\d|[^a-z0-9_$])/i)
                        ? types.stringLiteral(key)
                        : types.identifier(key),
                      types.stringLiteral(value)
                    )
                  )
                ),
                types.stringLiteral(styles[styles.length - 1]),
              ])
            );
          } else {
            throw path.buildCodeFrameError(
              '`babel-plugin-csstag` can only process tagged templates without string interpolation. Consider using CSS custom properties instead (also known as CSS variables).'
            );
          }
        }
      },
    },
  };
};
