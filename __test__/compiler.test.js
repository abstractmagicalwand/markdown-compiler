import test from 'ava';

import compiler from '../src/compiler';
import {html, text} from './fixtures'; // eslint-disable-line

test(
  'markdown should compile to html',
  t => {
    t.is(compiler(text.emphasis), html.emphasis, 'emphasis');
    t.is(compiler(text.paragraph), html.paragraph, 'paragraph');
    t.is(compiler(text.unorderList), html.unorderList, 'unorder list');
    t.is(compiler(text.orderList), html.orderList, 'order list');
    t.skip.is(compiler(text.blockquote), html.blockquote, 'blockquote');
  }
);
