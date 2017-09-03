/* eslint comma-dangle: 0 */

import test from 'ava';
import isMatch from 'lodash/isMatch';

import parser from '../src/parser';
import {tokens, ast} from './fixtures/index';

test.only(
  'tokens should parse to abstract syntax tree',
  t => {
    t.true(isMatch(parser(tokens.emphasis), ast.emphasis), 'emphasis');
    // t.true(isMatch(parser(tokens.blockquote), ast.blockquote), 'blockquote');
  }
);

test.todo('will throw exceptions');

test.skip(
  'parser should throw exceptions',
  t => {
    t.throws(parser([{type: 'zoo'}]), 'token isn\'t valide');
    t.notThrows(parser([]), 'tokens are empty');
    t.throws(parser({}), 'tokens aren\'t valide');
  }
);

