/* eslint
  comma-dangle: 0,
  no-magic-numbers: 0
*/

import test from 'ava'
import compiler from './compiler'
import {nodes} from './constants'

test('compiler to html', t => {
  const expected = '<i>Bokutachi</i> <i>wa</i> <i><i>Hitotsu</i></i> no _Hikari*'
  const input = [
    {
      type: nodes.ITALIC,
      operator: '_',
      body: [
        {
          type: nodes.CHARS,
          value: 'Bokutachi',
        },
      ],
      closed: true,
    },
    {
      type: nodes.CHARS,
      value: ' ',
    },
    {
      type: nodes.ITALIC,
      operator: '*',
      body: [
        {
          type: nodes.CHARS,
          value: 'wa',
        },
      ],
      closed: true,
    },
    {
      type: nodes.CHARS,
      value: ' ',
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
              value: 'Hitotsu',
            },
          ],
          closed: true,
        },
      ],
      closed: true,
    },
    {
      type: nodes.CHARS,
      value: ' no ',
    },
    {
      type: nodes.ITALIC,
      operator: '_',
      body: [
        {
          type: nodes.CHARS,
          value: 'Hikari',
        },
        {
          type: nodes.ITALIC,
          operator: '*',
          body: [],
          closed: false,
        },
      ],
      closed: false,
    },
  ]
  t.is(compiler(input), expected)
})
