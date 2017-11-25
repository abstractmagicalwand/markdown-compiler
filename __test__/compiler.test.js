import test from 'ava';

import compiler from '../src/compiler';
import {html, text} from './fixtures'; // eslint-disable-line

test(
  'emphasis: markdown should compile to html',
  t => {
    t.is(compiler(text.emphasis), html.emphasis);
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
  }
);

test(
  'paragraph: markdown should compile to html',
  t => {
    t.is(compiler(text.paragraph), html.paragraph);
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

test(
  'atx header: markdown should compile to html',
  t => {
    t.is(compiler(text.atxHeader), html.atxHeader, '');
  }
);

test(
  'setext list: markdown should compile to html',
  t => {
    t.is(compiler(text.setextHeader), html.setextHeader, '');
  }
);

test(
  'horizontal rules: markdown should compile to html',
  t => {
    t.is(compiler(text.HorizontalRule), html.HorizontalRule, '');
  }
);

test(
  'blockquote: markdown should compile to html',
  t => {
    t.skip.is(compiler(text.blockquote), html.blockquote, '');
  }
);
