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

const lexer = text => text.split('').reduce((tokens, char, i) => {
  if (char === '*') {
    tokens.push({
      type: ASTERISK,
      value: char,
      start: i,
      end: i + 1,
    })
  } else if (char === '_') {
    tokens.push({
      type: UNDERSCORE,
      value: char,
      start: i,
      end: i + 1,
    })
  } else if (char === '\n') {
    tokens.push({
      type: NEW_LINE,
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
  } else if (tokens[tokens.length - 1]
    && tokens[tokens.length - 1].type === CHARS) {
    tokens[tokens.length - 1].value += char
    tokens[tokens.length - 1].end++
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

module.exports = lexer
