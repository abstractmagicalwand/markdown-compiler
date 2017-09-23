import test from 'ava';

import tokenizer from '../src/tokenizer';
import {text, tokens} from './fixtures'; // eslint-disable-line

test(
  'text should transform to tokens',
  t => {
    t.deepEqual(tokenizer(text.emphasis), tokens.emphasis, 'emphasis');
    t.deepEqual(tokenizer(text.paragraph), tokens.paragraph, 'paragraph');
    t.deepEqual(
      tokenizer(text.unorderList),
      tokens.unorderList,
      'unorder list'
    );
    t.deepEqual(tokenizer(text.orderList), tokens.orderList, 'order list');
    t.skip.deepEqual(
      tokenizer(text.blockquote),
      tokens.blockquote,
      'blockquote'
    );
  }
);
