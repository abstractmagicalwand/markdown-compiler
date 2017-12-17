import test from 'ava';

import codeGenerator from '../src/code-generator';
import {ast, html} from './fixtures'; // eslint-disable-line

test(
  'emphasis: code should generate to html',
  t => {
    t.is(codeGenerator(ast.emphasis), html.emphasis);
  }
);

test.todo('emphasis: unclosed markdown tag');

test(
  'code: code should generate to html',
  t => {
    t.is(codeGenerator(ast.code.$1), html.code.$1, '$1');
    t.is(codeGenerator(ast.code.$2), html.code.$2, '$2');
    t.is(codeGenerator(ast.code.$3), html.code.$3, '$3');
    t.is(codeGenerator(ast.code.$4), html.code.$4, '$4');
    t.is(codeGenerator(ast.code.$5), html.code.$5, '$5');
    t.is(codeGenerator(ast.code.$6), html.code.$6, '$6');
  }
);

test.todo('emphasis: unclosed markdown tag');

test(
  'link inline: code should generate to html',
  t => {
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
  }
);

test.todo('link inline: unclosed markdown tag');

test.todo('link inline: without text');

test(
  'link reference: code should generate to html',
  t => {
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
  }
);

test.todo('link reference: unclosed markdown tag');

test.todo('link reference: without text');

test(
  'image: code should generate to html',
  t => {
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
  'paragraph: code should generate to html',
  t => {
    t.is(codeGenerator(ast.paragraph), html.paragraph);
  }
);

test(
  'unorder list: code should generate to html',
  t => {
    t.is(codeGenerator(ast.unorderList), html.unorderList);
  }
);

test.todo('unorder list: unclosed markdown tag');

test(
  'order list: code should generate to html',
  t => {
    t.is(codeGenerator(ast.orderList), html.orderList);
  }
);

test.todo('order list: unclosed markdown tag');

test(
  'atx header: code should generate to html',
  t => {
    t.is(codeGenerator(ast.atxHeader), html.atxHeader);
  }
);

test.todo('atx header: unclosed markdown tag');

test(
  'setext header: code should generate to html',
  t => {
    t.is(codeGenerator(ast.setextHeader), html.setextHeader);
  }
);

test.todo('setext header: unclosed markdown tag');

test(
  'horizontal rule: code should generate to html',
  t => {
    t.is(codeGenerator(ast.horizontalRule), html.horizontalRule);
  }
);

test(
  'code block: code should generate to html',
  t => {
    t.is(codeGenerator(ast.codeBlock), html.codeBlock);
  }
);

test.todo('code block: unclosed markdown tag');

test(
  'blockquote: code should generate to html',
  t => {
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
