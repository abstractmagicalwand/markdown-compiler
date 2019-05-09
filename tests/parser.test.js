import {parser} from '../src/parser';

test('compiler', () => {
  expect(parser()).toBe(undefined);
});
