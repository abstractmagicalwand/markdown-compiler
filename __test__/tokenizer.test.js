import test from 'ava';

import tokenizer from '../src/tokenizer';
import {markdown, tokens, variables} from './fixtures';

// leaf blocks

test(
  'thematic breaks: markdown should transform to tokens',
  async t => {
    t.deepEqual(
      tokenizer(markdown.thematicBreaks),
      {tokens: tokens.thematicBreaks}
    );
  }
);

test(
  'atx headings: markdown should transform to tokens',
  async t => {
    t.deepEqual(tokenizer(markdown.atxHeadings), {tokens: tokens.atxHeadings});
  }
);

test(
  'setext headings: markdown should transform to tokens',
  async t => {
    t.deepEqual(tokenizer(markdown.setextHeadings), {tokens: tokens.setextHeadings});
  }
);

test(
  'code blocks: markdown should transform to tokens',
  async t => {
    t.deepEqual(
      tokenizer(markdown.codeBlocks.main),
      {tokens: tokens.codeBlocks.main},
      'main'
    );
    t.skip.deepEqual(
      tokenizer(markdown.codeBlocks.withBackslashEscape[0]),
      {tokens: tokens.codeBlocks.withBackslashEscape[0]},
      'with backslash escape 1'
    );
    t.skip.deepEqual(
      tokenizer(markdown.codeBlocks.withBackslashEscape[1]),
      {tokens: tokens.codeBlocks.withBackslashEscape[1]},
      'with backslash escape 2'
    );
  }
);

test(
  'paragraphs: markdown should transform to tokens',
  async t => {
    t.deepEqual(tokenizer(markdown.paragraphs), {tokens: tokens.paragraphs});
  }
);

// container blocks

test(
  'block quotes: markdown should transform to tokens',
  async t => {
    t.deepEqual(
      tokenizer(markdown.blockQuotes.everyLine),
      {tokens: tokens.blockQuotes.everyLine},
      'every line'
    );
    t.deepEqual(
      tokenizer(markdown.blockQuotes.firstLine),
      {tokens: tokens.blockQuotes.firstLine},
      'first line'
    );
    t.deepEqual(
      tokenizer(markdown.blockQuotes.nestedBlockquote),
      {tokens: tokens.blockQuotes.nestedBlockquote},
      'nested block quotes'
    );
    t.deepEqual(
      tokenizer(markdown.blockQuotes.containedOtherElements),
      {tokens: tokens.blockQuotes.containedOtherElements},
      'contained other elements'
    );
  }
);

test(
  'unorder lists: markdown should transform to tokens',
  async t => {
    t.deepEqual(tokenizer(markdown.unorderLists), {tokens: tokens.unorderLists});
  }
);

test(
  'order lists: markdown should transform to tokens',
  async t => {
    t.deepEqual(tokenizer(markdown.orderLists), {tokens: tokens.orderLists});
  }
);

// inlines

test(
  'backslash escapes: markdown should transform to tokens',
  async t => {
    t.deepEqual(
      tokenizer(markdown.backslashEscapes.punctuation),
      {tokens: tokens.backslashEscapes.punctuation},
      'punctuation'
    );
    t.deepEqual(
      tokenizer(markdown.backslashEscapes.likeLiteral),
      {tokens: tokens.backslashEscapes.likeLiteral},
      'like literal'
    );
    t.deepEqual(
      tokenizer(markdown.backslashEscapes.regularChars),
      {tokens: tokens.backslashEscapes.regularChars},
      'regular chars'
    );
    t.deepEqual(
      tokenizer(markdown.backslashEscapes.selfEscaped),
      {tokens: tokens.backslashEscapes.selfEscaped},
      'self escaped'
    );
    t.skip.deepEqual(
      tokenizer(markdown.backslashEscapes.hardLineBreak),
      {tokens: tokens.backslashEscapes.hardLineBreak},
      'hard line break'
    );
  }
);

test(
  'code spans: markdown should transform to tokens',
  async t => {
    t.deepEqual(tokenizer(markdown.codeSpans.$1), {tokens: tokens.codeSpans.$1}, '$1');
    t.deepEqual(tokenizer(markdown.codeSpans.$2), {tokens: tokens.codeSpans.$2}, '$2');
    t.deepEqual(tokenizer(markdown.codeSpans.$3), {tokens: tokens.codeSpans.$3}, '$3');
    t.deepEqual(tokenizer(markdown.codeSpans.$4), {tokens: tokens.codeSpans.$4}, '$4');
    t.deepEqual(tokenizer(markdown.codeSpans.$5), {tokens: tokens.codeSpans.$5}, '$5');
    t.deepEqual(tokenizer(markdown.codeSpans.$6), {tokens: tokens.codeSpans.$6}, '$6');
    t.deepEqual(
      tokenizer(markdown.codeSpans.withBackslashEscape),
      {tokens: tokens.codeSpans.withBackslashEscape},
      'with backslash escape'
    );
  }
);

test(
  'emphasis: markdown should transform to tokens',
  async t => {
    t.deepEqual(tokenizer(markdown.emphasis), {tokens: tokens.emphasis});
  }
);

test(
  'links inline: markdown should transform to tokens',
  async t => {
    t.deepEqual(
      tokenizer(markdown.linksInline.withTitle),
      {tokens: tokens.linksInline.withTitle},
      'with title'
    );
    t.deepEqual(
      tokenizer(markdown.linksInline.withoutTitle),
      {tokens: tokens.linksInline.withoutTitle},
      'without title'
    );
    t.deepEqual(
      tokenizer(markdown.linksInline.relativePath),
      {tokens: tokens.linksInline.relativePath},
      'relative path'
    );
    t.deepEqual(
      tokenizer(markdown.linksInline.withEmphasis),
      {tokens: tokens.linksInline.withEmphasis},
      'with emphasis'
    );
    t.deepEqual(
      tokenizer(markdown.linksInline.invalid),
      {tokens: tokens.linksInline.invalid},
      'invalid'
    );
    t.skip.deepEqual(
      tokenizer(markdown.linksInline.withBackslashEscape[0]),
      {tokens: tokens.linksInline.withBackslashEscape[0]},
      'with backslash escape 1'
    );
    t.deepEqual(
      tokenizer(markdown.linksInline.withBackslashEscape[1]),
      {tokens: tokens.linksInline.withBackslashEscape[1]},
      'with backslash escape 2'
    );
  }
);

test.todo('links inline: link without markdown');

test(
  'links reference: markdown should transform to tokens',
  async t => {
    t.deepEqual(
      tokenizer(markdown.linksReference.linkDefinitions),
      {
        tokens: tokens.linksReference.linkDefinitions,
        variables: variables.linksReference.linkDefinitions,
      },
      'link definitions'
    );
    t.deepEqual(
      tokenizer(markdown.linksReference.titleOnNextLine),
      {
        tokens: tokens.linksReference.titleOnNextLine,
        variables: variables.linksReference.titleOnNextLine,
      },
      'title on the next line'
    );
    t.deepEqual(
      tokenizer(markdown.linksReference.notCaseSensitive),
      {
        tokens: tokens.linksReference.notCaseSensitive,
        variables: variables.linksReference.notCaseSensitive,
      },
      'not case sensitive'
    );
    t.deepEqual(
      tokenizer(markdown.linksReference.implicitLinkName),
      {
        tokens: tokens.linksReference.implicitLinkName,
        variables: variables.linksReference.implicitLinkName,
      },
      'implicit link name'
    );
    t.deepEqual(
      tokenizer(markdown.linksReference.idents),
      {
        tokens: tokens.linksReference.idents,
        variables: variables.linksReference.idents,
      },
      'idents'
    );
    t.deepEqual(
      tokenizer(markdown.linksReference.invalid),
      {
        tokens: tokens.linksReference.invalid,
      },
      'invalid'
    );
    t.deepEqual(
      tokenizer(markdown.linksReference.withBackslashEscape),
      {
        tokens: tokens.linksReference.withBackslashEscape,
        variables: variables.linksReference.withBackslashEscape,
      },
      'with backslash escape'
    );
  }
);

test.todo('links reference: link without markdown');

test(
  'images: markdown should transform to tokens',
  async t => {
    t.deepEqual(
      tokenizer(markdown.images.inline),
      {
        tokens: tokens.images.inline,
      },
      'inline'
    );
    t.deepEqual(
      tokenizer(markdown.images.optionalTitle),
      {
        tokens: tokens.images.optionalTitle,
      },
      'optional title'
    );
    t.deepEqual(
      tokenizer(markdown.images.reference),
      {
        tokens: tokens.images.reference,
        variables: variables.images.reference,
      },
      'reference'
    );
  });

test(
  'autolinks: markdown should transform to tokens',
  async t => {
    t.deepEqual(
      tokenizer(markdown.autolinks.url.valid[0]),
      {tokens: tokens.autolinks.url.valid[0]},
      'valid url 1'
    );
    t.deepEqual(
      tokenizer(markdown.autolinks.url.valid[1]),
      {tokens: tokens.autolinks.url.valid[1]},
      'valid url 2'
    );
    t.deepEqual(
      tokenizer(markdown.autolinks.url.valid[2]),
      {tokens: tokens.autolinks.url.valid[2]},
      'valid url 3'
    );
    t.skip.deepEqual(
      tokenizer(markdown.autolinks.url.withBackslashEscape),
      {tokens: tokens.autolinks.url.withBackslashEscape},
      'url with backslash escape'
    );

    t.deepEqual(
      tokenizer(markdown.autolinks.email.valid[0]),
      {tokens: tokens.autolinks.email.valid[0]},
      'valid email 1'
    );
    t.deepEqual(
      tokenizer(markdown.autolinks.email.valid[1]),
      {tokens: tokens.autolinks.email.valid[1]},
      'valid email 2'
    );
    t.skip.deepEqual(
      tokenizer(markdown.autolinks.email.withBackslashEscape),
      {tokens: tokens.autolinks.email.withBackslashEscape},
      'email with backslash escape'
    );
    t.deepEqual(
      tokenizer(markdown.autolinks.areNotAutolinks[0]),
      {tokens: tokens.autolinks.areNotAutolinks[0]},
      'should not be autolinks - 1'
    );
    t.deepEqual(
      tokenizer(markdown.autolinks.areNotAutolinks[1]),
      {tokens: tokens.autolinks.areNotAutolinks[1]},
      'should not be autolinks - 2'
    );
    t.deepEqual(
      tokenizer(markdown.autolinks.areNotAutolinks[2]),
      {tokens: tokens.autolinks.areNotAutolinks[2]},
      'should not be autolinks - 3'
    );
    t.deepEqual(
      tokenizer(markdown.autolinks.areNotAutolinks[3]),
      {tokens: tokens.autolinks.areNotAutolinks[3]},
      'should not be autolinks - 4'
    );
    t.deepEqual(
      tokenizer(markdown.autolinks.areNotAutolinks[4]),
      {tokens: tokens.autolinks.areNotAutolinks[4]},
      'should not be autolinks - 5'
    );
    t.deepEqual(
      tokenizer(markdown.autolinks.areNotAutolinks[5]),
      {tokens: tokens.autolinks.areNotAutolinks[5]},
      'should not be autolinks - 6'
    );
  }
);

// other

test(
  'parser should throw exceptions',
  async t => {
    t.throws(
      () => tokenizer(1),
      TypeError,
      'rawText is number. It should be string.'
    );
  }
);

test(
  'parser should not throw any exceptions',
  async t => {
    t.notThrows(() => tokenizer(''), 'string is empty');
  }
);
