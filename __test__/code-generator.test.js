import test from 'ava';

import codeGenerator from '../src/code-generator';
import {ast, html} from './fixtures'; // eslint-disable-line

// leaf blocks

test(
  'thematic breaks: code should generate to html',
  async t => {
    t.is(codeGenerator(ast.thematicBreaks), html.thematicBreaks);
  }
);

test(
  'atx headings: code should generate to html',
  async t => {
    t.is(codeGenerator(ast.atxHeadings), html.atxHeadings);
  }
);

test.todo('atx headings: unclosed markdown tag');

test(
  'setext headings: code should generate to html',
  async t => {
    t.is(codeGenerator(ast.setextHeadings), html.setextHeadings);
  }
);

test.todo('setext headings: unclosed markdown tag');

test(
  'code blocks: code should generate to html',
  async t => {
    t.is(codeGenerator(ast.codeBlocks.main), html.codeBlocks.main, 'main');
    t.skip.is(
      codeGenerator(ast.codeBlocks.withBackslashEscape[0]),
      html.codeBlocks.withBackslashEscape[0],
      'with backslash escape 1'
    );
    t.skip.is(
      codeGenerator(ast.codeBlocks.withBackslashEscape[1]),
      html.codeBlocks.withBackslashEscape[1],
      'with backslash escape 2'
    );
  }
);

test.todo('code blocks: unclosed markdown tag');

test(
  'paragraphs: code should generate to html',
  async t => {
    t.is(codeGenerator(ast.paragraphs), html.paragraphs);
  }
);

// container blocks

test(
  'block quotes: code should generate to html',
  async t => {
    t.is(
      codeGenerator(ast.blockQuotes.everyLine),
      html.blockQuotes.everyLine,
      'every line'
    );

    t.is(
      codeGenerator(ast.blockQuotes.firstLine),
      html.blockQuotes.firstLine,
      'first line'
    );

    t.is(
      codeGenerator(ast.blockQuotes.nestedBlockquote),
      html.blockQuotes.nestedBlockquote,
      'nested block quotes'
    );

    t.is(
      codeGenerator(ast.blockQuotes.containedOtherElements),
      html.blockQuotes.containedOtherElements,
      'contained other elements'
    );
  }
);

test.todo('block quotes: unclosed markdown tag');

test(
  'unorder lists: code should generate to html',
  async t => {
    t.is(codeGenerator(ast.unorderLists), html.unorderLists);
  }
);

test.todo('unorder lists: unclosed markdown tag');

test(
  'order lists: code should generate to html',
  async t => {
    t.is(codeGenerator(ast.orderLists), html.orderLists);
  }
);

test.todo('order lists: unclosed markdown tag');

// inlines

test(
  'backslash escapes: code should generate to html',
  async t => {
    t.is(
      codeGenerator(ast.backslashEscapes.punctuation),
      html.backslashEscapes.punctuation,
      'punctuation'
    );
    t.is(
      codeGenerator(ast.backslashEscapes.likeLiteral),
      html.backslashEscapes.likeLiteral,
      'like literal'
    );
    t.is(
      codeGenerator(ast.backslashEscapes.regularChars),
      html.backslashEscapes.regularChars,
      'regular chars'
    );
    t.is(
      codeGenerator(ast.backslashEscapes.selfEscaped),
      html.backslashEscapes.selfEscaped,
      'self escaped'
    );
    /* t.skip.is(
      codeGenerator(ast.backslashEscapes.hardLineBreak),
      html.backslashEscapes.hardLineBreak,
      'hard line break'
    ); */
  }
);

test(
  'code spans: code should generate to html',
  async t => {
    t.is(codeGenerator(ast.codeSpans.$1), html.codeSpans.$1, '$1');
    t.is(codeGenerator(ast.codeSpans.$2), html.codeSpans.$2, '$2');
    t.is(codeGenerator(ast.codeSpans.$3), html.codeSpans.$3, '$3');
    t.is(codeGenerator(ast.codeSpans.$4), html.codeSpans.$4, '$4');
    t.is(codeGenerator(ast.codeSpans.$5), html.codeSpans.$5, '$5');
    t.is(codeGenerator(ast.codeSpans.$6), html.codeSpans.$6, '$6');
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
    t.is(codeGenerator(ast.emphasis), html.emphasis);
  }
);

test.todo('emphasis: unclosed markdown tag');

test(
  'links inline: code should generate to html',
  async t => {
    t.is(
      codeGenerator(ast.linksInline.withTitle),
      html.linksInline.withTitle,
      'with title'
    );
    t.is(
      codeGenerator(ast.linksInline.withoutTitle),
      html.linksInline.withoutTitle,
      'without title'
    );
    t.is(
      codeGenerator(ast.linksInline.relativePath),
      html.linksInline.relativePath,
      'relative path'
    );
    t.is(
      codeGenerator(ast.linksInline.withEmphasis),
      html.linksInline.withEmphasis,
      'with emphasis'
    );
    t.is(
      codeGenerator(ast.linksInline.invalid),
      html.linksInline.invalid,
      'invalid'
    );
    /* t.skip.is(
      codeGenerator(ast.linksInline.withBackslashEscape[0]),
      html.linksInline.withBackslashEscape[0],
      'with backslash escape 1'
    ); */
    t.is(
      codeGenerator(ast.linksInline.withBackslashEscape[1]),
      html.linksInline.withBackslashEscape[1],
      'with backslash escape 2'
    );
  }
);

test.todo('links inline: unclosed markdown tag');

test.todo('links inline: without text');

test(
  'links reference: code should generate to html',
  async t => {
    t.is(
      codeGenerator(ast.linksReference.linkDefinitions),
      html.linksReference.linkDefinitions,
      'link definitions'
    );
    t.is(
      codeGenerator(ast.linksReference.titleOnNextLine),
      html.linksReference.titleOnNextLine,
      'title on the next line'
    );
    t.is(
      codeGenerator(ast.linksReference.notCaseSensitive),
      html.linksReference.notCaseSensitive,
      'not case sensitive'
    );
    t.is(
      codeGenerator(ast.linksReference.implicitLinkName),
      html.linksReference.implicitLinkName,
      'implicit link name'
    );
    t.is(
      codeGenerator(ast.linksReference.idents),
      html.linksReference.idents,
      'idents'
    );
    t.is(
      codeGenerator(ast.linksReference.invalid),
      html.linksReference.invalid,
      'invalid'
    );
    t.is(
      codeGenerator(ast.linksReference.withBackslashEscape),
      html.linksReference.withBackslashEscape,
      'with backslash escape'
    );
  }
);

test.todo('links reference: unclosed markdown tag');

test.todo('links reference: without text');

test(
  'images: code should generate to html',
  async t => {
    t.is(
      codeGenerator(ast.images.inline),
      html.images.inline,
      'inline'
    );
    t.is(
      codeGenerator(ast.images.optionalTitle),
      html.images.optionalTitle,
      'optional title'
    );
    t.is(
      codeGenerator(ast.images.reference),
      html.images.reference,
      'reference'
    );
  }
);

test(
  'autolinks: code should generate to html',
  async t => {
    t.is(
      codeGenerator(ast.autolinks.url.valid[0]),
      html.autolinks.url.valid[0],
      'valid url 1'
    );
    t.is(
      codeGenerator(ast.autolinks.url.valid[0]),
      html.autolinks.url.valid[0],
      'valid url 2'
    );
    t.is(
      codeGenerator(ast.autolinks.url.valid[0]),
      html.autolinks.url.valid[0],
      'valid url 3'
    );
    t.skip.is(
      codeGenerator(ast.autolinks.url.withBackslashEscape),
      html.autolinks.url.withBackslashEscape,
      'url with backslash escape'
    );

    t.is(
      codeGenerator(ast.autolinks.email.valid[0]),
      html.autolinks.email.valid[0],
      'valid email 1'
    );
    t.is(
      codeGenerator(ast.autolinks.email.valid[0]),
      html.autolinks.email.valid[0],
      'valid email 2'
    );
    t.skip.is(
      codeGenerator(ast.autolinks.email.withBackslashEscape),
      html.autolinks.email.withBackslashEscape,
      'email with backslash escape'
    );

    t.is(
      codeGenerator(ast.autolinks.areNotAutolinks[0]),
      html.autolinks.areNotAutolinks[0],
      'should not be autolinks 1'
    );
    t.is(
      codeGenerator(ast.autolinks.areNotAutolinks[1]),
      html.autolinks.areNotAutolinks[1],
      'should not be autolinks 2'
    );
    t.is(
      codeGenerator(ast.autolinks.areNotAutolinks[2]),
      html.autolinks.areNotAutolinks[2],
      'should not be autolinks 3'
    );
    t.is(
      codeGenerator(ast.autolinks.areNotAutolinks[3]),
      html.autolinks.areNotAutolinks[3],
      'should not be autolinks 4'
    );
    t.is(
      codeGenerator(ast.autolinks.areNotAutolinks[4]),
      html.autolinks.areNotAutolinks[4],
      'should not be autolinks 5'
    );
    t.is(
      codeGenerator(ast.autolinks.areNotAutolinks[5]),
      html.autolinks.areNotAutolinks[5],
      'should not be autolinks 6'
    );
  }
);

// other

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
