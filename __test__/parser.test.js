/* eslint comma-dangle: 0 */

import test from 'ava';
import isMatched from '../__test__/helpers/is-match';

import parser from '../src/parser';
import {tokens, ast} from './fixtures';

test(
  'emphasis: tokens should parse to abstract syntax tree',
  t => {
    isMatched(parser(tokens.emphasis), [ast.emphasis], (a, b) => {
      t.is(a, b, `emphasis: ${a} isn't equal ${b}`);
    });
  }
);

test(
  'code: tokens should parse to abstract syntax tree',
  t => {
    isMatched(parser(tokens.code.$1), [ast.code.$1], (a, b) => {
      t.is(a, b, `code($1): ${a} isn't equal ${b}`);
    });

    isMatched(parser(tokens.code.$2), [ast.code.$2], (a, b) => {
      t.is(a, b, `code($2): ${a} isn't equal ${b}`);
    });

    isMatched(parser(tokens.code.$3), [ast.code.$3], (a, b) => {
      t.is(a, b, `code($3): ${a} isn't equal ${b}`);
    });

    isMatched(parser(tokens.code.$4), [ast.code.$4], (a, b) => {
      t.is(a, b, `code($4): ${a} isn't equal ${b}`);
    });

    isMatched(parser(tokens.code.$5), [ast.code.$5], (a, b) => {
      t.is(a, b, `code($5): ${a} isn't equal ${b}`);
    });

    isMatched(parser(tokens.code.$6), [ast.code.$6], (a, b) => {
      t.is(a, b, `code($6): ${a} isn't equal ${b}`);
    });
  }
);

test(
  'paragraph: tokens should parse to abstract syntax tree',
  t => {
    isMatched(parser(tokens.paragraph), [ast.paragraph], (a, b) => {
      t.is(a, b, `paragraph: ${a} isn't equal ${b}`);
    });
  }
);

test(
  'unorder list: tokens should parse to abstract syntax tree',
  t =>{
    isMatched(parser(tokens.unorderList), [ast.unorderList], (a, b) => {
      t.is(a, b, `unorder list: ${a} isn't equal ${b}`);
    });
  }
);

test(
  'order list: tokens should parse to abstract syntax tree',
  t => {
    isMatched(parser(tokens.orderList), [ast.orderList], (a, b) => {
      t.is(a, b, `order list: ${a} isn't equal ${b}`);
    });
  }
);

test(
  'atx header: tokens should parse to abstract syntax tree',
  t => {
    isMatched(parser(tokens.atxHeader), [ast.atxHeader], (a, b) => {
      t.is(a, b, `order list: ${a} isn't equal ${b}`);
    });
  }
);

test(
  'setext header: tokens should parse to abstract syntax tree',
  t => {
    isMatched(parser(tokens.setextHeader), [ast.setextHeader], (a, b) => {
      t.is(a, b, `order list: ${a} isn't equal ${b}`);
    });
  }
);

test(
  'horizontal rules: tokens should parse to abstract syntax tree',
  t => {
    isMatched(parser(tokens.HorizontalRule), [ast.HorizontalRule], (a, b) => {
      t.is(a, b, `order list: ${a} isn't equal ${b}`);
    });
  }
);

test(
  'code block: tokens should parse to abstract syntax tree',
  t => {
    isMatched(parser(tokens.codeBlock), [ast.codeBlock], (a, b) => {
      t.is(a, b, `code block: ${a} isn't equal ${b}`);
    });
  }
);

test.skip(
  'blockquote: tokens should parse to abstract syntax tree',
  t => {
    isMatched(parser(tokens.blockquote), [ast.blockquote], (a, b) => {
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
