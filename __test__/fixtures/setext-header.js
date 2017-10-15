const text = `
A First Level Header
====================
This is just a regular paragraph.
A Second Level Header
---------------------
This is just a regular paragraph.
`.trim();

const html = `
<h1>A First Level Header</h1>
<h2>This is just a regular paragraph. A Second Level Header</h2>
<p>This is just a regular paragraph.</p>
`.trim();

module.exports = {
  text,
  tokens: [
    {
      type: 'BOF',
    },
    {
      type: 'Chars',
      value: 'A First Level Header',
      start: 0,
      end: 20,
    },
    {
      type: 'Signs',
      value: '=',
      start: 20,
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
      value: 'This is just a regular paragraph. A Second Level Header',
      start: 42,
      end: 97,
    },
    {
      type: 'Hyphens',
      value: '-',
      start: 97,
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
        type: 'Header',
        amount: 1,
        value: '=',
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
        amount: 2,
        value: '-',
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
      {
        type: 'EOF',
      },
    ],
    parent: null,
  },
  html,
};
