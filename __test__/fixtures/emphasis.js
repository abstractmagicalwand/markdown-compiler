const text = '**Homo** *Sapiens* _non_ __urinat__ **_in_** **ventum_';
const html = '<p><strong>Homo</strong> <em>Sapiens</em> <em>non</em> <strong>urinat</strong> <strong><em>in</em></strong> **ventum_</p>';

module.exports = {
  text,
  tokens: [
    {
      type: 'BOF',
    },
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
    {
      type: 'EOF',
    },
  ],
  ast: {
    type: 'Program',
    body: [
      {
        type: 'BOF',
      },
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
          },
        ],
        closed: true,
      },
      {
        type: 'EOF',
      },
    ],
    parent: null,
  },
  html,
};
