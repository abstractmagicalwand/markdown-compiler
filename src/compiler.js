const flow = require('lodash/flow');

const tokenizer = require('./tokenizer');
const parser = require('./parser');
const codeGenerator = require('./code-generator');
const transformer = require('./transformer');

const compiler = flow(tokenizer, parser, transformer, codeGenerator);

module.exports = compiler;
