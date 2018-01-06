const strip = require('../helpers/strip');

const markdown = strip(`
    * * *

    ***
    *****

    - - -
    ---------------------------------------
  `);

const html = strip(`
    <hr>
    <hr>
    <hr>
    <hr>
    <hr>
  `);

module.exports = {
  markdown,
  tokens: [
    {
      type: 'HorizontalRule',
      amount: 3,
      value: '* * *',
      start: 0,
      end: 5,
    },
    {
      type: 'NewLine',
      amount: 2,
      value: '\n',
      start: 5,
      end: 7,
    },
    {
      type: 'HorizontalRule',
      amount: 3,
      value: '***',
      start: 7,
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
      type: 'HorizontalRule',
      amount: 5,
      value: '*****',
      start: 11,
      end: 16,
    },
    {
      type: 'NewLine',
      amount: 2,
      value: '\n',
      start: 16,
      end: 18,
    },
    {
      type: 'HorizontalRule',
      amount: 3,
      value: '- - -',
      start: 18,
      end: 23,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 23,
      end: 24,
    },
    {
      type: 'HorizontalRule',
      amount: 39,
      value: '---------------------------------------',
      start: 24,
      end: 63,
    },
  ],
  ast: {
    type: 'Program',
    body: [
      {
        type: 'HorizontalRule',
        value: '*',
      },
      {
        type: 'HorizontalRule',
        value: '*',
      },
      {
        type: 'HorizontalRule',
        value: '*',
      },
      {
        type: 'HorizontalRule',
        value: '-',
      },
      {
        type: 'HorizontalRule',
        value: '-',
      },
    ],
    parent: null,
  },
  html,
};
