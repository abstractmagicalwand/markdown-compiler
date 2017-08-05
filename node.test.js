/* eslint
  comma-dangle: 0,
  no-magic-numbers: 0
*/

import test from 'ava'

import {nodes as mocks} from './mocks'
import {tokens, nodes} from './constants'
import Node from './node'

import isMatch from 'lodash/isMatch'

test('create Node for bold', t => {
  t.true(
    isMatch(
      new Node(mocks.emphasis.tokens[nodes.BOLD][tokens.ASTERISK]),
      mocks.emphasis.nodes[nodes.BOLD][tokens.ASTERISK]
    ),
    'asterisk'
  )
  t.true(
    isMatch(
      new Node(mocks.emphasis.tokens[nodes.BOLD][tokens.UNDERSCORE]),
      mocks.emphasis.nodes[nodes.BOLD][tokens.UNDERSCORE]
    ),
    'underscore'
  )
})

test('create Node for italic', t => {
  t.true(
    isMatch(
      new Node(mocks.emphasis.tokens[nodes.ITALIC][tokens.ASTERISK]),
      mocks.emphasis.nodes[nodes.ITALIC][tokens.ASTERISK]
    ),
    'asterisk'
  )
  t.true(
    isMatch(
      new Node(mocks.emphasis.tokens[nodes.ITALIC][tokens.UNDERSCORE]),
      mocks.emphasis.nodes[nodes.ITALIC][tokens.UNDERSCORE]
    ),
    'underscore'
  )
})

test('create Node for blockquote', t => {
  t.true(
    isMatch(
      new Node(mocks.emphasis.blockquote.token),
      mocks.emphasis.blockquote.node
    ),
    'without options'
  )

  t.true(
    isMatch(
      new Node(
        mocks.blockquote.token,
        mocks.blockquote.option
      ),
      mocks.blockquote.nodeWithOptions
    ),
    'with options'
  )
})
