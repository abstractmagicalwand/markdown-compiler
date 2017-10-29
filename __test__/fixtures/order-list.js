const strip = require('../helpers/strip');

const text = strip(`
    5.  Bird
    3.  McHale
    1.  Parish

    3. 2. Bird
      1. McHale
      8. Parish
  `);

const html = '<ol start="5"><li>Bird</li><li>McHale</li><li>Parish</li><li><ol start="2"><li>Bird</li><li>McHale</li><li>Parish</li></ol></li></ol>';

module.exports = {
  text,
  tokens: [
    {
      type: 'BOF',
    },
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
      value: '3',
      start: 8,
      end: 13,
    },
    {
      type: 'Chars',
      value: 'McHale',
      start: 13,
      end: 19,
    },
    {
      type: 'Item',
      depth: 0,
      value: '1',
      start: 19,
      end: 24,
    },
    {
      type: 'Chars',
      value: 'Parish',
      start: 24,
      end: 30,
    },
    {
      type: 'Item',
      depth: 0,
      value: '3',
      start: 30,
      end: 35,
    },
    {
      type: 'Item',
      depth: 1,
      value: '2',
      start: 35,
      end: 38,
    },
    {
      type: 'Chars',
      value: 'Bird',
      start: 38,
      end: 42,
    },
    {
      type: 'Item',
      depth: 1,
      value: '1',
      start: 42,
      end: 48,
    },
    {
      type: 'Chars',
      value: 'McHale',
      start: 48,
      end: 54,
    },
    {
      type: 'Item',
      depth: 1,
      value: '8',
      start: 54,
      end: 60,
    },
    {
      type: 'Chars',
      value: 'Parish',
      start: 60,
      end: 66,
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
        type: 'OrderList',
        depth: 0,
        start: '5',
        value: '5',
        styleType: '1',
        body: [
          {
            type: 'ListItem',
            depth: 0,
            value: '5',
            body: [
              {
                type: 'Chars',
                value: 'Bird',
              },
            ],
            isClosed: true,
          },
          {
            type: 'ListItem',
            depth: 0,
            value: '3',
            body: [
              {
                type: 'Chars',
                value: 'McHale',
              },
            ],
            isClosed: true,
          },
          {
            type: 'ListItem',
            depth: 0,
            value: '1',
            body: [
              {
                type: 'Chars',
                value: 'Parish',
              },
            ],
            isClosed: true,
          },
          {
            type: 'ListItem',
            depth: 0,
            value: '3',
            body: [
              {
                type: 'OrderList',
                start: '2',
                styleType: '1',
                depth: 1,
                body: [
                  {
                    type: 'ListItem',
                    value: '2',
                    depth: 1,
                    body: [
                      {
                        type: 'Chars',
                        value: 'Bird',
                      },
                    ],
                    isClosed: true,
                  },
                  {
                    type: 'ListItem',
                    value: '1',
                    depth: 1,
                    body: [
                      {
                        type: 'Chars',
                        value: 'McHale',
                      },
                    ],
                    isClosed: true,
                  },
                  {
                    type: 'ListItem',
                    value: '8',
                    depth: 1,
                    body: [
                      {
                        type: 'Chars',
                        value: 'Parish',
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
        type: 'EOF',
      },
    ],
    parent: null,
  },
  html,
};
