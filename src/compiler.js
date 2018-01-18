const tokenizer = require('./tokenizer');
const { parser } = require('./parser');
const codeGenerator = require('./code-generator');
const transformer = require('./transformer');

const defaultConfig = {
  'code-generator': {
    'soft-line-break': 'spaces',
  },
};

function compiler(markdown, config = defaultConfig) {

  // Validation

  return codeGenerator(
    transformer(
      parser(
        tokenizer(
          markdown
        )
      )
    ),
    config['code-generator']
  );
}

module.exports = compiler;
