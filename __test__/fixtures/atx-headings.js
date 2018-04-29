const strip = require('../helpers/strip');

const markdown = strip(`
    # Header 1
    ## Header 2
    ### Header 3
    #### Header 4
    ##### Header 5
    ###### Header 6
    ####### Chars
  `);

const html = strip(`
    <h1>Header 1</h1>
    <h2>Header 2</h2>
    <h3>Header 3</h3>
    <h4>Header 4</h4>
    <h5>Header 5</h5>
    <h6>Header 6</h6>
    <p>####### Chars</p>
  `);

module.exports = {
  markdown,
  tokens: [
    {
      type: 'Hashes',
      value: '# ',
      amount: 1,
      start: 0,
      end: 2,
    },
    {
      type: 'Chars',
      value: 'Header',
      raw: 'Header',
      start: 2,
      end: 8,
    },
    {
      type: 'Spaces',
      amount: ' ',
      raw: ' ',
      start: 8,
      end: 9,
    },
    {
      type: 'Chars',
      value: '1',
      raw: '1',
      start: 9,
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
      type: 'Hashes',
      value: '## ',
      amount: 2,
      start: 11,
      end: 14,
    },
    {
      type: 'Chars',
      value: 'Header',
      raw: 'Header',
      start: 14,
      end: 20,
    },
    {
      type: 'Spaces',
      amount: 1,
      raw: ' ',
      start: 20,
      end: 21,
    },
    {
      type: 'Chars',
      value: '2',
      raw: '2',
      start: 21,
      end: 22,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 22,
      end: 23,
    },
    {
      type: 'Hashes',
      value: '### ',
      amount: 3,
      start: 23,
      end: 27,
    },
    {
      type: 'Chars',
      value: 'Header',
      raw: 'Header',
      start: 27,
      end: 33,
    },
    {
      type: 'Chars',
      value: ' ',
      raw: ' ',
      start: 33,
      end: 34,
    },
    {
      type: 'Chars',
      value: '3',
      raw: '3',
      start: 34,
      end: 35,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 35,
      end: 36,
    },
    {
      type: 'Hashes',
      value: '#### ',
      amount: 4,
      start: 36,
      end: 41,
    },
    {
      type: 'Chars',
      value: 'Header',
      raw: 'Header',
      start: 41,
      end: 47,
    },
    {
      type: 'Spaces',
      value: ' ',
      raw: ' ',
      start: 47,
      end: 48,
    },
    {
      type: 'Chars',
      value: '4',
      raw: '4',
      start: 48,
      end: 49,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 49,
      end: 50,
    },
    {
      type: 'Hashes',
      value: '##### ',
      amount: 5,
      start: 50,
      end: 56,
    },
    {
      type: 'Chars',
      value: 'Header',
      raw: 'Header',
      start: 56,
      end: 62,
    },
    {
      type: 'Spaces',
      amount: 1,
      raw: ' ',
      start: 62,
      end: 63,
    },
    {
      type: 'Chars',
      value: '5',
      raw: '5',
      start: 63,
      end: 64,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 64,
      end: 65,
    },
    {
      type: 'Hashes',
      value: '###### ',
      amount: 6,
      start: 65,
      end: 72,
    },
    {
      type: 'Chars',
      value: 'Header 6',
      start: 72,
      end: 78,
    },
    {
      type: 'Spaces',
      amount: 1,
      raw: ' ',
      start: 78,
      end: 79,
    },
    {
      type: 'Chars',
      value: '6',
      raw: '6',
      start: 79,
      end: 80,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 80,
      end: 81,
    },
    {
      type: 'Chars',
      value: '#######',
      raw: '#######',
      start: 81,
      end: 88,
    },
    {
      type: 'Spaces',
      amount: 1,
      raw: ' ',
      start: 88,
      end: 89,
    },
    {
      type: 'Chars',
      value: 'Chars',
      raw: 'Chars',
      start: 89,
      end: 94,
    },
  ],
  ast: {
    type: 'Program',
    body: [
      {
        type: 'Header',
        level: 1,
        value: '# ',
        body: [
          {
            type: 'Chars',
            value: 'Header 1',
          }
          ,
        ],
        isClosed: true,
      },
      {
        type: 'Header',
        level: 2,
        value: '## ',
        body: [
          {
            type: 'Chars',
            value: 'Header 2',
          }
          ,
        ],
        isClosed: true,
      },
      {
        type: 'Header',
        level: 3,
        value: '### ',
        body: [
          {
            type: 'Chars',
            value: 'Header 3',
          },
        ],
        isClosed: true,
      },
      {
        type: 'Header',
        level: 4,
        value: '#### ',
        body: [
          {
            type: 'Chars',
            value: 'Header 4',
          },
        ],
        isClosed: true,
      },
      {
        type: 'Header',
        level: 5,
        value: '##### ',
        body: [
          {
            type: 'Chars',
            value: 'Header 5',
          },
        ],
        isClosed: true,
      },
      {
        type: 'Header',
        level: 6,
        value: '###### ',
        body: [
          {
            type: 'Chars',
            value: 'Header 6',
          },
        ],
        isClosed: true,
      },
      {
        type: 'Paragraph',
        body: [
          {
            type: 'Chars',
            value: '####### Chars',
          },
        ],
        isClosed: true,
      },
    ],
    parent: null,
  },
  html,
};
