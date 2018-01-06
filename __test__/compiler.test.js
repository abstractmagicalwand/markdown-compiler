import test from 'ava';

import compiler from '../src/compiler';
import { html, markdown } from './fixtures';

// Leaf blocks

test(
  'thematic breaks: markdown should compile to html',
  async t => {
    t.is(compiler(markdown.thematicBreaks), html.thematicBreaks, '');
  }
);

test(
  'atx headings: markdown should compile to html',
  async t => {
    t.is(compiler(markdown.atxHeadings), html.atxHeadings);
  }
);

test(
  'setext headings: markdown should compile to html',
  async t => {
    t.is(compiler(markdown.setextHeadings), html.setextHeadings);
  }
);

test(
  'code blocks: markdown should compile to html',
  async t => {
    t.is(compiler(markdown.codeBlocks.main), html.codeBlocks.main, 'main');
    t.skip.is(
      compiler(markdown.codeBlocks.withBackslashEscape[0]),
      html.codeBlocks.withBackslashEscape[0],
      'with backslash escape 1'
    );
    t.skip.is(
      compiler(markdown.codeBlocks.withBackslashEscape[1]),
      html.codeBlocks.withBackslashEscape[1],
      'with backslash escape 2'
    );
  }
);

test(
  'paragraphs: markdown should compile to html',
  async t => {
    t.is(compiler(markdown.paragraphs), html.paragraphs);
  }
);

// Container blocks

test(
  'block quotes: markdown should compile to html',
  async t => {
    t.is(
      compiler(markdown.blockQuotes.everyLine),
      html.blockQuotes.everyLine,
      'every line'
    );
    t.is(
      compiler(markdown.blockQuotes.firstLine),
      html.blockQuotes.firstLine,
      'first line'
    );
    t.is(
      compiler(markdown.blockQuotes.nestedBlockquote),
      html.blockQuotes.nestedBlockquote,
      'nested block quotes'
    );
    t.is(
      compiler(markdown.blockQuotes.containedOtherElements),
      html.blockQuotes.containedOtherElements,
      'contained other elements'
    );
  }
);

test(
  'unorder lists: markdown should compile to html',
  async t => {
    t.is(compiler(markdown.unorderLists), html.unorderLists);
  }
);

test(
  'order lists: markdown should compile to html',
  async t => {
    t.is(compiler(markdown.orderLists), html.orderLists, '');
  }
);

// Inlines

test(
  'backslash escapes: markdown should compile to html',
  async t => {
    t.is(
      compiler(markdown.backslashEscapes.punctuation),
      html.backslashEscapes.punctuation,
      'punctuation'
    );
    t.is(
      compiler(markdown.backslashEscapes.likeLiteral),
      html.backslashEscapes.likeLiteral,
      'like literal'
    );
    t.is(
      compiler(markdown.backslashEscapes.regularChars),
      html.backslashEscapes.regularChars,
      'regular chars'
    );
    t.is(
      compiler(markdown.backslashEscapes.selfEscaped),
      html.backslashEscapes.selfEscaped,
      'self escaped'
    );
    t.skip.is(
      compiler(markdown.backslashEscapes.hardLineBreak),
      html.backslashEscapes.hardLineBreak,
      'hard line break'
    );
  }
);

test(
  'code spans: markdown should compile to html',
  async t => {
    t.is(compiler(markdown.codeSpans.$1), html.codeSpans.$1, '$1');
    t.is(compiler(markdown.codeSpans.$2), html.codeSpans.$2, '$2');
    t.is(compiler(markdown.codeSpans.$3), html.codeSpans.$3, '$3');
    t.is(compiler(markdown.codeSpans.$4), html.codeSpans.$4, '$4');
    t.is(compiler(markdown.codeSpans.$5), html.codeSpans.$5, '$5');
    t.is(compiler(markdown.codeSpans.$6), html.codeSpans.$6, '$6');
    t.is(
      compiler(markdown.codeSpans.withBackslashEscape),
      html.codeSpans.withBackslashEscape,
      'with backslash escape'
    );
  }
);

test(
  'emphasis: markdown should compile to html',
  async t => {
    t.is(compiler(markdown.emphasis), html.emphasis);
  }
);

test(
  'links inline: markdown should compile to html',
  async t => {
    t.is(
      compiler(markdown.linksInline.withTitle),
      html.linksInline.withTitle,
      'with title'
    );
    t.is(
      compiler(markdown.linksInline.withoutTitle),
      html.linksInline.withoutTitle,
      'without title'
    );
    t.is(
      compiler(markdown.linksInline.relativePath),
      html.linksInline.relativePath,
      'relative path'
    );
    t.is(
      compiler(markdown.linksInline.withEmphasis),
      html.linksInline.withEmphasis,
      'with emphasis'
    );
    t.is(
      compiler(markdown.linksInline.invalid),
      html.linksInline.invalid,
      'invalid'
    );
    t.skip.is(
      compiler(markdown.linksInline.withBackslashEscape[0]),
      html.linksInline.withBackslashEscape[0],
      'with backslash escape 1'
    );
    t.is(
      compiler(markdown.linksInline.withBackslashEscape[1]),
      html.linksInline.withBackslashEscape[1],
      'with backslash escape 2'
    );
  }
);

test.todo('links inline: link without markdown');

test(
  'links reference: markdown should compile to html',
  async t => {
    t.is(
      compiler(markdown.linksReference.linkDefinitions),
      html.linksReference.linkDefinitions,
      'link definitions'
    );
    t.is(
      compiler(markdown.linksReference.titleOnNextLine),
      html.linksReference.titleOnNextLine,
      'title on the next line'
    );
    t.is(
      compiler(markdown.linksReference.notCaseSensitive),
      html.linksReference.notCaseSensitive,
      'not case sensitive'
    );
    t.is(
      compiler(markdown.linksReference.implicitLinkName),
      html.linksReference.implicitLinkName,
      'implicit link name'
    );
    t.is(
      compiler(markdown.linksReference.idents),
      html.linksReference.idents,
      'idents'
    );
    t.is(
      compiler(markdown.linksReference.invalid),
      html.linksReference.invalid,
      'invalid'
    );
    t.skip.is(
      compiler(markdown.linksReference.withBackslashEscape),
      html.linksReference.withBackslashEscape,
      'with backslash escape'
    );
  }
);

test(
  'autolinks: markdown should compile to html',
  async t => {
    t.is(
      compiler(markdown.autolinks.url.valid[0]),
      html.autolinks.url.valid[0],
      'valid url 1'
    );
    t.is(
      compiler(markdown.autolinks.url.valid[0]),
      html.autolinks.url.valid[0],
      'valid url 2'
    );
    t.is(
      compiler(markdown.autolinks.url.valid[0]),
      html.autolinks.url.valid[0],
      'valid url 3'
    );
    t.skip.is(
      compiler(markdown.autolinks.url.withBackslashEscape),
      html.autolinks.url.withBackslashEscape,
      'url with backslash escape'
    );

    t.is(
      compiler(markdown.autolinks.email.valid[0]),
      html.autolinks.email.valid[0],
      'valid email 1'
    );
    t.is(
      compiler(markdown.autolinks.email.valid[0]),
      html.autolinks.email.valid[0],
      'valid email 2'
    );
    t.skip.is(
      compiler(markdown.autolinks.email.withBackslashEscape),
      html.autolinks.email.withBackslashEscape,
      'email with backslash escape'
    );

    t.is(
      compiler(markdown.autolinks.areNotAutolinks[0]),
      html.autolinks.areNotAutolinks[0],
      'should not be autolinks 1'
    );
    t.is(
      compiler(markdown.autolinks.areNotAutolinks[1]),
      html.autolinks.areNotAutolinks[1],
      'should not be autolinks 2'
    );
    t.is(
      compiler(markdown.autolinks.areNotAutolinks[2]),
      html.autolinks.areNotAutolinks[2],
      'should not be autolinks 3'
    );
    t.is(
      compiler(markdown.autolinks.areNotAutolinks[3]),
      html.autolinks.areNotAutolinks[3],
      'should not be autolinks 4'
    );
    t.is(
      compiler(markdown.autolinks.areNotAutolinks[4]),
      html.autolinks.areNotAutolinks[4],
      'should not be autolinks 5'
    );
    t.is(
      compiler(markdown.autolinks.areNotAutolinks[5]),
      html.autolinks.areNotAutolinks[5],
      'should not be autolinks 6'
    );
  }
);


test(
  'hard line breaks: markdown should compile to html',
  async t => {
    t.is(
      compiler(markdown.hardLineBreaks.spaces),
      html.hardLineBreaks.spaces,
      'spaces'
    );
    t.is(
      compiler(markdown.hardLineBreaks.backslash),
      html.hardLineBreaks.backslash,
      'backslash'
    );
    t.is(
      compiler(markdown.hardLineBreaks.moreThanTwoSpaces),
      html.hardLineBreaks.moreThanTwoSpaces,
      'more than two spaces'
    );

    t.is(
      compiler(markdown.hardLineBreaks.spacesAreIgnored[0]),
      html.hardLineBreaks.spacesAreIgnored[0],
      'spaces are ignored 1'
    );
    t.is(
      compiler(markdown.hardLineBreaks.spacesAreIgnored[1]),
      html.hardLineBreaks.spacesAreIgnored[1],
      'spaces are ignored 2'
    );

    t.is(
      compiler(markdown.hardLineBreaks.insideInlines[0]),
      html.hardLineBreaks.insideInlines[0],
      'inside inlines 1'
    );
    t.is(
      compiler(markdown.hardLineBreaks.insideInlines[1]),
      html.hardLineBreaks.insideInlines[1],
      'inside inlines 2'
    );

    t.is(
      compiler(markdown.hardLineBreaks.insideCodeSpan[0]),
      html.hardLineBreaks.insideCodeSpan[0],
      'inside code span 1'
    );
    t.is(
      compiler(markdown.hardLineBreaks.insideCodeSpan[1]),
      html.hardLineBreaks.insideCodeSpan[1],
      'inside code span 2'
    );

    t.skip.is(
      compiler(markdown.hardLineBreaks.insideHtmlTags[0]),
      html.hardLineBreaks.insideHtmlTags[0],
      'inside HTML tags 1'
    );
    t.skip.is(
      compiler(markdown.hardLineBreaks.insideHtmlTags[1]),
      html.hardLineBreaks.insideHtmlTags[1],
      'inside HTML tags 2'
    );

    t.is(
      compiler(markdown.hardLineBreaks.atBlockElement[0]),
      html.hardLineBreaks.atBlockElement[0],
      'at block element 1'
    );
    t.is(
      compiler(markdown.hardLineBreaks.atBlockElement[1]),
      html.hardLineBreaks.atBlockElement[1],
      'at block element 2'
    );
    t.is(
      compiler(markdown.hardLineBreaks.atBlockElement[2]),
      html.hardLineBreaks.atBlockElement[2],
      'at block element 3'
    );
    t.is(
      compiler(markdown.hardLineBreaks.atBlockElement[3]),
      html.hardLineBreaks.atBlockElement[3],
      'at block element 4'
    );
  }
);

test(
  'soft line breaks: markdown should compile to html',
  async t => {
    t.is(
      compiler(
        markdown.softLineBreaks.main,
        {
          'code-generator': {
            'soft-line-break': 'line-break',
          },
        }
      ),
      html.softLineBreaks.lineBreak,
      'main'
    );
    t.is(
      compiler(
        markdown.softLineBreaks.spaces,
        {
          'code-generator': {
            'soft-line-break': 'spaces',
          },
        }
      ),
      html.softLineBreaks.spaces,
      'spaces'
    );
  }
);

// Other
test(
  'soft line breaks: should render as a line break or as a space or as a hard line break',
  async t => {
    t.is(
      compiler(
        markdown.softLineBreaks.main,
        {
          'code-generator': {
            'soft-line-break': 'spaces',
          },
        }
      ),
      html.softLineBreaks.spaces,
      'should render soft line breaks as space'
    );
    t.is(
      compiler(
        markdown.softLineBreaks.main,
        {
          'code-generator': {
            'soft-line-break': 'line-break',
          },
        }
      ),
      html.softLineBreaks.lineBreak,
      'should render soft line breaks as line break'
    );
    t.is(
      compiler(
        markdown.softLineBreaks.main,
        {
          'code-generator': {
            'soft-line-break': 'hard-line-break',
          },
        }
      ),
      html.hardLineBreaks.backslash,
      'should render soft line breaks as hard line breaks'
    );
  }
);
