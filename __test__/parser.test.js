/* eslint comma-dangle: 0 */

import test from 'ava';
import isMatch from '../__test__/helpers/is-match';

import parser from '../src/parser';
import {tokens, ast} from './fixtures/index';

test.only(
  'tokens should parse to abstract syntax tree',
  t => {
    isMatch(parser(tokens.emphasis), [ast.emphasis], (a, b) => {
      t.is(a, b, `emphasis: ${a} isn't equal ${b}`);
    });

    isMatch(parser(tokens.paragraphs), [ast.paragraphs], (a, b) => {
      t.is(a, b, `paragraphs: ${a} isn't equal ${b}`);
    });

    isMatch(parser(tokens.blockquote), [ast.blockquote], (a, b) => {
      t.is(a, b, `blockquote: ${a} isn't equal ${b}`);
    });
  }
);

test.only(
  'parser should throw exceptions',
  t => {
    t.throws(() => parser([{type: 'function'}]), Error, 'token isn\'t valide');
    t.throws(() => parser({}), TypeError, 'tokens aren\'t valide');
  }
);

test.only(
  'parser shouldn\'t throw exceptions',
  t => {
    t.notThrows(() => parser([]), 'tokens are empty');
  }
);
