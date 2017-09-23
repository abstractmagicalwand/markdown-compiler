import test from 'ava';

import codeGenerator from '../src/code-generator';
import {ast, html} from './fixtures'; // eslint-disable-line

test(
  'code should generate to html',
  t => {
    t.is(codeGenerator(ast.emphasis), html.emphasis, 'emphasis');
    t.is(codeGenerator(ast.paragraph), html.paragraph, 'paragraph');
    t.skip.is(codeGenerator(ast.blockquote), html.blockquote, 'blockquote');
  }
);
