/* eslint
  comma-dangle: 0,
  no-magic-numbers: 0
*/

import test from 'ava'
import compiler from './compiler'
import mocks from './mocks'

test(
  'compiler to html',
  t => t.is(compiler(mocks.parser.ast), mocks.compiler.html)
)
