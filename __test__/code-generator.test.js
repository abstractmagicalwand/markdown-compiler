import test from 'ava';

import codeGenerator from '../src/code-generator';
import { ast, html } from './fixtures';

// Leaf blocks

test(
  'thematic breaks: code should generate to html',
  async t => {
    t.is(
      codeGenerator(ast.thematicBreaks, { 'soft-line-break': 'spaces' }),
      html.thematicBreaks
    );
    t.is(
      codeGenerator(ast.thematicBreaks.main, { 'soft-line-break': 'spaces' }),
      html.thematicBreaks.main,
      'main'
    );
    t.is(
      codeGenerator(
        ast.thematicBreaks.wrongChars[0],
        { 'soft-line-break': 'spaces' }
      ),
      html.thematicBreaks.wrongChars[0],
      'wrong chars #1'
    );
    t.is(
      codeGenerator(
        ast.thematicBreaks.wrongChars[1],
        { 'soft-line-break': 'spaces' }
      ),
      html.thematicBreaks.wrongChars[1],
      'wrong chars #2'
    );
    t.is(
      codeGenerator(
        ast.thematicBreaks.notEnoughChars, { 'soft-line-break': 'spaces' }),
      html.thematicBreaks.notEnoughChars,
      'not enough chars'
    );
    t.is(
      codeGenerator(
        ast.thematicBreaks.spacesIndentAreAllowed,
        { 'soft-line-break': 'spaces' }
      ),
      html.thematicBreaks.spacesIndentAreAllowed,
      'spaces indent are allowed'
    );
    t.is(
      codeGenerator(
        ast.thematicBreaks.fourSpacesIsTooMany[0],
        { 'soft-line-break': 'spaces' }
      ),
      html.thematicBreaks.fourSpacesIsTooMany[0],
      'four spaces is too many #1'
    );
    t.is(
      codeGenerator(
        ast.thematicBreaks.fourSpacesIsTooMany[1],
        { 'soft-line-break': 'spaces' }
      ),
      html.thematicBreaks.fourSpacesIsTooMany[1],
      'four spaces is too many #2'
    );
    t.is(
      codeGenerator(
        ast.thematicBreaks.moreThanThreeChars,
        { 'soft-line-break': 'spaces' }
      ),
      html.thematicBreaks.moreThanThreeChars,
      'more than three chars'
    );
    t.is(
      codeGenerator(
        ast.thematicBreaks.spacesAreAllowedInLine,
        { 'soft-line-break': 'spaces' }
      ),
      html.thematicBreaks.spacesAreAllowedInLine,
      'spaces are allowed inLine'
    );
    t.is(
      codeGenerator(
        ast.thematicBreaks.otherCharsAreNotAllowedInLine[0],
        { 'soft-line-break': 'spaces' }
      ),
      html.thematicBreaks.otherCharsAreNotAllowedInLine[0],
      'other chars are not allowed inLine #1'
    );
    t.is(
      codeGenerator(
        ast.thematicBreaks.otherCharsAreNotAllowedInLine[1],
        { 'soft-line-break': 'spaces' }
      ),
      html.thematicBreaks.otherCharsAreNotAllowedInLine[1],
      'other chars are not allowed inLine #2'
    );
    t.is(
      codeGenerator(
        ast.thematicBreaks.otherCharsAreNotAllowedInLine[2],
        { 'soft-line-break': 'spaces' }
      ),
      html.thematicBreaks.otherCharsAreNotAllowedInLine[2],
      'other chars are not allowed inLine #3'
    );
    t.is(
      codeGenerator(
        ast.thematicBreaks.shouldBeTheSame,
        { 'soft-line-break': 'spaces' }),
      html.thematicBreaks.shouldBeTheSame,
      'should be the same'
    );
    t.is(
      codeGenerator(ast.thematicBreaks.doNotNeedBlankLines,
        { 'soft-line-break': 'spaces' }
      ),
      html.thematicBreaks.doNotNeedBlankLines,
      'do not need blank lines'
    );
    t.is(
      codeGenerator(ast.thematicBreaks.canInterruptParagraph,
        { 'soft-line-break': 'spaces' }
      ),
      html.thematicBreaks.canInterruptParagraph,
      'can interrupt paragraph'
    );
    t.is(
      codeGenerator(ast.thematicBreaks.setextHeadingOrThematicBreak,
        { 'soft-line-break': 'spaces' }
      ),
      html.thematicBreaks.setextHeadingOrThematicBreak,
      'setext heading or thematic break'
    );
    t.is(
      codeGenerator(ast.thematicBreaks.setextHeadingOrThematicBreak,
        { 'soft-line-break': 'spaces' }
      ),
      html.thematicBreaks.setextHeadingOrThematicBreak,
      'list item or thematic break #1'
    );
    t.is(
      codeGenerator(ast.thematicBreaks.setextHeadingOrThematicBreak,
        { 'soft-line-break': 'spaces' }
      ),
      html.thematicBreaks.setextHeadingOrThematicBreak,
      'list item or thematic break #2'
    );
  }
);

test(
  'atx headings: code should generate to html',
  async t => {
    t.is(
      codeGenerator(ast.atxHeadings, { 'soft-line-break': 'spaces' }),
      html.atxHeadings
    );
  }
);

test.todo('atx headings: unclosed ast tag');

test(
  'setext headings: code should generate to html',
  async t => {
    t.is(
      codeGenerator(ast.setextHeadings, { 'soft-line-break': 'spaces' }),
      html.setextHeadings
    );
  }
);

test.todo('setext headings: unclosed ast tag');

test(
  'code blocks: code should generate to html',
  async t => {
    t.is(
      codeGenerator(ast.codeBlocks.main, { 'soft-line-break': 'spaces' }),
      html.codeBlocks.main,
      'main'
    );
    t.skip.is(
      codeGenerator(
        ast.codeBlocks.withBackslashEscape[0],
        { 'soft-line-break': 'spaces' }
      ),
      html.codeBlocks.withBackslashEscape[0],
      'with backslash escape 1'
    );
    t.skip.is(
      codeGenerator(
        ast.codeBlocks.withBackslashEscape[1],
        { 'soft-line-break': 'spaces' }
      ),
      html.codeBlocks.withBackslashEscape[1],
      'with backslash escape 2'
    );
  }
);

test.todo('code blocks: unclosed ast tag');

test(
  'paragraphs: code should generate to html',
  async t => {
    t.is(
      codeGenerator(ast.paragraphs, { 'soft-line-break': 'spaces' }),
      html.paragraphs
    );
  }
);

// Container blocks

test(
  'block quotes: code should generate to html',
  async t => {
    t.is(
      codeGenerator(ast.blockQuotes.everyLine, { 'soft-line-break': 'spaces' }),
      html.blockQuotes.everyLine,
      'every line'
    );

    t.is(
      codeGenerator(ast.blockQuotes.firstLine, { 'soft-line-break': 'spaces' }),
      html.blockQuotes.firstLine,
      'first line'
    );

    t.is(
      codeGenerator(
        ast.blockQuotes.nestedBlockquote,
        { 'soft-line-break': 'spaces' }
      ),
      html.blockQuotes.nestedBlockquote,
      'nested block quotes'
    );

    t.is(
      codeGenerator(
        ast.blockQuotes.containedOtherElements,
        { 'soft-line-break': 'spaces' }
      ),
      html.blockQuotes.containedOtherElements,
      'contained other elements'
    );
  }
);

test.todo('block quotes: unclosed ast tag');

test(
  'unorder lists: code should generate to html',
  async t => {
    t.is(
      codeGenerator(ast.unorderLists, { 'soft-line-break': 'spaces' }),
      html.unorderLists
    );
  }
);

test.todo('unorder lists: unclosed ast tag');

test(
  'order lists: code should generate to html',
  async t => {
    t.is(
      codeGenerator(ast.orderLists, { 'soft-line-break': 'spaces' }),
      html.orderLists
    );
  }
);

test.todo('order lists: unclosed ast tag');

// Inlines

test(
  'backslash escapes: code should generate to html',
  async t => {
    t.is(
      codeGenerator(
        ast.backslashEscapes.punctuation,
        { 'soft-line-break': 'spaces' }
      ),
      html.backslashEscapes.punctuation,
      'punctuation'
    );
    t.is(
      codeGenerator(
        ast.backslashEscapes.likeLiteral,
        { 'soft-line-break': 'spaces' }
      ),
      html.backslashEscapes.likeLiteral,
      'like literal'
    );
    t.is(
      codeGenerator(
        ast.backslashEscapes.regularChars,
        { 'soft-line-break': 'spaces' }
      ),
      html.backslashEscapes.regularChars,
      'regular chars'
    );
    t.is(
      codeGenerator(
        ast.backslashEscapes.selfEscaped,
        { 'soft-line-break': 'spaces' }
      ),
      html.backslashEscapes.selfEscaped,
      'self escaped'
    );
    /* T.skip.is(
      codeGenerator(ast.backslashEscapes.hardLineBreak),
      html.backslashEscapes.hardLineBreak,
      'hard line break'
    ); */
  }
);

test(
  'code spans: code should generate to html',
  async t => {
    t.is(
      codeGenerator(ast.codeSpans.$1, { 'soft-line-break': 'spaces' }),
      html.codeSpans.$1, '$1'
    );
    t.is(
      codeGenerator(ast.codeSpans.$2, { 'soft-line-break': 'spaces' }),
      html.codeSpans.$2, '$2'
    );
    t.is(
      codeGenerator(ast.codeSpans.$3, { 'soft-line-break': 'spaces' }),
      html.codeSpans.$3, '$3'
    );
    t.is(
      codeGenerator(ast.codeSpans.$4, { 'soft-line-break': 'spaces' }),
      html.codeSpans.$4, '$4'
    );
    t.is(
      codeGenerator(ast.codeSpans.$5, { 'soft-line-break': 'spaces' }),
      html.codeSpans.$5, '$5'
    );
    t.is(
      codeGenerator(ast.codeSpans.$6, { 'soft-line-break': 'spaces' }),
      html.codeSpans.$6, '$6'
    );
    t.is(
      codeGenerator(ast.codeSpans.withBackslashEscape),
      html.codeSpans.withBackslashEscape,
      'with backslash escape'
    );
  }
);

test(
  'emphasis: code should generate to html',
  async t => {
    t.is(
      codeGenerator(ast.emphasis, { 'soft-line-break': 'spaces' }),
      html.emphasis
    );
  }
);

test.todo('emphasis: unclosed ast tag');

test(
  'links inline: code should generate to html',
  async t => {
    t.is(
      codeGenerator(
        ast.linksInline.withTitle,
        { 'soft-line-break': 'spaces' }
      ),
      html.linksInline.withTitle,
      'with title'
    );
    t.is(
      codeGenerator(
        ast.linksInline.withoutTitle,
        { 'soft-line-break': 'spaces' }
      ),
      html.linksInline.withoutTitle,
      'without title'
    );
    t.is(
      codeGenerator(
        ast.linksInline.relativePath,
        { 'soft-line-break': 'spaces' }
      ),
      html.linksInline.relativePath,
      'relative path'
    );
    t.is(
      codeGenerator(
        ast.linksInline.withEmphasis,
        { 'soft-line-break': 'spaces' }
      ),
      html.linksInline.withEmphasis,
      'with emphasis'
    );
    t.is(
      codeGenerator(
        ast.linksInline.invalid,
        { 'soft-line-break': 'spaces' }
      ),
      html.linksInline.invalid,
      'invalid'
    );
    /* T.skip.is(
      codeGenerator(ast.linksInline.withBackslashEscape[0]),
      html.linksInline.withBackslashEscape[0],
      'with backslash escape 1'
    ); */
    t.is(
      codeGenerator(ast.linksInline.withBackslashEscape[1],
        { 'soft-line-break': 'spaces' }
      ),
      html.linksInline.withBackslashEscape[1],
      'with backslash escape 2'
    );
  }
);

test.todo('links inline: unclosed ast tag');

test.todo('links inline: without ast');

test(
  'links reference: code should generate to html',
  async t => {
    t.is(
      codeGenerator(
        ast.linksReference.linkDefinitions,
        { 'soft-line-break': 'spaces' }
      ),
      html.linksReference.linkDefinitions,
      'link definitions'
    );
    t.is(
      codeGenerator(
        ast.linksReference.titleOnNextLine,
        { 'soft-line-break': 'spaces' }
      ),
      html.linksReference.titleOnNextLine,
      'title on the next line'
    );
    t.is(
      codeGenerator(
        ast.linksReference.notCaseSensitive,
        { 'soft-line-break': 'spaces' }
      ),
      html.linksReference.notCaseSensitive,
      'not case sensitive'
    );
    t.is(
      codeGenerator(
        ast.linksReference.implicitLinkName,
        { 'soft-line-break': 'spaces' }
      ),
      html.linksReference.implicitLinkName,
      'implicit link name'
    );
    t.is(
      codeGenerator(
        ast.linksReference.idents,
        { 'soft-line-break': 'spaces' }
      ),
      html.linksReference.idents,
      'idents'
    );
    t.is(
      codeGenerator(
        ast.linksReference.invalid,
        { 'soft-line-break': 'spaces' }
      ),
      html.linksReference.invalid,
      'invalid'
    );
    t.is(
      codeGenerator(
        ast.linksReference.withBackslashEscape,
        { 'soft-line-break': 'spaces' }
      ),
      html.linksReference.withBackslashEscape,
      'with backslash escape'
    );
  }
);

test.todo('links reference: unclosed ast tag');

test.todo('links reference: without ast');

test(
  'images: code should generate to html',
  async t => {
    t.is(
      codeGenerator(
        ast.images.inline,
        { 'soft-line-break': 'spaces' }
      ),
      html.images.inline,
      'inline'
    );
    t.is(
      codeGenerator(
        ast.images.optionalTitle,
        { 'soft-line-break': 'spaces' }
      ),
      html.images.optionalTitle,
      'optional title'
    );
    t.is(
      codeGenerator(
        ast.images.reference,
        { 'soft-line-break': 'spaces' }
      ),
      html.images.reference,
      'reference'
    );
  }
);

test(
  'autolinks: code should generate to html',
  async t => {
    t.is(
      codeGenerator(
        ast.autolinks.url.valid[0],
        { 'soft-line-break': 'spaces' }),
      html.autolinks.url.valid[0],
      'valid url 1'
    );
    t.is(
      codeGenerator(
        ast.autolinks.url.valid[0],
        { 'soft-line-break': 'spaces' }
      ),
      html.autolinks.url.valid[0],
      'valid url 2'
    );
    t.is(
      codeGenerator(
        ast.autolinks.url.valid[0],
        { 'soft-line-break': 'spaces' }
      ),
      html.autolinks.url.valid[0],
      'valid url 3'
    );
    t.skip.is(
      codeGenerator(
        ast.autolinks.url.withBackslashEscape,
        { 'soft-line-break': 'spaces' }
      ),
      html.autolinks.url.withBackslashEscape,
      'url with backslash escape'
    );

    t.is(
      codeGenerator(
        ast.autolinks.email.valid[0],
        { 'soft-line-break': 'spaces' }
      ),
      html.autolinks.email.valid[0],
      'valid email 1'
    );
    t.is(
      codeGenerator(
        ast.autolinks.email.valid[0],
        { 'soft-line-break': 'spaces' }
      ),
      html.autolinks.email.valid[0],
      'valid email 2'
    );
    t.skip.is(
      codeGenerator(
        ast.autolinks.email.withBackslashEscape,
        { 'soft-line-break': 'spaces' }
      ),
      html.autolinks.email.withBackslashEscape,
      'email with backslash escape'
    );

    t.is(
      codeGenerator(
        ast.autolinks.areNotAutolinks[0],
        { 'soft-line-break': 'spaces' }),
      html.autolinks.areNotAutolinks[0],
      'should not be autolinks 1'
    );
    t.is(
      codeGenerator(
        ast.autolinks.areNotAutolinks[1],
        { 'soft-line-break': 'spaces' }
      ),
      html.autolinks.areNotAutolinks[1],
      'should not be autolinks 2'
    );
    t.is(
      codeGenerator(
        ast.autolinks.areNotAutolinks[2],
        { 'soft-line-break': 'spaces' }
      ),
      html.autolinks.areNotAutolinks[2],
      'should not be autolinks 3'
    );
    t.is(
      codeGenerator(
        ast.autolinks.areNotAutolinks[3],
        { 'soft-line-break': 'spaces' }
      ),
      html.autolinks.areNotAutolinks[3],
      'should not be autolinks 4'
    );
    t.is(
      codeGenerator(
        ast.autolinks.areNotAutolinks[4],
        { 'soft-line-break': 'spaces' }
      ),
      html.autolinks.areNotAutolinks[4],
      'should not be autolinks 5'
    );
    t.is(
      codeGenerator(
        ast.autolinks.areNotAutolinks[5],
        { 'soft-line-break': 'spaces' }
      ),
      html.autolinks.areNotAutolinks[5],
      'should not be autolinks 6'
    );
  }
);

test(
  'hard line breaks: code should generate to html',
  async t => {
    t.is(
      codeGenerator(
        ast.hardLineBreaks.spaces,
        { 'soft-line-break': 'spaces' }
      ),
      html.hardLineBreaks.spaces,
      'spaces'
    );
    t.is(
      codeGenerator(
        ast.hardLineBreaks.backslash,
        { 'soft-line-break': 'spaces' }
      ),
      html.hardLineBreaks.backslash,
      'backslash'
    );
    t.is(
      codeGenerator(
        ast.hardLineBreaks.moreThanTwoSpaces,
        { 'soft-line-break': 'spaces' }
      ),
      html.hardLineBreaks.moreThanTwoSpaces,
      'more than two spaces'
    );

    t.is(
      codeGenerator(
        ast.hardLineBreaks.spacesAreIgnored[0],
        { 'soft-line-break': 'spaces' }
      ),
      html.hardLineBreaks.spacesAreIgnored[0],
      'spaces are ignored 1'
    );
    t.is(
      codeGenerator(
        ast.hardLineBreaks.spacesAreIgnored[1],
        { 'soft-line-break': 'spaces' }
      ),
      html.hardLineBreaks.spacesAreIgnored[1],
      'spaces are ignored 2'
    );

    t.is(
      codeGenerator(
        ast.hardLineBreaks.insideInlines[0],
        { 'soft-line-break': 'spaces' }
      ),
      html.hardLineBreaks.insideInlines[0],
      'inside inlines 1'
    );
    t.is(
      codeGenerator(
        ast.hardLineBreaks.insideInlines[1],
        { 'soft-line-break': 'spaces' }
      ),
      html.hardLineBreaks.insideInlines[1],
      'inside inlines 2'
    );

    t.is(
      codeGenerator(
        ast.hardLineBreaks.insideCodeSpan[0],
        { 'soft-line-break': 'spaces' }
      ),
      html.hardLineBreaks.insideCodeSpan[0],
      'inside code span 1'
    );
    t.is(
      codeGenerator(
        ast.hardLineBreaks.insideCodeSpan[1],
        { 'soft-line-break': 'spaces' }
      ),
      html.hardLineBreaks.insideCodeSpan[1],
      'inside code span 2'
    );

    t.skip.is(
      codeGenerator(ast.hardLineBreaks.insideHtmlTags[0]),
      html.hardLineBreaks.insideHtmlTags[0],
      'inside HTML tags 1'
    );
    t.skip.is(
      codeGenerator(ast.hardLineBreaks.insideHtmlTags[1]),
      html.hardLineBreaks.insideHtmlTags[1],
      'inside HTML tags 2'
    );

    t.is(
      codeGenerator(
        ast.hardLineBreaks.atBlockElement[0],
        { 'soft-line-break': 'spaces' }
      ),
      html.hardLineBreaks.atBlockElement[0],
      'at block element 1'
    );
    t.is(
      codeGenerator(
        ast.hardLineBreaks.atBlockElement[1],
        { 'soft-line-break': 'spaces' }
      ),
      html.hardLineBreaks.atBlockElement[1],
      'at block element 2'
    );
    t.is(
      codeGenerator(
        ast.hardLineBreaks.atBlockElement[2],
        { 'soft-line-break': 'spaces' }
      ),
      html.hardLineBreaks.atBlockElement[2],
      'at block element 3'
    );
    t.is(
      codeGenerator(
        ast.hardLineBreaks.atBlockElement[3],
        { 'soft-line-break': 'spaces' }
      ),
      html.hardLineBreaks.atBlockElement[3],
      'at block element 4'
    );
  }
);

test(
  'soft line breaks: code should generate to html',
  async t => {
    t.is(
      codeGenerator(
        ast.softLineBreaks.main,
        { 'soft-line-break': 'line-break' }
      ),
      html.softLineBreaks.lineBreak,
      'main'
    );
    t.is(
      codeGenerator(
        ast.softLineBreaks.spaces,
        { 'soft-line-break': 'spaces' }
      ),
      html.softLineBreaks.spaces,
      'spaces'
    );
  }
);

// Other
test(
  'should parse soft line break either as a line break or as a spaces',
  async t => {
    t.is(
      codeGenerator(
        ast.softLineBreaks.main,
        {
          'soft-line-break': 'spaces',
        }
      ),
      html.softLineBreaks.spaces,
      'should render soft line breaks as spaces'
    );

    t.is(
      codeGenerator(
        ast.softLineBreaks.main,
        {
          'soft-line-break': 'line-break',
        }
      ),
      html.softLineBreaks.lineBreak,
      'should render soft line breaks as line break'
    );

    t.is(
      codeGenerator(
        ast.softLineBreaks.main,
        {
          'soft-line-break': 'hard-line-break',
        }
      ),
      html.hardLineBreaks.backslash,
      'should render soft line breaks as hard line breaks'
    );
  }
);

test(
  'code spans generator should throw exceptions',
  async t => {
    t.throws(
      () => codeGenerator(1),
      TypeError,
      'rawText is number. It should be string.'
    );
  }
);

test(
  'code spans generator should not throw any exceptions',
  async t => {
    t.notThrows(() => codeGenerator({}), 'object is empty');
  }
);
