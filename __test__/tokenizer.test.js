/* eslint comma-dangle: 0 */

import test from 'ava';

import tokenizer from '../src/tokenizer';
import {text, tokens} from './fixtures/index';

test.only(
  'text should transform to tokens',
  t => {
    t.deepEqual(tokenizer(text.emphasis), tokens.emphasis, 'emphasis');
    t.skip.deepEqual(
      tokenizer(text.blockquote),
      tokens.blockquote,
      'blockquote'
    );
  }
);
