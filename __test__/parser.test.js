/* eslint comma-dangle: 0 */
import test from 'ava';
import isMatched from '../__test__/helpers/is-match';

import {parser} from '../src/parser';
import {tokens, variables, ast } from './fixtures';

// leaf blocks

test(
  'thematic breaks: tokens should parse to abstract syntax tree',
  async t => {
    isMatched(
      parser({tokens: tokens.thematicBreaks}),
      [ast.thematicBreaks],
      (a, b) => {
        t.is(a, b, `order list: ${a} isn't equal ${b}`);
      }
    );
  }
);

test(
  'atx headings: tokens should parse to abstract syntax tree',
  async t => {
    isMatched(parser({tokens: tokens.atxHeadings}), [ast.atxHeadings], (a, b) => {
      t.is(a, b, `order list: ${a} isn't equal ${b}`);
    });
  }
);

test(
  'setext headings: tokens should parse to abstract syntax tree',
  async t => {
    isMatched(
      parser({tokens: tokens.setextHeadings}),
      [ast.setextHeadings],
      (a, b) => {
        t.is(a, b, `order list: ${a} isn't equal ${b}`);
      }
    );
  }
);

test(
  'code blocks: tokens should parse to abstract syntax tree',
  async t => {
    isMatched(
      parser({tokens: tokens.codeBlocks.main}),
      [ast.codeBlocks.main], (a, b) => {
        t.is(a, b, `code block: ${a} isn't equal ${b}`);
      }
    );
    t.skip.deepEqual(
      parser({tokens: tokens.codeBlocks.withBackslashEscape[0]}),
      ast.codeBlocks.withBackslashEscape[0],
      'with backslash escape 1'
    );
    t.skip.deepEqual(
      parser({tokens: tokens.codeBlocks.withBackslashEscape[1]}),
      ast.codeBlocks.withBackslashEscape[1],
      'with backslash escape 2'
    );
  }
);

test(
  'paragraphs: tokens should parse to abstract syntax tree',
  async t => {
    isMatched(parser({tokens: tokens.paragraphs}), [ast.paragraphs], (a, b) => {
      t.is(a, b, `paragraphs: ${a} isn't equal ${b}`);
    });
  }
);

// container blocks

test(
  'block quotes: tokens should parse to abstract syntax tree',
  async t => {
    t.deepEqual(
      parser({tokens: tokens.blockQuotes.everyLine}),
      ast.blockQuotes.everyLine,
      'every line'
    );
    t.deepEqual(
      parser({tokens: tokens.blockQuotes.firstLine}),
      ast.blockQuotes.firstLine,
      'first line'
    );
    t.deepEqual(
      parser({tokens: tokens.blockQuotes.nestedBlockquote}),
      ast.blockQuotes.nestedBlockquote,
      'nested block quotes'
    );
    t.deepEqual(
      parser({tokens: tokens.blockQuotes.containedOtherElements}),
      ast.blockQuotes.containedOtherElements,
      'contained other elements'
    );
  }
);

test.todo('block quotes: should exit from blockQuotes');

test(
  'unorder lists: tokens should parse to abstract syntax tree',
  t => {
    isMatched(
      parser(
        {tokens: tokens.unorderLists}),
      [ast.unorderLists],
      (a, b) => {
        t.is(a, b, `unorder list: ${a} isn't equal ${b}`);
      }
    );
  }
);

test(
  'order lists: tokens should parse to abstract syntax tree',
  async t => {
    isMatched(parser({tokens: tokens.orderLists}), [ast.orderLists], (a, b) => {
      t.is(a, b, `order list: ${a} isn't equal ${b}`);
    });
  }
);

// inlines

test(
  'backslash escapes: tokens should parse to abstract syntax tree',
  async t => {
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
    /* t.deepEqual(
      parser({tokens: tokens.backslashEscapes.hardLineBreak}),
      ast.backslashEscapes.hardLineBreak,
      'hard line break'
    ); */
  }
);

test(
  'code spans: tokens should parse to abstract syntax tree',
  async t => {
    isMatched(parser({tokens: tokens.codeSpans.$1}), [ast.codeSpans.$1], (a, b) => {
      t.is(a, b, `code($1): ${a} isn't equal ${b}`);
    });
    isMatched(parser({tokens: tokens.codeSpans.$2}), [ast.codeSpans.$2], (a, b) => {
      t.is(a, b, `code($2): ${a} isn't equal ${b}`);
    });
    isMatched(parser({tokens: tokens.codeSpans.$3}), [ast.codeSpans.$3], (a, b) => {
      t.is(a, b, `code($3): ${a} isn't equal ${b}`);
    });
    isMatched(parser({tokens: tokens.codeSpans.$4}), [ast.codeSpans.$4], (a, b) => {
      t.is(a, b, `code($4): ${a} isn't equal ${b}`);
    });
    isMatched(parser({tokens: tokens.codeSpans.$5}), [ast.codeSpans.$5], (a, b) => {
      t.is(a, b, `code($5): ${a} isn't equal ${b}`);
    });
    isMatched(parser({tokens: tokens.codeSpans.$6}), [ast.codeSpans.$6], (a, b) => {
      t.is(a, b, `code($6): ${a} isn't equal ${b}`);
    });
    t.deepEqual(
      parser({tokens: tokens.codeSpans.withBackslashEscape}),
      ast.codeSpans.withBackslashEscape,
      'with backslash escape'
    );
  }
);

test(
  'emphasis: tokens should parse to abstract syntax tree',
  async t => {
    isMatched(parser({tokens: tokens.emphasis}), [ast.emphasis], (a, b) => {
      t.is(a, b, `emphasis: ${a} isn't equal ${b}`);
    });
  }
);

test(
  'links inline: tokens should parse to abstract syntax tree',
  async t => {
    t.deepEqual(
      parser({tokens: tokens.linksInline.withTitle}),
      ast.linksInline.withTitle,
      'with title'
    );
    t.deepEqual(
      parser({tokens: tokens.linksInline.withoutTitle}),
      ast.linksInline.withoutTitle,
      'without title'
    );
    t.deepEqual(
      parser({tokens: tokens.linksInline.relativePath}),
      ast.linksInline.relativePath,
      'relative path'
    );
    t.deepEqual(
      parser({tokens: tokens.linksInline.withEmphasis}),
      ast.linksInline.withEmphasis,
      'with emphasis'
    );
    t.deepEqual(
      parser({tokens: tokens.linksInline.invalid}),
      ast.linksInline.invalid,
      'invalid'
    );
    t.skip.deepEqual(
      parser({tokens: tokens.linksInline.withBackslashEscape[0]}),
      ast.linksInline.withBackslashEscape[0],
      'with backslash escape 1'
    );
    t.deepEqual(
      parser({tokens: tokens.linksInline.withBackslashEscape[1]}),
      ast.linksInline.withBackslashEscape[1],
      'with backslash escape 2'
    );
  }
);

test.todo('links inline: link without markdown');

test(
  'links reference: tokens should parse to abstract syntax tree',
  async t => {
    t.deepEqual(
      parser(
        {
          tokens: tokens.linksReference.linkDefinitions,
          variables: variables.linksReference.linkDefinitions,
        }
      ),
      ast.linksReference.linkDefinitions,
      'link definitions'
    );
    t.deepEqual(
      parser(
        {
          tokens: tokens.linksReference.titleOnNextLine,
          variables: variables.linksReference.titleOnNextLine,
        }
      ),
      ast.linksReference.titleOnNextLine,
      'title on the next line'
    );
    t.deepEqual(
      parser(
        {
          tokens: tokens.linksReference.notCaseSensitive,
          variables: variables.linksReference.notCaseSensitive,
        }
      ),
      ast.linksReference.notCaseSensitive,
      'not case sensitive'
    );
    t.deepEqual(
      parser(
        {
          tokens: tokens.linksReference.implicitLinkName,
          variables: variables.linksReference.implicitLinkName,
        }
      ),
      ast.linksReference.implicitLinkName,
      'implicit link name'
    );
    t.deepEqual(
      parser(
        {
          tokens: tokens.linksReference.idents,
          variables: variables.linksReference.idents,
        }
      ),
      ast.linksReference.idents,
      'idents'
    );
    t.deepEqual(
      parser(
        {
          tokens: tokens.linksReference.invalid,
          variables: variables.linksReference.invalid,
        }
      ),
      ast.linksReference.invalid,
      'invalid'
    );
    t.skip.deepEqual(
      parser({tokens: tokens.linksReference.withBackslashEscape}),
      ast.linksReference.withBackslashEscape,
      'with backslash escape'
    );
  }
);

test.todo('links reference: link without markdown');

test(
  'images: tokens should parse to abstract syntax tree',
  async t => {
    t.deepEqual(
      parser({tokens: tokens.images.inline}),
      ast.images.inline,
      'inline'
    );
    t.deepEqual(
      parser({tokens: tokens.images.optionalTitle}),
      ast.images.optionalTitle,
      'optional title'
    );
    t.deepEqual(
      parser({
        tokens: tokens.images.reference,
        variables: variables.images.reference,
      }),
      ast.images.reference,
      'reference'
    );
  }
);

test(
  'autolinks: tokens should parse to abstract syntax tree',
  async t => {
    t.deepEqual(
      parser({tokens: tokens.autolinks.url.valid[0]}),
      ast.autolinks.url.valid[0],
      'valid url 1'
    );
    t.deepEqual(
      parser({tokens: tokens.autolinks.url.valid[1]}),
      ast.autolinks.url.valid[1],
      'valid url 2'
    );
    t.deepEqual(
      parser({tokens: tokens.autolinks.url.valid[2]}),
      ast.autolinks.url.valid[2],
      'valid url 3'
    );
    t.skip.deepEqual(
      parser({tokens: tokens.autolinks.url.withBackslashEscape}),
      ast.autolinks.url.withBackslashEscape,
      'url with backslash escape'
    );

    t.deepEqual(
      parser({tokens: tokens.autolinks.email.valid[0]}),
      ast.autolinks.email.valid[0],
      'valid email 1'
    );
    t.deepEqual(
      parser({tokens: tokens.autolinks.email.valid[1]}),
      ast.autolinks.email.valid[1],
      'valid email 2'
    );
    t.skip.deepEqual(
      parser({tokens: tokens.autolinks.email.withBackslashEscape}),
      ast.autolinks.email.withBackslashEscape,
      'email with backslash escape'
    );

    t.deepEqual(
      parser({tokens: tokens.autolinks.areNotAutolinks[0]}),
      ast.autolinks.areNotAutolinks[0],
      'are not autolinkss 1'
    );
    t.deepEqual(
      parser({tokens: tokens.autolinks.areNotAutolinks[1]}),
      ast.autolinks.areNotAutolinks[1],
      'are not autolinkss 2'
    );
    t.deepEqual(
      parser({tokens: tokens.autolinks.areNotAutolinks[2]}),
      ast.autolinks.areNotAutolinks[2],
      'are not autolinkss 3'
    );
    t.deepEqual(
      parser({tokens: tokens.autolinks.areNotAutolinks[3]}),
      ast.autolinks.areNotAutolinks[3],
      'are not autolinkss 4'
    );
    t.deepEqual(
      parser({tokens: tokens.autolinks.areNotAutolinks[4]}),
      ast.autolinks.areNotAutolinks[4],
      'are not autolinkss 5'
    );
    t.deepEqual(
      parser({tokens: tokens.autolinks.areNotAutolinks[5]}),
      ast.autolinks.areNotAutolinks[5],
      'are not autolinkss 6'
    );
  }
);

// other

test(
  'parser should throw exceptions',
  async t => {
    t.throws(
      () => parser({tokens: [{type: 'function'}]}),
      Error,
      'token is not valide'
    );
    t.throws(
      () => parser({}),
      TypeError,
      'tokens are undefined. It should be array.'
    );
    t.throws(
      () => parser({tokens: {}}),
      TypeError,
      'tokens are object. It should be array.'
    );
    t.throws(
      () => parser({tokens: [], variables: []}),
      TypeError,
      'variables are not object'
    );
  }
);

test(
  'parser should not throw any exceptions',
  async t => {
    t.notThrows(() => parser({tokens: []}), 'tokens are empty');
    t.notThrows(
      () => parser({tokens: [], variables: {}}),
      'tokens and variables are empty'
    );
  }
);
