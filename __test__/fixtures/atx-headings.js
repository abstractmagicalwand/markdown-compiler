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
    <h6>Header 6 ####### Chars</h6>
  `);

module.exports = {
  markdown,
  tokens: [
    {
      type: 'Hashes',
      value: '#',
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
      type: 'Hashes',
      value: '#',
      amount: 2,
      start: 10,
      end: 14,
    },
    {
      type: 'Chars',
      value: 'Header 2',
      start: 14,
      end: 22,
    },
    {
      type: 'Hashes',
      value: '#',
      amount: 3,
      start: 22,
      end: 27,
    },
    {
      type: 'Chars',
      value: 'Header 3',
      start: 27,
      end: 35,
    },
    {
      type: 'Hashes',
      value: '#',
      amount: 4,
      start: 35,
      end: 41,
    },
    {
      type: 'Chars',
      value: 'Header 4',
      start: 41,
      end: 49,
    },
    {
      type: 'Hashes',
      value: '#',
      amount: 5,
      start: 49,
      end: 56,
    },
    {
      type: 'Chars',
      value: 'Header 5',
      start: 56,
      end: 64,
    },
    {
      type: 'Hashes',
      value: '#',
      amount: 6,
      start: 64,
      end: 72,
    },
    {
      type: 'Chars',
      value: 'Header 6 ####### Chars',
      start: 72,
      end: 94,
    },
  ],
  ast: {
    type: 'Program',
    body: [
      {
        type: 'Header',
        amount: 1,
        value: '#',
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
        amount: 2,
        value: '#',
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
        amount: 3,
        value: '#',
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
        amount: 4,
        value: '#',
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
        amount: 5,
        value: '#',
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
        amount: 6,
        value: '#',
        body: [
          {
            type: 'Chars',
            value: 'Header 6 ####### Chars',
          },
        ],
        isClosed: true,
      },
    ],
    parent: null,
  },
  html,
};
