const {tokens} = require('../__test__/fixtures'); // eslint-disable-line

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
    if (tokens[current].type === 'NewLine') {
      let parent = node;

      while (parent
        && parent.type !== 'Paragraph'
        && parent.type !== 'UnorderList'
        && parent.type !== 'OrderList'
        && parent.type !== 'Hashes') {

        if (parent.type === 'ListItem') {
          parent.isClosed = true;
        }

        parent = parent.parent;
      }

      if (parent) {
        parent.isClosed = true;
        node = parent.parent;
      }

      current++;
      continue;
    }

    //bof
    if (tokens[current].type === 'BOF') {
      /* const paragraph = {
        type: 'Paragraph',
        body: [],
        isClosed: false,
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

    // eof
    if (tokens[current].type === 'EOF') {
      let n = node;
      const eof = {
        type: 'EOF',
      };

      while (n) {
        if (n.type === 'Paragraph'
          || n.type === 'OrderList'
          || n.type === 'UnorderList'
          || n.type === 'ListItem'
          || n.type === 'Header') {
          n.isClosed = true;
        }

        n = n.parent;
      }

      ast.body.push(eof);
      current++;
      continue;
    }

    // unorder list
    if (tokens[current].type === 'Bullet') {
      const item = {
        type: 'ListItem',
        value: tokens[current].value,
        body: [],
        isClosed: false,
        depth: tokens[current].depth,
      };

      if (node.type === 'ListItem') {
        if (tokens[current].depth === node.depth) {
          node.isClosed = true;
          node = node.parent;
        } else if (tokens[current].depth > node.depth) {
          const unorderList = {
            type: 'UnorderList',
            body: [],
            isClosed: false,
            parent: node,
            depth: tokens[current].depth,
          };

          //node.isClosed = true;
          node.body.push(unorderList);
          node = unorderList;
        } else if (tokens[current].depth < node.depth) {
          while (node.depth !== tokens[current].depth) {
            node.isClosed = true;
            node = node.parent;
          }

          node.isClosed = true;
          node = node.parent;
        }
      } else {
        const unorderList = {
          type: 'UnorderList',
          body: [],
          isClosed: false,
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

    // order list
    if (tokens[current].type === 'Item') {
      const item = {
        type: 'ListItem',
        value: tokens[current].value,
        body: [],
        isClosed: false,
        depth: tokens[current].depth,
      };

      if (node.type === 'ListItem') {
        if (tokens[current].depth === node.depth) {
          node.isClosed = true;
          node = node.parent;
        } else if (tokens[current].depth > node.depth) {
          const orderList = {
            type: 'OrderList',
            styleType: '1',
            start: tokens[current].value,
            body: [],
            isClosed: false,
            parent: node,
            depth: tokens[current].depth,
          };

          //node.isClosed = true;
          node.body.push(orderList);
          node = orderList;
        } else if (tokens[current].depth < node.depth) {
          while (node.depth !== tokens[current].depth) {
            node.isClosed = true;
            node = node.parent;
          }

          node.isClosed = true;
          node = node.parent;
        }
      } else {
        const orderList = {
          type: 'OrderList',
          styleType: '1',
          start: tokens[current].value,
          body: [],
          isClosed: false,
          parent: node,
          depth: tokens[current].depth,
        };

        node.body.push(orderList);
        node = orderList;
      }

      item.parent = node;
      node.body.push(item);
      node = item;
      current++;
      continue;
    }

    // atx header
    if (tokens[current].type === 'Hashes') {
      const header = {
        type: 'Header',
        amount: tokens[current].amount,
        value: '#',
        body: [],
        isClosed: false,
      };

      if (node.type === 'Header') {
        node.isClosed = true;
        node = node.parent;
      }

      header.parent = node;
      node.body.push(header);
      node = header;
      current++;
      continue;
    }

    // setext header
    if (node.type === 'Paragraph'
      && !node.isClosed
      && (tokens[current].type === 'Signs'
      || tokens[current].type === 'Hyphens')) {
      const header = {
        type: 'Header',
        amount: tokens[current].type === 'Signs' ? 1 : 2,
        value: tokens[current].value,
        body: [],
        isClosed: true,
      };

      header.body.push(node.body.pop());
      if (!node.body.length) {
        for (let j = 0; j < node.parent.body.length; j++) {
          if (node.parent.body[j] !== node) {
            continue;
          }

          node.parent.body.splice(j, 1);
          break;
        }
      }

      while (node.parent) {
        node.isClosed = true;
        node = node.parent;
      }

      header.parent = node;
      node.body.push(header);
      current++;
      continue;
    }

    // horizontal rule
    if (tokens[current].type === 'HorizontalRule') {
      const rule = {
        type: 'HorizontalRule',
      };

      while (node.parent) {
        node.isClosed = true;
        node = node.parent;
      }

      rule.parent = node;
      node.body.push(rule);
      current++;
      continue;
    }

    // code block
    if (tokens[current].type === 'CodeBlock') {
      const codeBlock = {
        type: 'CodeBlock',
        body: [],
      };

      while (node.parent) {
        node.isClosed = true;
        node = node.parent;
      }

      codeBlock.body.push({
        type: 'Chars',
        value: tokens[current].value, // @TODO take out to tokenizer
      });
      codeBlock.isClosed = tokens[current].isClosed;
      codeBlock.parent = node;

      node.body.push(codeBlock);
      current++;
      continue;
    }

    // paragraph
    if (node.type === 'Program'
      || tokens[current].type === 'NewLine'
      || tokens[current].type === 'Chars'
      && tokens[current - 1].type === 'BOF') {
      const paragraph = {
        type: 'Paragraph',
        body: [],
        isClosed: false,
        parent: node,
      };

      node.body.push(paragraph);
      node = paragraph;
    }

    // chars
    if (tokens[current].type === 'Chars') {
      const chars = {
        type: 'Chars',
        value: tokens[current].value,
      };

      node.body.push(chars);
      current++;
      continue;
    }

    // bold
    if ((tokens[current].type === 'Asterisk'
      || tokens[current].type === 'Underscore')
      && tokens[current].amount === 2 ) {
      if (node.type === 'Bold'
        && node.operator === tokens[current].value.repeat(2)) {
        node.isClosed = true;
        node = node.parent;
      } else {
        const bold = {
          type: 'Bold',
          operator: tokens[current].value.repeat(2),
          body: [],
          isClosed: false,
          parent: node,
        };

        node.body.push(bold);
        node = bold;
      }

      current++;
      continue;
    }

    // italic
    if ((tokens[current].type === 'Asterisk'
      || tokens[current].type === 'Underscore')
      && tokens[current].amount === 1) {
      if (node.type === 'Italic' && node.operator === tokens[current].value) {
        node.isClosed = true;
        node = node.parent;
      } else {
        const italic = {
          type: 'Italic',
          operator: tokens[current].value,
          body: [],
          isClosed: false,
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

parser(tokens.codeBlock);

module.exports = parser;
