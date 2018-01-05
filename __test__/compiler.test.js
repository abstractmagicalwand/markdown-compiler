import test from 'ava';

import compiler from '../src/compiler';
import {html, text} from './fixtures'; // eslint-disable-line

// leaf blocks

test(
  'thematic breaks: markdown should compile to html',
  async t => {
    t.is(compiler(text.thematicBreaks), html.thematicBreaks, '');
  }
);

test(
  'atx headings: markdown should compile to html',
  async t => {
    t.is(compiler(text.atxHeadings), html.atxHeadings);
  }
);

test(
  'setext headings: markdown should compile to html',
  async t => {
    t.is(compiler(text.setextHeadings), html.setextHeadings);
  }
);

test(
  'code blocks: markdown should compile to html',
  async t => {
    t.is(compiler(text.codeBlocks.main), html.codeBlocks.main, 'main');
    t.skip.is(
      compiler(text.codeBlocks.withBackslashEscape[0]),
      html.codeBlocks.withBackslashEscape[0],
      'with backslash escape 1'
    );
    t.skip.is(
      compiler(text.codeBlocks.withBackslashEscape[1]),
      html.codeBlocks.withBackslashEscape[1],
      'with backslash escape 2'
    );
  }
);

test(
  'paragraphs: markdown should compile to html',
  async t => {
    t.is(compiler(text.paragraphs), html.paragraphs);
  }
);

// container blocks

test(
  'block quotes: markdown should compile to html',
  async t => {
    t.is(
      compiler(text.blockQuotes.everyLine),
      html.blockQuotes.everyLine,
      'every line'
    );
    t.is(
      compiler(text.blockQuotes.firstLine),
      html.blockQuotes.firstLine,
      'first line'
    );
    t.is(
      compiler(text.blockQuotes.nestedBlockquote),
      html.blockQuotes.nestedBlockquote,
      'nested block quotes'
    );
    t.is(
      compiler(text.blockQuotes.containedOtherElements),
      html.blockQuotes.containedOtherElements,
      'contained other elements'
    );
  }
);

test(
  'unorder lists: markdown should compile to html',
  async t => {
    t.is(compiler(text.unorderLists), html.unorderLists);
  }
);

test(
  'order lists: markdown should compile to html',
  async t => {
    t.is(compiler(text.orderLists), html.orderLists, '');
  }
);

// inlines

test(
  'backslash escapes: markdown should compile to html',
  async t => {
    t.is(
      compiler(text.backslashEscapes.punctuation),
      html.backslashEscapes.punctuation,
      'punctuation'
    );
    t.is(
      compiler(text.backslashEscapes.likeLiteral),
      html.backslashEscapes.likeLiteral,
      'like literal'
    );
    t.is(
      compiler(text.backslashEscapes.regularChars),
      html.backslashEscapes.regularChars,
      'regular chars'
    );
    t.is(
      compiler(text.backslashEscapes.selfEscaped),
      html.backslashEscapes.selfEscaped,
      'self escaped'
    );
    t.skip.is(
      compiler(text.backslashEscapes.hardLineBreak),
      html.backslashEscapes.hardLineBreak,
      'hard line break'
    );
  }
);

test(
  'code spans: markdown should compile to html',
  async t => {
    t.is(compiler(text.codeSpans.$1), html.codeSpans.$1, '$1');
    t.is(compiler(text.codeSpans.$2), html.codeSpans.$2, '$2');
    t.is(compiler(text.codeSpans.$3), html.codeSpans.$3, '$3');
    t.is(compiler(text.codeSpans.$4), html.codeSpans.$4, '$4');
    t.is(compiler(text.codeSpans.$5), html.codeSpans.$5, '$5');
    t.is(compiler(text.codeSpans.$6), html.codeSpans.$6, '$6');
    t.is(
      compiler(text.codeSpans.withBackslashEscape),
      html.codeSpans.withBackslashEscape,
      'with backslash escape'
    );
  }
);

test(
  'emphasis: markdown should compile to html',
  async t => {
    t.is(compiler(text.emphasis), html.emphasis);
  }
);

test(
  'links inline: markdown should compile to html',
  async t => {
    t.is(
      compiler(text.linksInline.withTitle),
      html.linksInline.withTitle,
      'with title'
    );
    t.is(
      compiler(text.linksInline.withoutTitle),
      html.linksInline.withoutTitle,
      'without title'
    );
    t.is(
      compiler(text.linksInline.relativePath),
      html.linksInline.relativePath,
      'relative path'
    );
    t.is(
      compiler(text.linksInline.withEmphasis),
      html.linksInline.withEmphasis,
      'with emphasis'
    );
    t.is(
      compiler(text.linksInline.invalid),
      html.linksInline.invalid,
      'invalid'
    );
    t.skip.is(
      compiler(text.linksInline.withBackslashEscape[0]),
      html.linksInline.withBackslashEscape[0],
      'with backslash escape 1'
    );
    t.is(
      compiler(text.linksInline.withBackslashEscape[1]),
      html.linksInline.withBackslashEscape[1],
      'with backslash escape 2'
    );
  }
);

test.todo('links inline: link without text');

test(
  'links reference: markdown should compile to html',
  async t => {
    t.is(
      compiler(text.linksReference.linkDefinitions),
      html.linksReference.linkDefinitions,
      'link definitions'
    );
    t.is(
      compiler(text.linksReference.titleOnNextLine),
      html.linksReference.titleOnNextLine,
      'title on the next line'
    );
    t.is(
      compiler(text.linksReference.notCaseSensitive),
      html.linksReference.notCaseSensitive,
      'not case sensitive'
    );
    t.is(
      compiler(text.linksReference.implicitLinkName),
      html.linksReference.implicitLinkName,
      'implicit link name'
    );
    t.is(
      compiler(text.linksReference.idents),
      html.linksReference.idents,
      'idents'
    );
    t.is(
      compiler(text.linksReference.invalid),
      html.linksReference.invalid,
      'invalid'
    );
    t.skip.is(
      compiler(text.linksReference.withBackslashEscape),
      html.linksReference.withBackslashEscape,
      'with backslash escape'
    );
  }
);

test(
  'autolinks: markdown should compile to html',
  async t => {
    t.is(
      compiler(text.autolinks.url.valid[0]),
      html.autolinks.url.valid[0],
      'valid url 1'
    );
    t.is(
      compiler(text.autolinks.url.valid[0]),
      html.autolinks.url.valid[0],
      'valid url 2'
    );
    t.is(
      compiler(text.autolinks.url.valid[0]),
      html.autolinks.url.valid[0],
      'valid url 3'
    );
    t.skip.is(
      compiler(text.autolinks.url.withBackslashEscape),
      html.autolinks.url.withBackslashEscape,
      'url with backslash escape'
    );

    t.is(
      compiler(text.autolinks.email.valid[0]),
      html.autolinks.email.valid[0],
      'valid email 1'
    );
    t.is(
      compiler(text.autolinks.email.valid[0]),
      html.autolinks.email.valid[0],
      'valid email 2'
    );
    t.skip.is(
      compiler(text.autolinks.email.withBackslashEscape),
      html.autolinks.email.withBackslashEscape,
      'email with backslash escape'
    );

    t.is(
      compiler(text.autolinks.areNotAutolinks[0]),
      html.autolinks.areNotAutolinks[0],
      'should not be autolinks 1'
    );
    t.is(
      compiler(text.autolinks.areNotAutolinks[1]),
      html.autolinks.areNotAutolinks[1],
      'should not be autolinks 2'
    );
    t.is(
      compiler(text.autolinks.areNotAutolinks[2]),
      html.autolinks.areNotAutolinks[2],
      'should not be autolinks 3'
    );
    t.is(
      compiler(text.autolinks.areNotAutolinks[3]),
      html.autolinks.areNotAutolinks[3],
      'should not be autolinks 4'
    );
    t.is(
      compiler(text.autolinks.areNotAutolinks[4]),
      html.autolinks.areNotAutolinks[4],
      'should not be autolinks 5'
    );
    t.is(
      compiler(text.autolinks.areNotAutolinks[5]),
      html.autolinks.areNotAutolinks[5],
      'should not be autolinks 6'
    );
  }
);
