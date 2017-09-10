/* eslint comma-dangle: 0 */

import test from 'ava';
import isMatch from 'lodash/isMatch';

import parser from '../src/parser';
import {tokens, ast} from './fixtures/index';

test.only(
  'tokens should parse to abstract syntax tree',
  t => {
    t.true(isMatch(parser(tokens.emphasis), ast.emphasis), 'emphasis');
    t.true(isMatch(parser(tokens.paragraphs), ast.paragraphs), 'paragraphs');
    t.skip.true(
      isMatch(parser(tokens.blockquote), ast.blockquote),
      'blockquote'
    );
  }
);

test.only(
  'parser should throw exceptions',
  t => {
    t.throws(() => parser([{type: 'zoo'}]), Error, 'token isn\'t valide');
    t.throws(() => parser({}), TypeError, 'tokens aren\'t valide');
  }
);

test.only(
  'parser shouldn\'t throw exceptions',
  t => {
    t.notThrows(() => parser([]), 'tokens are empty');
  }
);
