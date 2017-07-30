/* eslint
  comma-dangle: 0,
  no-magic-numbers: 0
*/

import test from 'ava'
import lexer from './lexer'
import {lexer as mocks} from './mocks'

const {text, tokens} = mocks

test('lexical analysis', t => t.deepEqual(lexer(text), tokens))
