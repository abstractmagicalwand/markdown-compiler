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
<ul>
<li>Link to To-Do list</li>
</ul>
<ul>
<li>Add Pictures</li>
</ul>
<ul>
<li>
<ul>
<li>Ars longa, vita brevis</li>
<li>Do the To-Do List!
<ul>
<li>Add an infobox.</li>
</ul>
</li>
</ul>
</li>
<li>Update the Criticism section with the latest developments. -Fix coordinates for the Nova Zagora entry.</li>
</ul>
<ul>
<li>Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse id sem consectetuer libero luctus adipiscing.</li>
</ul>
<ul>
<li>At fiat voluntas tua</li>
</ul>
`.trim();

module.exports = {
  text,
  tokens: [
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
      type: 'Bullet',
      depth: 0,
      value: '-',
      start: 35,
      end: 36,
    },
    {
      type: 'Bullet',
      depth: 1,
      value: '-',
      start: 36,
      end: 38,
    },
    {
      type: 'Chars',
      value: 'Ars longa, vita brevis',
      start: 38,
      end: 50,
    },
    {
      type: 'Bullet',
      depth: 1,
      value: '-',
      start: 50,
      end: 52,
    },
    {
      type: 'Chars',
      value: 'Do the To-Do List!',
      start: 52,
      end: 70,
    },
    {
      type: 'Bullet',
      depth: 2,
      value: '-',
      start: 70,
      end: 76,
    },
    {
      type: 'Chars',
      value: 'Update the Criticism section with the latest developments. -Fix coordinates for the Nova Zagora entry.',
      start: 76,
      end: 178,
    },
    {
      type: 'Bullet',
      depth: 0,
      value: '*',
      start: 178,
      end: 182,
    },
    {
      type: 'Chars',
      value: 'Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse id sem consectetuer libero luctus adipiscing.',
      start: 182,
      end: 297,
    },
    {
      type: 'Bullet',
      depth: 0,
      value: '-',
      start: 297,
      end: 301,
    },
    {
      type: 'Chars',
      value: 'At fiat voluntas tua',
      start: 301,
      end: 321,
    },
  ],
  ast: {
    type: 'Paragraph',
    body: [
      {
        type: 'UnorderList',
        body: [
          {
            type: 'ListItem',
            value: '*',
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
            body: [
              {
                type: 'UnorderList',
                body: [
                  {
                    type: 'ListItem',
                    value: '-',
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
                    body: [
                      {
                        type: 'Chars',
                        value: 'Do the To-Do List!',
                      },
                      {
                        type: 'UnorderList',
                        body: [
                          {
                            type: 'ListItem',
                            value: '-',
                            body: [
                              {
                                type: 'Chars',
                                value: 'Update the Criticism section with the latest developments. -Fix coordinates for the Nova Zagora entry.',
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
            value: '*',
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
    ],
    closed: true,
  },
  html,
};
