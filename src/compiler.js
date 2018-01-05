const tokenizer = require('./tokenizer');
const {parser} = require('./parser');
const codeGenerator = require('./code-generator');
const transformer = require('./transformer');

function compiler(markdown) {
  const steps = [tokenizer, parser, transformer, codeGenerator];

  let result = markdown;
  for (let i = 0; i < steps.length; i++) {
    result = steps[i](result);
  }

  return result;
}

module.exports = compiler;
