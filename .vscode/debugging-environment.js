const tokenizer = require('../src/tokenizer');
const {parser} = require('../src/parser');
const compiler = require('../src/compiler');
const codeGenerator = require('../src/code-generator');

const {ast, tokens, html, markdown} = require('../__test__/fixtures');