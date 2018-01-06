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
      value: 'Header 1',
      start: 2,
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
      value: 'Header 2',
      start: 14,
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
      value: 'Header 3',
      start: 27,
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
      value: 'Header 4',
      start: 41,
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
      value: 'Header 5',
      start: 56,
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
      value: '####### Chars',
      start: 81,
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
