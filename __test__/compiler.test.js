import test from 'ava';

import compiler from '../src/compiler';
import {html, text} from './fixtures'; // eslint-disable-line

// leaf blocks

test(
  'horizontal rules: markdown should compile to html',
  t => {
    t.is(compiler(text.horizontalRule), html.horizontalRule, '');
  }
);

test(
  'atx header: markdown should compile to html',
  t => {
    t.is(compiler(text.atxHeader), html.atxHeader);
  }
);

test(
  'setext header: markdown should compile to html',
  t => {
    t.is(compiler(text.setextHeader), html.setextHeader);
  }
);

test(
  'code block: markdown should compile to html',
  t => {
    t.is(compiler(text.codeBlock.main), html.codeBlock.main, 'main');
    t.skip.is(
      compiler(text.codeBlock.withBackslashEscape[0]),
      html.codeBlock.withBackslashEscape[0],
      'with backslash escape 1'
    );
    t.skip.is(
      compiler(text.codeBlock.withBackslashEscape[1]),
      html.codeBlock.withBackslashEscape[1],
      'with backslash escape 2'
    );
  }
);

test(
  'paragraph: markdown should compile to html',
  t => {
    t.is(compiler(text.paragraph), html.paragraph);
  }
);

// container blocks

test(
  'blockquote: markdown should compile to html',
  t => {
    t.is(
      compiler(text.blockquote.everyLine),
      html.blockquote.everyLine,
      'every line'
    );
    t.is(
      compiler(text.blockquote.firstLine),
      html.blockquote.firstLine,
      'first line'
    );
    t.is(
      compiler(text.blockquote.nestedBlockquote),
      html.blockquote.nestedBlockquote,
      'nested blockquote'
    );
    t.is(
      compiler(text.blockquote.containedOtherElements),
      html.blockquote.containedOtherElements,
      'contained other elements'
    );
  }
);

test(
  'unorder list: markdown should compile to html',
  t => {
    t.is(compiler(text.unorderList), html.unorderList);
  }
);

test(
  'order list: markdown should compile to html',
  t => {
    t.is(compiler(text.orderList), html.orderList, '');
  }
);

// inlines

test(
  'backslash escapes: markdown should compile to html',
  t => {
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
  'code: markdown should compile to html',
  t => {
    t.is(compiler(text.code.$1), html.code.$1, '$1');
    t.is(compiler(text.code.$2), html.code.$2, '$2');
    t.is(compiler(text.code.$3), html.code.$3, '$3');
    t.is(compiler(text.code.$4), html.code.$4, '$4');
    t.is(compiler(text.code.$5), html.code.$5, '$5');
    t.is(compiler(text.code.$6), html.code.$6, '$6');
    t.is(
      compiler(text.code.withBackslashEscape),
      html.code.withBackslashEscape,
      'with backslash escape'
    );
  }
);

test(
  'emphasis: markdown should compile to html',
  t => {
    t.is(compiler(text.emphasis), html.emphasis);
  }
);

test(
  'link inline: markdown should compile to html',
  t => {
    t.is(
      compiler(text.linkInline.withTitle),
      html.linkInline.withTitle,
      'with title'
    );
    t.is(
      compiler(text.linkInline.withoutTitle),
      html.linkInline.withoutTitle,
      'without title'
    );
    t.is(
      compiler(text.linkInline.relativePath),
      html.linkInline.relativePath,
      'relative path'
    );
    t.is(
      compiler(text.linkInline.withEmphasis),
      html.linkInline.withEmphasis,
      'with emphasis'
    );
    t.is(
      compiler(text.linkInline.invalid),
      html.linkInline.invalid,
      'invalid'
    );
    t.skip.is(
      compiler(text.linkInline.withBackslashEscape[0]),
      html.linkInline.withBackslashEscape[0],
      'with backslash escape 1'
    );
    t.is(
      compiler(text.linkInline.withBackslashEscape[1]),
      html.linkInline.withBackslashEscape[1],
      'with backslash escape 2'
    );
  }
);

test.todo('link inline: link without text');

test(
  'link reference: markdown should compile to html',
  t => {
    t.is(
      compiler(text.linkReference.linkDefinitions),
      html.linkReference.linkDefinitions,
      'link definitions'
    );
    t.is(
      compiler(text.linkReference.titleOnNextLine),
      html.linkReference.titleOnNextLine,
      'title on the next line'
    );
    t.is(
      compiler(text.linkReference.notCaseSensitive),
      html.linkReference.notCaseSensitive,
      'not case sensitive'
    );
    t.is(
      compiler(text.linkReference.implicitLinkName),
      html.linkReference.implicitLinkName,
      'implicit link name'
    );
    t.is(
      compiler(text.linkReference.idents),
      html.linkReference.idents,
      'idents'
    );
    t.is(
      compiler(text.linkReference.invalid),
      html.linkReference.invalid,
      'invalid'
    );
    t.skip.is(
      compiler(text.linkReference.withBackslashEscape),
      html.linkReference.withBackslashEscape,
      'with backslash escape'
    );
  }
);

test(
  'autolink: markdown should compile to html',
  t => {
    t.is(
      compiler(text.autolink.url.valid[0]),
      html.autolink.url.valid[0],
      'valid url 1'
    );
    t.is(
      compiler(text.autolink.url.valid[0]),
      html.autolink.url.valid[0],
      'valid url 2'
    );
    t.is(
      compiler(text.autolink.url.valid[0]),
      html.autolink.url.valid[0],
      'valid url 3'
    );
    t.skip.is(
      compiler(text.autolink.url.withBackslashEscape),
      html.autolink.url.withBackslashEscape,
      'url with backslash escape'
    );

    t.is(
      compiler(text.autolink.email.valid[0]),
      html.autolink.email.valid[0],
      'valid email 1'
    );
    t.is(
      compiler(text.autolink.email.valid[0]),
      html.autolink.email.valid[0],
      'valid email 2'
    );
    t.skip.is(
      compiler(text.autolink.email.withBackslashEscape),
      html.autolink.email.withBackslashEscape,
      'email with backslash escape'
    );

    t.is(
      compiler(text.autolink.areNotAutolinks[0]),
      html.autolink.areNotAutolinks[0],
      'should not be autolink 1'
    );
    t.is(
      compiler(text.autolink.areNotAutolinks[1]),
      html.autolink.areNotAutolinks[1],
      'should not be autolink 2'
    );
    t.is(
      compiler(text.autolink.areNotAutolinks[2]),
      html.autolink.areNotAutolinks[2],
      'should not be autolink 3'
    );
    t.is(
      compiler(text.autolink.areNotAutolinks[3]),
      html.autolink.areNotAutolinks[3],
      'should not be autolink 4'
    );
    t.is(
      compiler(text.autolink.areNotAutolinks[4]),
      html.autolink.areNotAutolinks[4],
      'should not be autolink 5'
    );
    t.is(
      compiler(text.autolink.areNotAutolinks[5]),
      html.autolink.areNotAutolinks[5],
      'should not be autolink 6'
    );
  }
);
