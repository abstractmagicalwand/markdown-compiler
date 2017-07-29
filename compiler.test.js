import test from 'ava'
import input from './parser.test'
import compiler from './compiler'

test('compiler to html', t => {
  const expected = '<i>Boketachi</i> <i>wa</i> <i><i>Hitotsu</i></i> no _Hikari*'
  t.is(compiler(input), expected)
})
