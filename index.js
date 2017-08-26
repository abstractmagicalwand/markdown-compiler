const flow = require('lodash/flow');
const tokenizer = require('./tokenizer');
const parser = require('./parser');
const compiler = require('./compiler');

const launcher = flow(tokenizer, parser, compiler);

module.exports = launcher;
