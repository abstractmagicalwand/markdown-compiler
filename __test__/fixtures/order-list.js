const text = `
5.  Bird
3.  McHale
1.  Parish

3. 2. Bird
   1. McHale
  8. Parish
`.trim();

const html = `
<ol start="5">
<li>
<p>Bird</p>
</li>
<li>
<p>McHale</p>
</li>
<li>
<p>Parish</p>
</li>
<li>
<ol start="2">
<li>Bird</li>
<li>McHale</li>
</ol>
</li>
<li>
<p>Parish</p>
</li>
</ol>
`.trim();

module.exports = {
  text,
  tokens: [
    {
      type: 'Item',
      depth: 0,
      value: '5',
      start: 0,
      end: 4,
    },
    {
      type: 'Chars',
      value: 'Bird',
      start: 4,
      end: 8,
    },
    {
      type: 'Item',
      depth: 0,
      value: '6',
      start: 8,
      end: 12,
    },
    {
      type: 'Chars',
      value: 'McHale',
      start: 12,
      end: 16,
    },
    {
      type: 'Item',
      depth: 0,
      value: '7',
      start: 16,
      end: 20,
    },
    {
      type: 'Chars',
      value: 'Parish',
      start: 20,
      end: 26,
    },
    {
      type: 'Item',
      depth: 0,
      value: '8',
      start: 26,
      end: 29,
    },
    {
      type: 'Item',
      depth: 1,
      value: '2',
      start: 29,
      end: 32,
    },
    {
      type: 'Chars',
      value: 'Bird',
      start: 32,
      end: 36,
    },
    {
      type: 'Item',
      depth: 1,
      value: '3',
      start: 36,
      end: 42,
    },
    {
      type: 'Chars',
      value: 'McHale',
      start: 42,
      end: 48,
    },
    {
      type: 'Item',
      depth: 0,
      value: '9',
      start: 48,
      end: 53,
    },
    {
      type: 'Chars',
      value: 'Parish',
      start: 53,
      end: 59,
    },
  ],
  ast: {
    type: 'Paragraph',
    body: [
      {
        type: 'OrderList',
        start: '5',
        styleType: '1',
        body: [
          {
            type: 'ListItem',
            value: '5',
            body: [
              {
                type: 'Chars',
                value: 'Bird',
              },
            ],
            closed: true,
          },
          {
            type: 'ListItem',
            value: '6',
            body: [
              {
                type: 'Chars',
                value: 'McHale',
              },
            ],
            closed: true,
          },
          {
            type: 'ListItem',
            value: '7',
            body: [
              {
                type: 'Chars',
                value: 'Parish',
              },
            ],
            closed: true,
          },
          {
            type: 'ListItem',
            value: '8',
            body: [
              {
                type: 'OrderList',
                start: '2',
                styleType: '1',
                body: [
                  {
                    type: 'ListItem',
                    value: '2',
                    body: [
                      {
                        type: 'Chars',
                        value: 'Bird',
                      },
                    ],
                    closed: true,
                  },
                  {
                    type: 'ListItem',
                    value: '3',
                    body: [
                      {
                        type: 'Chars',
                        value: 'McHale',
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
            value: '9',
            body: [
              {
                type: 'Chars',
                value: 'Parish',
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
