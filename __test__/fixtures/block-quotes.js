const strip = require('../helpers/strip');

const markdown = {
  everyLine: strip(`
    > This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
    > consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
    > Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
    >
    > Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
    > id sem consectetuer libero luctus adipiscing.
  `),
  firstLine: strip(`
    > This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
    consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
    Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.

    > Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
    id sem consectetuer libero luctus adipiscing.
  `),
  nestedBlockquote: strip(`
    > This is the first level of quoting.
    >
    > > This is nested blockquote.
    >
    > Back to the first level.
  `),
  containedOtherElements: strip(`
    > ## This is a header.
    >
    > 1.   This is the first list item.
    > 2.   This is the second list item.
    >
    > Here's some *example code*:
    > \`\`\`
    >     return shell_exec("echo $input | $markdown_script");
    > \`\`\`
  `),
};

const html = {
  everyLine: strip(`
      <blockquote><p>This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus. Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.</p>
      <p>Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse id sem consectetuer libero luctus adipiscing.</p>
      </blockquote>
    `),
  nestedBlockquote: strip(`
      <blockquote><p>This is the first level of quoting.</p>
      <blockquote><p>This is nested blockquote.</p>
      </blockquote><p>Back to the first level.</p>
      </blockquote>
    `),
  containedOtherElements: strip(`
    <blockquote><h2>This is a header.</h2>
    <ol start="1"><li>This is the first list item.</li><li>This is the second list item.</li></ol><p>Here&apos;s some <em>example code</em>:</p>
    <pre><code>
        return shell_exec(&quot;echo $input | $markdown_script&quot;);
    </code></pre>
    </blockquote>
    `),
};

html.firstLine = html.everyLine;

const tokens = {
  everyLine: [
    {
      type: 'Greater',
      depth: 0,
      value: '> ',
      start: 0,
      end: 2,
    },
    {
      type: 'Chars',
      value: 'This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,',
      start: 2,
      end: 71,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 71,
      end: 72,
    },
    {
      type: 'Greater',
      depth: 0,
      value: '> ',
      start: 72,
      end: 74,
    },
    {
      type: 'Chars',
      value: 'consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.',
      start: 74,
      end: 140,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 140,
      end: 141,
    },
    {
      type: 'Greater',
      depth: 0,
      value: '> ',
      start: 141,
      end: 143,
    },
    {
      type: 'Chars',
      value: 'Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.',
      start: 143,
      end: 213,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 213,
      end: 214,
    },
    {
      type: 'Greater',
      depth: 0,
      value: '>',
      start: 214,
      end: 215,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 215,
      end: 216,
    },
    {
      type: 'Greater',
      depth: 0,
      value: '> ',
      start: 216,
      end: 218,
    },
    {
      type: 'Chars',
      value: 'Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse',
      start: 218,
      end: 287,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 287,
      end: 288,
    },
    {
      type: 'Greater',
      depth: 0,
      value: '> ',
      start: 288,
      end: 290,
    },
    {
      type: 'Chars',
      value: 'id sem consectetuer libero luctus adipiscing.',
      start: 290,
      end: 335,
    },
  ],
  firstLine: [
    {
      type: 'Greater',
      depth: 0,
      value: '> ',
      start: 0,
      end: 2,
    },
    {
      type: 'Chars',
      value: 'This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,',
      start: 2,
      end: 71,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 71,
      end: 72,
    },
    {
      type: 'Chars',
      value: 'consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.',
      start: 72,
      end: 138,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 138,
      end: 139,
    },
    {
      type: 'Chars',
      value: 'Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.',
      start: 139,
      end: 209,
    },
    {
      type: 'NewLine',
      amount: 2,
      value: '\n',
      start: 209,
      end: 211,
    },
    {
      type: 'Greater',
      depth: 0,
      value: '> ',
      start: 211,
      end: 213,
    },
    {
      type: 'Chars',
      value: 'Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse',
      start: 213,
      end: 282,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 282,
      end: 283,
    },
    {
      type: 'Chars',
      value: 'id sem consectetuer libero luctus adipiscing.',
      start: 283,
      end: 328,
    },
  ],
  nestedBlockquote: [
    {
      type: 'Greater',
      depth: 0,
      value: '> ',
      start: 0,
      end: 2,
    },
    {
      type: 'Chars',
      value: 'This is the first level of quoting.',
      start: 2,
      end: 37,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 37,
      end: 38,
    },
    {
      type: 'Greater',
      depth: 0,
      value: '>',
      start: 38,
      end: 39,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 39,
      end: 40,
    },
    {
      type: 'Greater',
      depth: 0,
      value: '> ',
      start: 40,
      end: 42,
    },
    {
      type: 'Greater',
      depth: 1,
      value: '> ',
      start: 42,
      end: 44,
    },
    {
      type: 'Chars',
      value: 'This is nested blockquote.',
      start: 44,
      end: 70,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 70,
      end: 71,
    },
    {
      type: 'Greater',
      depth: 0,
      value: '>',
      start: 71,
      end: 72,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 72,
      end: 73,
    },
    {
      type: 'Greater',
      depth: 0,
      value: '> ',
      start: 73,
      end: 75,
    },
    {
      type: 'Chars',
      value: 'Back to the first level.',
      start: 75,
      end: 99,
    },
  ],
  containedOtherElements: [
    {
      type: 'Greater',
      depth: 0,
      value: '> ',
      start: 0,
      end: 2,
    },
    {
      type: 'Hashes',
      amount: 2,
      value: '## ',
      start: 2,
      end: 5,
    },
    {
      type: 'Chars',
      value: 'This is a header.',
      start: 5,
      end: 22,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 22,
      end: 23,
    },
    {
      type: 'Greater',
      depth: 0,
      value: '>',
      start: 23,
      end: 24,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 24,
      end: 25,
    },
    {
      type: 'Greater',
      depth: 0,
      value: '> ',
      start: 25,
      end: 27,
    },
    {
      type: 'Item',
      depth: 0,
      value: '1.   ',
      start: 27,
      end: 32,
    },
    {
      type: 'Chars',
      value: 'This is the first list item.',
      start: 32,
      end: 60,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 60,
      end: 61,
    },
    {
      type: 'Greater',
      depth: 0,
      value: '> ',
      start: 61,
      end: 63,
    },
    {
      type: 'Item',
      depth: 0,
      value: '2.   ',
      start: 63,
      end: 68,
    },
    {
      type: 'Chars',
      value: 'This is the second list item.',
      start: 68,
      end: 97,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 97,
      end: 98,
    },
    {
      type: 'Greater',
      depth: 0,
      value: '>',
      start: 98,
      end: 99,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 99,
      end: 100,
    },
    {
      type: 'Greater',
      depth: 0,
      value: '> ',
      start: 100,
      end: 102,
    },
    {
      type: 'Chars',
      value: 'Here\'s some ',
      start: 102,
      end: 114,
    },
    {
      type: 'Asterisk',
      amount: 1,
      value: '*',
      start: 114,
      end: 115,
    },
    {
      type: 'Chars',
      value: 'example code',
      start: 115,
      end: 127,
    },
    {
      type: 'Asterisk',
      amount: 1,
      value: '*',
      start: 127,
      end: 128,
    },
    {
      type: 'Chars',
      value: ':',
      start: 128,
      end: 129,
    },
    {
      type: 'NewLine',
      amount: 1,
      value: '\n',
      start: 129,
      end: 130,
    },
    {
      type: 'Greater',
      depth: 0,
      value: '> ',
      start: 130,
      end: 132,
    },
    {
      type: 'CodeBlock',
      value: '    return shell_exec("echo $input | $markdown_script");',
      isClosed: true,
      start: 132,
      end: 200,
    },
  ],
};

const ast = {};

ast.everyLine = {
  type: 'Program',
  body: [
    {
      type: 'Blockquote',
      operator: '> ',
      depth: 0,
      body: [
        {
          type: 'Paragraph',
          body: [
            {
              type: 'Chars',
              value: 'This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,',
            },
            {
              type: 'SoftLineBreak',
            },
            {
              type: 'Chars',
              value: 'consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.',
            },
            {
              type: 'SoftLineBreak',
            },
            {
              type: 'Chars',
              value: 'Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.',
            },
            {
              type: 'SoftLineBreak',
            },
          ],
          isClosed: true,
        },
        {
          type: 'Paragraph',
          body: [
            {
              type: 'Chars',
              value: 'Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse',
            },
            {
              type: 'SoftLineBreak',
            },
            {
              type: 'Chars',
              value: 'id sem consectetuer libero luctus adipiscing.',
            },
          ],
          isClosed: true,
        },
      ],
    },
  ],
  parent: null,
};

ast.everyLine.body[0].parent = ast.everyLine;

ast.everyLine.body[0].body[0].parent = ast.everyLine.body[0];
ast.everyLine.body[0].body[1].parent = ast.everyLine.body[0];

ast.everyLine.body[0].body[0].body[0].parent = ast.everyLine.body[0].body[0];
ast.everyLine.body[0].body[0].body[1].parent = ast.everyLine.body[0].body[0];
ast.everyLine.body[0].body[0].body[2].parent = ast.everyLine.body[0].body[0];
ast.everyLine.body[0].body[0].body[3].parent = ast.everyLine.body[0].body[0];
ast.everyLine.body[0].body[0].body[4].parent = ast.everyLine.body[0].body[0];
ast.everyLine.body[0].body[0].body[5].parent = ast.everyLine.body[0].body[0];

ast.everyLine.body[0].body[1].body[0].parent = ast.everyLine.body[0].body[1];
ast.everyLine.body[0].body[1].body[1].parent = ast.everyLine.body[0].body[1];
ast.everyLine.body[0].body[1].body[2].parent = ast.everyLine.body[0].body[1];

ast.firstLine = {
  type: 'Program',
  body: [
    {
      type: 'Blockquote',
      operator: '> ',
      depth: 0,
      body: [
        {
          type: 'Paragraph',
          body: [
            {
              type: 'Chars',
              value: 'This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,',
            },
            {
              type: 'SoftLineBreak',
            },
            {
              type: 'Chars',
              value: 'consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.',
            },
            {
              type: 'SoftLineBreak',
            },
            {
              type: 'Chars',
              value: 'Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.',
            },
          ],
          isClosed: true,
        },
        {
          type: 'Paragraph',
          body: [
            {
              type: 'Chars',
              value: 'Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse',
            },
            {
              type: 'SoftLineBreak',
            },
            {
              type: 'Chars',
              value: 'id sem consectetuer libero luctus adipiscing.',
            },
          ],
          isClosed: true,
        },
      ],
    },
  ],
  parent: null,
};

ast.firstLine.body[0].parent = ast.firstLine;

ast.firstLine.body[0].body[0].parent = ast.firstLine.body[0];
ast.firstLine.body[0].body[1].parent = ast.firstLine.body[0];

ast.firstLine.body[0].body[0].body[0].parent = ast.firstLine.body[0].body[0];
ast.firstLine.body[0].body[0].body[1].parent = ast.firstLine.body[0].body[0];
ast.firstLine.body[0].body[0].body[2].parent = ast.firstLine.body[0].body[0];
ast.firstLine.body[0].body[0].body[3].parent = ast.firstLine.body[0].body[0];
ast.firstLine.body[0].body[0].body[4].parent = ast.firstLine.body[0].body[0];

ast.firstLine.body[0].body[1].body[0].parent = ast.firstLine.body[0].body[1];
ast.firstLine.body[0].body[1].body[1].parent = ast.firstLine.body[0].body[1];
ast.firstLine.body[0].body[1].body[2].parent = ast.firstLine.body[0].body[1];

ast.nestedBlockquote = {
  type: 'Program',
  body: [
    {
      type: 'Blockquote',
      operator: '> ',
      depth: 0,
      body: [
        {
          type: 'Paragraph',
          body: [
            {
              type: 'Chars',
              value: 'This is the first level of quoting.',
            },
            {
              type: 'SoftLineBreak',
            },
          ],
          isClosed: true,
        },
        {
          type: 'Blockquote',
          operator: '> ',
          depth: 1,
          body: [
            {
              type: 'Paragraph',
              body: [
                {
                  type: 'Chars',
                  value: 'This is nested blockquote.',
                },
                {
                  type: 'SoftLineBreak',
                },
              ],
              isClosed: true,
            },
          ],
        },
        {
          type: 'Paragraph',
          body: [
            {
              type: 'Chars',
              value: 'Back to the first level.',
            },
          ],
          isClosed: true,
        },
      ],
    },
  ],
  parent: null,
};

ast.nestedBlockquote.body[0].parent = ast.nestedBlockquote;

ast.nestedBlockquote.body[0].body[0].parent = ast.nestedBlockquote.body[0];
ast.nestedBlockquote.body[0].body[1].parent = ast.nestedBlockquote.body[0];
ast.nestedBlockquote.body[0].body[2].parent = ast.nestedBlockquote.body[0];

ast.nestedBlockquote.body[0].body[0].body[0].parent = ast.nestedBlockquote.body[0].body[0];
ast.nestedBlockquote.body[0].body[0].body[1].parent = ast.nestedBlockquote.body[0].body[0];

ast.nestedBlockquote.body[0].body[1].body[0].parent = ast.nestedBlockquote.body[0].body[1];

ast.nestedBlockquote.body[0].body[1].body[0].body[0].parent = ast.nestedBlockquote.body[0].body[1].body[0];
ast.nestedBlockquote.body[0].body[1].body[0].body[1].parent = ast.nestedBlockquote.body[0].body[1].body[0];

ast.nestedBlockquote.body[0].body[2].body[0].parent = ast.nestedBlockquote.body[0].body[2];

ast.containedOtherElements = {
  type: 'Program',
  body: [
    {
      type: 'Blockquote',
      operator: '> ',
      depth: 0,
      body: [
        {
          type: 'Header',
          level: 2,
          value: '## ',
          body: [
            {
              type: 'Chars',
              value: 'This is a header.',
            },
          ],
          isClosed: true,
        },
        {
          type: 'OrderList',
          start: 1,
          styleType: '1',
          depth: 0,
          body: [
            {
              type: 'ListItem',
              value: '1.   ',
              depth: 0,
              body: [
                {
                  type: 'Chars',
                  value: 'This is the first list item.',
                },
                {
                  type: 'SoftLineBreak',
                },
              ],
              isClosed: true,
            },
            {
              type: 'ListItem',
              value: '2.   ',
              depth: 0,
              body: [
                {
                  type: 'Chars',
                  value: 'This is the second list item.',
                },
                {
                  type: 'SoftLineBreak',
                },
              ],
              isClosed: true,
            },
          ],
          isClosed: true,
        },
        {
          type: 'Paragraph',
          body: [
            {
              type: 'Chars',
              value: 'Here&apos;s some ',
            },
            {
              type: 'Italic',
              operator: '*',
              body: [
                {
                  type: 'Chars',
                  value: 'example code',
                },
              ],
              isClosed: true,
            },
            {
              type: 'Chars',
              value: ':',
            },
            {
              type: 'SoftLineBreak',
            },
          ],
          isClosed: true,
        },
        {
          type: 'CodeBlock',
          body: [
            {
              type: 'Chars',
              value: '    return shell_exec(&quot;echo $input | $markdown_script&quot;);',
            },
          ],
          isClosed: true,
        },
      ],
    },
  ],
  parent: null,
};

ast.containedOtherElements.body[0].parent = ast.containedOtherElements;

ast.containedOtherElements.body[0].body[0].parent = ast.containedOtherElements.body[0];
ast.containedOtherElements.body[0].body[1].parent = ast.containedOtherElements.body[0];
ast.containedOtherElements.body[0].body[2].parent = ast.containedOtherElements.body[0];
ast.containedOtherElements.body[0].body[3].parent = ast.containedOtherElements.body[0];

ast.containedOtherElements.body[0].body[0].body[0].parent = ast.containedOtherElements.body[0].body[0];

ast.containedOtherElements.body[0].body[1].body[0].parent = ast.containedOtherElements.body[0].body[1];
ast.containedOtherElements.body[0].body[1].body[1].parent = ast.containedOtherElements.body[0].body[1];

ast.containedOtherElements.body[0].body[1].body[0].body[0].parent = ast.containedOtherElements.body[0].body[1].body[0];
ast.containedOtherElements.body[0].body[1].body[0].body[1].parent = ast.containedOtherElements.body[0].body[1].body[0];
ast.containedOtherElements.body[0].body[1].body[1].body[0].parent = ast.containedOtherElements.body[0].body[1].body[1];
ast.containedOtherElements.body[0].body[1].body[1].body[1].parent = ast.containedOtherElements.body[0].body[1].body[1];

ast.containedOtherElements.body[0].body[2].body[0].parent = ast.containedOtherElements.body[0].body[2];
ast.containedOtherElements.body[0].body[2].body[1].parent = ast.containedOtherElements.body[0].body[2];
ast.containedOtherElements.body[0].body[2].body[2].parent = ast.containedOtherElements.body[0].body[2];
ast.containedOtherElements.body[0].body[2].body[3].parent = ast.containedOtherElements.body[0].body[2];

ast.containedOtherElements.body[0].body[2].body[1].body[0].parent = ast.containedOtherElements.body[0].body[2].body[1];

ast.containedOtherElements.body[0].body[3].body[0].parent = ast.containedOtherElements.body[0].body[3];

module.exports = {
  markdown,
  tokens,
  ast,
  html,
};
