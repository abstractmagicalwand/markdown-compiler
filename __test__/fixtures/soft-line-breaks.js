const markdown = {
  main: 'foo\nbaz',
  spaces: 'foo \n baz',
};

const html = {
  spaces: '<p>foo baz</p>',
  lineBreak: '<p>foo\nbaz</p>',
};

const tokens = {};

tokens.main = [
  {
    type: 'Chars',
    value: 'foo',
    start: 0,
    end: 3,
  },
  {
    type: 'NewLine',
    amount: 1,
    value: '\n',
    start: 3,
    end: 4,
  },
  {
    type: 'Chars',
    value: 'baz',
    start: 4,
    end: 7,
  },
];

tokens.spaces = [
  {
    type: 'Chars',
    value: 'foo',
    start: 0,
    end: 3,
  },
  {
    type: 'Spaces',
    amount: 1,
    value: ' ',
    start: 3,
    end: 4,
  },
  {
    type: 'NewLine',
    amount: 1,
    value: '\n',
    start: 4,
    end: 5,
  },
  {
    type: 'Spaces',
    amount: 1,
    value: ' ',
    start: 5,
    end: 6,
  },
  {
    type: 'Chars',
    value: 'baz',
    start: 6,
    end: 9,
  },
];

const ast = {};

ast.main = {
  type: 'Program',
  body: [
    {
      type: 'Paragraph',
      body: [
        {
          type: 'Chars',
          value: 'foo',
        },
        {
          type: 'SoftLineBreak',
        },
        {
          type: 'Chars',
          value: 'baz',
        },
      ],
      isClosed: true,
    },
  ],
  parent: null,
};

ast.main.body[0].parent = ast.main;
ast.main.body[0].body[0].parent = ast.main.body[0];
ast.main.body[0].body[1].parent = ast.main.body[0];
ast.main.body[0].body[2].parent = ast.main.body[0];

ast.spaces = {
  type: 'Program',
  body: [
    {
      type: 'Paragraph',
      body: [
        {
          type: 'Chars',
          value: 'foo',
        },
        {
          type: 'SoftLineBreak',
        },
        {
          type: 'Chars',
          value: 'baz',
        },
      ],
      isClosed: true,
    },
  ],
  parent: null,
};

ast.spaces.body[0].parent = ast.spaces;
ast.spaces.body[0].body[0].parent = ast.spaces.body[0];
ast.spaces.body[0].body[1].parent = ast.spaces.body[0];
ast.spaces.body[0].body[2].parent = ast.spaces.body[0];

module.exports = {
  markdown,
  tokens,
  ast,
  html,
};
