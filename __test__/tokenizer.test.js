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
  'autolink: text should transform to tokens',
  t => {
    t.deepEqual(
      tokenizer(text.autolink.url.valid[0]),
      {tokens: tokens.autolink.url.valid[0]},
      'valid url 1'
    );
    t.deepEqual(
      tokenizer(text.autolink.url.valid[1]),
      {tokens: tokens.autolink.url.valid[1]},
      'valid url 2'
    );
    t.deepEqual(
      tokenizer(text.autolink.url.valid[2]),
      {tokens: tokens.autolink.url.valid[2]},
      'valid url 3'
    );
    t.skip.deepEqual(
      tokenizer(text.autolink.url.withBackslashEscapes),
      {tokens: tokens.autolink.url.withBackslashEscapes},
      'url with backslash escapes'
    );

    t.deepEqual(
      tokenizer(text.autolink.email.valid[0]),
      {tokens: tokens.autolink.email.valid[0]},
      'valid email 1'
    );
    t.deepEqual(
      tokenizer(text.autolink.email.valid[1]),
      {tokens: tokens.autolink.email.valid[1]},
      'valid email 2'
    );
    t.skip.deepEqual(
      tokenizer(text.autolink.email.withBackslashEscapes),
      {tokens: tokens.autolink.email.withBackslashEscapes},
      'email with backslash escapes'
    );

    t.deepEqual(
      tokenizer(text.autolink.areNotAutolinks[0]),
      {tokens: tokens.autolink.areNotAutolinks[0]},
      'should not be autolink - 1'
    );
    t.deepEqual(
      tokenizer(text.autolink.areNotAutolinks[1]),
      {tokens: tokens.autolink.areNotAutolinks[1]},
      'should not be autolink - 2'
    );
    t.deepEqual(
      tokenizer(text.autolink.areNotAutolinks[2]),
      {tokens: tokens.autolink.areNotAutolinks[2]},
      'should not be autolink - 3'
    );
    t.deepEqual(
      tokenizer(text.autolink.areNotAutolinks[3]),
      {tokens: tokens.autolink.areNotAutolinks[3]},
      'should not be autolink - 4'
    );
    t.deepEqual(
      tokenizer(text.autolink.areNotAutolinks[4]),
      {tokens: tokens.autolink.areNotAutolinks[4]},
      'should not be autolink - 5'
    );
    t.deepEqual(
      tokenizer(text.autolink.areNotAutolinks[5]),
      {tokens: tokens.autolink.areNotAutolinks[5]},
      'should not be autolink - 6'
    );
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

test.todo('link inline: link without text');

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

test.todo('link reference: link without text');

test('image: text should transform to tokens', t => {
  t.deepEqual(
    tokenizer(text.image.inline),
    {
      tokens: tokens.image.inline,
    },
    'inline'
  );
  t.deepEqual(
    tokenizer(text.image.optionalTitle),
    {
      tokens: tokens.image.optionalTitle,
    },
    'optional title'
  );
  t.deepEqual(
    tokenizer(text.image.reference),
    {
      tokens: tokens.image.reference,
      variables: variables.image.reference,
    },
    'reference'
  );
});

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
      tokenizer(text.horizontalRule),
      {tokens: tokens.horizontalRule}
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
    t.deepEqual(
      tokenizer(text.blockquote.everyLine),
      {tokens: tokens.blockquote.everyLine},
      'every line'
    );
    t.deepEqual(
      tokenizer(text.blockquote.firstLine),
      {tokens: tokens.blockquote.firstLine},
      'first line'
    );
    t.deepEqual(
      tokenizer(text.blockquote.nestedBlockquote),
      {tokens: tokens.blockquote.nestedBlockquote},
      'nested blockquote'
    );
    t.deepEqual(
      tokenizer(text.blockquote.containedOtherElements),
      {tokens: tokens.blockquote.containedOtherElements},
      'contained other elements'
    );
  }
);
