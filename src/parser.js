/* const {tokens} = require('../__test__/fixtures'); // eslint-disable-line */

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
      /* const paragraph = {
        type: 'Paragraph',
        body: [],
        closed: false,
        parent: node,
      }; */
      const bof = {
        type: 'BOF',
      };

      node.body.push(bof/* , paragraph */);
      /* node = paragraph; */
      current++;
      continue;
    }

    if (tokens[current].type === 'EOF') {
      let n = node;
      const eof = {
        type: 'EOF',
      };

      while (n) {
        if (n.type === 'Paragraph' || n.type === 'UnorderList' || n.type === 'ListItem') {
          n.closed = true;
        }

        n = n.parent;
      }

      ast.body.push(eof);
      current++;
      continue;
    }

    if (tokens[current].type === 'NewLine') {
      let parent = node;

      while (parent
        && parent.type !== 'Paragraph'
        && parent.type !== 'UnorderList') {

        if (parent.type === 'ListItem') {
          parent.closed = true;
        }

        parent = parent.parent;
      }

      if (parent) {
        parent.closed = true;
        node = parent.parent;
      }

      current++;
      continue;
    }

    // unorder list
    if (tokens[current].type === 'Bullet') {
      const item = {
        type: 'ListItem',
        value: tokens[current].value,
        body: [],
        closed: false,
        depth: tokens[current].depth,
      };

      if (node.type === 'ListItem') {
        if (tokens[current].depth === node.depth) {
          node.closed = true;
          node = node.parent;
        } else if (tokens[current].depth > node.depth) {
          const unorderList = {
            type: 'UnorderList',
            body: [],
            closed: false,
            parent: node,
            depth: tokens[current].depth,
          };

          //node.closed = true;
          node.body.push(unorderList);
          node = unorderList;
        } else if (tokens[current].depth < node.depth) {
          while (node.depth !== tokens[current].depth) {
            node.closed = true;
            node = node.parent;
          }

          node.closed = true;
          node = node.parent;
        }
      } else {
        const unorderList = {
          type: 'UnorderList',
          body: [],
          closed: false,
          parent: node,
        };

        node.body.push(unorderList);
        node = unorderList;
      }

      item.parent = node;
      node.body.push(item);
      node = item;
      current++;
      continue;
    }

    if (node.type === 'Program' || tokens[current].type === 'NewLine') {
      const paragraph = {
        type: 'Paragraph',
        body: [],
        closed: false,
        parent: node,
      };

      node.body.push(paragraph);
      node = paragraph;
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

/* parser(tokens.paragraph); */

module.exports = parser;
