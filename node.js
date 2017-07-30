/* eslint
  comma-dangle: 0,
  complexity: 0
*/

const {tokens, nodes} = require('./constants')

class Node {
  constructor(token) {
    const {type, value, amount = null} = token

    if (type === tokens.ASTERISK || type === tokens.UNDERSCORE) {
      if (amount === 2) {
        this.type = nodes.BOLD
        this.operator = value.repeat(amount)
      } else {
        this.type = nodes.ITALIC
        this.operator = value
      }

      this.body = []
      this.closed = false
    } else if (type === tokens.CHARS) {
      this.type = nodes.CHARS
      this.value = value
    }
  }
}

module.exports = Node
