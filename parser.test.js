/* eslint comma-dangle: 0 */

import test from 'ava';
import parser from './parser';
import isMatch from 'lodash/isMatch';
import {tokens, ast} from './fixtures';

test.only(
  'abstract syntax tree - emphasis',
  t => t.true(isMatch(parser(tokens.emphasis), ast.emphasis), 'emphasis')
);

test(
  'abstract syntax tree - blockquote',
  t => t.true(isMatch(parser(tokens.blockquote), ast.blockquote), 'blockquote')
);
