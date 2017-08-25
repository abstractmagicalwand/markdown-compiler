/* eslint
  comma-dangle: 0,
  no-magic-numbers: 0
*/

import test from 'ava'
import lexer from './lexer'
import {text, tokens} from './mocks'

test.only('lexical analysis - emphasis', t => t.deepEqual(
  lexer(text.emphasis), tokens.emphasis, 'emphasis'
))

test('lexical analysis - blockquote', t => t.deepEqual(
  lexer(text.blockquote), tokens.blockquote, 'blockquote'
))
