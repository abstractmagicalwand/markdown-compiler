import test from 'ava';
import traverser from './traverser';

test.only('should transform nodes', (t) => {
  const ast = {
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
                closed: true,
              },
            ],
            closed: true,
          },
        ],
      },
    ],
  };

  const visitor = {
    Bold: {
      enter(node) {
        node.type = 'Italic';
        node.operator = '_';

        t.is(arguments.length, 2, 'should be two arguments');
      },
      exit(node) {
        node.body = node.body.filter(node => node.body.length);
        node.closed = false;
      },
    },
    Chars: {
      enter(node) {
        node.raw = node.value;
      },
      exit(node) {
        node.value = node.value.replace(' ', '-');
      },
    },
  };

  t.deepEqual(traverser(ast, visitor), {
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
            closed: false,
          },
        ],
        closed: true,
      },
    ],
  });
});
