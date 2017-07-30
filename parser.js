/* eslint
  no-magic-numbers: 0,
  complexity: 0,
  comma-dangle: 0,
  no-debugger: 0
*/

const Node = require('./node')
const {nodes} = require('./constants')

function parser(tokens) {
  const ast = []
  const ctx = {i: 0}

  function p(tokens, node, ctx, ast) {
    if (ctx.i === tokens.length) {
      return node
    }

    const nextNode = new Node(tokens[ctx.i++])

    if (nextNode.type === nodes.ITALIC || nextNode.type === nodes.BOLD) {

      if (nextNode.type === node.type
          && nextNode.operator === node.operator
          && !node.closed) {
        node.closed = true
      } else if (node.body) {
        node.body.push(p(tokens, nextNode, ctx))
      }

    } else if (nextNode.type === nodes.CHARS) {
      node.body.push(nextNode)
      p(tokens, node, ctx, ast)
    }

    if (ctx.i !== tokens.length && !node.closed) {
      return p(tokens, node, ctx, ast)
    }

    return node
  }

  while (ctx.i !== tokens.length) {
    const nextNode = new Node(tokens[ctx.i++])

    if (nextNode.type === nodes.CHARS) {
      ast.push(nextNode)
    } else {
      ast.push(p(tokens, nextNode, ctx, ast))
    }
  }

  return ast
}

module.exports = parser
