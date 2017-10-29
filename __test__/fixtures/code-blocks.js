const strip = require('../helpers/strip');

const text = strip(`
    This is a normal paragraph:

    \`\`\`
    This is a code block.
    \`\`\`

    \`\`\`
    <div class="footer">
      &copy; 2004 Foo Corporation
    </div>
    \`\`\`
  `);

const html = strip(`
    <p>This is a normal paragraph:</p>
    <pre><code>
    This is a code block.
    </code></pre>
    <pre><code>
    &lt;div class="footer"&gt;
      &amp;copy; 2004 Foo Corporation
    &lt;/div&gt;
    </code></pre>
  `);

module.exports = {
  text,
  tokens: [
    {
      type: 'BOF',
    },
    {
      type: 'Chars',
      value: 'This is a normal paragraph:',
      start: 0,
      end: 27,
    },
    {
      type: 'CodeBlock',
      value: 'This is a code block.',
      isClosed: true,
      start: 27,
      end: 59,
    },
    {
      type: 'CodeBlock',
      value: strip(`
          &lt;div class="footer"&gt;
            &amp;copy; 2004 Foo Corporation
          &lt;/div&gt;
        `),
      isClosed: true,
      start: 59,
      end: 126,
    },
    {
      type: 'EOF',
    },
  ],
  ast:  {
    type: 'Program',
    body: [
      {
        type: 'BOF',
      },
      {
        type: 'Paragraph',
        body: [
          {
            type: 'Chars',
            value: 'This is a normal paragraph:',
          },
        ],
        isClosed: true,
      },
      {
        type: 'CodeBlock',
        body: [
          {
            type: 'Chars',
            value: 'This is a code block.',
          },
        ],
        isClosed: true,
      },
      {
        type: 'CodeBlock',
        body: [
          {
            type: 'Chars',
            value: strip(`
                &lt;div class="footer"&gt;
                  &amp;copy; 2004 Foo Corporation
                &lt;/div&gt;
              `),
          },
        ],
        isClosed: true,
      },
      {
        type: 'EOF',
      },
    ],
    parent: null,
  },
  html,
};
