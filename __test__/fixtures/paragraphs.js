const strip = require('../helpers/strip');

const markdown = strip(`
    **Guardian Angel**

    I love You, My Guardian Angel, in gloom.
    In gloom, that has followed me out of the womb.

    Because you were once my fair gorgeous bride.
    Because you have seen all the secrets I hide.

    Because we are bound by secrets and night.
    Because you’re my sister, my daughter, my bride.
  `);

const html = strip(`
    <p><strong>Guardian Angel</strong></p>
    <p>I love You, My Guardian Angel, in gloom. In gloom, that has followed me out of the womb.</p>
    <p>Because you were once my fair gorgeous bride. Because you have seen all the secrets I hide.</p>
    <p>Because we are bound by secrets and night. Because you&rsquo;re my sister, my daughter, my bride.</p>
  `);

module.exports = {
  markdown,
  tokens: [
    {
      type: 'Asterisk',
      amount: 2,
      value: '*',
      start: 0,
      end: 2,
    },
    {
      type: 'Chars',
      value: 'Guardian Angel',
      start: 2,
      end: 16,
    },
    {
      type: 'Asterisk',
      amount: 2,
      value: '*',
      start: 16,
      end: 18,
    },
    {
      type: 'NewLine',
      amount: 2,
      value: '\n',
      start: 18,
      end: 20,
    },
    {
      type: 'Chars',
      value: 'I love You, My Guardian Angel, in gloom. In gloom, that has followed me out of the womb.',
      start: 20,
      end: 108,
    },
    {
      type: 'NewLine',
      value: '\n',
      amount: 2,
      start: 108,
      end: 110,
    },
    {
      type: 'Chars',
      value: 'Because you were once my fair gorgeous bride. Because you have seen all the secrets I hide.',
      start: 110,
      end: 201,
    },
    {
      type: 'NewLine',
      value: '\n',
      amount: 2,
      start: 201,
      end: 203,
    },
    {
      type: 'Chars',
      value: 'Because we are bound by secrets and night. Because you’re my sister, my daughter, my bride.',
      start: 203,
      end: 294,
    },
  ],
  ast: {
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
                value: 'Guardian Angel',
              },
            ],
            isClosed: true,
          },
        ],
        isClosed: true,
      },
      {
        type: 'Paragraph',
        body: [
          {
            type: 'Chars',
            value: 'I love You, My Guardian Angel, in gloom. In gloom, that has followed me out of the womb.',
          },
        ],
        isClosed: true,
      },
      {
        type: 'Paragraph',
        body: [
          {
            type: 'Chars',
            value: 'Because you were once my fair gorgeous bride. Because you have seen all the secrets I hide.',
          },
        ],
        isClosed: true,
      },
      {
        type: 'Paragraph',
        body: [
          {
            type: 'Chars',
            value: 'Because we are bound by secrets and night. Because you&rsquo;re my sister, my daughter, my bride.',
          },
        ],
        isClosed: true,
      },
    ],
    parent: null,
  },
  html,
};
