const strip = require('../helpers/strip');

const markdown = strip(`
    A First Level Header
    ====================
    This is just a regular paragraph.
    A Second Level Header
    ---------------------
    This is just a regular paragraph.
  `);

const html = strip(`
    <h1>A First Level Header</h1>
    <h2>This is just a regular paragraph. A Second Level Header</h2>
    <p>This is just a regular paragraph.</p>
  `);

module.exports = {
  markdown,
  tokens: [
    {
      type: 'Chars',
      value: 'A First Level Header',
      start: 0,
      end: 20,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 20,
      end: 21,
    },
    {
      type: 'Signs',
      amount: 20,
      value: '====================',
      start: 21,
      end: 41,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 41,
      end: 42,
    },
    {
      type: 'Chars',
      value: 'This is just a regular paragraph.',
      start: 42,
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
      type: 'Chars',
      value: 'A Second Level Header',
      start: 76,
      end: 97,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 97,
      end: 98,
    },
    {
      type: 'Hyphens',
      amount: 21,
      value: '---------------------',
      start: 98,
      end: 119,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 119,
      end: 120,
    },
    {
      type: 'Chars',
      value: 'This is just a regular paragraph.',
      start: 120,
      end: 153,
    },
  ],
  ast: {
    type: 'Program',
    body: [
      {
        type: 'Header',
        level: 1,
        value: '====================',
        body: [
          {
            type: 'Chars',
            value: 'A First Level Header',
          },
        ],
        isClosed: true,
      },
      {
        type: 'Header',
        level: 2,
        value: '---------------------',
        body: [
          {
            type: 'Chars',
            value: 'This is just a regular paragraph. A Second Level Header',
          },
        ],
        isClosed: true,
      },
      {
        type: 'Paragraph',
        body: [
          {
            type: 'Chars',
            value: 'This is just a regular paragraph.',
          },
        ],
        isClosed: true,
      },
    ],
    parent: null,
  },
  html,
};
