/* eslint comma-dangle: 0 */

import test from 'ava';
import isMatched from '../__test__/helpers/is-match';

import parser from '../src/parser';
import {tokens, variables, ast } from './fixtures';

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
  'link inline: tokens should parse to abstract syntax tree',
  t => {
    t.deepEqual(
      parser(tokens.linkInline.withTitle),
      ast.linkInline.withTitle,
      'with title'
    );
    t.deepEqual(
      parser(tokens.linkInline.withoutTitle),
      ast.linkInline.withoutTitle,
      'without title'
    );
    t.deepEqual(
      parser(tokens.linkInline.relativePath),
      ast.linkInline.relativePath,
      'relative path'
    );
    t.deepEqual(
      parser(tokens.linkInline.withEmphasis),
      ast.linkInline.withEmphasis,
      'with emphasis'
    );
    t.deepEqual(
      parser(tokens.linkInline.invalid),
      ast.linkInline.invalid,
      'invalid'
    );
  }
);

test(
  'link reference: tokens should parse to abstract syntax tree',
  t => {
    t.deepEqual(
      parser(
        {
          tokens: tokens.linkReference.linkDefinitions,
          variables: variables.linkReference.linkDefinitions,
        }
      ),
      ast.linkReference.linkDefinitions,
      'link definitions'
    );
    t.deepEqual(
      parser(
        {
          tokens: tokens.linkReference.titleOnNextLine,
          variables: variables.linkReference.titleOnNextLine,
        }
      ),
      ast.linkReference.titleOnNextLine,
      'title on the next line'
    );
    t.deepEqual(
      parser(
        {
          tokens: tokens.linkReference.notCaseSensitive,
          variables: variables.linkReference.notCaseSensitive,
        }
      ),
      ast.linkReference.notCaseSensitive,
      'not case sensitive'
    );
    t.deepEqual(
      parser(
        {
          tokens: tokens.linkReference.implicitLinkName,
          variables: variables.linkReference.implicitLinkName,
        }
      ),
      ast.linkReference.implicitLinkName,
      'implicit link name'
    );
    t.deepEqual(
      parser(
        {
          tokens: tokens.linkReference.idents,
          variables: variables.linkReference.idents,
        }
      ),
      ast.linkReference.idents,
      'idents'
    );
    t.deepEqual(
      parser(
        {
          tokens: tokens.linkReference.invalid,
          variables: variables.linkReference.invalid,
        }
      ),
      ast.linkReference.invalid,
      'invalid'
    );
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
    t.throws(
      () => parser({tokens: [{type: 'function'}]}),
      Error,
      'token is not valide'
    );
    t.throws(() => parser({}), TypeError, 'tokens are not valide');
    t.throws(() => parser({tokens: {}}), TypeError, 'tokens are not array');
    t.throws(
      () => parser({tokens: [], variables: []}),
      TypeError,
      'variables are not object'
    );
  }
);

test(
  'parser shouldn\'t throw exceptions',
  t => {
    t.notThrows(() => parser({tokens: []}), 'tokens are empty');
    t.notThrows(
      () => parser({tokens: [], variables: {}}),
      'tokens and variables are empty'
    );
  }
);
