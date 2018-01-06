import test from 'ava';

import isMatched from '../is-match';
import { isMatched as f } from './fixtures';

test('should match object and sources', t => {
  isMatched(
    f.object,
    f.sources,
    (a, b) => {
      t.is(a, b, `${a} isn't equal to ${b}`);
    }
  );
});

test('shouldn\'t match object and sources', t => {
  isMatched(
    f.object,
    f.sourcesAreNotRelevant,
    (a, b) => {
      if (a !== b) {
        t.not(a, b);
      }
    });
});
