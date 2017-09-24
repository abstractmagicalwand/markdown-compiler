const {tokens, } = require('../__test__/fixtures');

function parser(tokens) { // eslint-disable-line
  const ast = {
    type: 'Program',
    body: [],
    parent: null,
  };

  let current = 0;
  let node = ast;

  if (!Array.isArray(tokens)) {
    throw new TypeError('Tokens aren\'t array.');
  }

  while (current < tokens.length) {
    if (tokens[current].type === 'BOF') {
      const paragraph = {
        type: 'Paragraph',
        body: [],
        closed: false,
        parent: node,
      };
      const bof = {
        type: 'BOF',
      };

      node.body.push(bof, paragraph);
      node = paragraph;
      current++;
      continue;
    }

    if (tokens[current].type === 'EOF') {
      let n = node;
      const eof = {
        type: 'EOF',
      };

      while (n) {
        if (n.type === 'Paragraph') {
          n.closed = true;
          break;
        }

        n = n.parent;
      }

      ast.body.push(eof);
      current++;
      continue;
    }

    if (tokens[current].type === 'NewLine') {
      let parent = node;

      while (parent && parent.type !== 'Paragraph') {
        parent = parent.parent;
      }

      if (parent && parent.type === 'Paragraph') {
        parent.closed = true;
        node = parent.parent;
      }

      const paragraph = {
        type: 'Paragraph',
        body: [],
        closed: false,
        parent: node,
      };

      node.body.push(paragraph);
      node = paragraph;
      current++;
      continue;
    }

    if (tokens[current].type === 'Chars') {
      const chars = {
        type: 'Chars',
        value: tokens[current].value,
      };

      node.body.push(chars);
      current++;
      continue;
    }

    if ((tokens[current].type === 'Asterisk'
      || tokens[current].type === 'Underscore')
      && tokens[current].amount === 2 ) {
      if (node.type === 'Bold'
        && node.operator === tokens[current].value.repeat(2)) {
        node.closed = true;
        node = node.parent;
      } else {
        const bold = {
          type: 'Bold',
          operator: tokens[current].value.repeat(2),
          body: [],
          closed: false,
          parent: node,
        };

        node.body.push(bold);
        node = bold;
      }

      current++;
      continue;
    }

    if ((tokens[current].type === 'Asterisk'
      || tokens[current].type === 'Underscore')
      && tokens[current].amount === 1) {
      if (node.type === 'Italic' && node.operator === tokens[current].value) {
        node.closed = true;
        node = node.parent;
      } else {
        const italic = {
          type: 'Italic',
          operator: tokens[current].value,
          body: [],
          closed: false,
          parent: node,
        };

        node.body.push(italic);
        node = italic;
      }

      current++;
      continue;
    }

    throw new Error('Token\'s incorrect');
  }

  return ast;
}

parser(tokens.emphasis);

module.exports = parser;
