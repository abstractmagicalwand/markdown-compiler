/* eslint
  comma-dangle: 0,
  no-magic-numbers: 0
*/

import test from 'ava'
import {tokens} from './constants'
import lexer from './lexer'

test('lexical analysis', t => {
  const input = '**__*_abracadabra\n<'

  const expected = [
    {
      type: tokens.ASTERISK,
      value: '*',
      start: 0,
      end: 1,
    },
    {
      type: tokens.ASTERISK,
      value: '*',
      start: 1,
      end: 2,
    },
    {
      type: tokens.UNDERSCORE,
      value: '_',
      start: 2,
      end: 3,
    },
    {
      type: tokens.UNDERSCORE,
      value: '_',
      start: 3,
      end: 4,
    },
    {
      type: tokens.ASTERISK,
      value: '*',
      start: 4,
      end: 5,
    },
    {
      type: tokens.UNDERSCORE,
      value: '_',
      start: 5,
      end: 6,
    },
    {
      type: tokens.CHARS,
      value: 'abracadabra',
      start: 7,
      end: 18,
    },
    {
      type: tokens.NEW_LINE,
      value: '\n',
      start: 18,
      end: 19,
    },
    {
      type: tokens.GREATER,
      value: '>',
      start: 20,
      end: 21
    }
  ]

  t.deepEqual(lexer(input), expected)
})
