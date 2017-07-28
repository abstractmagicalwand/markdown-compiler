/* eslint
  comma-dangle: 0,
  no-magic-numbers: 0
*/

import test from 'ava'
import {tokens, nodes} from './constants'
import Node from './node'
import forEach from 'lodash/forEach'

test('create Node', t => {
  const BODY = 1

  const input = {
    [tokens.ASTERISK]: {
      type: tokens.ASTERISK,
      value: '*',
      start: 0,
      end: 1,
    },
    [tokens.UNDERSCORE]: {
      type: tokens.UNDERSCORE,
      value: '_',
      start: 2,
      end: 3,
    },
    [tokens.CHARS]: {
      type: tokens.CHARS,
      value: 'Straw Hat'
    }
  }

  const expected = {
    [tokens.ASTERISK]: {
      type: nodes.ITALIC,
      operator: '*',
      closed: false
    },
    [tokens.UNDERSCORE]: {
      type: nodes.ITALIC,
      operator: '_',
      closed: false,
    },
    [tokens.CHARS]: {
      type: nodes.CHARS,
      value: 'Straw Hat'
    }
  }

  const output = {
    [tokens.ASTERISK]: new Node(input[tokens.ASTERISK]),
    [tokens.UNDERSCORE]: new Node(input[tokens.UNDERSCORE]),
    [tokens.CHARS]: new Node(input[tokens.CHARS])
  }

  forEach(output, (value, type) => forEach(
    expected[type],
    (value, prop) => t.is(
      output[type][prop],
      expected[type][prop],
      `${type}.${prop}`
    )
  ))

  t.is(output[tokens.ASTERISK].body.length, 0, `${tokens.ASTERISK}.body`)
  t.is(output[tokens.UNDERSCORE].body.length, 0, `${tokens.UNDERSCORE}.body`)
  t.is(
    Object.keys(output[tokens.ASTERISK]).length,
    Object.keys(expected[tokens.ASTERISK]).length + BODY,
    `amount props ${tokens.ASTERISK}`
  )
  t.is(
    Object.keys(output[tokens.UNDERSCORE]).length,
    Object.keys(expected[tokens.UNDERSCORE]).length + BODY,
    `amount props ${tokens.UNDERSCORE}`
  )
  t.is(
    Object.keys(output[tokens.CHARS]).length,
    Object.keys(expected[tokens.CHARS]).length,
    `amount props ${tokens.CHARS}`
  )
})
