module.exports = {
  ast: {
    type: 'Program',
    body: [
      {
        type: 'Paragraph',
        body: [
          {
            type: 'Bold',
            operator: '__',
            body: [
              {
                type: 'Chars',
                value: 'night owl',
              },
              {
                type: 'Italic',
                operator: '_',
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
  },
  expected: {
    type: 'Program',
    body: [
      {
        type: 'Paragraph',
        body: [
          {
            type: 'Italic',
            operator: '_',
            body: [
              {
                type: 'Chars',
                value: 'night-owl',
                raw: 'night owl',
              },
            ],
            isClosed: false,
          },
        ],
        archive: [
          {
            type: 'Bold',
            operator: '__',
            body: [
              {
                type: 'Chars',
                value: 'night owl',
              },
              {
                type: 'Italic',
                operator: '_',
                body: [],
                isClosed: true,
              },
            ],
            isClosed: true,
          }
          ,
        ],
        isClosed: true,
      },
    ],
  },
};
