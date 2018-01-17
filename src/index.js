const tokenizer = require('./tokenizer');
const { parser } = require('./parser');
const traverser = require('./traverser');
const transformer = require('./transformer');
const codeGenerator = require('./code-generator');
const compiler = require('./compiler');

module.exports = {
  compiler,
  tokenizer,
  parser,
  codeGenerator,
  traverser,
  transformer,
};
