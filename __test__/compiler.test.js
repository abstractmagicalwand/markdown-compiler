/* eslint comma-dangle: 0 */

import test from 'ava';

import compiler from '../src/compiler';
import {html, text} from './fixtures';

test.only(
  'markdown should compile to html',
  t => {
    t.is(compiler(text.emphasis), html.emphasis, 'emphasis');
    t.skip.is(compiler(text.blockquote), html.blockquote, 'blockquote');
  }
);
