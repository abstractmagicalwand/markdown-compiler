/* eslint comma-dangle: 0 */

const {tokens, nodes} = require('./constants')

class Node {
  constructor(token) {
    const {type, value} = token

    switch (type) {
    case tokens.ASTERISK:
      this.type = nodes.ITALIC
      this.operator = value
      this.body = []
      this.closed = false
      break
    case tokens.UNDERSCORE:
      this.type = nodes.ITALIC
      this.operator = value
      this.body = []
      this.closed = false
      break
    case tokens.CHARS:
      this.type = nodes.CHARS
      this.value = value
      break
    default:
      break
    }
  }
}

module.exports = Node
