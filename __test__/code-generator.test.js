import test from 'ava';

import codeGenerator from '../src/code-generator';
import {ast, html} from './fixtures'; // eslint-disable-line

test(
  'emphasis: code should generate to html',
  t => {
    t.is(codeGenerator(ast.emphasis), html.emphasis);
  }
);

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

test(
  'order list: code should generate to html',
  t => {
    t.is(codeGenerator(ast.orderList), html.orderList);
  }
);

test(
  'atx header: code should generate to html',
  t => {
    t.is(codeGenerator(ast.atxHeader), html.atxHeader);
  }
);

test(
  'setext list: code should generate to html',
  t => {
    t.is(codeGenerator(ast.setextHeader), html.setextHeader);
  }
);

test(
  'code block: code should generate to html',
  t => {
    t.is(codeGenerator(ast.codeBlock), html.codeBlock);
  }
);

test.skip(
  'blockquote: code should generate to html',
  t => {
    t.is(codeGenerator(ast.blockquote), html.blockquote);
  }
);
