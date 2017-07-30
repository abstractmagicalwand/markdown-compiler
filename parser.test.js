/* eslint comma-dangle: 0 */

import test from 'ava'
import lexer from './lexer'
import parser from './parser'
import isMatch from 'lodash/isMatch'
import {parser as mocks} from './mocks'

const {ast, text} = mocks

test(
  'abstract syntax tree',
  t => t.true(isMatch(parser(lexer(text)), ast))
)
