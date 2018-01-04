const strip = require('../helpers/strip');

const text = strip(`
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
  text,
  tokens: [
    {
      type: 'HorizontalRule',
      value: '*',
      start: 0,
      end: 5,
    },
    {
      type: 'HorizontalRule',
      value: '*',
      start: 5,
      end: 10,
    },
    {
      type: 'HorizontalRule',
      value: '*',
      start: 10,
      end: 16,
    },
    {
      type: 'HorizontalRule',
      value: '-',
      start: 16,
      end: 23,
    },
    {
      type: 'HorizontalRule',
      value: '-',
      start: 23,
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
