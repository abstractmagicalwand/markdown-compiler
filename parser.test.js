/* eslint
  comma-dangle: 0,
  no-magic-numbers: 0
*/

import test from 'ava'
import {nodes} from './constants'
import lexer from './lexer'
import parser from './parser'
import isMatch from 'lodash/isMatch'

test('abstract syntax tree', t => {
  const input = '_Bokutachi_ *wa* _*Hitotsu*_ no _Hikari*'
  const expected = [
    {
      type: nodes.ITALIC,
      operator: '_',
      body: [
        {
          type: nodes.CHARS,
          value: 'Bokutachi'
        }
      ],
      closed: true
    },
    {
      type: nodes.CHARS,
      value: ' '
    },
    {
      type: nodes.ITALIC,
      operator: '*',
      body: [
        {
          type: nodes.CHARS,
          value: 'wa'
        }
      ],
      closed: true
    },
    {
      type: nodes.CHARS,
      value: ' '
    },
    {
      type: nodes.ITALIC,
      operator: '_',
      body: [
        {
          type: nodes.ITALIC,
          operator: '*',
          body: [
            {
              type: nodes.CHARS,
              value: 'Hitotsu'
            }
          ],
          closed: true
        },
      ],
      closed: true
    },
    {
      type: nodes.CHARS,
      value: ' no '
    },
    {
      type: nodes.ITALIC,
      operator: '_',
      body: [
        {
          type: nodes.CHARS,
          value: 'Hikari'
        },
        {
          type: nodes.ITALIC,
          operator: '*',
          body: [],
          closed: false
        },
      ],
      closed: false
    },
  ]

  t.true(isMatch(parser(lexer(input)), expected), 'italic')
})
