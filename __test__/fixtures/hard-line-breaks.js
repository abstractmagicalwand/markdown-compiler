const markdown = {
  spaces: 'foo  \nbaz',
  backslash:'foo\\\nbaz',
  moreThanTwoSpaces: 'foo       \nbaz',
  spacesAreIgnored: [
    'foo  \n     baz',
    'foo\\\n     baz',
  ],
  insideInlines: [
    '*foo  \nbaz*',
    '*foo\\\nbaz*',
  ],
  insideCodeSpan: [
    '`code  \nspan`',
    '`code\\\nspan`',
  ],
  insideHtmlTags: [
    '<a href="foo  \nbaz">',
    '<a href="foo\\\nbaz">',
  ],
  atBlockElement: [
    'foo\\\n',
    'foo  \n',
    '### foo\\\n',
    '### foo  \n',
  ],
};

const html = {
  spaces: '<p>foo<br />\nbaz</p>',
  backslash: '<p>foo<br />\nbaz</p>',
  moreThanTwoSpaces: '<p>foo<br />\nbaz</p>',
  spacesAreIgnored: [
    '<p>foo<br />\nbaz</p>',
    '<p>foo<br />\nbaz</p>',
  ],
  insideInlines: [
    '<p><em>foo<br />\nbaz</em></p>',
    '<p><em>foo<br />\nbaz</em></p>',
  ],
  insideCodeSpan: [
    '<p><code>code span</code></p>',
    '<p><code>code\\ span</code></p>',
  ],
  insideHtmlTags: [
    '<p><a href="foo  \nbaz"></p>',
    '<p><a href="foo\\\nbaz"></p>',
  ],
  atBlockElement: [
    '<p>foo\\</p>',
    '<p>foo  </p>', //@TODO delete spaces
    '<h3>foo\\</h3>',
    '<h3>foo  </h3>', //@TODO delete spaces
  ],
};

const tokens = {};

tokens.spaces = [
  {
    type: 'Chars',
    value: 'foo',
    start: 0,
    end: 3,
  },
  {
    type: 'Spaces',
    amount: 2,
    value: ' ',
    start: 3,
    end: 5,
  },
  {
    type: 'NewLine',
    amount: 1,
    value: '\n',
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

tokens.backslash = [
  {
    type: 'Chars',
    value: 'foo',
    start: 0,
    end: 3,
  },
  {
    type: 'Backslash',
    value: '\\',
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
    type: 'Chars',
    value: 'baz',
    start: 5,
    end: 8,
  },
];

tokens.moreThanTwoSpaces = [
  {
    type: 'Chars',
    value: 'foo',
    start: 0,
    end: 3,
  },
  {
    type: 'Spaces',
    amount: 7,
    value: ' ',
    start: 3,
    end: 10,
  },
  {
    type: 'NewLine',
    amount: 1,
    value: '\n',
    start: 10,
    end: 11,
  },
  {
    type: 'Chars',
    value: 'baz',
    start: 11,
    end: 14,
  },
];

tokens.spacesAreIgnored = [
  [
    {
      type: 'Chars',
      value: 'foo',
      start: 0,
      end: 3,
    },
    {
      type: 'Spaces',
      amount: 2,
      value: ' ',
      start: 3,
      end: 5,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 5,
      end: 6,
    },
    {
      type: 'Spaces',
      amount: 5,
      value: ' ',
      start: 6,
      end: 11,
    },
    {
      type: 'Chars',
      value: 'baz',
      start: 11,
      end: 14,
    },
  ],
  [
    {
      type: 'Chars',
      value: 'foo',
      start: 0,
      end: 3,
    },
    {
      type: 'Backslash',
      value: '\\',
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
      amount: 5,
      value: '     ',
      start: 5,
      end: 10,
    },
    {
      type: 'Chars',
      value: 'baz',
      start: 10,
      end: 13,
    },
  ],
];

tokens.insideInlines = [
  [
    {
      type: 'Asterisk',
      amount: 1,
      value: '*',
      start: 0,
      end: 1,
    },
    {
      type: 'Chars',
      value: 'foo',
      start: 1,
      end: 4,
    },
    {
      type: 'Spaces',
      amount: 2,
      value: ' ',
      start: 4,
      end: 6,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 6,
      end: 7,
    },
    {
      type: 'Chars',
      value: 'baz',
      start: 7,
      end: 10,
    },
    {
      type: 'Asterisk',
      amount: 1,
      value: '*',
      start: 10,
      end: 11,
    },
  ],
  [
    {
      type: 'Asterisk',
      amount: 1,
      value: '*',
      start: 0,
      end: 1,
    },
    {
      type: 'Chars',
      value: 'foo',
      start: 1,
      end: 4,
    },
    {
      type: 'Backslash',
      value: '\\',
      start: 4,
      end: 5,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 5,
      end: 6,
    },
    {
      type: 'Chars',
      value: 'baz',
      start: 6,
      end: 9,
    },
    {
      type: 'Asterisk',
      amount: 1,
      value: '*',
      start: 9,
      end: 10,
    },
  ],
];

tokens.insideCodeSpan = [
  [
    {
      type: 'Code',
      value: 'code span',
      isClosed: true,
      start: 0,
      end: 13,
    },
  ],
  [
    {
      type: 'Code',
      value: 'code\\ span',
      isClosed: true,
      start: 0,
      end: 12,
    },
  ],
];

tokens.insideHtmlTags = [[], []];

tokens.atBlockElement = [
  [
    {
      type: 'Chars',
      value: 'foo',
      start: 0,
      end: 3,
    },
    {
      type: 'Backslash',
      value: '\\',
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
  ],
  [
    {
      type: 'Chars',
      value: 'foo',
      start: 0,
      end: 3,
    },
    {
      type: 'Spaces',
      amount: 2,
      value: ' ',
      start: 3,
      end: 5,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 5,
      end: 6,
    },
  ],
  [
    {
      type: 'Hashes',
      amount: 3,
      value: '### ',
      start: 0,
      end: 4,
    },
    {
      type: 'Chars',
      value: 'foo',
      start: 4,
      end: 7,
    },
    {
      type: 'Backslash',
      value: '\\',
      start: 7,
      end: 8,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 8,
      end: 9,
    },
  ],
  [
    {
      type: 'Hashes',
      amount: 3,
      value: '### ',
      start: 0,
      end: 4,
    },
    {
      type: 'Chars',
      value: 'foo',
      start: 4,
      end: 7,
    },
    {
      type: 'Spaces',
      amount: 2,
      value: ' ',
      start: 7,
      end: 9,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 9,
      end: 10,
    },
  ],
];

const ast = {};

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
          type: 'HardLineBreak',
          operator: '  \n',
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

ast.backslash = {
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
          type: 'HardLineBreak',
          operator: '\\\n',
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

ast.backslash.body[0].parent = ast.backslash;

ast.backslash.body[0].body[0].parent = ast.backslash.body[0];
ast.backslash.body[0].body[1].parent = ast.backslash.body[0];
ast.backslash.body[0].body[2].parent = ast.backslash.body[0];

ast.moreThanTwoSpaces = {
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
          type: 'HardLineBreak',
          operator: '  \n',
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

ast.moreThanTwoSpaces.body[0].parent = ast.moreThanTwoSpaces;

ast.moreThanTwoSpaces.body[0].body[0].parent = ast.moreThanTwoSpaces.body[0];
ast.moreThanTwoSpaces.body[0].body[1].parent = ast.moreThanTwoSpaces.body[0];
ast.moreThanTwoSpaces.body[0].body[2].parent = ast.moreThanTwoSpaces.body[0];

ast.spacesAreIgnored = [
  {
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
            type: 'HardLineBreak',
            operator: '  \n',
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
  },
  {
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
            type: 'HardLineBreak',
            operator: '\\\n',
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
  },
];

ast.spacesAreIgnored[0].body[0].parent = ast.spacesAreIgnored[0];

ast.spacesAreIgnored[0].body[0].body[0].parent = ast.spacesAreIgnored[0].body[0];
ast.spacesAreIgnored[0].body[0].body[1].parent = ast.spacesAreIgnored[0].body[0];
ast.spacesAreIgnored[0].body[0].body[2].parent = ast.spacesAreIgnored[0].body[0];

ast.spacesAreIgnored[1].body[0].parent = ast.spacesAreIgnored[1];

ast.spacesAreIgnored[1].body[0].body[0].parent = ast.spacesAreIgnored[1].body[0];
ast.spacesAreIgnored[1].body[0].body[1].parent = ast.spacesAreIgnored[1].body[0];
ast.spacesAreIgnored[1].body[0].body[2].parent = ast.spacesAreIgnored[1].body[0];

ast.insideInlines = [
  {
    type: 'Program',
    body: [
      {
        type: 'Paragraph',
        body: [
          {
            type: 'Italic',
            operator: '*',
            body: [
              {
                type: 'Chars',
                value: 'foo',
              },
              {
                type: 'HardLineBreak',
                operator: '  \n',
              },
              {
                type: 'Chars',
                value: 'baz',
              },
            ],
            isClosed: true,
          },
        ],
        isClosed: true,
      },
    ],
    parent: null,
  },
  {
    type: 'Program',
    body: [
      {
        type: 'Paragraph',
        body: [
          {
            type: 'Italic',
            operator: '*',
            body: [
              {
                type: 'Chars',
                value: 'foo',
              },
              {
                type: 'HardLineBreak',
                operator: '\\\n',
              },
              {
                type: 'Chars',
                value: 'baz',
              },
            ],
            isClosed: true,
          },
        ],
        isClosed: true,
      },
    ],
    parent: null,
  },
];

ast.insideInlines[0].body[0].parent = ast.insideInlines[0];

ast.insideInlines[0].body[0].body[0].parent = ast.insideInlines[0].body[0];

ast.insideInlines[0].body[0].body[0].body[0].parent = ast.insideInlines[0].body[0].body[0];
ast.insideInlines[0].body[0].body[0].body[1].parent = ast.insideInlines[0].body[0].body[0];
ast.insideInlines[0].body[0].body[0].body[2].parent = ast.insideInlines[0].body[0].body[0];

ast.insideInlines[1].body[0].parent = ast.insideInlines[1];

ast.insideInlines[1].body[0].body[0].parent = ast.insideInlines[1].body[0];

ast.insideInlines[1].body[0].body[0].body[0].parent = ast.insideInlines[1].body[0].body[0];
ast.insideInlines[1].body[0].body[0].body[1].parent = ast.insideInlines[1].body[0].body[0];
ast.insideInlines[1].body[0].body[0].body[2].parent = ast.insideInlines[1].body[0].body[0];

ast.insideCodeSpan = [
  {
    type: 'Program',
    body: [
      {
        type: 'Paragraph',
        body: [
          {
            type: 'Code',
            body: [
              {
                type: 'Chars',
                value: 'code span',
              },
            ],
            isClosed: true,
          },
        ],
        isClosed: true,
      },
    ],
    parent: null,
  },
  {
    type: 'Program',
    body: [
      {
        type: 'Paragraph',
        body: [
          {
            type: 'Code',
            body: [
              {
                type: 'Chars',
                value: 'code\\ span',
              },
            ],
            isClosed: true,
          },
        ],
        isClosed: true,
      },
    ],
    parent: null,
  },
];

ast.insideCodeSpan[0].body[0].parent = ast.insideCodeSpan[0];
ast.insideCodeSpan[0].body[0].body[0].parent = ast.insideCodeSpan[0].body[0];
ast.insideCodeSpan[0].body[0].body[0].body[0].parent = ast.insideCodeSpan[0].body[0].body[0];

ast.insideCodeSpan[1].body[0].parent = ast.insideCodeSpan[1];
ast.insideCodeSpan[1].body[0].body[0].parent = ast.insideCodeSpan[1].body[0];
ast.insideCodeSpan[1].body[0].body[0].body[0].parent = ast.insideCodeSpan[1].body[0].body[0];

ast.insideHtmlTags = [{}, {}];

ast.atBlockElement = [
  {
    type: 'Program',
    body: [
      {
        type: 'Paragraph',
        body: [
          {
            type: 'Chars',
            value: 'foo\\',
          },
          {
            type: 'SoftLineBreak',
          },
        ],
        isClosed: true,
      },
    ],
    parent: null,
  },
  {
    type: 'Program',
    body: [
      {
        type: 'Paragraph',
        body: [
          {
            type: 'Chars',
            value: 'foo  ',
          },
          {
            type: 'SoftLineBreak',
          },
        ],
        isClosed: true,
      },
    ],
    parent: null,
  },
  {
    type: 'Program',
    body: [
      {
        type: 'Header',
        level: 3,
        value: '### ',
        body: [
          {
            type: 'Chars',
            value: 'foo\\',
          },
        ],
        isClosed: true,
      },
    ],
    parent: null,
  },
  {
    type: 'Program',
    body: [
      {
        type: 'Header',
        level: 3,
        value: '### ',
        body: [
          {
            type: 'Chars',
            value: 'foo  ',
          },
        ],
        isClosed: true,
      },
    ],
    parent: null,
  },
];

ast.atBlockElement[0].body[0].parent = ast.atBlockElement[0];
ast.atBlockElement[0].body[0].body[0].parent = ast.atBlockElement[0].body[0];
ast.atBlockElement[0].body[0].body[1].parent = ast.atBlockElement[0].body[0];

ast.atBlockElement[1].body[0].parent = ast.atBlockElement[1];
ast.atBlockElement[1].body[0].body[0].parent = ast.atBlockElement[1].body[0];
ast.atBlockElement[1].body[0].body[1].parent = ast.atBlockElement[1].body[0];

ast.atBlockElement[2].body[0].parent = ast.atBlockElement[2];
ast.atBlockElement[2].body[0].body[0].parent = ast.atBlockElement[2].body[0];

ast.atBlockElement[3].body[0].parent = ast.atBlockElement[3];
ast.atBlockElement[3].body[0].body[0].parent = ast.atBlockElement[3].body[0];

module.exports = {
  markdown,
  tokens,
  ast,
  html,
};
