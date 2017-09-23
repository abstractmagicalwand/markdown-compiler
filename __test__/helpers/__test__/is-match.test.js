import test from 'ava';

import isMatch from '../is-match';
import { isMatch as f } from './fixtures'; // eslint-disable-line

test('should match object and sources', t => {
  isMatch(
    f.object,
    f.sources,
    (a, b) => {
      t.is(a, b, `${a} isn't equal to ${b}`);
    }
  );
});

test('shouldn\'t match object and sources', t => {
  isMatch(
    f.object,
    f.sourcesAreNotRelevant,
    (a, b) => {
      if (a !== b) {
        t.not(a, b);
      }
    });
});
