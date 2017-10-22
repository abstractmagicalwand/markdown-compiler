/* eslint comma-dangle: 0 */

import test from 'ava';
import isMatch from '../__test__/helpers/is-match';

import parser from '../src/parser';
import {tokens, ast} from './fixtures';

test(
  'emphasis: tokens should parse to abstract syntax tree',
  t => {
    isMatch(parser(tokens.emphasis), [ast.emphasis], (a, b) => {
      t.is(a, b, `emphasis: ${a} isn't equal ${b}`);
    });
  }
);

test(
  'paragraph: tokens should parse to abstract syntax tree',
  t => {
    isMatch(parser(tokens.paragraph), [ast.paragraph], (a, b) => {
      t.is(a, b, `paragraph: ${a} isn't equal ${b}`);
    });
  }
);

test(
  'unorder list: tokens should parse to abstract syntax tree',
  t =>{
    isMatch(parser(tokens.unorderList), [ast.unorderList], (a, b) => {
      t.is(a, b, `unorder list: ${a} isn't equal ${b}`);
    });
  }
);

test(
  'order list: tokens should parse to abstract syntax tree',
  t => {
    isMatch(parser(tokens.orderList), [ast.orderList], (a, b) => {
      t.is(a, b, `order list: ${a} isn't equal ${b}`);
    });
  }
);

test(
  'atx header: tokens should parse to abstract syntax tree',
  t => {
    isMatch(parser(tokens.atxHeader), [ast.atxHeader], (a, b) => {
      t.is(a, b, `order list: ${a} isn't equal ${b}`);
    });
  }
);

test(
  'setext header: tokens should parse to abstract syntax tree',
  t => {
    isMatch(parser(tokens.setextHeader), [ast.setextHeader], (a, b) => {
      t.is(a, b, `order list: ${a} isn't equal ${b}`);
    });
  }
);

test(
  'horizontal rules: tokens should parse to abstract syntax tree',
  t => {
    isMatch(parser(tokens.horizontalRules), [ast.horizontalRules], (a, b) => {
      t.is(a, b, `order list: ${a} isn't equal ${b}`);
    });
  }
);

test.skip(
  'blockquote: tokens should parse to abstract syntax tree',
  t => {
    isMatch(parser(tokens.blockquote), [ast.blockquote], (a, b) => {
      t.is(a, b, `blockquote: ${a} isn't equal ${b}`);
    });
  }
);

test(
  'parser should throw exceptions',
  t => {
    t.throws(() => parser([{type: 'function'}]), Error, 'token isn\'t valide');
    t.throws(() => parser({}), TypeError, 'tokens aren\'t valide');
  }
);

test(
  'parser shouldn\'t throw exceptions',
  t => {
    t.notThrows(() => parser([]), 'tokens are empty');
  }
);
