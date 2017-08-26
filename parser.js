const {tokens: {emphasis, }, } = require('./fixtures');

function parser(tokens) { // eslint-disable-line
  const ast = {
    type: 'Program',
    body: [],
    parent: null,
  };

  let current = 0; // eslint-disable-line
  let node = ast; // eslint-disable-line

  while (current < tokens.length) {
    // paragraph
    if (!tokens[current - 1]) {
      const paragraph = {
        type: 'Paragraph',
        body: [],
        closed: false,
        parent: node,
      };

      node.body.push(paragraph);
      node = paragraph;
    }

    if (current + 1 === tokens.length) {
      let n = node; // eslint-disable-line

      while (n === null || n.type !== 'Paragraph') {
        n = n.parent;
      }

      if (n) {
        n.closed = true;
      }
    }
    // ---
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
  }

  return ast;
}

parser(emphasis);
module.exports = parser;
