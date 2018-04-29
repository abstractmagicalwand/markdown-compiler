const markdown = {
  main: '***\n---\n___',
  wrongChars: [
    '+++',
    '===',
  ],
  notEnoughChars: '--\n**\n__',
  spacesIndentAreAllowed: ' ***\n  ***\n  ***',
  fourSpacesIsTooMany: [
    '    ***',
    'Foo\n    ***',
  ],
  moreThanThreeChars: '_____________________________________',
  spacesAreAllowedInLine: [
    ' - - -',
    ' **  * ** * ** * **',
    '-     -      -      -',
    '- - - -    ',
  ],
  otherCharsAreNotAllowedInLine: [
    '_ _ _ _ a',
    'a------',
    '---a---',
  ],
  shouldBeTheSame: ' *-*',
  doNotNeedBlankLines: '- foo\n***\n- bar',
  canInterruptParagraph: 'Foo\n***\nbar',
  setextHeadingOrThematicBreak: 'Foo\n---\nbar\n',
  listItemOrThematicBreak: [
    '\n* Foo\n* * *\n* Bar',
    '- Foo\n- * * *',
  ],
};

const html = {
  main: '<hr />\n<hr />\n<hr />',
  wrongChars: [
    '<p>+++</p>',
    '<p>===</p>',
  ],
  notEnoughChars: '<p>-- ** __</p>',
  spacesIndentAreAllowed: '<hr />\n<hr />\n<hr />',
  fourSpacesIsTooMany: [
    '<pre><code>***</code></pre>',
    '<p>Foo ***</p>',
  ],
  moreThanThreeChars: '<hr />',
  spacesAreAllowedInLine: '<hr />',
  otherCharsAreNotAllowedInLine: [
    '<p>_ _ _ _ a</p>',
    '<p>a------</p>',
    '<p>---a---</p>',
  ],
  shouldBeTheSame: '<p><em>-</em></p>',
  doNotNeedBlankLines: '<ul>\n<li>foo</li>\n</ul>\n<hr />\n<ul>\n<li>bar</li>\n</ul>',
  canInterruptParagraph: '<p>Foo</p>\n<hr />\n<p>bar</p>',
  setextHeadingOrThematicBreak: '<h2>Foo</h2>\n<p>bar</p>',
  listItemOrThematicBreak: [
    '<ul>\n<li>Foo</li>\n</ul>\n<hr />\n<ul>\n<li>Bar</li>\n</ul>',
    '<ul>\n<li>Foo</li>\n<li>\n<hr />\n</li>\n</ul>',
  ],
};

const tokens = {
  main: [
    {
      type: 'Asterisks',
      amount: 3,
      raw: '***',
      start: 0,
      end: 3,
    },
    {
      type: 'NewLines',
      amount: 1,
      raw: '\n',
      start: 3,
      end: 4,
    },
    {
      type: 'Underscores',
      amount: 3,
      raw: '___',
      start: 4,
      end: 7,
    },
    {
      type: 'NewLines',
      amount: 1,
      raw: '\n',
      start: 7,
      end: 8,
    },
    {
      type: 'Underscores',
      amount: 3,
      raw: '___',
      start: 8,
      end: 11,
    },
  ],
  wrongChars: [
    [
      {
        type: 'Chars',
        value: '+++',
        raw: '+++',
        start: 0,
        end: 3,
      },
    ],
    [
      {
        type: 'Signs',
        amount: 3,
        raw: '===',
        start: 0,
        end: 3,
      },
    ],
  ],
  notEnoughChars: [
    {
      type: 'Hyphens',
      amount: 2,
      raw: '--',
      start: 0,
      end: 2,
    },
    {
      type: 'NewLines',
      amount: 1,
      raw: '\n',
      start: 2,
      end: 3,
    },
    {
      type: 'Asterisks',
      amount: 2,
      raw: '**',
      start: 3,
      end: 5,
    },
    {
      type: 'NewLines',
      amount: 1,
      raw: '\n',
      start: 5,
      end: 6,
    },
    {
      type: 'Underscores',
      amount: 2,
      raw: '__',
      start: 6,
      end: 8,
    },
  ],
  spacesIndentAreAllowed: [
    {
      type: 'Spaces',
      amount: 0,
      raw: ' ',
      start: 0,
      end: 1,
    },
    {
      type: 'Asterisks',
      amount: 3,
      raw: '***',
      start: 1,
      end: 4,
    },
    {
      type: 'NewLines',
      amount: 1,
      raw: '\n',
      start: 4,
      end: 5,
    },
    {
      type: 'Spaces',
      amount: 2,
      raw: '  ',
      start: 5,
      end: 7,
    },
    {
      type: 'Asterisks',
      amount: 3,
      raw: '***',
      start: 7,
      end: 10,
    },
    {
      type: 'NewLines',
      amount: 1,
      raw: '\n',
      start: 10,
      end: 11,
    },
    {
      type: 'Spaces',
      amount: 2,
      raw: '  ',
      start: 11,
      end: 13,
    },
    {
      type: 'Asterisks',
      amount: 3,
      raw: '***',
      start: 13,
      end: 16,
    },
  ],
  fourSpacesIsTooMany: [
    [
      {
        type: 'Spaces',
        amount: 4,
        raw: '    ',
        start: 0,
        end: 4,
      },
      {
        type: 'Asterisks',
        amount: 3,
        raw: '***',
        start: 4,
        end: 7,
      },
    ],
    [
      {
        type: 'Chars',
        value: 'Foo',
        raw: 'Foo',
        start: 0,
        end: 3,
      },
      {
        type: 'NewLines',
        amount: 1,
        raw: '\n',
        start: 3,
        end: 4,
      },
      {
        type: 'Spaces',
        amount: 4,
        raw: '    ',
        start: 4,
        end: 8,
      },
      {
        type: 'Asterisks',
        amount: 3,
        raw: '***',
        start: 8,
        end: 11,
      },
    ],
  ],
  moreThanThreeChars: [
    {
      type: 'Underscores',
      amount: 37,
      raw: '_____________________________________',
      start: 0,
      end: 37,
    },
  ],
  spacesAreAllowedInLine: [
    [
      {
        type: 'Signs',
        amount: 1,
        raw: ' ',
        start: 0,
        end: 1,
      },
      {
        type: 'Hyphens',
        amount: 1,
        raw: '-',
        start: 1,
        end: 2,
      },
      {
        type: 'Signs',
        amount: 1,
        raw: ' ',
        start: 2,
        end: 3,
      },
      {
        type: 'Hyphens',
        amount: 1,
        raw: '-',
        start: 3,
        end: 4,
      },
      {
        type: 'Signs',
        amount: 1,
        raw: ' ',
        start: 4,
        end: 5,
      },
      {
        type: 'Hyphens',
        amount: 1,
        raw: '-',
        start: 5,
        end: 6,
      },
    ],
    [
      {
        type: 'Spaces',
        amount: 1,
        raw: ' ',
        start: 0,
        end: 1,
      },
      {
        type: 'Asterisks',
        amount: 2,
        raw: '**',
        start: 1,
        end: 3,
      },
      {
        type: 'Spaces',
        amount: 2,
        raw: '  ',
        start: 3,
        end: 5,
      },
      {
        type: 'Asterisks',
        amount: 1,
        raw: '*',
        start: 5,
        end: 6,
      },
      {
        type: 'Space',
        amount: 1,
        raw: ' ',
        start: 6,
        end: 7,
      },
      {
        type: 'Asterisks',
        amount: 2,
        raw: '**',
        start: 7,
        end: 9,
      },
      {
        type: 'Spaces',
        amount: 1,
        raw: ' ',
        start: 9,
        end: 10,
      },
      {
        type: 'Asterisks',
        amount: 1,
        raw: '*',
        start: 10,
        end: 11,
      },
      {
        type: 'Spaces',
        amount: 1,
        raw: ' ',
        start: 11,
        end: 12,
      },
      {
        type: 'Asterisks',
        amount: 2,
        raw: '**',
        start: 12,
        end: 14,
      },
      {
        type: 'Spaces',
        amount: 1,
        raw: ' ',
        start: 14,
        end: 15,
      },
      {
        type: 'Asterisks',
        amount: 1,
        raw: '*',
        start: 15,
        end: 16,
      },
      {
        type: 'Spaces',
        amount: 14,
        raw: ' ',
        start: 16,
        end: 17,
      },
      {
        type: 'Asterisks',
        amount: 2,
        raw: '**',
        start: 17,
        end: 19,
      },
    ],
    [
      {
        type: 'Hyphens',
        amount: 1,
        raw: '-',
        start: 0,
        end: 1,
      },
      {
        type: 'Spaces',
        amount: 5,
        raw: '     ',
        start: 1,
        end: 6,
      },
      {
        type: 'Hyphens',
        amount: 1,
        raw: '-',
        start: 6,
        end: 7,
      },
      {
        type: 'Spaces',
        amount: 6,
        raw: '      ',
        start: 7,
        end: 13,
      },
      {
        type: 'Hyphens',
        amount: 1,
        raw: '-',
        start: 13,
        end: 14,
      },
      {
        type: 'Spaces',
        amount: 6,
        raw: '      ',
        start: 14,
        end: 20,
      },
      {
        type: 'Hyphens',
        amount: 1,
        raw: '-',
        start: 20,
        end: 21,
      },
    ],
    [
      {
        type: 'Hyphens',
        amount: 1,
        raw: '-',
        start: 0,
        end: 1,
      },
      {
        type: 'Spaces',
        amount: 1,
        raw: ' ',
        start: 1,
        end: 2,
      },
      {
        type: 'Hyphens',
        amount: 1,
        raw: '-',
        start: 2,
        end: 3,
      },
      {
        type: 'Spaces',
        amount: 1,
        raw: ' ',
        start: 3,
        end: 4,
      },
      {
        type: 'Hyphens',
        amount: 1,
        raw: '-',
        start: 4,
        end: 5,
      },
      {
        type: 'Spaces',
        amount: 1,
        raw: ' ',
        start: 5,
        end: 6,
      },
      {
        type: 'Hyphens',
        amount: 1,
        raw: '-',
        start: 6,
        end: 7,
      },
      {
        type: 'Spaces',
        amount: 4,
        raw: '    ',
        start: 7,
        end: 11,
      },
    ],
  ],
  otherCharsAreNotAllowedInLine: [
    [
      {
        type: 'Underscores',
        amount: 1,
        raw: '_',
        start: 0,
        end: 1,
      },
      {
        type: 'Spaces',
        amount: 1,
        raw: ' ',
        start: 1,
        end: 2,
      },
      {
        type: 'Underscores',
        amount: 1,
        raw: '_',
        start: 2,
        end: 3,
      },
      {
        type: 'Spaces',
        amount: 1,
        raw: ' ',
        start: 3,
        end: 4,
      },
      {
        type: 'Underscores',
        amount: 1,
        raw: '_',
        start: 4,
        end: 5,
      },
      {
        type: 'Spaces',
        amount: 1,
        raw: ' ',
        start: 5,
        end: 6,
      },
      {
        type: 'Underscores',
        amount: 1,
        raw: '_',
        start: 6,
        end: 7,
      },
      {
        type: 'Spaces',
        amount: 1,
        raw: ' ',
        start: 7,
        end: 8,
      },
      {
        type: 'Chars',
        value: 'a',
        raw: 'a',
        start: 8,
        end: 9,
      },
    ],
    [
      {
        type: 'Chars',
        value: 'a',
        raw: 'a',
        start: 0,
        end: 1,
      },
      {
        type: 'Hyphens',
        amount: 6,
        raw: '------',
        start: 1,
        end: 7,
      },
    ],
    [
      {
        type: 'Hyphens',
        amount: 3,
        raw: '---',
        start: 0,
        end: 3,
      },
      {
        type: 'Chars',
        value: 'a',
        raw: 'a',
        start: 3,
        end: 4,
      },
      {
        type: 'Hyphens',
        amount: 3,
        raw: '---',
        start: 4,
        end: 7,
      },
    ],
  ],
  shouldBeTheSame: [
    {
      type: 'Spaces',
      amount: 1,
      raw: ' ',
      start: 0,
      end: 1,
    },
    {
      type: 'Asterisks',
      amount: 1,
      raw: '*',
      start: 1,
      end: 2,
    },
    {
      type: 'Hyphens',
      amount: 1,
      raw: '-',
      start: 2,
      end: 3,
    },
    {
      type: 'Asterisks',
      amount: 1,
      raw: '*',
      start: 3,
      end: 4,
    },
  ],
  doNotNeedBlankLines: [
    {
      type: 'Bullet',
      depth: 0,
      value: '- ',
      start: 0,
      end: 2,
    },
    {
      type: 'Chars',
      value: 'foo',
      start: 2,
      end: 5,
    },
    {
      type: 'NewLines',
      amount: 1,
      raw: '\n',
      start: 5,
      end: 6,
    },
    {
      type: 'Asterisks',
      amount: 3,
      raw: '***',
      start: 6,
      end: 9,
    },
    {
      type: 'NewLines',
      amount: 1,
      raw: '\n',
      start: 9,
      end: 10,
    },
    {
      type: 'Bullet',
      depth: 0,
      value: '- ',
      start: 10,
      end: 12,
    },
    {
      type: 'Chars',
      value: 'bar',
      raw: 'bar',
      start: 12,
      end: 15,
    },
  ],
  canInterruptParagraph: [
    {
      type: 'Chars',
      value: 'Foo',
      raw: 'Foo',
      start: 0,
      end: 3,
    },
    {
      type: 'NewLines',
      amount: 1,
      raw: '\n',
      start: 3,
      end: 4,
    },
    {
      type: 'Asterisks',
      amount: 3,
      raw: '***',
      start: 4,
      end: 7,
    },
    {
      type: 'NewLines',
      amount: 1,
      raw: '\n',
      start: 7,
      end: 8,
    },
    {
      type: 'Chars',
      value: 'bar',
      raw: 'bar',
      start: 8,
      end: 11,
    },
  ],
  setextHeadingOrThematicBreak: [
    {
      type: 'Chars',
      value: 'Foo',
      raw: 'Foo',
      start: 0,
      end: 3,
    },
    {
      type: 'NewLines',
      amount: 1,
      raw: '\n',
      start: 3,
      end: 4,
    },
    {
      type: 'Hyphens',
      amount: 3,
      raw: '---',
      start: 4,
      end: 7,
    },
    {
      type: 'NewLines',
      amount: 1,
      raw: '\n',
      start: 7,
      end: 8,
    },
    {
      type: 'Chars',
      value: 'bar',
      raw: 'bar',
      start: 8,
      end: 11,
    },
    {
      type: 'NewLines',
      amount: 1,
      raw: '\n',
      start: 11,
      end: 12,
    },
  ],
  listItemOrThematicBreak: [
    [
      {
        type: 'NewLines',
        amount: 1,
        raw: '\n',
        start: 0,
        end: 1,
      },
      {
        type: 'Bullet',
        depth: 0,
        raw: '* ',
        start: 1,
        end: 3,
      },
      {
        type: 'Chars',
        value: 'Foo',
        raw: 'Foo',
        start: 3,
        end: 6,
      },
      {
        type: 'NewLines',
        amount: 1,
        raw: '\n',
        start: 6,
        end: 7,
      },
      {
        type: 'Asterisks',
        amount: 1,
        raw: '*',
        start: 7,
        end: 8,
      },
      {
        type: 'Signs',
        amount: 1,
        raw: ' ',
        start: 8,
        end: 9,
      },
      {
        type: 'Asterisks',
        amount: 1,
        raw: '*',
        start: 9,
        end: 10,
      },
      {
        type: 'Signs',
        amount: 1,
        raw: ' ',
        start: 10,
        end: 11,
      },
      {
        type: 'Asterisks',
        amount: 1,
        raw: '*',
        start: 11,
        end: 12,
      },
      {
        type: 'NewLines',
        amount: 1,
        raw: '\n',
        start: 12,
        end: 13,
      },
      {
        type: 'Asterisks',
        amount: 1,
        raw: '*',
        start: 13,
        end: 14,
      },
      {
        type: 'Spaces',
        amount: 1,
        raw: ' ',
        start: 14,
        end: 15,
      },
      {
        type: 'Chars',
        value: 'Bar',
        raw: 'Bar',
        start: 15,
        end: 18,
      },
    ],
    [
      {
        type: 'Bullet',
        depth: 0,
        raw: '- ',
        start: 0,
        end: 2,
      },
      {
        type: 'Chars',
        value: 'Foo',
        raw: 'Foo',
        start: 2,
        end: 5,
      },
      {
        type: 'NewLines',
        amount: 1,
        raw: '\n',
        start: 5,
        end: 6,
      },
      {
        type: 'Bullet',
        depth: 0,
        raw: '- ',
        start: 6,
        end: 8,
      },
      {
        type: 'Asterisks',
        amount: 1,
        raw: '*',
        start: 8,
        end: 9,
      },
      {
        type: 'Spaces',
        amount: 1,
        raw: ' ',
        start: 9,
        end: 10,
      },
      {
        type: 'Asterisks',
        amount: 1,
        raw: '*',
        start: 10,
        end: 11,
      },
      {
        type: 'Spaces',
        amount: 1,
        raw: ' ',
        start: 11,
        end: 12,
      },
      {
        type: 'Asterisks',
        amount: 1,
        raw: '*',
        start: 12,
        end: 13,
      },
    ],
  ],
};

const main = {
  type: 'Program',
  body: [
    {
      type: 'ThematicBreak',
    },
    {
      type: 'ThematicBreak',
    },
    {
      type: 'ThematicBreak',
    },
  ],
  parent: null,
};

main.body[0].parent = main;
main.body[1].parent = main;
main.body[2].parent = main;

const wrongChars = [
  {
    type: 'Program',
    body: [
      {
        type: 'Paragraph',
        body: [
          {
            type: 'Chars',
            value: '+++',
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
            value: '===',
          },
        ],
        isClosed: true,
      },
    ],
    parent: null,
  },
];

wrongChars[0].body[0].parent = wrongChars[0];
wrongChars[0].body[0].body[0].parent = wrongChars[0];

wrongChars[1].body[0].parent = wrongChars[1];
wrongChars[1].body[0].body[0].parent = wrongChars[1].body[0];

const notEnoughChars = {
  type: 'Program',
  body: [
    {
      type: 'Paragraph',
      body: [
        {
          type: 'Chars',
          value: '-- ** __',
        },
      ],
      isClosed: true,
    },
  ],
  isClosed: true,
  parent: null,
};

notEnoughChars.body[0].parent = notEnoughChars;
notEnoughChars.body[0].body[0].parent = notEnoughChars.body[0];

const spacesIndentAreAllowed = {
  type: 'Program',
  body: [
    {
      type: 'ThematicBreak',
    },
    {
      type: 'ThematicBreak',
    },
    {
      type: 'ThematicBreak',
    },
  ],
  isClosed: true,
  parent: null,
};

spacesIndentAreAllowed.body[0].parent = spacesIndentAreAllowed;
spacesIndentAreAllowed.body[1].parent = spacesIndentAreAllowed;
spacesIndentAreAllowed.body[2].parent = spacesIndentAreAllowed;

const fourSpacesIsTooMany = [
  {
    type: 'Program',
    body: [
      {
        type: 'CodeBlock',
        language: null,
        value: '***',
      },
    ],
    isClosed: true,
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
            value: 'Foo ***',
          },
        ],
        isClosed: true,
      },
    ],
    isClosed: true,
    parent: null,
  },
];

fourSpacesIsTooMany[0].body[0].parent = fourSpacesIsTooMany[0];

fourSpacesIsTooMany[1].body[0].parent = fourSpacesIsTooMany[1];
fourSpacesIsTooMany[1].body[0].body[0].parent = fourSpacesIsTooMany[1].body[0];

const moreThanThreeChars = {
  type: 'Program',
  body: [
    {
      type: 'ThematicBreak',
    },
  ],
  isClosed: true,
  parent: null,
};

moreThanThreeChars.body[0] = moreThanThreeChars;

const spacesAreAllowedInLine = {
  type: 'Program',
  body: [
    {
      type: 'HardLineBreak',
      operator: '\n',
    },
  ],
  isClosed: true,
  parent: null,
};

spacesAreAllowedInLine.body[0].parent = spacesAreAllowedInLine;

const otherCharsAreNotAllowedInLine = [
  {
    type: 'Program',
    body: [
      {
        type: 'Paragraph',
        body: [
          {
            type: 'Chars',
            value: '_ _ _ _ a',
          },
        ],
        isClosed: true,
      },
    ],
    isClosed: true,
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
            value: 'a------',
          },
        ],
        isClosed: true,
      },
    ],
    isClosed: true,
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
            value: '---a---',
          },
        ],
        isClosed: true,
      },
    ],
    isClosed: true,
    parent: null,
  },
];

otherCharsAreNotAllowedInLine[0].body[0].parent = otherCharsAreNotAllowedInLine;
otherCharsAreNotAllowedInLine[0].body[0].body[0].parent =
  otherCharsAreNotAllowedInLine.body[0];

otherCharsAreNotAllowedInLine[1].body[0].parent = otherCharsAreNotAllowedInLine;
otherCharsAreNotAllowedInLine[1].body[0].body[0].parent =
  otherCharsAreNotAllowedInLine.body[1];

otherCharsAreNotAllowedInLine[2].body[0].parent = otherCharsAreNotAllowedInLine;
otherCharsAreNotAllowedInLine[2].body[0].body[0].parent =
  otherCharsAreNotAllowedInLine.body[2];

const shouldBeTheSame = {
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
              value: '-',
            },
          ],
          isClosed: true,
        },
      ],
      isClosed: true,
    },
  ],
  isClosed: true,
  parent: null,
};

shouldBeTheSame.body[0].parent = shouldBeTheSame;
shouldBeTheSame.body[0].body[0].parent = shouldBeTheSame.body[0];

const doNotNeedBlankLines = {
  type: 'Program',
  body: [
    {
      type: 'UnorderList',
      depth: 0,
      body: [
        {
          type: 'ListItem',
          depth: 0,
          body: [
            {
              type: 'Chars',
              value: 'foo',
            },
          ],
          isClosed: true,
        },
      ],
      isClosed: true,
    },
    {
      type: 'ThematicBreak',
    },
    {
      type: 'UnorderList',
      depth: 0,
      body: [
        {
          type: 'ListItem',
          depth: 0,
          body: [
            {
              type: 'Chars',
              value: 'bar',
            },
          ],
          isClosed: true,
        },
      ],
      isClosed: true,
    },
  ],
  isClosed: true,
  parent: null,
};

doNotNeedBlankLines.body[0].parent = doNotNeedBlankLines;
doNotNeedBlankLines.body[0].body[0].parent = doNotNeedBlankLines.body[0];
doNotNeedBlankLines.body[0].body[0].body[0].parent =
  doNotNeedBlankLines.body[0].body[0];

doNotNeedBlankLines.body[1].parent = doNotNeedBlankLines;

doNotNeedBlankLines.body[2].parent = doNotNeedBlankLines;
doNotNeedBlankLines.body[2].body[0].parent = doNotNeedBlankLines.body[2];
doNotNeedBlankLines.body[2].body[0].body[0].parent =
  doNotNeedBlankLines.body[2].body[0];

const canInterruptParagraph = {
  type: 'Program',
  body: [
    {
      type: 'Paragraph',
      body: [
        {
          type: 'Chars',
          value: 'Foo',
        },
      ],
      isClosed: true,
    },
    {
      type: 'ThematicBreak',
    },
    {
      type: 'Paragraph',
      body: [
        {
          type: 'Chars',
          value: 'bar',
        },
      ],
      isClosed: true,
    },
  ],
  isClosed: true,
  parent: null,
};

canInterruptParagraph.body[0].parent = canInterruptParagraph;
canInterruptParagraph.body[0].body[0].parent = canInterruptParagraph.body[0];

canInterruptParagraph.body[1].parent = canInterruptParagraph;

canInterruptParagraph.body[2].parent = canInterruptParagraph;
canInterruptParagraph.body[2].body[0].parent = canInterruptParagraph.body[2];

const setextHeadingOrThematicBreak = {
  type: 'Program',
  body: [
    {
      type: 'Heading',
      kind: '2',
      value: 'Foo',
    },
    {
      type: 'Paragraph',
      body: [
        {
          type: 'Chars',
          value: 'bar',
        },
      ],
      isClosed: true,
    },
  ],
  isClosed: true,
  parent: null,
};

setextHeadingOrThematicBreak.body[0].parent =
  setextHeadingOrThematicBreak.body[0];

setextHeadingOrThematicBreak.body[1].parent =
  setextHeadingOrThematicBreak.body[1];
setextHeadingOrThematicBreak.body[1].body[0].parent =
  setextHeadingOrThematicBreak.body[1].body[0];

const listItemOrThematicBreak = [
  {
    type: 'Program',
    body: [
      {
        type: 'UnorderList',
        depth: 0,
        body: [
          {
            type: 'ListItem',
            depth: 0,
            body: [
              {
                type: 'Chars',
                value: 'Foo',
              },
            ],
            isClosed: true,
          },
        ],
        isClosed: true,
      },
      {
        type: 'ThematicBreak',
      },
      {
        type: 'UnorderList',
        depth: 0,
        body: [
          {
            type: 'ListItem',
            depth: 0,
            body: [
              {
                type: 'Chars',
                value: 'Bar',
              },
            ],
            isClosed: true,
          },
        ],
        isClosed: true,
      },
    ],
    isClosed: true,
    parent: null,
  },
  {
    type: 'Program',
    body: [
      {
        type: 'UnorderList',
        depth: 0,
        body: [
          {
            type: 'ListItem',
            depth: 0,
            body: [
              {
                type: 'Chars',
                value: 'Foo',
              },
            ],
            isClosed: true,
          },
          {
            type: 'ListItem',
            depth: 0,
            body: [
              {
                type: 'HardLineBreak',
                operator: '\n',
              },
            ],
            isClosed: true,
          },
        ],
        isClosed: true,
      },
    ],
    isClosed: true,
    parent: null,
  },
];

listItemOrThematicBreak.body[0].parent = listItemOrThematicBreak;
listItemOrThematicBreak.body[0].body[0].parent =
  listItemOrThematicBreak.body[0];
listItemOrThematicBreak.body[0].body[0].body[0].parent =
  listItemOrThematicBreak.body[0].body[0];

listItemOrThematicBreak.body[1].parent = listItemOrThematicBreak.body[1];

listItemOrThematicBreak.body[2].parent = listItemOrThematicBreak;
listItemOrThematicBreak.body[2].body[0].parent =
  listItemOrThematicBreak.body[2];
listItemOrThematicBreak.body[2].body[0].body[0].parent =
  listItemOrThematicBreak.body[2].body[0];

module.exports = {
  markdown,
  tokens,
  ast: {
    main,
    wrongChars,
    notEnoughChars,
    spacesIndentAreAllowed,
    fourSpacesIsTooMany,
    moreThanThreeChars,
    spacesAreAllowedInLine,
    otherCharsAreNotAllowedInLine,
    shouldBeTheSame,
    doNotNeedBlankLines,
    canInterruptParagraph,
    setextHeadingOrThematicBreak,
    listItemOrThematicBreak,
  },
  html,
};
