const flow = require('lodash/flow')
const lexer = require('./lexer')
const parser = require('./parser')
const compiler = require('./compiler')

const launcher = flow(lexer, parser, compiler)

module.exports = launcher
