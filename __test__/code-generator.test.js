import test from 'ava';

import codeGenerator from '../src/code-generator';
import {ast, html} from './fixtures'; // eslint-disable-line

test(
  'emphasis: code should generate to html',
  t => {
    t.is(codeGenerator(ast.emphasis), html.emphasis);
  }
);

test(
  'paragraph: code should generate to html',
  t => {
    t.is(codeGenerator(ast.paragraph), html.paragraph);
  }
);


test(
  'unorder list: code should generate to html',
  t => {
    t.is(codeGenerator(ast.unorderList), html.unorderList);
  }
);

test(
  'order list: code should generate to html',
  t => {
    t.is(codeGenerator(ast.orderList), html.orderList);
  }
);

test(
  'atx header: code should generate to html',
  t => {
    t.is(codeGenerator(ast.atxHeader), html.atxHeader);
  }
);

test(
  'setext list: code should generate to html',
  t => {
    t.is(codeGenerator(ast.setextHeader), html.setextHeader);
  }
);

test(
  'code block: code should generate to html',
  t => {
    t.is(codeGenerator(ast.codeBlock), html.codeBlock);
  }
);

test.skip(
  'blockquote: code should generate to html',
  t => {
    t.is(codeGenerator(ast.blockquote), html.blockquote);
  }
);
