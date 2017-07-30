/* eslint
  comma-dangle: 0,
  no-magic-numbers: 0,
  complexity: 0
*/

const {tokens: {
  ASTERISK,
  UNDERSCORE,
  NEW_LINE,
  GREATER,
  CHARS,
}} = require('./constants')
const get = require('lodash/get')

function lexer(text) {
  return text
    .split('')
    .reduce((tokens, char, i) => {
      const last = tokens.length - 1

      if (get(tokens[last], 'value', null) === char
        && ['*', '_', '\n'].includes(char)) {
        tokens[last].amount++
        tokens[last].end++
      } else if (char === '*') {
        tokens.push({
          type: ASTERISK,
          amount: 1,
          value: char,
          start: i,
          end: i + 1,
        })
      } else if (char === '_') {
        tokens.push({
          type: UNDERSCORE,
          amount: 1,
          value: char,
          start: i,
          end: i + 1,
        })
      } else if (char === '\n') {
        tokens.push({
          type: NEW_LINE,
          amount: 0,
          value: char,
          start: i,
          end: i + 1,
        })
      } else if (char === '>') {
        tokens.push({
          type: GREATER,
          value: char,
          start: i,
          end: i + 1,
        })
      } else if (tokens[last] && tokens[last].type === CHARS) {
        tokens[last].value += char
        tokens[last].end++
      } else {
        tokens.push({
          type: CHARS,
          value: char,
          start: i,
          end: i + 1,
        })
      }

      return tokens
    }, [])
    .filter(token => get(token, 'amount', true))
}

module.exports = lexer
