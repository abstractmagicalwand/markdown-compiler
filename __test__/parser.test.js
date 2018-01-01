/* eslint comma-dangle: 0 */
import test from 'ava';
import isMatched from '../__test__/helpers/is-match';

import {parser} from '../src/parser';
import {tokens, variables, ast } from './fixtures';

test(
  'emphasis: tokens should parse to abstract syntax tree',
  t => {
    isMatched(parser({tokens: tokens.emphasis}), [ast.emphasis], (a, b) => {
      t.is(a, b, `emphasis: ${a} isn't equal ${b}`);
    });
  }
);

test(
  'code: tokens should parse to abstract syntax tree',
  t => {
    isMatched(parser({tokens: tokens.code.$1}), [ast.code.$1], (a, b) => {
      t.is(a, b, `code($1): ${a} isn't equal ${b}`);
    });
    isMatched(parser({tokens: tokens.code.$2}), [ast.code.$2], (a, b) => {
      t.is(a, b, `code($2): ${a} isn't equal ${b}`);
    });
    isMatched(parser({tokens: tokens.code.$3}), [ast.code.$3], (a, b) => {
      t.is(a, b, `code($3): ${a} isn't equal ${b}`);
    });
    isMatched(parser({tokens: tokens.code.$4}), [ast.code.$4], (a, b) => {
      t.is(a, b, `code($4): ${a} isn't equal ${b}`);
    });
    isMatched(parser({tokens: tokens.code.$5}), [ast.code.$5], (a, b) => {
      t.is(a, b, `code($5): ${a} isn't equal ${b}`);
    });
    isMatched(parser({tokens: tokens.code.$6}), [ast.code.$6], (a, b) => {
      t.is(a, b, `code($6): ${a} isn't equal ${b}`);
    });
    t.deepEqual(
      parser({tokens: tokens.code.withBackslashEscape}),
      ast.code.withBackslashEscape,
      'with backslash escape'
    );
  }
);

test(
  'link inline: tokens should parse to abstract syntax tree',
  t => {
    t.deepEqual(
      parser({tokens: tokens.linkInline.withTitle}),
      ast.linkInline.withTitle,
      'with title'
    );
    t.deepEqual(
      parser({tokens: tokens.linkInline.withoutTitle}),
      ast.linkInline.withoutTitle,
      'without title'
    );
    t.deepEqual(
      parser({tokens: tokens.linkInline.relativePath}),
      ast.linkInline.relativePath,
      'relative path'
    );
    t.deepEqual(
      parser({tokens: tokens.linkInline.withEmphasis}),
      ast.linkInline.withEmphasis,
      'with emphasis'
    );
    t.deepEqual(
      parser({tokens: tokens.linkInline.invalid}),
      ast.linkInline.invalid,
      'invalid'
    );
    t.skip.deepEqual(
      parser({tokens: tokens.linkInline.withBackslashEscape[0]}),
      ast.linkInline.withBackslashEscape[0],
      'with backslash escape 1'
    );
    t.deepEqual(
      parser({tokens: tokens.linkInline.withBackslashEscape[1]}),
      ast.linkInline.withBackslashEscape[1],
      'with backslash escape 2'
    );
  }
);

test.todo('link inline: link without text');

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
    t.deepEqual(
      parser({tokens: tokens.linkReference.withBackslashEscape}),
      ast.linkReference.withBackslashEscape,
      'with backslash escape'
    );
  }
);

test.todo('link reference: link without text');

test(
  'autolink: tokens should parse to abstract syntax tree',
  t => {
    t.deepEqual(
      parser({tokens: tokens.autolink.url.valid[0]}),
      ast.autolink.url.valid[0],
      'valid url 1'
    );
    t.deepEqual(
      parser({tokens: tokens.autolink.url.valid[1]}),
      ast.autolink.url.valid[1],
      'valid url 2'
    );
    t.deepEqual(
      parser({tokens: tokens.autolink.url.valid[2]}),
      ast.autolink.url.valid[2],
      'valid url 3'
    );
    t.skip.deepEqual(
      parser({tokens: tokens.autolink.url.withBackslashEscape}),
      ast.autolink.url.withBackslashEscape,
      'url with backslash escape'
    );

    t.deepEqual(
      parser({tokens: tokens.autolink.email.valid[0]}),
      ast.autolink.email.valid[0],
      'valid email 1'
    );
    t.deepEqual(
      parser({tokens: tokens.autolink.email.valid[1]}),
      ast.autolink.email.valid[1],
      'valid email 2'
    );
    t.skip.deepEqual(
      parser({tokens: tokens.autolink.email.withBackslashEscape}),
      ast.autolink.email.withBackslashEscape,
      'email with backslash escape'
    );

    t.deepEqual(
      parser({tokens: tokens.autolink.areNotAutolinks[0]}),
      ast.autolink.areNotAutolinks[0],
      'are not autolinks 1'
    );
    t.deepEqual(
      parser({tokens: tokens.autolink.areNotAutolinks[1]}),
      ast.autolink.areNotAutolinks[1],
      'are not autolinks 2'
    );
    t.deepEqual(
      parser({tokens: tokens.autolink.areNotAutolinks[2]}),
      ast.autolink.areNotAutolinks[2],
      'are not autolinks 3'
    );
    t.deepEqual(
      parser({tokens: tokens.autolink.areNotAutolinks[3]}),
      ast.autolink.areNotAutolinks[3],
      'are not autolinks 4'
    );
    t.deepEqual(
      parser({tokens: tokens.autolink.areNotAutolinks[4]}),
      ast.autolink.areNotAutolinks[4],
      'are not autolinks 5'
    );
    t.deepEqual(
      parser({tokens: tokens.autolink.areNotAutolinks[5]}),
      ast.autolink.areNotAutolinks[5],
      'are not autolinks 6'
    );
  }
);

test(
  'image: tokens should parse to abstract syntax tree',
  t => {
    t.deepEqual(
      parser({tokens: tokens.image.inline}),
      ast.image.inline,
      'inline'
    );
    t.deepEqual(
      parser({tokens: tokens.image.optionalTitle}),
      ast.image.optionalTitle,
      'optional title'
    );
    t.deepEqual(
      parser({
        tokens: tokens.image.reference,
        variables: variables.image.reference,
      }),
      ast.image.reference,
      'reference'
    );
  }
);

test(
  'paragraph: tokens should parse to abstract syntax tree',
  t => {
    isMatched(parser({tokens: tokens.paragraph}), [ast.paragraph], (a, b) => {
      t.is(a, b, `paragraph: ${a} isn't equal ${b}`);
    });
  }
);

test(
  'unorder list: tokens should parse to abstract syntax tree',
  t =>{
    isMatched(
      parser(
        {tokens: tokens.unorderList}),
      [ast.unorderList],
      (a, b) => {
        t.is(a, b, `unorder list: ${a} isn't equal ${b}`);
      }
    );
  }
);

test(
  'order list: tokens should parse to abstract syntax tree',
  t => {
    isMatched(parser({tokens: tokens.orderList}), [ast.orderList], (a, b) => {
      t.is(a, b, `order list: ${a} isn't equal ${b}`);
    });
  }
);

test(
  'atx header: tokens should parse to abstract syntax tree',
  t => {
    isMatched(parser({tokens: tokens.atxHeader}), [ast.atxHeader], (a, b) => {
      t.is(a, b, `order list: ${a} isn't equal ${b}`);
    });
  }
);

test(
  'setext header: tokens should parse to abstract syntax tree',
  t => {
    isMatched(
      parser({tokens: tokens.setextHeader}),
      [ast.setextHeader],
      (a, b) => {
        t.is(a, b, `order list: ${a} isn't equal ${b}`);
      }
    );
  }
);

test(
  'horizontal rules: tokens should parse to abstract syntax tree',
  t => {
    isMatched(
      parser({tokens: tokens.horizontalRule}),
      [ast.horizontalRule],
      (a, b) => {
        t.is(a, b, `order list: ${a} isn't equal ${b}`);
      }
    );
  }
);

test(
  'code block: tokens should parse to abstract syntax tree',
  t => {
    isMatched(
      parser({tokens: tokens.codeBlock.main}),
      [ast.codeBlock.main], (a, b) => {
        t.is(a, b, `code block: ${a} isn't equal ${b}`);
      }
    );
    t.skip.deepEqual(
      parser({tokens: tokens.codeBlock.withBackslashEscape[0]}),
      ast.codeBlock.withBackslashEscape[0],
      'with backslash escape 1'
    );
    t.skip.deepEqual(
      parser({tokens: tokens.codeBlock.withBackslashEscape[1]}),
      ast.codeBlock.withBackslashEscape[1],
      'with backslash escape 2'
    );
  }
);

test(
  'blockquote: tokens should parse to abstract syntax tree',
  t => {
    t.deepEqual(
      parser({tokens: tokens.blockquote.everyLine}),
      ast.blockquote.everyLine,
      'every line'
    );
    t.deepEqual(
      parser({tokens: tokens.blockquote.firstLine}),
      ast.blockquote.firstLine,
      'first line'
    );
    t.deepEqual(
      parser({tokens: tokens.blockquote.nestedBlockquote}),
      ast.blockquote.nestedBlockquote,
      'nested blockquote'
    );
    t.deepEqual(
      parser({tokens: tokens.blockquote.containedOtherElements}),
      ast.blockquote.containedOtherElements,
      'contained other elements'
    );
  }
);

test.todo('blockquote: should exit from blockquote');

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

test(
  'backslash escapes: tokens should parse to abstract syntax tree',
  t => {
    t.deepEqual(
      parser({tokens: tokens.backslashEscapes.punctuation}),
      ast.backslashEscapes.punctuation,
      'punctuation'
    );
    t.deepEqual(
      parser({tokens: tokens.backslashEscapes.likeLiteral}),
      ast.backslashEscapes.likeLiteral,
      'like literal'
    );
    t.deepEqual(
      parser({tokens: tokens.backslashEscapes.regularChars}),
      ast.backslashEscapes.regularChars,
      'regular chars'
    );
    t.deepEqual(
      parser({tokens: tokens.backslashEscapes.selfEscaped}),
      ast.backslashEscapes.selfEscaped,
      'self escaped'
    );
    t.skip.deepEqual(
      parser({tokens: tokens.backslashEscapes.hardLineBreak}),
      ast.backslashEscapes.hardLineBreak,
      'hard line break'
    );
  }
);
