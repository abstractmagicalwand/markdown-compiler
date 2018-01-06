const strip = require('../helpers/strip');

const markdown = strip(`
    * Link to To-Do list
    + Add Pictures
    - - Ars longa, vita brevis
      - Do the To-Do List!
        - Add an infobox.
    - Update the Criticism section with the latest developments.
    -Fix coordinates for the Nova Zagora entry.
    *   Donec sit amet nisl. Aliquam semper ipsum sit amet velit.
    Suspendisse id sem consectetuer libero luctus adipiscing.

    - At fiat voluntas tua
  `);

const html = '<ul><li>Link to To-Do list</li><li>Add Pictures</li><li><ul><li>Ars longa, vita brevis</li><li>Do the To-Do List!<ul><li>Add an infobox.</li></ul></li></ul></li><li>Update the Criticism section with the latest developments. -Fix coordinates for the Nova Zagora entry.</li><li>Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse id sem consectetuer libero luctus adipiscing.</li><li>At fiat voluntas tua</li></ul>';

module.exports = {
  markdown,
  tokens: [
    {
      type: 'Bullet',
      depth: 0,
      value: '* ',
      start: 0,
      end: 2,
    },
    {
      type: 'Chars',
      value: 'Link to To-Do list',
      start: 2,
      end: 20,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 20,
      end: 21,
    },
    {
      type: 'Bullet',
      depth: 0,
      value: '+ ',
      start: 21,
      end: 23,
    },
    {
      type: 'Chars',
      value: 'Add Pictures',
      start: 23,
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
      type: 'Bullet',
      depth: 0,
      value: '- ',
      start: 36,
      end: 38,
    },
    {
      type: 'Bullet',
      depth: 1,
      value: '- ',
      start: 38,
      end: 40,
    },
    {
      type: 'Chars',
      value: 'Ars longa, vita brevis',
      start: 40,
      end: 62,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 62,
      end: 63,
    },
    {
      type: 'Bullet',
      depth: 1,
      value: '  - ',
      start: 63,
      end: 67,
    },
    {
      type: 'Chars',
      value: 'Do the To-Do List!',
      start: 67,
      end: 85,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 85,
      end: 86,
    },
    {
      type: 'Bullet',
      depth: 2,
      value: '    - ',
      start: 86,
      end: 92,
    },
    {
      type: 'Chars',
      value: 'Add an infobox.',
      start: 92,
      end: 107,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 107,
      end: 108,
    },
    {
      type: 'Bullet',
      depth: 0,
      value: '- ',
      start: 108,
      end: 110,
    },
    {
      type: 'Chars',
      value: 'Update the Criticism section with the latest developments.',
      start: 110,
      end: 168,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 168,
      end: 169,
    },
    {
      type: 'Chars',
      value: '-Fix coordinates for the Nova Zagora entry.',
      start: 169,
      end: 212,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 212,
      end: 213,
    },
    {
      type: 'Bullet',
      depth: 0,
      value: '*   ',
      start: 213,
      end: 217,
    },
    {
      type: 'Chars',
      value: 'Donec sit amet nisl. Aliquam semper ipsum sit amet velit.',
      start: 217,
      end: 274,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 274,
      end: 275,
    },
    {
      type: 'Chars',
      value: 'Suspendisse id sem consectetuer libero luctus adipiscing.',
      start: 275,
      end: 332,
    },
    {
      type: 'NewLine',
      amount: 2,
      value: '\n',
      start: 332,
      end: 334,
    },
    {
      type: 'Bullet',
      depth: 0,
      value: '- ',
      start: 334,
      end: 336,
    },
    {
      type: 'Chars',
      value: 'At fiat voluntas tua',
      start: 336,
      end: 356,
    },
  ],
  ast: {
    type: 'Program',
    body: [
      {
        type: 'UnorderList',
        depth: 0,
        body: [
          {
            type: 'ListItem',
            value: '* ',
            depth: 0,
            body: [
              {
                type: 'Chars',
                value: 'Link to To-Do list',
              },
              {
                type: 'SoftLineBreak',
              },
            ],
            isClosed: true,
          },
          {
            type: 'ListItem',
            value: '+ ',
            depth: 0,
            body: [
              {
                type: 'Chars',
                value: 'Add Pictures',
              },
              {
                type: 'SoftLineBreak',
              },
            ],
            isClosed: true,
          },
          {
            type: 'ListItem',
            value: '- ',
            depth: 0,
            body: [
              {
                type: 'UnorderList',
                depth: 1,
                body: [
                  {
                    type: 'ListItem',
                    value: '- ',
                    depth: 1,
                    body: [
                      {
                        type: 'Chars',
                        value: 'Ars longa, vita brevis',
                      },
                      {
                        type: 'SoftLineBreak',
                      },
                    ],
                    isClosed: true,
                  },
                  {
                    type: 'ListItem',
                    value: '  - ',
                    depth: 1,
                    body: [
                      {
                        type: 'Chars',
                        value: 'Do the To-Do List!',
                      },
                      {
                        type: 'SoftLineBreak',
                      },
                      {
                        type: 'UnorderList',
                        depth: 2,
                        body: [
                          {
                            type: 'ListItem',
                            value: '    - ',
                            depth: 2,
                            body: [
                              {
                                type: 'Chars',
                                value: 'Add an infobox.',
                              },
                              {
                                type: 'SoftLineBreak',
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
                ],
                isClosed: true,
              },
            ],
            isClosed: true,
          },
          {
            type: 'ListItem',
            value: '- ',
            depth: 0,
            body: [
              {
                type: 'Chars',
                value: 'Update the Criticism section with the latest developments.',
              },
              {
                type: 'SoftLineBreak',
              },
              {
                type: 'Chars',
                value: '-Fix coordinates for the Nova Zagora entry.',
              },
              {
                type: 'SoftLineBreak',
              },
            ],
            isClosed: true,
          },
          {
            type: 'ListItem',
            value: '*   ',
            depth: 0,
            body: [
              {
                type: 'Chars',
                value: 'Donec sit amet nisl. Aliquam semper ipsum sit amet velit.',
              },
              {
                type: 'SoftLineBreak',
              },
              {
                type: 'Chars',
                value: 'Suspendisse id sem consectetuer libero luctus adipiscing.',
              },
              {
                type: 'SoftLineBreak',
              },
            ],
            isClosed: true,
          },
          {
            type: 'ListItem',
            value: '- ',
            depth: 0,
            body: [
              {
                type: 'Chars',
                value: 'At fiat voluntas tua',
              },
              {
                type: 'SoftLineBreak',
              },
            ],
            isClosed: true,
          },
        ],
        isClosed: true,
      },
    ],
    parent: null,
  },
  html,
};
