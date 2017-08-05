/* eslint
  no-magic-numbers: 0,
  comma-dangle: 0,
  array-element-newline: 0
*/

const {tokens, nodes, } = require('./constants')

module.exports = {
  text: {
    blockquote:
`> **This** is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
>
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> id sem consectetuer libero luctus adipiscing.

> This is the first level of quoting.
>
> > This is nested blockquote.
>
> Back to the first level.`,
    emphasis: '**Homo** *Sapiens* _non_ __urinat__ **_in_** **ventum_',
  },
  tokens: {
    blockquote: [
      {
        type: tokens.GREATER,
        value: '>',
        start: 0,
        end: 1,
      },
      {
        type: tokens.CHARS,
        value: ' ',
        start: 1,
        end: 2,
      },
      {
        type: tokens.ASTERISK,
        amount: 2,
        value: '*',
        start: 2,
        end: 4,
      },
      {
        type: tokens.CHARS,
        value: 'This',
        start: 4,
        end: 8,
      },
      {
        type: tokens.ASTERISK,
        amount: 2,
        value: '*',
        start: 8,
        end: 10,
      },
      {
        type: tokens.CHARS,
        value: ' is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,',
        start: 10,
        end: 75,
      },
      {
        type: tokens.NEW_LINE,
        amount: 1,
        value: '\n',
        start: 75,
        end: 76,
      },
      {
        type: tokens.GREATER,
        value: '>',
        start: 76,
        end: 77,
      },
      {
        type: tokens.CHARS,
        value: ' consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.',
        start: 77,
        end: 144,
      },
      {
        type: tokens.NEW_LINE,
        amount: 1,
        value: '\n',
        start: 144,
        end: 145,
      },
      {
        type: tokens.GREATER,
        value: '>',
        start: 146,
        end: 147,
      },
      {
        type: tokens.CHARS,
        value: ' Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.',
        start: 147,
        end: 218,
      },
      {
        type: tokens.NEW_LINE,
        amount: 1,
        value: '\n',
        start: 218,
        end: 219,
      },
      {
        type: tokens.GREATER,
        value: '>',
        start: 219,
        end: 220,
      },
      {
        type: tokens.NEW_LINE,
        amount: 1,
        value: '\n',
        start: 220,
        end: 221,
      },
      {
        type: tokens.GREATER,
        value: '>',
        start: 221,
        end: 222,
      },
      {
        type: tokens.CHARS,
        value: ' Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse',
        start: 222,
        end: 292,
      },
      {
        type: tokens.NEW_LINE,
        amount: 2,
        value: '\n',
        start: 292,
        end: 293,
      },
      {
        type: tokens.NEW_LINE,
        amount: 2,
        value: '\n',
        start: 293,
        end: 294,
      },
      {
        type: tokens.GREATER,
        value: '>',
        start: 294,
        end: 295,
      },
      {
        type: tokens.CHARS,
        value: ' This is the first level of quoting.',
        start: 295,
        end: 296,
      },
      {
        type: tokens.NEW_LINE,
        amount: 1,
        value: '\n',
        start: 296,
        end: 297,
      },
      {
        type: tokens.GREATER,
        value: '>',
        start: 297,
        end: 298,
      },
      {
        type: tokens.CHARS,
        value: ' ',
        start: 298,
        end: 299,
      },
      {
        type: tokens.GREATER,
        value: '>',
        start: 299,
        end: 300,
      },
      {
        type: tokens.CHARS,
        value: ' This is nested blockquote.',
        start: 300,
        end: 327,
      },
      {
        type: tokens.NEW_LINE,
        amount: 1,
        value: '\n',
        start: 327,
        end: 328,
      },
      {
        type: tokens.GREATER,
        value: '>',
        start: 328,
        end: 329,
      },
      {
        type: tokens.NEW_LINE,
        amount: 1,
        value: '\n',
        start: 329,
        end: 330,
      },
      {
        type: tokens.GREATER,
        value: '>',
        start: 330,
        end: 331,
      },
      {
        type: tokens.CHARS,
        value: ' Back to the first level.',
        start: 331,
        end: 332,
      },
    ],
    emphasis: [
      {
        type: tokens.ASTERISK,
        amount: 2,
        value: '*',
        start: 0,
        end: 2,
      },
      {
        type: tokens.CHARS,
        value: 'Homo',
        start: 2,
        end: 6,
      },
      {
        type: tokens.ASTERISK,
        amount: 2,
        value: '*',
        start: 6,
        end: 8,
      },
      {
        type: tokens.CHARS,
        value: ' ',
        start: 8,
        end: 9,
      },
      {
        type: tokens.ASTERISK,
        amount: 1,
        value: '*',
        start: 9,
        end: 10,
      },
      {
        type: tokens.CHARS,
        value: 'Sapiens',
        start: 10,
        end: 17,
      },
      {
        type: tokens.ASTERISK,
        amount: 1,
        value: '*',
        start: 17,
        end: 18,
      },
      {
        type: tokens.CHARS,
        value: ' ',
        start: 18,
        end: 19,
      },
      {
        type: tokens.UNDERSCORE,
        amount: 1,
        value: '_',
        start: 19,
        end: 20,
      },
      {
        type: tokens.CHARS,
        value: 'non',
        start: 20,
        end: 23,
      },
      {
        type: tokens.UNDERSCORE,
        amount: 1,
        value: '_',
        start: 23,
        end: 24,
      },
      {
        type: tokens.CHARS,
        value: ' ',
        start: 24,
        end: 25,
      },
      {
        type: tokens.UNDERSCORE,
        amount: 2,
        value: '_',
        start: 25,
        end: 27,
      },
      {
        type: tokens.CHARS,
        value: 'urinat',
        start: 27,
        end: 33,
      },
      {
        type: tokens.UNDERSCORE,
        amount: 2,
        value: '_',
        start: 33,
        end: 35,
      },
      {
        type: tokens.CHARS,
        value: ' ',
        start: 35,
        end: 36,
      },
      {
        type: tokens.ASTERISK,
        amount: 2,
        value: '*',
        start: 36,
        end: 38,
      },
      {
        type: tokens.UNDERSCORE,
        amount: 1,
        value: '_',
        start: 38,
        end: 39,
      },
      {
        type: tokens.CHARS,
        value: 'in',
        start: 39,
        end: 41,
      },
      {
        type: tokens.UNDERSCORE,
        amount: 1,
        value: '_',
        start: 41,
        end: 42,
      },
      {
        type: tokens.ASTERISK,
        amount: 2,
        value: '*',
        start: 42,
        end: 44,
      },
      {
        type: tokens.CHARS,
        value: ' ',
        start: 44,
        end: 45,
      },
      {
        type: tokens.ASTERISK,
        amount: 2,
        value: '*',
        start: 45,
        end: 47,
      },
      {
        type: tokens.CHARS,
        value: 'ventum',
        start: 47,
        end: 53,
      },
      {
        type: tokens.UNDERSCORE,
        amount: 1,
        value: '_',
        start: 53,
        end: 54,
      },
    ],
  },
  nodes: {
    blockquote: {
      token: {
        type: tokens.GREATER,
        value: '>',
        start: 0,
        end: 1,
      },
      node: {
        type: nodes.BLOCKQUOTES,
        depth: 1,
        operator: '>',
        body: [],
      },
      nodeWithOptions: {
        type: nodes.BLOCKQUOTES,
        depth: 2,
        operator: '>',
        body: [],
      },
      options: {
        depth: 2,
      },
    },
    emphasis: {
      tokens: {
        [nodes.BOLD]: {
          [tokens.ASTERISK]: {
            type: tokens.ASTERISK,
            amount: 2,
            value: '*',
            start: 46,
            end: 48,
          },
          [tokens.UNDERSCORE]: {
            type: tokens.UNDERSCORE,
            amount: 2,
            value: '_',
            start: 54,
            end: 55,
          },
        },
        [nodes.ITALIC]: {
          [tokens.ASTERISK]: {
            type: tokens.ASTERISK,
            amount: 1,
            value: '*',
            start: 46,
            end: 48,
          },
          [tokens.UNDERSCORE]: {
            type: tokens.UNDERSCORE,
            amount: 1,
            value: '_',
            start: 54,
            end: 55,
          },
        },
      },
      nodes: {
        [nodes.BOLD]: {
          [tokens.ASTERISK]: {
            type: nodes.BOLD,
            operator: '**',
            closed: false,
          },
          [tokens.UNDERSCORE]: {
            type: nodes.BOLD,
            operator: '__',
            closed: false,
          },
        },
        [nodes.ITALIC]: {
          [tokens.ASTERISK]: {
            type: nodes.ITALIC,
            operator: '*',
            closed: false,
          },
          [tokens.UNDERSCORE]: {
            type: nodes.ITALIC,
            operator: '_',
            closed: false,
          },
        },
      },
    },
  },
  ast: {
    blockquote: {
      type: nodes.PROG,
      body: [
        {
          type: nodes.BLOCKQUOTES,
          depth: 1,
          operator: '>',
          body: [
            {
              type: nodes.CHARS,
              value: ' ',
            },
            {
              type: nodes.BOLD,
              value: '**',
              body: [
                {
                  type: nodes.CHARS,
                  value: 'This',
                },
              ],
              closed: true,
            },
            {
              type: nodes.CHARS,
              value: 'is a blockquote with two paragraphs. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.',
            },
            {
              type: nodes.CHARS,
              value: 'Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse',
            },
          ],
        },
        {
          type: nodes.BLOCKQUOTES,
          operator: '>',
          depth: 1,
          body: [
            {
              type: nodes.CHARS,
              value: 'This is the first level of quoting.',
            },
            {
              type: nodes.BLOCKQUOTES,
              operator: '>',
              depth: 2,
              body: [
                {
                  type: nodes.CHARS,
                  value: 'This is nested blockquote.',
                },
              ],
            },
            {
              type: nodes.CHARS,
              value: 'Back to the first level.',
            },
          ],
        },
      ],
    },
    emphasis: {
      type: nodes.PROG,
      body: [
        {
          type: nodes.BOLD,
          operator: '**',
          body: [
            {
              type: nodes.CHARS,
              value: 'Homo',
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
              value: 'Sapiens',
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
              type: nodes.CHARS,
              value: 'non',
            },
          ],
          closed: true,
        },
        {
          type: nodes.CHARS,
          value: ' ',
        },
        {
          type: nodes.BOLD,
          operator: '__',
          body: [
            {
              type: nodes.CHARS,
              value: 'urinat',
            },
          ],
          closed: true,
        },
        {
          type: nodes.CHARS,
          value: ' ',
        },
        {
          type: nodes.BOLD,
          operator: '**',
          body: [
            {
              type: nodes.ITALIC,
              operator: '_',
              body: [
                {
                  type: nodes.CHARS,
                  value: 'in',
                },
              ],
              closed: true,
            },
          ],
          closed: true,
        },
        {
          type: nodes.CHARS,
          value: ' ',
        },
        {
          type: nodes.BOLD,
          operator: '**',
          body: [
            {
              type: nodes.CHARS,
              value: 'ventum',
            },
            {
              type: nodes.ITALIC,
              operator: '_',
              body: [],
              closed: false,
            },
          ],
          closed: false,
        },
      ],
    },
  },
  html: {
    blockquote:
`<blockquote><p><b>This</b>is a blockquote with two paragraphs. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.</p><p> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse id sem consectetuer libero luctus adipiscing.</p></blockquote>
<blockquote><p>This is the first level of quoting.</p><blockquote><p>This is nested blockquote.</p></blockquote><p>Back to the first level</p></blockquote>`,
    emphasis: '<strong>Homo</strong> <em>Sapiens</em> <em>non</em> <strong>urinat</strong> <strong><em>in</em></strong> **ventum_',
  },
}
