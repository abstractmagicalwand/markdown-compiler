/* eslint
  comma-dangle: 0,
  no-magic-numbers: 0
*/

import test from 'ava';
import tokenizer from './tokenizer';
import {text, tokens} from './fixtures';

test.only(
  'lexical analysis - emphasis',
  t => t.deepEqual(tokenizer(text.emphasis), tokens.emphasis, 'emphasis')
);

test(
  'lexical analysis - blockquote',
  t => t.deepEqual(tokenizer(text.blockquote), tokens.blockquote, 'blockquote')
);
