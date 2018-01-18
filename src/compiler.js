const tokenizer = require('./tokenizer');
const { parser } = require('./parser');
const codeGenerator = require('./code-generator');
const transformer = require('./transformer');
const Ajv = require('ajv');

const schema = {
  type: 'object',
  properties: {
    parser: {
      type: 'object',
    },
    'code-generator': {
      type: 'object',
      properties: {
        'soft-line-break': {
          enum: [ 'spaces', 'line-break', 'hard-line-break' ],
        },
      },
      required: [ 'soft-line-break' ],
    },
    transformer: {
      type: 'object',
    },
  },
  required: [ 'code-generator' ],
};

const defaultConfig = {
  'code-generator': {
    'soft-line-break': 'spaces',
  },
};

function compiler(markdown, config, enableDefaultConfig = true) {
  const _config = !config && enableDefaultConfig ? defaultConfig : config;

  const ajv = new Ajv({ allErrors: true });
  const configIsValid = ajv.validate(schema, _config);
  if (!configIsValid) {
    throw new Error(
      ajv.errorsText(null, { dataVar: 'config', separator: ',\n' })
    );
  }

  return codeGenerator(
    transformer(
      parser(
        tokenizer(
          markdown
        )
      )
    ),
    _config['code-generator']
  );
}

module.exports = compiler;
