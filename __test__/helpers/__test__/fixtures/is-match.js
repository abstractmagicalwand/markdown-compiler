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
            isClosed: true,
          },
        ],
        isClosed: true,
      },
    ],
    isClosed: true,
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
              isClosed: true,
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
              isClosed: true,
            },
          ],
          isClosed: true,
        },
      ],
      isClosed: true,
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
              isClosed: true,
            },
          ],
          isClosed: true,
        },
      ],
      isClosed: true,
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
              isClosed: true,
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
              isClosed: true,
            },
          ],
          isClosed: true,
        },
      ],
      isClosed: true,
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
              isClosed: true,
            },
          ],
          isClosed: true,
        },
      ],
      isClosed: true,
    },
  ],
};
