const text = `
> **This** is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
>
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> id sem consectetuer libero luctus adipiscing.

> This is the first level of quoting.
>
> > This is nested blockquote.
>
> Back to the first level.
`.trim();

const html = `
<blockquote><p><b>This</b>is a blockquote with two paragraphs. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.</p><p> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse id sem consectetuer libero luctus adipiscing.</p></blockquote>
<blockquote><p>This is the first level of quoting.</p><blockquote><p>This is nested blockquote.</p></blockquote><p>Back to the first level</p></blockquote>
`.trim();


module.exports = {
  text,
  tokens: [
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
  ast: {
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
  html,
};
