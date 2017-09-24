const text = `
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
`.trim();

const html = `
<ul><li>Link to To-Do list</li><li>Add Pictures</li><li><ul><li>Ars longa, vita brevis</li><li>Do the To-Do List!<ul><li>Add an infobox.</li></ul></li></ul></li><li>Update the Criticism section with the latest developments. -Fix coordinates for the Nova Zagora entry.</li><li>Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse id sem consectetuer libero luctus adipiscing.</li><li>At fiat voluntas tua</li></ul>
`.trim();

module.exports = {
  text,
  tokens: [
    {
      type: 'BOF',
    },
    {
      type: 'Bullet',
      depth: 0,
      value: '*',
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
      type: 'Bullet',
      depth: 0,
      value: '+',
      start: 20,
      end: 23,
    },
    {
      type: 'Chars',
      value: 'Add Pictures',
      start: 23,
      end: 35,
    },
    {
      type: 'Bullet',
      depth: 0,
      value: '-',
      start: 35,
      end: 38,
    },
    {
      type: 'Bullet',
      depth: 1,
      value: '-',
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
      type: 'Bullet',
      depth: 1,
      value: '-',
      start: 62,
      end: 67,
    },
    {
      type: 'Chars',
      value: 'Do the To-Do List!',
      start: 67,
      end: 85,
    },
    {
      type: 'Bullet',
      depth: 2,
      value: '-',
      start: 85,
      end: 92,
    },
    {
      type: 'Chars',
      value: 'Add an infobox.',
      start: 92,
      end: 107,
    },
    {
      type: 'Bullet',
      depth: 0,
      value: '-',
      start: 107,
      end: 110,
    },
    {
      type: 'Chars',
      value: 'Update the Criticism section with the latest developments. -Fix coordinates for the Nova Zagora entry.',
      start: 110,
      end: 212,
    },
    {
      type: 'Bullet',
      depth: 0,
      value: '*',
      start: 212,
      end: 217,
    },
    {
      type: 'Chars',
      value: 'Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse id sem consectetuer libero luctus adipiscing.',
      start: 217,
      end: 332,
    },
    {
      type: 'Bullet',
      depth: 0,
      value: '-',
      start: 332,
      end: 336,
    },
    {
      type: 'Chars',
      value: 'At fiat voluntas tua',
      start: 336,
      end: 356,
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
        type: 'UnorderList',
        depth: 0,
        body: [
          {
            type: 'ListItem',
            value: '*',
            depth: 0,
            body: [
              {
                type: 'Chars',
                value: 'Link to To-Do list',
              },
            ],
            closed: true,
          },
          {
            type: 'ListItem',
            value: '+',
            depth: 0,
            body: [
              {
                type: 'Chars',
                value: 'Add Pictures',
              },
            ],
            closed: true,
          },
          {
            type: 'ListItem',
            value: '-',
            depth: 0,
            body: [
              {
                type: 'UnorderList',
                depth: 1,
                body: [
                  {
                    type: 'ListItem',
                    value: '-',
                    depth: 1,
                    body: [
                      {
                        type: 'Chars',
                        value: 'Ars longa, vita brevis',
                      },
                    ],
                    closed: true,
                  },
                  {
                    type: 'ListItem',
                    value: '-',
                    depth: 1,
                    body: [
                      {
                        type: 'Chars',
                        value: 'Do the To-Do List!',
                      },
                      {
                        type: 'UnorderList',
                        depth: 2,
                        body: [
                          {
                            type: 'ListItem',
                            value: '-',
                            depth: 2,
                            body: [
                              {
                                type: 'Chars',
                                value: 'Add an infobox.',
                              },
                            ],
                            closed: true,
                          },
                        ],
                        closed: true,
                      },
                    ],
                    closed: true,
                  },
                ],
                closed: true,
              },
            ],
            closed: true,
          },
          {
            type: 'ListItem',
            value: '-',
            depth: 0,
            body: [
              {
                type: 'Chars',
                value: 'Update the Criticism section with the latest developments. -Fix coordinates for the Nova Zagora entry.',
              },
            ],
            closed: true,
          },
          {
            type: 'ListItem',
            value: '*',
            depth: 0,
            body: [
              {
                type: 'Chars',
                value: 'Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse id sem consectetuer libero luctus adipiscing.',
              },
            ],
            closed: true,
          },
          {
            type: 'ListItem',
            value: '-',
            depth: 0,
            body: [
              {
                type: 'Chars',
                value: 'At fiat voluntas tua',
              },
            ],
            closed: true,
          },
        ],
        closed: true,
      },
      {
        type: 'EOF',
      },
    ],
    parent: null,
  },
  html,
};
