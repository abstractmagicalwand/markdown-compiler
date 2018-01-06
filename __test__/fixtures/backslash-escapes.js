const strip = require('../helpers/strip');

const markdown = {
  punctuation: '\\!\\"\\#\\$\\%\\&\\\'\\(\\)\\*\\+\\,\\-\\.\\\\/\\:\\;\\<\\=\\>\\?\\@\\[\\\\\\]\\^\\_\\`\\{\\|\\}\\~',
  likeLiteral: '\\→\\A\\a\\ \\3\\φ\\«',
  regularChars: strip(`
      \\*not emphasized*
      \\<br/> not a tag
      \\[not a link](/foo)
      \\\`not code\`
      1\\. not a list
      \\* not a list
      \\# not a heading
      \\[foo]: /url "not a reference"
    `),
  selfEscaped: '\\\\*emphasis*',
  hardLineBreak: strip(`
      foo\
      bar
    `),
};

const html = {
  punctuation: '<p>!&quot;#$%&amp;&apos;()*+,\\-.\\/:;&lt;=&gt;?@[\\]^_&grave;{|}~</p>',
  likeLiteral: '<p>\\&rarr;\\A\\a\\ \\3\\&phi;\\&laquo;</p>',
  regularChars: '<p>*not emphasized* &lt;br/&gt; not a tag [not a link](/foo) &grave;not code&grave; 1. not a list * not a list # not a heading [foo]: /url &quot;not a reference&quot;</p>',
  selfEscaped: '<p>\\<em>emphasis</em></p>',
  hardLineBreak: strip(`
      <p>foo<br />
      bar</p>
    `),
};

const tokens = {};

tokens.punctuation = [
  {
    type: 'Chars',
    value: '!"#$%&\'()*+,\\-.\\/:;<=>?@[\\]^_`{|}~',
    start: 0,
    end: 64,
  },
];

tokens.likeLiteral = [
  {
    type: 'Chars',
    value: '\\→\\A\\a\\ \\3\\φ\\«',
    start: 0,
    end: 14,
  },
];

tokens.regularChars = [
  {
    type: 'Chars',
    value: '*not emphasized',
    start: 0,
    end: 16,
  },
  {
    type: 'Asterisk',
    amount: 1,
    value: '*',
    start: 16,
    end: 17,
  },
  {
    type: 'NewLine',
    amount: 1,
    value: '\n',
    start: 17,
    end: 18,
  },
  {
    type: 'Chars',
    value: '<br/> not a tag',
    start: 18,
    end: 34,
  },
  {
    type: 'NewLine',
    amount: 1,
    value: '\n',
    start: 34,
    end: 35,
  },
  {
    type: 'Chars',
    value: '[not a link',
    start: 35,
    end: 47,
  },
  {
    type: 'RightSquareBracket',
    value: ']',
    start: 47,
    end: 48,
  },
  {
    type: 'LeftParenthesis',
    value: '(',
    start: 48,
    end: 49,
  },
  {
    type: 'Chars',
    value: '/foo',
    start: 49,
    end: 53,
  },
  {
    type: 'RightParenthesis',
    value: ')',
    start: 53,
    end: 54,
  },
  {
    type: 'NewLine',
    amount: 1,
    value: '\n',
    start: 54,
    end: 55,
  },
  {
    type: 'Chars',
    value: '`not code`',
    start: 55,
    end: 66,
  },
  {
    type: 'NewLine',
    amount: 1,
    value: '\n',
    start: 66,
    end: 67,
  },
  {
    type: 'Chars',
    value: '1. not a list',
    start: 67,
    end: 81,
  },
  {
    type: 'NewLine',
    amount: 1,
    value: '\n',
    start: 81,
    end: 82,
  },
  {
    type: 'Chars',
    value: '* not a list',
    start: 82,
    end: 95,
  },
  {
    type: 'NewLine',
    amount: 1,
    value: '\n',
    start: 95,
    end: 96,
  },
  {
    type: 'Chars',
    value: '# not a heading',
    start: 96,
    end: 112,
  },
  {
    type: 'NewLine',
    amount: 1,
    value: '\n',
    start: 112,
    end: 113,
  },
  {
    type: 'Chars',
    value: '[foo',
    start: 113,
    end: 118,
  },
  {
    type: 'RightSquareBracket',
    value: ']',
    start: 118,
    end: 119,
  },
  {
    type: 'Chars',
    value: ': /url "not a reference"',
    start: 119,
    end: 143,
  },
];

tokens.selfEscaped = [
  {
    type: 'Chars',
    value: '\\',
    start: 0,
    end: 2,
  },
  {
    type: 'Asterisk',
    amount: 1,
    value: '*',
    start: 2,
    end: 3,
  },
  {
    type: 'Chars',
    value: 'emphasis',
    start: 3,
    end: 11,
  },
  {
    type: 'Asterisk',
    amount: 1,
    value: '*',
    start: 11,
    end: 12,
  },
];

tokens.hardLineBreak = [
  {
    type: 'Chars',
    value: 'foo',
    start: 0,
    end: 3,
  },
  {
    type: 'HardLineBreak',
    operator: '/\n',
    start: 5,
    end: 7,
  },
  {
    type: 'Chars',
    value: 'bar',
    start: 7,
    end: 10,
  },
];

const ast = {};

ast.punctuation = {
  type: 'Program',
  body: [
    {
      type: 'Paragraph',
      body: [
        {
          type: 'Chars',
          value: '!&quot;#$%&amp;&apos;()*+,\\-.\\/:;&lt;=&gt;?@[\\]^_&grave;{|}~',
        },
      ],
      isClosed: true,
    },
  ],
  parent: null,
};

ast.punctuation.body[0].parent = ast.punctuation;
ast.punctuation.body[0].body[0].parent = ast.punctuation.body[0];

ast.likeLiteral = {
  type: 'Program',
  body: [
    {
      type: 'Paragraph',
      body: [
        {
          type: 'Chars',
          value: '\\&rarr;\\A\\a\\ \\3\\&phi;\\&laquo;',
        },
      ],
      isClosed: true,
    },
  ],
  parent: null,
};

ast.likeLiteral.body[0].parent = ast.likeLiteral;
ast.likeLiteral.body[0].body[0].parent = ast.likeLiteral.body[0];

ast.regularChars = {
  type: 'Program',
  body: [
    {
      type: 'Paragraph',
      body: [
        {
          type: 'Chars',
          value: '*not emphasized',
        },
        {
          type: 'Italic',
          operator: '*',
          body: [
            {
              type: 'SoftLineBreak',
            },
            {
              type: 'Chars',
              value: '&lt;br/&gt; not a tag',
            },
            {
              type: 'SoftLineBreak',
            },
            {
              type: 'Chars',
              value: '[not a link](/foo)',
            },
            {
              type: 'SoftLineBreak',
            },
            {
              type: 'Chars',
              value: '&grave;not code&grave;',
            },
            {
              type: 'SoftLineBreak',
            },
            {
              type: 'Chars',
              value: '1. not a list',
            },
            {
              type: 'SoftLineBreak',
            },
            {
              type: 'Chars',
              value: '* not a list',
            },
            {
              type: 'SoftLineBreak',
            },
            {
              type: 'Chars',
              value: '# not a heading',
            },
            {
              type: 'SoftLineBreak',
            },
            {
              type: 'Chars',
              value: '[foo]: /url &quot;not a reference&quot;',
            },
          ],
          isClosed: false,
        },
      ],
      isClosed: true,
    },
  ],
  parent: null,
};

ast.regularChars.body[0].parent = ast.regularChars;
ast.regularChars.body[0].body[0].parent = ast.regularChars.body[0];
ast.regularChars.body[0].body[1].parent = ast.regularChars.body[0];

ast.regularChars.body[0].body[1].body[0].parent = ast.regularChars.body[0].body[1];
ast.regularChars.body[0].body[1].body[1].parent = ast.regularChars.body[0].body[1];
ast.regularChars.body[0].body[1].body[2].parent = ast.regularChars.body[0].body[1];
ast.regularChars.body[0].body[1].body[3].parent = ast.regularChars.body[0].body[1];
ast.regularChars.body[0].body[1].body[4].parent = ast.regularChars.body[0].body[1];
ast.regularChars.body[0].body[1].body[5].parent = ast.regularChars.body[0].body[1];
ast.regularChars.body[0].body[1].body[6].parent = ast.regularChars.body[0].body[1];
ast.regularChars.body[0].body[1].body[7].parent = ast.regularChars.body[0].body[1];
ast.regularChars.body[0].body[1].body[8].parent = ast.regularChars.body[0].body[1];
ast.regularChars.body[0].body[1].body[9].parent = ast.regularChars.body[0].body[1];
ast.regularChars.body[0].body[1].body[10].parent = ast.regularChars.body[0].body[1];
ast.regularChars.body[0].body[1].body[11].parent = ast.regularChars.body[0].body[1];
ast.regularChars.body[0].body[1].body[12].parent = ast.regularChars.body[0].body[1];
ast.regularChars.body[0].body[1].body[13].parent = ast.regularChars.body[0].body[1];

ast.selfEscaped = {
  type: 'Program',
  body: [
    {
      type: 'Paragraph',
      body: [
        {
          type: 'Chars',
          value: '\\',
        },
        {
          type: 'Italic',
          operator: '*',
          body: [
            {
              type: 'Chars',
              value: 'emphasis',
            },
          ],
          isClosed: true,
        },
      ],
      isClosed: true,
    },
  ],
  parent: null,
};

ast.selfEscaped.body[0].parent = ast.selfEscaped;
ast.selfEscaped.body[0].body[0].parent = ast.selfEscaped.body[0];
ast.selfEscaped.body[0].body[1].parent = ast.selfEscaped.body[0];
ast.selfEscaped.body[0].body[1].body[0].parent = ast.selfEscaped.body[0].body[1];

ast.hardLineBreak = {
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
          operator: '/\n',
        },
        {
          type: 'Chars',
          value: 'bar',
        },
      ],
      isClosed: true,
    },
  ],
  parent: null,
};

ast.hardLineBreak.body[0].parent = ast.hardLineBreak;
ast.hardLineBreak.body[0].body[0].parent = ast.hardLineBreak.body[0];

module.exports = {
  markdown,
  tokens,
  ast,
  html,
};
