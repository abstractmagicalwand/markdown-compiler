/* eslint comma-dangle: 0 */

import test from 'ava';
import launcher from './index';
import {text, html} from './fixtures';

test(
  'launcher - emphasis',
  t => t.is(launcher(text.emphasis), html.emphasis, 'emphasis')
);

test(
  'launcher - blockquote',
  t => t.is(launcher(text.blockquote), html.blockquote, 'blockquote')
);
