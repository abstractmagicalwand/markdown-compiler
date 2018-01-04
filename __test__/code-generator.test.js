import test from 'ava';

import codeGenerator from '../src/code-generator';
import {ast, html} from './fixtures'; // eslint-disable-line

// leaf blocks

test(
  'horizontal rule: code should generate to html',
  async t => {
    t.is(codeGenerator(ast.horizontalRule), html.horizontalRule);
  }
);

test(
  'atx header: code should generate to html',
  async t => {
    t.is(codeGenerator(ast.atxHeader), html.atxHeader);
  }
);

test.todo('atx header: unclosed markdown tag');

test(
  'setext header: code should generate to html',
  async t => {
    t.is(codeGenerator(ast.setextHeader), html.setextHeader);
  }
);

test.todo('setext header: unclosed markdown tag');

test(
  'code block: code should generate to html',
  async t => {
    t.is(codeGenerator(ast.codeBlock.main), html.codeBlock.main, 'main');
    t.skip.is(
      codeGenerator(ast.codeBlock.withBackslashEscape[0]),
      html.codeBlock.withBackslashEscape[0],
      'with backslash escape 1'
    );
    t.skip.is(
      codeGenerator(ast.codeBlock.withBackslashEscape[1]),
      html.codeBlock.withBackslashEscape[1],
      'with backslash escape 2'
    );
  }
);

test.todo('code block: unclosed markdown tag');

test(
  'paragraph: code should generate to html',
  async t => {
    t.is(codeGenerator(ast.paragraph), html.paragraph);
  }
);

// container blocks

test(
  'blockquote: code should generate to html',
  async t => {
    t.is(
      codeGenerator(ast.blockquote.everyLine),
      html.blockquote.everyLine,
      'every line'
    );

    t.is(
      codeGenerator(ast.blockquote.firstLine),
      html.blockquote.firstLine,
      'first line'
    );

    t.is(
      codeGenerator(ast.blockquote.nestedBlockquote),
      html.blockquote.nestedBlockquote,
      'nested blockquote'
    );

    t.is(
      codeGenerator(ast.blockquote.containedOtherElements),
      html.blockquote.containedOtherElements,
      'contained other elements'
    );
  }
);

test.todo('blockquote: unclosed markdown tag');

test(
  'unorder list: code should generate to html',
  async t => {
    t.is(codeGenerator(ast.unorderList), html.unorderList);
  }
);

test.todo('unorder list: unclosed markdown tag');

test(
  'order list: code should generate to html',
  async t => {
    t.is(codeGenerator(ast.orderList), html.orderList);
  }
);

test.todo('order list: unclosed markdown tag');

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
  'code: code should generate to html',
  async t => {
    t.is(codeGenerator(ast.code.$1), html.code.$1, '$1');
    t.is(codeGenerator(ast.code.$2), html.code.$2, '$2');
    t.is(codeGenerator(ast.code.$3), html.code.$3, '$3');
    t.is(codeGenerator(ast.code.$4), html.code.$4, '$4');
    t.is(codeGenerator(ast.code.$5), html.code.$5, '$5');
    t.is(codeGenerator(ast.code.$6), html.code.$6, '$6');
    t.is(
      codeGenerator(ast.code.withBackslashEscape),
      html.code.withBackslashEscape,
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
  'link inline: code should generate to html',
  async t => {
    t.is(
      codeGenerator(ast.linkInline.withTitle),
      html.linkInline.withTitle,
      'with title'
    );
    t.is(
      codeGenerator(ast.linkInline.withoutTitle),
      html.linkInline.withoutTitle,
      'without title'
    );
    t.is(
      codeGenerator(ast.linkInline.relativePath),
      html.linkInline.relativePath,
      'relative path'
    );
    t.is(
      codeGenerator(ast.linkInline.withEmphasis),
      html.linkInline.withEmphasis,
      'with emphasis'
    );
    t.is(
      codeGenerator(ast.linkInline.invalid),
      html.linkInline.invalid,
      'invalid'
    );
    /* t.skip.is(
      codeGenerator(ast.linkInline.withBackslashEscape[0]),
      html.linkInline.withBackslashEscape[0],
      'with backslash escape 1'
    ); */
    t.is(
      codeGenerator(ast.linkInline.withBackslashEscape[1]),
      html.linkInline.withBackslashEscape[1],
      'with backslash escape 2'
    );
  }
);

test.todo('link inline: unclosed markdown tag');

test.todo('link inline: without text');

test(
  'link reference: code should generate to html',
  async t => {
    t.is(
      codeGenerator(ast.linkReference.linkDefinitions),
      html.linkReference.linkDefinitions,
      'link definitions'
    );
    t.is(
      codeGenerator(ast.linkReference.titleOnNextLine),
      html.linkReference.titleOnNextLine,
      'title on the next line'
    );
    t.is(
      codeGenerator(ast.linkReference.notCaseSensitive),
      html.linkReference.notCaseSensitive,
      'not case sensitive'
    );
    t.is(
      codeGenerator(ast.linkReference.implicitLinkName),
      html.linkReference.implicitLinkName,
      'implicit link name'
    );
    t.is(
      codeGenerator(ast.linkReference.idents),
      html.linkReference.idents,
      'idents'
    );
    t.is(
      codeGenerator(ast.linkReference.invalid),
      html.linkReference.invalid,
      'invalid'
    );
    t.is(
      codeGenerator(ast.linkReference.withBackslashEscape),
      html.linkReference.withBackslashEscape,
      'with backslash escape'
    );
  }
);

test.todo('link reference: unclosed markdown tag');

test.todo('link reference: without text');

test(
  'image: code should generate to html',
  async t => {
    t.is(
      codeGenerator(ast.image.inline),
      html.image.inline,
      'inline'
    );
    t.is(
      codeGenerator(ast.image.optionalTitle),
      html.image.optionalTitle,
      'optional title'
    );
    t.is(
      codeGenerator(ast.image.reference),
      html.image.reference,
      'reference'
    );
  }
);

test(
  'autolink: code should generate to html',
  async t => {
    t.is(
      codeGenerator(ast.autolink.url.valid[0]),
      html.autolink.url.valid[0],
      'valid url 1'
    );
    t.is(
      codeGenerator(ast.autolink.url.valid[0]),
      html.autolink.url.valid[0],
      'valid url 2'
    );
    t.is(
      codeGenerator(ast.autolink.url.valid[0]),
      html.autolink.url.valid[0],
      'valid url 3'
    );
    t.skip.is(
      codeGenerator(ast.autolink.url.withBackslashEscape),
      html.autolink.url.withBackslashEscape,
      'url with backslash escape'
    );

    t.is(
      codeGenerator(ast.autolink.email.valid[0]),
      html.autolink.email.valid[0],
      'valid email 1'
    );
    t.is(
      codeGenerator(ast.autolink.email.valid[0]),
      html.autolink.email.valid[0],
      'valid email 2'
    );
    t.skip.is(
      codeGenerator(ast.autolink.email.withBackslashEscape),
      html.autolink.email.withBackslashEscape,
      'email with backslash escape'
    );

    t.is(
      codeGenerator(ast.autolink.areNotAutolinks[0]),
      html.autolink.areNotAutolinks[0],
      'should not be autolink 1'
    );
    t.is(
      codeGenerator(ast.autolink.areNotAutolinks[1]),
      html.autolink.areNotAutolinks[1],
      'should not be autolink 2'
    );
    t.is(
      codeGenerator(ast.autolink.areNotAutolinks[2]),
      html.autolink.areNotAutolinks[2],
      'should not be autolink 3'
    );
    t.is(
      codeGenerator(ast.autolink.areNotAutolinks[3]),
      html.autolink.areNotAutolinks[3],
      'should not be autolink 4'
    );
    t.is(
      codeGenerator(ast.autolink.areNotAutolinks[4]),
      html.autolink.areNotAutolinks[4],
      'should not be autolink 5'
    );
    t.is(
      codeGenerator(ast.autolink.areNotAutolinks[5]),
      html.autolink.areNotAutolinks[5],
      'should not be autolink 6'
    );
  }
);

// other

test(
  'code generator should throw exceptions',
  async t => {
    t.throws(
      () => codeGenerator(1),
      TypeError,
      'rawText is number. It should be string.'
    );
  }
);

test(
  'code generator should not throw any exceptions',
  async t => {
    t.notThrows(() => codeGenerator({}), 'object is empty');
  }
);
