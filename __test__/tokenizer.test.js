import test from 'ava';

import tokenizer from '../src/tokenizer';
import { markdown, tokens, variables } from './fixtures';

// Leaf blocks

test(
  'thematic breaks: markdown should transform to tokens',
  async t => {
    t.deepEqual(
      tokenizer(markdown.thematicBreaks.main),
      { tokens: tokens.thematicBreaks.main },
      'main'
    );
    t.deepEqual(
      tokenizer(markdown.thematicBreaks.wrongChars[0]),
      { tokens: tokens.thematicBreaks.wrongChars[0] },
      'wrong chars #1'
    );
    t.deepEqual(
      tokenizer(markdown.thematicBreaks.wrongChars[1]),
      { tokens: tokens.thematicBreaks.wrongChars[1] },
      'wrong chars #2'
    );
    t.deepEqual(
      tokenizer(markdown.thematicBreaks.notEnoughChars),
      { tokens: tokens.thematicBreaks.notEnoughChars },
      'not enough chars'
    );
    t.deepEqual(
      tokenizer(markdown.thematicBreaks.spacesIndentAreAllowed),
      { tokens: tokens.thematicBreaks.spacesIndentAreAllowed },
      'spaces indent are allowed'
    );
    t.deepEqual(
      tokenizer(markdown.thematicBreaks.fourSpacesIsTooMany[0]),
      { tokens: tokens.thematicBreaks.fourSpacesIsTooMany[0] },
      'four spaces is too many #1'
    );
    t.deepEqual(
      tokenizer(markdown.thematicBreaks.fourSpacesIsTooMany[1]),
      { tokens: tokens.thematicBreaks.fourSpacesIsTooMany[1] },
      'four spaces is too many #2'
    );
    t.deepEqual(
      tokenizer(markdown.thematicBreaks.moreThanThreeChars),
      { tokens: tokens.thematicBreaks.moreThanThreeChars },
      'more than three chars'
    );
    t.deepEqual(
      tokenizer(markdown.thematicBreaks.spacesAreAllowedInLine),
      { tokens: tokens.thematicBreaks.spacesAreAllowedInLine },
      'spaces are allowed inLine'
    );
    t.deepEqual(
      tokenizer(markdown.thematicBreaks.otherCharsAreNotAllowedInLine[0]),
      { tokens: tokens.thematicBreaks.otherCharsAreNotAllowedInLine[0] },
      'other chars are not allowed inLine #1'
    );
    t.deepEqual(
      tokenizer(markdown.thematicBreaks.otherCharsAreNotAllowedInLine[1]),
      { tokens: tokens.thematicBreaks.otherCharsAreNotAllowedInLine[1] },
      'other chars are not allowed inLine #2'
    );
    t.deepEqual(
      tokenizer(markdown.thematicBreaks.otherCharsAreNotAllowedInLine[2]),
      { tokens: tokens.thematicBreaks.otherCharsAreNotAllowedInLine[2] },
      'other chars are not allowed inLine #3'
    );
    t.deepEqual(
      tokenizer(markdown.thematicBreaks.shouldBeTheSame),
      { tokens: tokens.thematicBreaks.shouldBeTheSame },
      'should be the same'
    );
    t.deepEqual(
      tokenizer(markdown.thematicBreaks.doNotNeedBlankLines),
      { tokens: tokens.thematicBreaks.doNotNeedBlankLines },
      'do not need blank lines'
    );
    t.deepEqual(
      tokenizer(markdown.thematicBreaks.canInterruptParagraph),
      { tokens: tokens.thematicBreaks.canInterruptParagraph },
      'can interrupt paragraph'
    );
    t.deepEqual(
      tokenizer(markdown.thematicBreaks.setextHeadingOrThematicBreak),
      { tokens: tokens.thematicBreaks.setextHeadingOrThematicBreak },
      'setext heading or thematic break'
    );
    t.deepEqual(
      tokenizer(markdown.thematicBreaks.setextHeadingOrThematicBreak),
      { tokens: tokens.thematicBreaks.setextHeadingOrThematicBreak },
      'list item or thematic break #1'
    );
    t.deepEqual(
      tokenizer(markdown.thematicBreaks.setextHeadingOrThematicBreak),
      { tokens: tokens.thematicBreaks.setextHeadingOrThematicBreak },
      'list item or thematic break #2'
    );
  }
);

test(
  'atx headings: markdown should transform to tokens',
  async t => {
    t.deepEqual(tokenizer(markdown.atxHeadings), { tokens: tokens.atxHeadings });
  }
);

test(
  'setext headings: markdown should transform to tokens',
  async t => {
    t.deepEqual(
      tokenizer(markdown.setextHeadings),
      { tokens: tokens.setextHeadings }
    );
  }
);

test(
  'code blocks: markdown should transform to tokens',
  async t => {
    t.deepEqual(
      tokenizer(markdown.codeBlocks.main),
      { tokens: tokens.codeBlocks.main },
      'main'
    );
    t.skip.deepEqual(
      tokenizer(markdown.codeBlocks.withBackslashEscape[0]),
      { tokens: tokens.codeBlocks.withBackslashEscape[0] },
      'with backslash escape 1'
    );
    t.skip.deepEqual(
      tokenizer(markdown.codeBlocks.withBackslashEscape[1]),
      { tokens: tokens.codeBlocks.withBackslashEscape[1] },
      'with backslash escape 2'
    );
  }
);

test(
  'paragraphs: markdown should transform to tokens',
  async t => {
    t.deepEqual(tokenizer(markdown.paragraphs), { tokens: tokens.paragraphs });
  }
);

// Container blocks

test(
  'block quotes: markdown should transform to tokens',
  async t => {
    t.deepEqual(
      tokenizer(markdown.blockQuotes.everyLine),
      { tokens: tokens.blockQuotes.everyLine },
      'every line'
    );
    t.deepEqual(
      tokenizer(markdown.blockQuotes.firstLine),
      { tokens: tokens.blockQuotes.firstLine },
      'first line'
    );
    t.deepEqual(
      tokenizer(markdown.blockQuotes.nestedBlockquote),
      { tokens: tokens.blockQuotes.nestedBlockquote },
      'nested block quotes'
    );
    t.deepEqual(
      tokenizer(markdown.blockQuotes.containedOtherElements),
      { tokens: tokens.blockQuotes.containedOtherElements },
      'contained other elements'
    );
  }
);

test(
  'unorder lists: markdown should transform to tokens',
  async t => {
    t.deepEqual(
      tokenizer(markdown.unorderLists),
      { tokens: tokens.unorderLists }
    );
  }
);

test(
  'order lists: markdown should transform to tokens',
  async t => {
    t.deepEqual(tokenizer(markdown.orderLists), { tokens: tokens.orderLists });
  }
);

// Inlines

test(
  'backslash escapes: markdown should transform to tokens',
  async t => {
    t.deepEqual(
      tokenizer(markdown.backslashEscapes.punctuation),
      { tokens: tokens.backslashEscapes.punctuation },
      'punctuation'
    );
    t.deepEqual(
      tokenizer(markdown.backslashEscapes.likeLiteral),
      { tokens: tokens.backslashEscapes.likeLiteral },
      'like literal'
    );
    t.deepEqual(
      tokenizer(markdown.backslashEscapes.regularChars),
      { tokens: tokens.backslashEscapes.regularChars },
      'regular chars'
    );
    t.deepEqual(
      tokenizer(markdown.backslashEscapes.selfEscaped),
      { tokens: tokens.backslashEscapes.selfEscaped },
      'self escaped'
    );
    t.skip.deepEqual(
      tokenizer(markdown.backslashEscapes.hardLineBreak),
      { tokens: tokens.backslashEscapes.hardLineBreak },
      'hard line break'
    );
  }
);

test(
  'code spans: markdown should transform to tokens',
  async t => {
    t.deepEqual(
      tokenizer(markdown.codeSpans.$1),
      { tokens: tokens.codeSpans.$1 },
      '$1'
    );
    t.deepEqual(
      tokenizer(markdown.codeSpans.$2),
      { tokens: tokens.codeSpans.$2 },
      '$2'
    );
    t.deepEqual(
      tokenizer(markdown.codeSpans.$3),
      { tokens: tokens.codeSpans.$3 },
      '$3'
    );
    t.deepEqual(
      tokenizer(markdown.codeSpans.$4),
      { tokens: tokens.codeSpans.$4 },
      '$4'
    );
    t.deepEqual(
      tokenizer(markdown.codeSpans.$5),
      { tokens: tokens.codeSpans.$5 },
      '$5'
    );
    t.deepEqual(
      tokenizer(markdown.codeSpans.$6),
      { tokens: tokens.codeSpans.$6 },
      '$6'
    );
    t.deepEqual(
      tokenizer(markdown.codeSpans.withBackslashEscape),
      { tokens: tokens.codeSpans.withBackslashEscape },
      'with backslash escape'
    );
  }
);

test(
  'emphasis: markdown should transform to tokens',
  async t => {
    t.deepEqual(tokenizer(markdown.emphasis), { tokens: tokens.emphasis });
  }
);

test(
  'links inline: markdown should transform to tokens',
  async t => {
    t.deepEqual(
      tokenizer(markdown.linksInline.withTitle),
      { tokens: tokens.linksInline.withTitle },
      'with title'
    );
    t.deepEqual(
      tokenizer(markdown.linksInline.withoutTitle),
      { tokens: tokens.linksInline.withoutTitle },
      'without title'
    );
    t.deepEqual(
      tokenizer(markdown.linksInline.relativePath),
      { tokens: tokens.linksInline.relativePath },
      'relative path'
    );
    t.deepEqual(
      tokenizer(markdown.linksInline.withEmphasis),
      { tokens: tokens.linksInline.withEmphasis },
      'with emphasis'
    );
    t.deepEqual(
      tokenizer(markdown.linksInline.invalid),
      { tokens: tokens.linksInline.invalid },
      'invalid'
    );
    t.skip.deepEqual(
      tokenizer(markdown.linksInline.withBackslashEscape[0]),
      { tokens: tokens.linksInline.withBackslashEscape[0] },
      'with backslash escape 1'
    );
    t.deepEqual(
      tokenizer(markdown.linksInline.withBackslashEscape[1]),
      { tokens: tokens.linksInline.withBackslashEscape[1] },
      'with backslash escape 2'
    );
  }
);

test.todo('links inline: link without markdown');

test(
  'links reference: markdown should transform to tokens',
  async t => {
    t.deepEqual(
      tokenizer(markdown.linksReference.linkDefinitions),
      {
        tokens: tokens.linksReference.linkDefinitions,
        variables: variables.linksReference.linkDefinitions,
      },
      'link definitions'
    );
    t.deepEqual(
      tokenizer(markdown.linksReference.titleOnNextLine),
      {
        tokens: tokens.linksReference.titleOnNextLine,
        variables: variables.linksReference.titleOnNextLine,
      },
      'title on the next line'
    );
    t.deepEqual(
      tokenizer(markdown.linksReference.notCaseSensitive),
      {
        tokens: tokens.linksReference.notCaseSensitive,
        variables: variables.linksReference.notCaseSensitive,
      },
      'not case sensitive'
    );
    t.deepEqual(
      tokenizer(markdown.linksReference.implicitLinkName),
      {
        tokens: tokens.linksReference.implicitLinkName,
        variables: variables.linksReference.implicitLinkName,
      },
      'implicit link name'
    );
    t.deepEqual(
      tokenizer(markdown.linksReference.idents),
      {
        tokens: tokens.linksReference.idents,
        variables: variables.linksReference.idents,
      },
      'idents'
    );
    t.deepEqual(
      tokenizer(markdown.linksReference.invalid),
      {
        tokens: tokens.linksReference.invalid,
      },
      'invalid'
    );
    t.deepEqual(
      tokenizer(markdown.linksReference.withBackslashEscape),
      {
        tokens: tokens.linksReference.withBackslashEscape,
        variables: variables.linksReference.withBackslashEscape,
      },
      'with backslash escape'
    );
  }
);

test.todo('links reference: link without markdown');

test(
  'images: markdown should transform to tokens',
  async t => {
    t.deepEqual(
      tokenizer(markdown.images.inline),
      {
        tokens: tokens.images.inline,
      },
      'inline'
    );
    t.deepEqual(
      tokenizer(markdown.images.optionalTitle),
      {
        tokens: tokens.images.optionalTitle,
      },
      'optional title'
    );
    t.deepEqual(
      tokenizer(markdown.images.reference),
      {
        tokens: tokens.images.reference,
        variables: variables.images.reference,
      },
      'reference'
    );
  });

test(
  'autolinks: markdown should transform to tokens',
  async t => {
    t.deepEqual(
      tokenizer(markdown.autolinks.url.valid[0]),
      { tokens: tokens.autolinks.url.valid[0] },
      'valid url 1'
    );
    t.deepEqual(
      tokenizer(markdown.autolinks.url.valid[1]),
      { tokens: tokens.autolinks.url.valid[1] },
      'valid url 2'
    );
    t.deepEqual(
      tokenizer(markdown.autolinks.url.valid[2]),
      { tokens: tokens.autolinks.url.valid[2] },
      'valid url 3'
    );
    t.skip.deepEqual(
      tokenizer(markdown.autolinks.url.withBackslashEscape),
      { tokens: tokens.autolinks.url.withBackslashEscape },
      'url with backslash escape'
    );

    t.deepEqual(
      tokenizer(markdown.autolinks.email.valid[0]),
      { tokens: tokens.autolinks.email.valid[0] },
      'valid email 1'
    );
    t.deepEqual(
      tokenizer(markdown.autolinks.email.valid[1]),
      { tokens: tokens.autolinks.email.valid[1] },
      'valid email 2'
    );
    t.skip.deepEqual(
      tokenizer(markdown.autolinks.email.withBackslashEscape),
      { tokens: tokens.autolinks.email.withBackslashEscape },
      'email with backslash escape'
    );
    t.deepEqual(
      tokenizer(markdown.autolinks.areNotAutolinks[0]),
      { tokens: tokens.autolinks.areNotAutolinks[0] },
      'should not be autolinks 1'
    );
    t.deepEqual(
      tokenizer(markdown.autolinks.areNotAutolinks[1]),
      { tokens: tokens.autolinks.areNotAutolinks[1] },
      'should not be autolinks 2'
    );
    t.deepEqual(
      tokenizer(markdown.autolinks.areNotAutolinks[2]),
      { tokens: tokens.autolinks.areNotAutolinks[2] },
      'should not be autolinks 3'
    );
    t.deepEqual(
      tokenizer(markdown.autolinks.areNotAutolinks[3]),
      { tokens: tokens.autolinks.areNotAutolinks[3] },
      'should not be autolinks 4'
    );
    t.deepEqual(
      tokenizer(markdown.autolinks.areNotAutolinks[4]),
      { tokens: tokens.autolinks.areNotAutolinks[4] },
      'should not be autolinks 5'
    );
    t.deepEqual(
      tokenizer(markdown.autolinks.areNotAutolinks[5]),
      { tokens: tokens.autolinks.areNotAutolinks[5] },
      'should not be autolinks 6'
    );
  }
);

test(
  'hard line breaks: markdown should transform to tokens',
  async t => {
    t.deepEqual(
      tokenizer(markdown.hardLineBreaks.spaces),
      { tokens: tokens.hardLineBreaks.spaces },
      'spaces'
    );
    t.deepEqual(
      tokenizer(markdown.hardLineBreaks.backslash),
      { tokens: tokens.hardLineBreaks.backslash },
      'backslash'
    );
    t.deepEqual(
      tokenizer(markdown.hardLineBreaks.moreThanTwoSpaces),
      { tokens: tokens.hardLineBreaks.moreThanTwoSpaces },
      'more than two spaces'
    );

    t.deepEqual(
      tokenizer(markdown.hardLineBreaks.spacesAreIgnored[0]),
      { tokens: tokens.hardLineBreaks.spacesAreIgnored[0] },
      'spaces are ignored 1'
    );
    t.deepEqual(
      tokenizer(markdown.hardLineBreaks.spacesAreIgnored[1]),
      { tokens: tokens.hardLineBreaks.spacesAreIgnored[1] },
      'spaces are ignored 2'
    );

    t.deepEqual(
      tokenizer(markdown.hardLineBreaks.insideInlines[0]),
      { tokens: tokens.hardLineBreaks.insideInlines[0] },
      'inside inlines 1'
    );
    t.deepEqual(
      tokenizer(markdown.hardLineBreaks.insideInlines[1]),
      { tokens: tokens.hardLineBreaks.insideInlines[1] },
      'inside inlines 2'
    );

    t.deepEqual(
      tokenizer(markdown.hardLineBreaks.insideCodeSpan[0]),
      { tokens: tokens.hardLineBreaks.insideCodeSpan[0] },
      'inside code span 1'
    );
    t.deepEqual(
      tokenizer(markdown.hardLineBreaks.insideCodeSpan[1]),
      { tokens: tokens.hardLineBreaks.insideCodeSpan[1] },
      'inside code span 2'
    );

    t.skip.deepEqual(
      tokenizer(markdown.hardLineBreaks.insideHtmlTags[0]),
      { tokens: tokens.hardLineBreaks.insideHtmlTags[0] },
      'inside HTML tags 1'
    );
    t.skip.deepEqual(
      tokenizer(markdown.hardLineBreaks.insideHtmlTags[1]),
      { tokens: tokens.hardLineBreaks.insideHtmlTags[1] },
      'inside HTML tags 2'
    );

    t.deepEqual(
      tokenizer(markdown.hardLineBreaks.atBlockElement[0]),
      { tokens: tokens.hardLineBreaks.atBlockElement[0] },
      'at block element 1'
    );
    t.deepEqual(
      tokenizer(markdown.hardLineBreaks.atBlockElement[1]),
      { tokens: tokens.hardLineBreaks.atBlockElement[1] },
      'at block element 2'
    );
    t.deepEqual(
      tokenizer(markdown.hardLineBreaks.atBlockElement[2]),
      { tokens: tokens.hardLineBreaks.atBlockElement[2] },
      'at block element 3'
    );
    t.deepEqual(
      tokenizer(markdown.hardLineBreaks.atBlockElement[3]),
      { tokens: tokens.hardLineBreaks.atBlockElement[3] },
      'at block element 4'
    );
  }
);

test(
  'soft line breaks: markdown should transform to tokens',
  async t => {
    t.deepEqual(
      tokenizer(markdown.softLineBreaks.main),
      { tokens: tokens.softLineBreaks.main },
      'main'
    );
    t.deepEqual(
      tokenizer(markdown.softLineBreaks.spaces),
      { tokens: tokens.softLineBreaks.spaces },
      'spaces'
    );
  }
);

// Other

test(
  'parser should throw exceptions',
  async t => {
    t.throws(
      () => tokenizer(1),
      TypeError,
      'rawText is number. It should be string.'
    );
  }
);

test(
  'parser should not throw any exceptions',
  async t => {
    t.notThrows(() => tokenizer(''), 'string is empty');
  }
);
