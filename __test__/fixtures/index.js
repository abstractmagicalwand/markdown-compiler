/* eslint
  no-magic-numbers: 0,
  comma-dangle: 0,
  array-element-newline: 0
*/

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
        type: 'Greater',
        value: '>',
        start: 0,
        end: 1,
      },
      {
        type: 'Chars',
        value: ' ',
        start: 1,
        end: 2,
      },
      {
        type: 'Asterisk',
        amount: 2,
        value: '*',
        start: 2,
        end: 4,
      },
      {
        type: 'Chars',
        value: 'This',
        start: 4,
        end: 8,
      },
      {
        type: 'Asterisk',
        amount: 2,
        value: '*',
        start: 8,
        end: 10,
      },
      {
        type: 'Chars',
        value: ' is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,',
        start: 10,
        end: 75,
      },
      {
        type: 'NewLine',
        amount: 1,
        value: '\n',
        start: 75,
        end: 76,
      },
      {
        type: 'Greater',
        value: '>',
        start: 76,
        end: 77,
      },
      {
        type: 'Chars',
        value: ' consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.',
        start: 77,
        end: 144,
      },
      {
        type: 'NewLine',
        amount: 1,
        value: '\n',
        start: 144,
        end: 145,
      },
      {
        type: 'Greater',
        value: '>',
        start: 146,
        end: 147,
      },
      {
        type: 'Chars',
        value: ' Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.',
        start: 147,
        end: 218,
      },
      {
        type: 'NewLine',
        amount: 1,
        value: '\n',
        start: 218,
        end: 219,
      },
      {
        type: 'Greater',
        value: '>',
        start: 219,
        end: 220,
      },
      {
        type: 'NewLine',
        amount: 1,
        value: '\n',
        start: 220,
        end: 221,
      },
      {
        type: 'Greater',
        value: '>',
        start: 221,
        end: 222,
      },
      {
        type: 'Chars',
        value: ' Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse',
        start: 222,
        end: 292,
      },
      {
        type: 'NewLine',
        amount: 2,
        value: '\n',
        start: 292,
        end: 293,
      },
      {
        type: 'NewLine',
        amount: 2,
        value: '\n',
        start: 293,
        end: 294,
      },
      {
        type: 'Greater',
        value: '>',
        start: 294,
        end: 295,
      },
      {
        type: 'Chars',
        value: ' This is the first level of quoting.',
        start: 295,
        end: 296,
      },
      {
        type: 'NewLine',
        amount: 1,
        value: '\n',
        start: 296,
        end: 297,
      },
      {
        type: 'Greater',
        value: '>',
        start: 297,
        end: 298,
      },
      {
        type: 'Chars',
        value: ' ',
        start: 298,
        end: 299,
      },
      {
        type: 'Greater',
        value: '>',
        start: 299,
        end: 300,
      },
      {
        type: 'Chars',
        value: ' This is nested blockquote.',
        start: 300,
        end: 327,
      },
      {
        type: 'NewLine',
        amount: 1,
        value: '\n',
        start: 327,
        end: 328,
      },
      {
        type: 'Greater',
        value: '>',
        start: 328,
        end: 329,
      },
      {
        type: 'NewLine',
        amount: 1,
        value: '\n',
        start: 329,
        end: 330,
      },
      {
        type: 'Greater',
        value: '>',
        start: 330,
        end: 331,
      },
      {
        type: 'Chars',
        value: ' Back to the first level.',
        start: 331,
        end: 332,
      },
    ],
    emphasis: [
      {
        type: 'Asterisk',
        amount: 2,
        value: '*',
        start: 0,
        end: 2,
      },
      {
        type: 'Chars',
        value: 'Homo',
        start: 2,
        end: 6,
      },
      {
        type: 'Asterisk',
        amount: 2,
        value: '*',
        start: 6,
        end: 8,
      },
      {
        type: 'Chars',
        value: ' ',
        start: 8,
        end: 9,
      },
      {
        type: 'Asterisk',
        amount: 1,
        value: '*',
        start: 9,
        end: 10,
      },
      {
        type: 'Chars',
        value: 'Sapiens',
        start: 10,
        end: 17,
      },
      {
        type: 'Asterisk',
        amount: 1,
        value: '*',
        start: 17,
        end: 18,
      },
      {
        type: 'Chars',
        value: ' ',
        start: 18,
        end: 19,
      },
      {
        type: 'Underscore',
        amount: 1,
        value: '_',
        start: 19,
        end: 20,
      },
      {
        type: 'Chars',
        value: 'non',
        start: 20,
        end: 23,
      },
      {
        type: 'Underscore',
        amount: 1,
        value: '_',
        start: 23,
        end: 24,
      },
      {
        type: 'Chars',
        value: ' ',
        start: 24,
        end: 25,
      },
      {
        type: 'Underscore',
        amount: 2,
        value: '_',
        start: 25,
        end: 27,
      },
      {
        type: 'Chars',
        value: 'urinat',
        start: 27,
        end: 33,
      },
      {
        type: 'Underscore',
        amount: 2,
        value: '_',
        start: 33,
        end: 35,
      },
      {
        type: 'Chars',
        value: ' ',
        start: 35,
        end: 36,
      },
      {
        type: 'Asterisk',
        amount: 2,
        value: '*',
        start: 36,
        end: 38,
      },
      {
        type: 'Underscore',
        amount: 1,
        value: '_',
        start: 38,
        end: 39,
      },
      {
        type: 'Chars',
        value: 'in',
        start: 39,
        end: 41,
      },
      {
        type: 'Underscore',
        amount: 1,
        value: '_',
        start: 41,
        end: 42,
      },
      {
        type: 'Asterisk',
        amount: 2,
        value: '*',
        start: 42,
        end: 44,
      },
      {
        type: 'Chars',
        value: ' ',
        start: 44,
        end: 45,
      },
      {
        type: 'Asterisk',
        amount: 2,
        value: '*',
        start: 45,
        end: 47,
      },
      {
        type: 'Chars',
        value: 'ventum',
        start: 47,
        end: 53,
      },
      {
        type: 'Underscore',
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
        type: 'Greater',
        value: '>',
        start: 0,
        end: 1,
      },
      node: {
        type: 'Blockquotes',
        depth: 1,
        operator: '>',
        body: [],
      },
      nodeWithOptions: {
        type: 'Blockquotes',
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
        Bold: {
          Asterisk: {
            type: 'Asterisk',
            amount: 2,
            value: '*',
            start: 46,
            end: 48,
          },
          Underscore: {
            type: 'Underscore',
            amount: 2,
            value: '_',
            start: 54,
            end: 55,
          },
        },
        Italic: {
          Asterisk: {
            type: 'Asterisk',
            amount: 1,
            value: '*',
            start: 46,
            end: 48,
          },
          Underscore: {
            type: 'Underscore',
            amount: 1,
            value: '_',
            start: 54,
            end: 55,
          },
        },
      },
      nodes: {
        Bold: {
          Asterisk: {
            type: 'Bold',
            operator: '**',
            closed: false,
          },
          Underscore: {
            type: 'Bold',
            operator: '__',
            closed: false,
          },
        },
        Italic: {
          Asterisk: {
            type: 'Italic',
            operator: '*',
            closed: false,
          },
          Underscore: {
            type: 'Italic',
            operator: '_',
            closed: false,
          },
        },
      },
    },
  },
  ast: {
    blockquote: {
      type: 'Program',
      body: [
        {
          type: 'Blockquotes',
          depth: 1,
          operator: '>',
          body: [
            {
              type: 'Chars',
              value: ' ',
            },
            {
              type: 'Bold',
              value: '**',
              body: [
                {
                  type: 'Chars',
                  value: 'This',
                },
              ],
              closed: true,
            },
            {
              type: 'Chars',
              value: 'is a blockquote with two paragraphs. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.',
            },
            {
              type: 'Chars',
              value: 'Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse',
            },
          ],
        },
        {
          type: 'Blockquotes',
          operator: '>',
          depth: 1,
          body: [
            {
              type: 'Chars',
              value: 'This is the first level of quoting.',
            },
            {
              type: 'Blockquotes',
              operator: '>',
              depth: 2,
              body: [
                {
                  type: 'Chars',
                  value: 'This is nested blockquote.',
                },
              ],
            },
            {
              type: 'Chars',
              value: 'Back to the first level.',
            },
          ],
        },
      ],
    },
    emphasis: {
      type: 'Program',
      body: [
        {
          type: 'Paragraph',
          body: [
            {
              type: 'Bold',
              operator: '**',
              body: [
                {
                  type: 'Chars',
                  value: 'Homo',
                },
              ],
              closed: true,
            },
            {
              type: 'Chars',
              value: ' ',
            },
            {
              type: 'Italic',
              operator: '*',
              body: [
                {
                  type: 'Chars',
                  value: 'Sapiens',
                },
              ],
              closed: true,
            },
            {
              type: 'Chars',
              value: ' ',
            },
            {
              type: 'Italic',
              operator: '_',
              body: [
                {
                  type: 'Chars',
                  value: 'non',
                },
              ],
              closed: true,
            },
            {
              type: 'Chars',
              value: ' ',
            },
            {
              type: 'Bold',
              operator: '__',
              body: [
                {
                  type: 'Chars',
                  value: 'urinat',
                },
              ],
              closed: true,
            },
            {
              type: 'Chars',
              value: ' ',
            },
            {
              type: 'Bold',
              operator: '**',
              body: [
                {
                  type: 'Italic',
                  operator: '_',
                  body: [
                    {
                      type: 'Chars',
                      value: 'in',
                    },
                  ],
                  closed: true,
                },
              ],
              closed: true,
            },
            {
              type: 'Chars',
              value: ' ',
            },
            {
              type: 'Bold',
              operator: '**',
              body: [
                {
                  type: 'Chars',
                  value: 'ventum',
                },
                {
                  type: 'Italic',
                  operator: '_',
                  body: [],
                  closed: false,
                },
              ],
              closed: false,
            }
          ],
          closed: true
        }
      ],
      parent: null,
    },
  },
  html: {
    blockquote:
`<blockquote><p><b>This</b>is a blockquote with two paragraphs. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.</p><p> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse id sem consectetuer libero luctus adipiscing.</p></blockquote>
<blockquote><p>This is the first level of quoting.</p><blockquote><p>This is nested blockquote.</p></blockquote><p>Back to the first level</p></blockquote>`,
    emphasis: '<p><strong>Homo</strong> <em>Sapiens</em> <em>non</em> <strong>urinat</strong> <strong><em>in</em></strong> **ventum_</p>',
  },
};
