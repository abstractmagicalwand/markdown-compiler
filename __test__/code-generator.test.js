/* eslint comma-dangle: 0 */

import test from 'ava';

import codeGenerator from '../src/code-generator';
import {ast, html} from './fixtures';

test.only(
  'code should generate to html',
  t => {
    t.is(codeGenerator(ast.emphasis), html.emphasis, 'emphasis');
    t.skip.is(codeGenerator(ast.blockquote), html.blockquote, 'blockquote');
  }
);
