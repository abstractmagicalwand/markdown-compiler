const text = {
  withTitle: 'This is [an example](http://example.com/ "Title") inline link.',
  withoutTitle: '[This link](http://example.net/) has no title attribute.',
  relativePath: 'See my [About](/about/) page for details.',
  withEmphasis: '[_This_ **link**](http://example.net/) has no title attribute.',
};

const html = {
  withTitle: '<p>This is <a href="http://example.com/" title="Title">an example</a> inline link.</p>',
  withoutTitle: '<p><a href="http://example.net/">This link</a> has no title attribute.</p>',
  relativePath: '<p>See my <a href="/about/">About</a> page for details.</p>',
  withEmphasis: '<p><a href="http://example.net/"><em>This</em> <strong>link</strong></a> has no title attribute.</p>',
};

const tokens = {
  withTitle: [
    {
      type: 'BOF',
    },
    {
      type: 'Chars',
      value: 'This is ',
      start: 0,
      end: 8,
    },
    {
      type: 'LeftSquareBracket',
      value: '[',
      start: 8,
      end: 9,
    },
    {
      type: 'Chars',
      value: 'an example',
      start: 9,
      end: 19,
    },
    {
      type: 'RightSquareBracket',
      value: ']',
      start: 19,
      end: 20,
    },
    {
      type: 'LeftParenthesis',
      value: '(',
      start: 20,
      end: 21,
    },
    {
      type: 'Chars',
      value: 'http://example.com/ "Title"',
      start: 21,
      end: 48,
    },
    {
      type: 'RightParenthesis',
      value: ')',
      start: 48,
      end: 49,
    },
    {
      type: 'Chars',
      value: ' inline link.',
      start: 49,
      end: 62,
    },
    {
      type: 'EOF',
    },
  ],
  withoutTitle: [
    {
      type: 'BOF',
    },
    {
      type: 'LeftSquareBracket',
      value: '[',
      start: 0,
      end: 1,
    },
    {
      type: 'Chars',
      value: 'This link',
      start: 1,
      end: 10,
    },
    {
      type: 'RightSquareBracket',
      value: ']',
      start: 10,
      end: 11,
    },
    {
      type: 'LeftParenthesis',
      value: '(',
      start: 11,
      end: 12,
    },
    {
      type: 'Chars',
      value: 'http://example.net/',
      start: 12,
      end: 31,
    },
    {
      type: 'RightParenthesis',
      value: ')',
      start: 31,
      end: 32,
    },
    {
      type: 'Chars',
      value: ' has no title attribute.',
      start: 32,
      end: 56,
    },
    {
      type: 'EOF',
    },
  ],
  relativePath: [
    {
      type: 'BOF',
    },
    {
      type: 'Chars',
      value: 'See my ',
      start: 0,
      end: 7,
    },
    {
      type: 'LeftSquareBracket',
      value: '[',
      start: 7,
      end: 8,
    },
    {
      type: 'Chars',
      value: 'About',
      start: 8,
      end: 13,
    },
    {
      type: 'RightSquareBracket',
      value: ']',
      start: 13,
      end: 14,
    },
    {
      type: 'LeftParenthesis',
      value: '(',
      start: 14,
      end: 15,
    },
    {
      type: 'Chars',
      value: '/about/',
      start: 15,
      end: 22,
    },
    {
      type: 'RightParenthesis',
      value: ')',
      start: 22,
      end: 23,
    },
    {
      type: 'Chars',
      value: ' page for details.',
      start: 23,
      end: 41,
    },
    {
      type: 'EOF',
    },
  ],
  withEmphasis: [
    {
      type: 'BOF',
    },
    {
      type: 'LeftSquareBracket',
      value: '[',
      start: 0,
      end: 1,
    },
    {
      type: 'Underscore',
      amount: 1,
      value: '_',
      start: 1,
      end: 2,
    },
    {
      type: 'Chars',
      value: 'This',
      start: 2,
      end: 6,
    },
    {
      type: 'Underscore',
      amount: 1,
      value: '_',
      start: 6,
      end: 7,
    },
    {
      type: 'Chars',
      value: ' ',
      start: 7,
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
      value: 'link',
      start: 10,
      end: 14,
    },
    {
      type: 'Asterisk',
      amount: 2,
      value: '*',
      start: 14,
      end: 16,
    },
    {
      type: 'RightSquareBracket',
      value: ']',
      start: 16,
      end: 17,
    },
    {
      type: 'LeftParenthesis',
      value: '(',
      start: 17,
      end: 18,
    },
    {
      type: 'Chars',
      value: 'http://example.net/',
      start: 18,
      end: 37,
    },
    {
      type: 'RightParenthesis',
      value: ')',
      start: 37,
      end: 38,
    },
    {
      type: 'Chars',
      value: ' has no title attribute.',
      start: 38,
      end: 62,
    },
    {
      type: 'EOF',
    },
  ],
};

const ast = {};

ast.withTitle = {
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
          value: 'This is ',
        },
        {
          type: 'LinkInline',
          operator: ['(', ')'],
          href: 'http://example.com/',
          title: {
            operator: '"',
            value: 'Title',
          },
          body: [
            {
              type: 'LinkInlineChildren',
              operator: ['[', ']'],
              body: [
                {
                  type: 'Chars',
                  value: 'an example',
                },
              ],
              isClosed: true,
            },
          ],
          isClosed: true,
        },
        {
          type: 'Chars',
          value: ' inline link.',
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

ast.withTitle.body[0].parent = ast.withTitle;
ast.withTitle.body[1].parent = ast.withTitle;
ast.withTitle.body[2].parent = ast.withTitle;

ast.withTitle.body[1].body[0].parent = ast.withTitle.body[1];
ast.withTitle.body[1].body[1].parent = ast.withTitle.body[1];
ast.withTitle.body[1].body[2].parent = ast.withTitle.body[1];

ast.withTitle.body[1].body[1].body[0].parent = ast.withTitle.body[1].body[1];

ast.withTitle.body[1].body[1].body[0].body[0].parent = ast.withTitle.body[1].body[1].body[0];

ast.withoutTitle = {
  type: 'Program',
  body: [
    {
      type: 'BOF',
    },
    {
      type: 'Paragraph',
      body: [
        {
          type: 'LinkInline',
          operator: ['(', ')'],
          href: 'http://example.net/',
          title: null,
          body: [
            {
              type: 'LinkInlineChildren',
              operator: ['[', ']'],
              body: [
                {
                  type: 'Chars',
                  value: 'This link',
                },
              ],
              isClosed: true,
            },
          ],
          isClosed: true,
        },
        {
          type: 'Chars',
          value: ' has no title attribute.',
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

ast.withoutTitle.body[0].parent = ast.withoutTitle;
ast.withoutTitle.body[1].parent = ast.withoutTitle;
ast.withoutTitle.body[2].parent = ast.withoutTitle;

ast.withoutTitle.body[1].body[0].parent = ast.withoutTitle.body[1];
ast.withoutTitle.body[1].body[1].parent = ast.withoutTitle.body[1];

ast.withoutTitle.body[1].body[0].body[0].parent = ast.withoutTitle.body[1].body[0];

ast.withoutTitle.body[1].body[0].body[0].body[0].parent = ast.withoutTitle.body[1].body[0].body[0];

ast.relativePath = {
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
          value: 'See my ',
        },
        {
          type: 'LinkInline',
          operator: ['(', ')'],
          href: '/about/',
          title: null,
          body: [
            {
              type: 'LinkInlineChildren',
              operator: ['[', ']'],
              body: [
                {
                  type: 'Chars',
                  value: 'About',
                },
              ],
              isClosed: true,
            },
          ],
          isClosed: true,
        },
        {
          type: 'Chars',
          value: ' page for details.',
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

ast.relativePath.body[0].parent = ast.relativePath;
ast.relativePath.body[1].parent = ast.relativePath;
ast.relativePath.body[2].parent = ast.relativePath;

ast.relativePath.body[1].body[0].parent = ast.relativePath.body[1];
ast.relativePath.body[1].body[1].parent = ast.relativePath.body[1];
ast.relativePath.body[1].body[2].parent = ast.relativePath.body[1];

ast.relativePath.body[1].body[1].body[0].parent = ast.relativePath.body[1].body[1];

ast.relativePath.body[1].body[1].body[0].body[0].parent = ast.relativePath.body[1].body[1].body[0];

ast.withEmphasis = {
  type: 'Program',
  body: [
    {
      type: 'BOF',
    },
    {
      type: 'Paragraph',
      body: [
        {
          type: 'LinkInline',
          operator: ['(', ')'],
          href: 'http://example.net/',
          title: null,
          body: [
            {
              type: 'LinkInlineChildren',
              operator: ['[', ']'],
              body: [
                {
                  type: 'Italic',
                  operator: '_',
                  body: [
                    {
                      type: 'Chars',
                      value: 'This',
                    },
                  ],
                  isClosed: true,
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
                      value: 'link',
                    },
                  ],
                  isClosed: true,
                },
              ],
              isClosed: true,
            },
          ],
          isClosed: true,
        },
        {
          type: 'Chars',
          value: ' has no title attribute.',
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

ast.withEmphasis.body[0].parent = ast.withEmphasis;
ast.withEmphasis.body[1].parent = ast.withEmphasis;
ast.withEmphasis.body[2].parent = ast.withEmphasis;

ast.withEmphasis.body[1].body[0].parent = ast.withEmphasis.body[1];
ast.withEmphasis.body[1].body[1].parent = ast.withEmphasis.body[1];

ast.withEmphasis.body[1].body[0].body[0].parent = ast.withEmphasis.body[1].body[0];

ast.withEmphasis.body[1].body[0].body[0].body[0].parent = ast.withEmphasis.body[1].body[0].body[0];
ast.withEmphasis.body[1].body[0].body[0].body[1].parent = ast.withEmphasis.body[1].body[0].body[0];
ast.withEmphasis.body[1].body[0].body[0].body[2].parent = ast.withEmphasis.body[1].body[0].body[0];

ast.withEmphasis.body[1].body[0].body[0].body[0].body[0].parent = ast.withEmphasis.body[1].body[0].body[0].body[0];
ast.withEmphasis.body[1].body[0].body[0].body[2].body[0].parent = ast.withEmphasis.body[1].body[0].body[0].body[2];

module.exports = {
  text,
  tokens,
  ast,
  html,
};
