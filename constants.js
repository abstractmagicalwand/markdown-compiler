/* eslint comma-dangle: 0 */

const tokens = Object.freeze({
  UNDERSCORE: 'UNDERSCORE',
  ASTERISK: 'ASTERISK',
  CHARS: 'CHARS',
  GREATER: 'GREATER',
  NEW_LINE: 'NEW_LINE',
})

const nodes = Object.freeze({
  ITALIC: 'ITALIC',
  CHARS: 'CHARS'
})

module.exports = {tokens, nodes}
