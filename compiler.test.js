/* eslint
  comma-dangle: 0,
  no-magic-numbers: 0
*/

import test from 'ava'
import compiler from './compiler'
import {ast, html} from './mocks'

test.only(
  'compiler to html - emphasis',
  t => t.is(compiler(ast.emphasis), html.emphasis, 'emphasis')
)

test(
  'compiler to html - blockquote',
  t => t.is(compiler(ast.blockquote), html.blockquote, 'blockquote')
)
