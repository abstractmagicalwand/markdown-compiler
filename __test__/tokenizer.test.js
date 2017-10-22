import test from 'ava';

import tokenizer from '../src/tokenizer';
import {text, tokens} from './fixtures'; // eslint-disable-line

test(
  'emphasis: text should transform to tokens',
  t => {
    t.deepEqual(tokenizer(text.emphasis), tokens.emphasis);
  }
);

test(
  'emphasis: text should transform to tokens',
  t => {
    t.deepEqual(tokenizer(text.emphasis), tokens.emphasis);
  }
);

test(
  'paragraph: text should transform to tokens',
  t => {
    t.deepEqual(tokenizer(text.paragraph), tokens.paragraph);
  }
);

test(
  'unorder list: text should transform to tokens',
  t => {
    t.deepEqual(tokenizer(text.unorderList), tokens.unorderList);
  }
);

test(
  'order list: text should transform to tokens',
  t => {
    t.deepEqual(tokenizer(text.orderList), tokens.orderList);
  }
);

test(
  'atx header: text should transform to tokens',
  t => {
    t.deepEqual(tokenizer(text.atxHeader), tokens.atxHeader);
  }
);

test(
  'setext header: text should transform to tokens',
  t => {
    t.deepEqual(tokenizer(text.setextHeader), tokens.setextHeader);
  }
);

test(
  'horizontal rules: text should transform to tokens',
  t => {
    t.deepEqual(tokenizer(text.HorizontalRule), tokens.HorizontalRule);
  }
);

test(
  'blockquote: text should transform to tokens',
  t => {
    t.skip.deepEqual(tokenizer(text.blockquote), tokens.blockquote);
  }
);
