'use strict';
const CleanCSS = require('clean-css');
const { css, styles } = require('csstag');

const addPlaceholders = strings =>
  strings.reduce(
    (result, string, index) => result + (index ? placeholder : '') + string,
    ''
  );

const objectExpression = (types, object) =>
  types.objectExpression(
    Object.entries(object).map(([key, value]) =>
      types.objectProperty(
        key.match(/(^\d|[^a-z0-9_$])/i)
          ? types.stringLiteral(key)
          : types.identifier(key),
        types.stringLiteral(value)
      )
    )
  );

const placeholder = '--babel-plugin-csstag-placeholder';

const templateLiteral = (types, strings, expressions) =>
  types.templateLiteral(
    strings.map(string =>
      types.templateElement({ cooked: string, raw: string })
    ),
    expressions
  );

module.exports = ({ types }, options = {}) => {
  const tag = options.tag || 'css';
  return {
    name: 'htm',
    visitor: {
      TaggedTemplateExpression: path => {
        if (path.node.tag.name === tag) {
          const exports = css(options, [
            addPlaceholders(
              path.node.quasi.quasis.map(expression => expression.value.raw)
            ),
          ]);
          path.replaceWith(
            types.callExpression(types.identifier(tag), [
              templateLiteral(
                types,
                new CleanCSS()
                  .minify(styles[styles.length - 1])
                  .styles.split(placeholder),
                path.node.quasi.expressions
              ),
              objectExpression(types, exports),
            ])
          );
        }
      },
    },
  };
};
