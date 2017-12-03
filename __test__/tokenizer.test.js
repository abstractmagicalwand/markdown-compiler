import test from 'ava';

import tokenizer from '../src/tokenizer';
import {text, tokens, variables} from './fixtures'; // eslint-disable-line

test(
  'emphasis: text should transform to tokens',
  t => {
    t.deepEqual(tokenizer(text.emphasis), {tokens: tokens.emphasis});
  }
);

test(
  'code: text should transform to tokens',
  t => {
    t.deepEqual(tokenizer(text.code.$1), {tokens: tokens.code.$1}, '$1');
    t.deepEqual(tokenizer(text.code.$2), {tokens: tokens.code.$2}, '$2');
    t.deepEqual(tokenizer(text.code.$3), {tokens: tokens.code.$3}, '$3');
    t.deepEqual(tokenizer(text.code.$4), {tokens: tokens.code.$4}, '$4');
    t.deepEqual(tokenizer(text.code.$5), {tokens: tokens.code.$5}, '$5');
    t.deepEqual(tokenizer(text.code.$6), {tokens: tokens.code.$6}, '$6');
  }
);

test(
  'link inline: text should transform to tokens',
  t => {
    t.deepEqual(
      tokenizer(text.linkInline.withTitle),
      {tokens: tokens.linkInline.withTitle},
      'with title'
    );
    t.deepEqual(
      tokenizer(text.linkInline.withoutTitle),
      {tokens: tokens.linkInline.withoutTitle},
      'without title'
    );
    t.deepEqual(
      tokenizer(text.linkInline.relativePath),
      {tokens: tokens.linkInline.relativePath},
      'relative path'
    );
    t.deepEqual(
      tokenizer(text.linkInline.withEmphasis),
      {tokens: tokens.linkInline.withEmphasis},
      'with emphasis'
    );
    t.deepEqual(
      tokenizer(text.linkInline.invalid),
      {tokens: tokens.linkInline.invalid},
      'invalid'
    );
  }
);

test(
  'link reference: text should transform to tokens',
  t => {
    t.deepEqual(
      tokenizer(text.linkReference.linkDefinitions),
      {
        tokens: tokens.linkReference.linkDefinitions,
        variables: variables.linkReference.linkDefinitions,
      },
      'link definitions'
    );
    t.deepEqual(
      tokenizer(text.linkReference.titleOnNextLine),
      {
        tokens: tokens.linkReference.titleOnNextLine,
        variables: variables.linkReference.titleOnNextLine,
      },
      'title on the next line'
    );
    t.deepEqual(
      tokenizer(text.linkReference.notCaseSensitive),
      {
        tokens: tokens.linkReference.notCaseSensitive,
        variables: variables.linkReference.notCaseSensitive,
      },
      'not case sensitive'
    );
    t.deepEqual(
      tokenizer(text.linkReference.implicitLinkName),
      {
        tokens: tokens.linkReference.implicitLinkName,
        variables: variables.linkReference.implicitLinkName,
      },
      'implicit link name'
    );
    t.deepEqual(
      tokenizer(text.linkReference.idents),
      {
        tokens: tokens.linkReference.idents,
        variables: variables.linkReference.idents,
      },
      'idents'
    );
    t.deepEqual(
      tokenizer(text.linkReference.invalid),
      {
        tokens: tokens.linkReference.invalid,
      },
      'invalid'
    );
  }
);

test(
  'paragraph: text should transform to tokens',
  t => {
    t.deepEqual(tokenizer(text.paragraph), {tokens: tokens.paragraph});
  }
);

test(
  'unorder list: text should transform to tokens',
  t => {
    t.deepEqual(tokenizer(text.unorderList), {tokens: tokens.unorderList});
  }
);

test(
  'order list: text should transform to tokens',
  t => {
    t.deepEqual(tokenizer(text.orderList), {tokens: tokens.orderList});
  }
);

test(
  'atx header: text should transform to tokens',
  t => {
    t.deepEqual(tokenizer(text.atxHeader), {tokens: tokens.atxHeader});
  }
);

test(
  'setext header: text should transform to tokens',
  t => {
    t.deepEqual(tokenizer(text.setextHeader), {tokens: tokens.setextHeader});
  }
);

test(
  'horizontal rules: text should transform to tokens',
  t => {
    t.deepEqual(
      tokenizer(text.HorizontalRule),
      {tokens: tokens.HorizontalRule}
    );
  }
);

test(
  'code block: text should transform to tokens',
  t => {
    t.deepEqual(tokenizer(text.codeBlock), {tokens: tokens.codeBlock});
  }
);

test(
  'blockquote: text should transform to tokens',
  t => {
    t.skip.deepEqual(tokenizer(text.blockquote), {tokens: tokens.blockquote});
  }
);
