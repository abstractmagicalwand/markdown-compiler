/* eslint
  comma-dangle: 0,
  no-magic-numbers: 0
*/

import test from 'ava'
import {tokens} from './constants'
import lexer from './lexer'

test('lexical analysis', t => {
  const input = '**__*_abracadabra\n\n\n>'

  const expected = [
    {
      type: tokens.ASTERISK,
      amount: 2,
      value: '*',
      start: 0,
      end: 2,
    },
    {
      type: tokens.UNDERSCORE,
      amount: 2,
      value: '_',
      start: 2,
      end: 4,
    },
    {
      type: tokens.ASTERISK,
      amount: 1,
      value: '*',
      start: 4,
      end: 5,
    },
    {
      type: tokens.UNDERSCORE,
      amount: 1,
      value: '_',
      start: 5,
      end: 6,
    },
    {
      type: tokens.CHARS,
      value: 'abracadabra',
      start: 6,
      end: 17,
    },
    {
      type: tokens.NEW_LINE,
      amount: 2,
      value: '\n',
      start: 17,
      end: 20,
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
