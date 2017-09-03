const traverser = require('./traverser');

function transformer(ast) {
  return traverser(ast, {});
}

module.exports = transformer;
