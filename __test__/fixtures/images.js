const strip = require('../helpers/strip');

const markdown = {
  inline: '![Alt text](/path/to/img.jpg)',
  optionalTitle: '![Alt text](/path/to/img.jpg "Optional title")',
  reference: strip(`
      ![Alt text][id]

      [id]: url/to/image  "Optional title attribute"
    `),
};

const html = {
  inline: '<p><img src="/path/to/img.jpg" alt="Alt text"></p>',
  optionalTitle: '<p><img src="/path/to/img.jpg" alt="Alt text" title="Optional title"></p>',
  reference: '<p><img src="url/to/image" alt="Alt text" title="Optional title attribute"></p>',
};

const variables = {
  reference: {
    id: 'url/to/image  "Optional title attribute"',
  },
};

const tokens = {};

tokens.inline = [
  {
    type: 'OpenedImageBracket',
    value: '![',
    start: 0,
    end: 2,
  },
  {
    type: 'Chars',
    value: 'Alt text',
    start: 2,
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
    value: '/path/to/img.jpg',
    start: 12,
    end: 28,
  },
  {
    type: 'RightParenthesis',
    value: ')',
    start: 28,
    end: 29,
  },
];

tokens.optionalTitle = [
  {
    type: 'OpenedImageBracket',
    value: '![',
    start: 0,
    end: 2,
  },
  {
    type: 'Chars',
    value: 'Alt text',
    start: 2,
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
    value: '/path/to/img.jpg "Optional title"',
    start: 12,
    end: 45,
  },
  {
    type: 'RightParenthesis',
    value: ')',
    start: 45,
    end: 46,
  },
];

tokens.reference = [
  {
    type: 'OpenedImageBracket',
    value: '![',
    start: 0,
    end: 2,
  },
  {
    type: 'Chars',
    value: 'Alt text',
    start: 2,
    end: 10,
  },
  {
    type: 'RightSquareBracket',
    value: ']',
    start: 10,
    end: 11,
  },
  {
    type: 'LeftSquareBracket',
    value: '[',
    start: 11,
    end: 12,
  },
  {
    type: 'Chars',
    value: 'id',
    start: 12,
    end: 14,
  },
  {
    type: 'RightSquareBracket',
    value: ']',
    start: 14,
    end: 15,
  },
];

const ast = {};

ast.inline = {
  type: 'Program',
  body: [
    {
      type: 'Paragraph',
      body: [
        {
          type: 'Image',
          operators: ['![', ']', '(', ')'],
          label: null,
          src: {
            operators: null,
            value: '/path/to/img.jpg',
          },
          title: null,
          alt: 'Alt text',
        },
      ],
      isClosed: true,
    },
  ],
  parent: null,
};

ast.inline.body[0].parent = ast.inline;
ast.inline.body[0].body[0].parent = ast.inline.body[0];

ast.optionalTitle = {
  type: 'Program',
  body: [
    {
      type: 'Paragraph',
      body: [
        {
          type: 'Image',
          operators: ['![', ']', '(', ')'],
          label: null,
          src: {
            operators: null,
            value: '/path/to/img.jpg',
          },
          title: {
            operators: ['"'],
            value: 'Optional title',
          },
          alt: 'Alt text',
        },
      ],
      isClosed: true,
    },
  ],
  parent: null,
};

ast.optionalTitle.body[0].parent = ast.optionalTitle;
ast.optionalTitle.body[0].body[0].parent = ast.optionalTitle.body[0];

ast.reference = {
  type: 'Program',
  body: [
    {
      type: 'Paragraph',
      body: [
        {
          type: 'Image',
          operators: ['![', ']', '[', ']'],
          label: 'id',
          src: {
            operators: null,
            value: 'url/to/image',
          },
          title: {
            operators: ['"'],
            value: 'Optional title attribute',
          },
          alt: 'Alt text',
        },
      ],
      isClosed: true,
    },
  ],
  parent: null,
};

ast.reference.body[0].parent = ast.reference;
ast.reference.body[0].body[0].parent = ast.reference.body[0];

module.exports = {
  markdown,
  tokens,
  variables,
  ast,
  html,
};
