/* eslint comma-dangle: 0 */
import test from 'ava';
import isMatched from '../__test__/helpers/is-match';

import { parser } from '../src/parser';
import { tokens, variables, ast } from './fixtures';

// Leaf blocks

test(
  'thematic breaks: tokens should parse to abstract syntax tree',
  async t => {
    t.deepEqual(
      parser({ tokens: tokens.thematicBreaks.main }),
      ast.thematicBreaks.main,
      'main'
    );
    t.deepEqual(
      parser({ tokens: tokens.thematicBreaks.wrongChars[0] }),
      ast.thematicBreaks.wrongChars[0],
      'wrong chars #1'
    );
    t.deepEqual(
      parser({ tokens: tokens.thematicBreaks.wrongChars[1] }),
      ast.thematicBreaks.wrongChars[1],
      'wrong chars #2'
    );
    t.deepEqual(
      parser({ tokens: tokens.thematicBreaks.notEnoughChars }),
      ast.thematicBreaks.notEnoughChars,
      'not enough chars'
    );
    t.deepEqual(
      parser({ tokens: tokens.thematicBreaks.spacesIndentAreAllowed }),
      ast.thematicBreaks.spacesIndentAreAllowed,
      'spaces indent are allowed'
    );
    t.deepEqual(
      parser({ tokens: tokens.thematicBreaks.fourSpacesIsTooMany[0] }),
      ast.thematicBreaks.fourSpacesIsTooMany[0],
      'four spaces is too many #1'
    );
    t.deepEqual(
      parser({ tokens: tokens.thematicBreaks.fourSpacesIsTooMany[1] }),
      ast.thematicBreaks.fourSpacesIsTooMany[1],
      'four spaces is too many #2'
    );
    t.deepEqual(
      parser({ tokens: tokens.thematicBreaks.moreThanThreeChars }),
      ast.thematicBreaks.moreThanThreeChars,
      'more than three chars'
    );
    t.deepEqual(
      parser({ tokens: tokens.thematicBreaks.spacesAreAllowedInLine }),
      ast.thematicBreaks.spacesAreAllowedInLine,
      'spaces are allowed inLine'
    );
    t.deepEqual(
      parser({ tokens: tokens.thematicBreaks.otherCharsAreNotAllowedInLine[0] }),
      ast.thematicBreaks.otherCharsAreNotAllowedInLine[0],
      'other chars are not allowed inLine #1'
    );
    t.deepEqual(
      parser({ tokens: tokens.thematicBreaks.otherCharsAreNotAllowedInLine[1] }),
      ast.thematicBreaks.otherCharsAreNotAllowedInLine[1],
      'other chars are not allowed inLine #2'
    );
    t.deepEqual(
      parser({ tokens: tokens.thematicBreaks.otherCharsAreNotAllowedInLine[2] }),
      ast.thematicBreaks.otherCharsAreNotAllowedInLine[2],
      'other chars are not allowed inLine #3'
    );
    t.deepEqual(
      parser({ tokens: tokens.thematicBreaks.shouldBeTheSame }),
      ast.thematicBreaks.shouldBeTheSame,
      'should be the same'
    );
    t.deepEqual(
      parser({ tokens: tokens.thematicBreaks.doNotNeedBlankLines }),
      ast.thematicBreaks.doNotNeedBlankLines,
      'do not need blank lines'
    );
    t.deepEqual(
      parser({ tokens: tokens.thematicBreaks.canInterruptParagraph }),
      ast.thematicBreaks.canInterruptParagraph,
      'can interrupt paragraph'
    );
    t.deepEqual(
      parser({ tokens: tokens.thematicBreaks.setextHeadingOrThematicBreak }),
      ast.thematicBreaks.setextHeadingOrThematicBreak,
      'setext heading or thematic break'
    );
    t.deepEqual(
      parser({ tokens: tokens.thematicBreaks.setextHeadingOrThematicBreak }),
      ast.thematicBreaks.setextHeadingOrThematicBreak,
      'list item or thematic break #1'
    );
    t.deepEqual(
      parser({ tokens: tokens.thematicBreaks.setextHeadingOrThematicBreak }),
      ast.thematicBreaks.setextHeadingOrThematicBreak,
      'list item or thematic break #2'
    );
  }
);

test(
  'atx headings: tokens should parse to abstract syntax tree',
  async t => {
    isMatched(parser({ tokens: tokens.atxHeadings }), [ ast.atxHeadings ], (a, b) => {
      t.is(a, b, `atx headings: ${a} isn't equal ${b}`);
    });
  }
);

test(
  'setext headings: tokens should parse to abstract syntax tree',
  async t => {
    isMatched(
      parser({ tokens: tokens.setextHeadings }),
      [ ast.setextHeadings ],
      (a, b) => {
        t.is(a, b, `setext headingss: ${a} isn't equal ${b}`);
      }
    );
  }
);

test(
  'code blocks: tokens should parse to abstract syntax tree',
  async t => {
    isMatched(
      parser({ tokens: tokens.codeBlocks.main }),
      [ ast.codeBlocks.main ], (a, b) => {
        t.is(a, b, `code block: ${a} isn't equal ${b}`);
      }
    );
    t.skip.deepEqual(
      parser({ tokens: tokens.codeBlocks.withBackslashEscape[0] }),
      ast.codeBlocks.withBackslashEscape[0],
      'with backslash escape 1'
    );
    t.skip.deepEqual(
      parser({ tokens: tokens.codeBlocks.withBackslashEscape[1] }),
      ast.codeBlocks.withBackslashEscape[1],
      'with backslash escape 2'
    );
  }
);

test(
  'paragraphs: tokens should parse to abstract syntax tree',
  async t => {
    isMatched(parser({ tokens: tokens.paragraphs }), [ ast.paragraphs ], (a, b) => {
      t.is(a, b, `paragraphs: ${a} isn't equal ${b}`);
    });
  }
);

// Container blocks

test(
  'block quotes: tokens should parse to abstract syntax tree',
  async t => {
    t.deepEqual(
      parser({ tokens: tokens.blockQuotes.everyLine }),
      ast.blockQuotes.everyLine,
      'every line'
    );
    t.deepEqual(
      parser({ tokens: tokens.blockQuotes.firstLine }),
      ast.blockQuotes.firstLine,
      'first line'
    );
    t.deepEqual(
      parser({ tokens: tokens.blockQuotes.nestedBlockquote }),
      ast.blockQuotes.nestedBlockquote,
      'nested block quotes'
    );
    t.deepEqual(
      parser({ tokens: tokens.blockQuotes.containedOtherElements }),
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
        { tokens: tokens.unorderLists }),
      [ ast.unorderLists ],
      (a, b) => {
        t.is(a, b, `unorder list: ${a} isn't equal ${b}`);
      }
    );
  }
);

test(
  'order lists: tokens should parse to abstract syntax tree',
  async t => {
    isMatched(parser({ tokens: tokens.orderLists }), [ ast.orderLists ], (a, b) => {
      t.is(a, b, `order list: ${a} isn't equal ${b}`);
    });
  }
);

// Inlines

test(
  'backslash escapes: tokens should parse to abstract syntax tree',
  async t => {
    t.deepEqual(
      parser({ tokens: tokens.backslashEscapes.punctuation }),
      ast.backslashEscapes.punctuation,
      'punctuation'
    );
    t.deepEqual(
      parser({ tokens: tokens.backslashEscapes.likeLiteral }),
      ast.backslashEscapes.likeLiteral,
      'like literal'
    );
    t.deepEqual(
      parser({ tokens: tokens.backslashEscapes.regularChars }),
      ast.backslashEscapes.regularChars,
      'regular chars'
    );
    t.deepEqual(
      parser({ tokens: tokens.backslashEscapes.selfEscaped }),
      ast.backslashEscapes.selfEscaped,
      'self escaped'
    );
    /* T.deepEqual(
      parser({tokens: tokens.backslashEscapes.hardLineBreak}),
      ast.backslashEscapes.hardLineBreak,
      'hard line break'
    ); */
  }
);

test(
  'code spans: tokens should parse to abstract syntax tree',
  async t => {
    isMatched(parser({ tokens: tokens.codeSpans.$1 }), [ ast.codeSpans.$1 ], (a, b) => {
      t.is(a, b, `code($1): ${a} isn't equal ${b}`);
    });
    isMatched(parser({ tokens: tokens.codeSpans.$2 }), [ ast.codeSpans.$2 ], (a, b) => {
      t.is(a, b, `code($2): ${a} isn't equal ${b}`);
    });
    isMatched(parser({ tokens: tokens.codeSpans.$3 }), [ ast.codeSpans.$3 ], (a, b) => {
      t.is(a, b, `code($3): ${a} isn't equal ${b}`);
    });
    isMatched(parser({ tokens: tokens.codeSpans.$4 }), [ ast.codeSpans.$4 ], (a, b) => {
      t.is(a, b, `code($4): ${a} isn't equal ${b}`);
    });
    isMatched(parser({ tokens: tokens.codeSpans.$5 }), [ ast.codeSpans.$5 ], (a, b) => {
      t.is(a, b, `code($5): ${a} isn't equal ${b}`);
    });
    isMatched(parser({ tokens: tokens.codeSpans.$6 }), [ ast.codeSpans.$6 ], (a, b) => {
      t.is(a, b, `code($6): ${a} isn't equal ${b}`);
    });
    t.deepEqual(
      parser({ tokens: tokens.codeSpans.withBackslashEscape }),
      ast.codeSpans.withBackslashEscape,
      'with backslash escape'
    );
  }
);

test(
  'emphasis: tokens should parse to abstract syntax tree',
  async t => {
    isMatched(parser({ tokens: tokens.emphasis }), [ ast.emphasis ], (a, b) => {
      t.is(a, b, `emphasis: ${a} isn't equal ${b}`);
    });
  }
);

test(
  'links inline: tokens should parse to abstract syntax tree',
  async t => {
    t.deepEqual(
      parser({ tokens: tokens.linksInline.withTitle }),
      ast.linksInline.withTitle,
      'with title'
    );
    t.deepEqual(
      parser({ tokens: tokens.linksInline.withoutTitle }),
      ast.linksInline.withoutTitle,
      'without title'
    );
    t.deepEqual(
      parser({ tokens: tokens.linksInline.relativePath }),
      ast.linksInline.relativePath,
      'relative path'
    );
    t.deepEqual(
      parser({ tokens: tokens.linksInline.withEmphasis }),
      ast.linksInline.withEmphasis,
      'with emphasis'
    );
    t.deepEqual(
      parser({ tokens: tokens.linksInline.invalid }),
      ast.linksInline.invalid,
      'invalid'
    );
    t.skip.deepEqual(
      parser({ tokens: tokens.linksInline.withBackslashEscape[0] }),
      ast.linksInline.withBackslashEscape[0],
      'with backslash escape 1'
    );
    t.deepEqual(
      parser({ tokens: tokens.linksInline.withBackslashEscape[1] }),
      ast.linksInline.withBackslashEscape[1],
      'with backslash escape 2'
    );
  }
);

test.todo('links inline: link without ast');

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
      parser({ tokens: tokens.linksReference.withBackslashEscape }),
      ast.linksReference.withBackslashEscape,
      'with backslash escape'
    );
  }
);

test.todo('links reference: link without ast');

test(
  'images: tokens should parse to abstract syntax tree',
  async t => {
    t.deepEqual(
      parser({ tokens: tokens.images.inline }),
      ast.images.inline,
      'inline'
    );
    t.deepEqual(
      parser({ tokens: tokens.images.optionalTitle }),
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
      parser({ tokens: tokens.autolinks.url.valid[0] }),
      ast.autolinks.url.valid[0],
      'valid url 1'
    );
    t.deepEqual(
      parser({ tokens: tokens.autolinks.url.valid[1] }),
      ast.autolinks.url.valid[1],
      'valid url 2'
    );
    t.deepEqual(
      parser({ tokens: tokens.autolinks.url.valid[2] }),
      ast.autolinks.url.valid[2],
      'valid url 3'
    );
    t.skip.deepEqual(
      parser({ tokens: tokens.autolinks.url.withBackslashEscape }),
      ast.autolinks.url.withBackslashEscape,
      'url with backslash escape'
    );

    t.deepEqual(
      parser({ tokens: tokens.autolinks.email.valid[0] }),
      ast.autolinks.email.valid[0],
      'valid email 1'
    );
    t.deepEqual(
      parser({ tokens: tokens.autolinks.email.valid[1] }),
      ast.autolinks.email.valid[1],
      'valid email 2'
    );
    t.skip.deepEqual(
      parser({ tokens: tokens.autolinks.email.withBackslashEscape }),
      ast.autolinks.email.withBackslashEscape,
      'email with backslash escape'
    );

    t.deepEqual(
      parser({ tokens: tokens.autolinks.areNotAutolinks[0] }),
      ast.autolinks.areNotAutolinks[0],
      'are not autolinkss 1'
    );
    t.deepEqual(
      parser({ tokens: tokens.autolinks.areNotAutolinks[1] }),
      ast.autolinks.areNotAutolinks[1],
      'are not autolinkss 2'
    );
    t.deepEqual(
      parser({ tokens: tokens.autolinks.areNotAutolinks[2] }),
      ast.autolinks.areNotAutolinks[2],
      'are not autolinkss 3'
    );
    t.deepEqual(
      parser({ tokens: tokens.autolinks.areNotAutolinks[3] }),
      ast.autolinks.areNotAutolinks[3],
      'are not autolinkss 4'
    );
    t.deepEqual(
      parser({ tokens: tokens.autolinks.areNotAutolinks[4] }),
      ast.autolinks.areNotAutolinks[4],
      'are not autolinkss 5'
    );
    t.deepEqual(
      parser({ tokens: tokens.autolinks.areNotAutolinks[5] }),
      ast.autolinks.areNotAutolinks[5],
      'are not autolinkss 6'
    );
  }
);

// Hard line breaks

test(
  'hard line breaks: tokens should parse to abstract syntax tree',
  async t => {
    t.deepEqual(
      parser({ tokens: tokens.hardLineBreaks.spaces }),
      ast.hardLineBreaks.spaces,
      'spaces'
    );
    t.deepEqual(
      parser({ tokens: tokens.hardLineBreaks.backslash }),
      ast.hardLineBreaks.backslash,
      'backslash'
    );
    t.deepEqual(
      parser({ tokens: tokens.hardLineBreaks.moreThanTwoSpaces }),
      ast.hardLineBreaks.moreThanTwoSpaces,
      'more than two spaces'
    );

    t.deepEqual(
      parser({ tokens: tokens.hardLineBreaks.spacesAreIgnored[0] }),
      ast.hardLineBreaks.spacesAreIgnored[0],
      'spaces are ignored 1'
    );
    t.deepEqual(
      parser({ tokens: tokens.hardLineBreaks.spacesAreIgnored[1] }),
      ast.hardLineBreaks.spacesAreIgnored[1],
      'spaces are ignored 2'
    );

    t.deepEqual(
      parser({ tokens: tokens.hardLineBreaks.insideInlines[0] }),
      ast.hardLineBreaks.insideInlines[0],
      'inside inlines 1'
    );
    t.deepEqual(
      parser({ tokens: tokens.hardLineBreaks.insideInlines[1] }),
      ast.hardLineBreaks.insideInlines[1],
      'inside inlines 2'
    );

    t.deepEqual(
      parser({ tokens: tokens.hardLineBreaks.insideCodeSpan[0] }),
      ast.hardLineBreaks.insideCodeSpan[0],
      'inside code span 1'
    );
    t.deepEqual(
      parser({ tokens: tokens.hardLineBreaks.insideCodeSpan[1] }),
      ast.hardLineBreaks.insideCodeSpan[1],
      'inside code span 2'
    );

    t.skip.deepEqual(
      parser({ tokens: tokens.hardLineBreaks.insideHtmlTags[0] }),
      ast.hardLineBreaks.insideHtmlTags[0],
      'inside HTML tags 1'
    );
    t.skip.deepEqual(
      parser({ tokens: tokens.hardLineBreaks.insideHtmlTags[1] }),
      ast.hardLineBreaks.insideHtmlTags[1],
      'inside HTML tags 2'
    );

    t.deepEqual(
      parser({ tokens: tokens.hardLineBreaks.atBlockElement[0] }),
      ast.hardLineBreaks.atBlockElement[0],
      'at block element 1'
    );
    t.deepEqual(
      parser({ tokens: tokens.hardLineBreaks.atBlockElement[1] }),
      ast.hardLineBreaks.atBlockElement[1],
      'at block element 2'
    );
    t.deepEqual(
      parser({ tokens: tokens.hardLineBreaks.atBlockElement[2] }),
      ast.hardLineBreaks.atBlockElement[2],
      'at block element 3'
    );
    t.deepEqual(
      parser({ tokens: tokens.hardLineBreaks.atBlockElement[3] }),
      ast.hardLineBreaks.atBlockElement[3],
      'at block element 4'
    );
  }
);

test(
  'soft line breaks: tokens should parse to abstract syntax tree',
  async t => {
    t.deepEqual(
      parser({ tokens: tokens.softLineBreaks.main }),
      ast.softLineBreaks.main,
      'main'
    );
    t.deepEqual(
      parser({ tokens: tokens.softLineBreaks.spaces }),
      ast.softLineBreaks.spaces,
      'spaces'
    );
  }
);

// Other

test(
  'parser should throw exceptions',
  async t => {
    t.throws(
      () => parser({ tokens: [ { type: 'function' } ] }),
      Error,
      'token is not valide'
    );
    t.throws(
      () => parser({}),
      TypeError,
      'tokens are undefined. It should be array.'
    );
    t.throws(
      () => parser({ tokens: {} }),
      TypeError,
      'tokens are object. It should be array.'
    );
    t.throws(
      () => parser({ tokens: [], variables: [] }),
      TypeError,
      'variables are not object'
    );
  }
);

test(
  'parser should not throw any exceptions',
  async t => {
    t.notThrows(() => parser({ tokens: [] }), 'tokens are empty');
    t.notThrows(
      () => parser({ tokens: [], variables: {} }),
      'tokens and variables are empty'
    );
  }
);
