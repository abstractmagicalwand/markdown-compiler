import test from 'ava';

import cloneDeep from 'lodash/cloneDeep';
import traverser from '../src/traverser';
import {traverser as f} from './fixtures'; //eslint-disable-line

test('should transform nodes', t => {
  const visitor = {
    Bold: {
      enter(node, parent) {
        parent.archive = [];
        parent.archive.push(cloneDeep(node));

        node.type = 'Italic';
        node.operator = '_';

        t.is(arguments.length, 2, 'should be two arguments');
      },
      exit(node) {
        node.body = node.body.filter(node => !node.body || node.body.length);
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

  t.deepEqual(traverser(f.ast, visitor), f.expected);
});
