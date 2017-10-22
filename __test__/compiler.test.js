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
