const text = `
* * *

***
*****

- - -
---------------------------------------
`.trim();

const html = `
<hr>
<hr>
<hr>
<hr>
<hr>
`.trim();

module.exports = {
  text,
  tokens: [
    {
      type: 'BOF',
    },
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
    {
      type: 'EOF',
    },
  ],
  ast: {
    type: 'Program',
    body: [
      {
        type: 'BOF',
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
      {
        type: 'EOF',
      },
    ],
    parent: null,
  },
  html,
};
