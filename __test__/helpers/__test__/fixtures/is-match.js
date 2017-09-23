module.exports = {
  object: {
    type: 'Paragraph',
    body: [
      {
        type: 'Bold',
        operator: '*',
        body: [
          {
            type: 'Italic',
            operator: '*',
            body: [
              {
                type: 'Chars',
                value: 'Abeunt studia in mores.',
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
  sources: [
    {
      type: 'Paragraph',
      body: [
        {
          type: 'Bold',
          operator: '*',
          body: [
            {
              type: 'Italic',
              operator: '*',
              body: [
                {
                  type: 'Chars',
                  value: 'Abeunt studia in mores.',
                },
              ],
              closed: true,
            },
            {
              type: 'Bold',
              operator: '_',
              body: [
                {
                  type: 'Chars',
                  value: 'Res redit ad triarios.',
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
      type: 'Paragraph',
      body: [
        {
          type: 'Bold',
          operator: '*',
          body: [
            {
              type: 'Italic',
              operator: '*',
              body: [
                {
                  type: 'Chars',
                  value: 'Abeunt studia in mores.',
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
  sourcesAreNotRelevant: [
    {
      type: 'Paragraph',
      body: [
        {
          type: 'Italic',
          body: [
            {
              type: 'Italic',
              operator: '*',
              body: [
                {
                  type: 'Chars',
                  value: 'Abeunt studia in mores.',
                },
              ],
              closed: true,
            },
            {
              type: 'Bold',
              operator: '_',
              body: [
                {
                  type: 'Chars',
                  value: 'Res redit ad triarios.',
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
      type: 'Paragraph',
      body: [
        {
          type: 'Bold',
          operator: '*',
          body: [
            {
              type: 'Italic',
              operator: '*',
              body: [],
              closed: true,
            },
          ],
          closed: true,
        },
      ],
      closed: true,
    },
  ],
};
