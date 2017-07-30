/* eslint
  comma-dangle: 0,
  no-magic-numbers: 0
*/

import test from 'ava'
import {tokens} from './constants'
import Node from './node'
import forEach from 'lodash/forEach'
import isMatch from 'lodash/isMatch'
import {node as mocks} from './mocks'

const {ASTERISK, UNDERSCORE, CHARS} = tokens

test('create Node', t => {
  const input = mocks.tokens
  const output = {
    [ASTERISK]: new Node(input[ASTERISK]),
    [UNDERSCORE]: new Node(input[UNDERSCORE]),
    [CHARS]: new Node(input[CHARS])
  }

  forEach(
    output,
    (value, type) => t.true(isMatch(output[type], mocks.nodes[type]))
  )
})
