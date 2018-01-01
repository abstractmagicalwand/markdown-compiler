const strip = require('../helpers/strip');

const text = {
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
    type: 'BOF',
  },
  {
    type: 'Chars',
    value: '!"#$%&\'()*+,\\-.\\/:;<=>?@[\\]^_`{|}~',
    start: 0,
    end: 64,
  },
  {
    type: 'EOF',
  },
];

tokens.likeLiteral = [
  {
    type: 'BOF',
  },
  {
    type: 'Chars',
    value: '\\→\\A\\a\\ \\3\\φ\\«',
    start: 0,
    end: 14,
  },
  {
    type: 'EOF',
  },
];

tokens.regularChars = [
  {
    type: 'BOF',
  },
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
    type: 'Chars',
    value: ' <br/> not a tag [not a link',
    start: 17,
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
    type: 'Chars',
    value: ' `not code` 1. not a list * not a list # not a heading [foo',
    start: 54,
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
  {
    type: 'EOF',
  },
];

tokens.selfEscaped = [
  {
    type: 'BOF',
  },
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
  {
    type: 'EOF',
  },
];

tokens.hardLineBreak = [
  {
    type: 'BOF',
  },
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
  {
    type: 'EOF',
  },
];

const ast = {};

ast.punctuation = {
  type: 'Program',
  body: [
    {
      type: 'BOF',
    },
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
    {
      type: 'EOF',
    },
  ],
  parent: null,
};

ast.punctuation.body[0].parent = ast.punctuation;
ast.punctuation.body[1].parent = ast.punctuation;
ast.punctuation.body[2].parent = ast.punctuation;

ast.punctuation.body[1].body[0].parent = ast.punctuation.body[1];

ast.likeLiteral = {
  type: 'Program',
  body: [
    {
      type: 'BOF',
    },
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
    {
      type: 'EOF',
    },
  ],
  parent: null,
};

ast.likeLiteral.body[0].parent = ast.likeLiteral;
ast.likeLiteral.body[1].parent = ast.likeLiteral;
ast.likeLiteral.body[2].parent = ast.likeLiteral;

ast.likeLiteral.body[1].body[0].parent = ast.likeLiteral.body[1];

ast.regularChars = {
  type: 'Program',
  body: [
    {
      type: 'BOF',
    },
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
              type: 'Chars',
              value: ' &lt;br/&gt; not a tag [not a link](/foo) &grave;not code&grave; 1. not a list * not a list # not a heading [foo]: /url &quot;not a reference&quot;',
            },
          ],
          isClosed: false,
        },
      ],
      isClosed: true,
    },
    {
      type: 'EOF',
    },
  ],
  parent: null,
};

ast.regularChars.body[0].parent = ast.regularChars;
ast.regularChars.body[1].parent = ast.regularChars;
ast.regularChars.body[2].parent = ast.regularChars;

ast.regularChars.body[1].body[0].parent = ast.regularChars.body[1];
ast.regularChars.body[1].body[1].parent = ast.regularChars.body[1];

ast.regularChars.body[1].body[1].body[0].parent = ast.regularChars.body[1].body[1];

ast.selfEscaped = {
  type: 'Program',
  body: [
    {
      type: 'BOF',
    },
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
    {
      type: 'EOF',
    },
  ],
  parent: null,
};

ast.selfEscaped.body[0].parent = ast.selfEscaped;
ast.selfEscaped.body[1].parent = ast.selfEscaped;
ast.selfEscaped.body[2].parent = ast.selfEscaped;

ast.selfEscaped.body[1].body[0].parent = ast.selfEscaped.body[1];
ast.selfEscaped.body[1].body[1].parent = ast.selfEscaped.body[1];

ast.selfEscaped.body[1].body[1].body[0].parent = ast.selfEscaped.body[1].body[1];

ast.hardLineBreak = {
  type: 'Program',
  body: [
    {
      type: 'BOF',
    },
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
    {
      type: 'EOF',
    },
  ],
  parent: null,
};

ast.hardLineBreak.body[0].parent = ast.hardLineBreak;
ast.hardLineBreak.body[1].parent = ast.hardLineBreak;
ast.hardLineBreak.body[2].parent = ast.hardLineBreak;

ast.hardLineBreak.body[1].body[0].parent = ast.hardLineBreak.body[1];

module.exports = {
  text,
  tokens,
  ast,
  html,
};
