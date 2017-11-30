/* eslint complexity: 0 */
function parser(tokens) { // eslint-disable-line
  const ast = {
    type: 'Program',
    body: [],
    parent: null,
  };

  let current = 0;
  let node = ast;

  if (!Array.isArray(tokens)) {
    throw new TypeError('Tokens are not array.');
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
      const bof = {
        type: 'BOF',
        parent: ast,
      };

      node.body.push(bof);
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

      eof.parent = ast;
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
        parent: codeBlock,
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

    // code
    if (tokens[current].type === 'Code') {
      const {type, value, isClosed} = tokens[current];

      const code = {
        type,
        body: [],
        isClosed,
        parent: node,
      };

      const chars = {
        type: 'Chars',
        value,
        parent: code,
      };
      code.body.push(chars);

      node.body.push(code);
      current++;
      continue;
    }

    // link inline
    if (tokens[current].type === 'LeftSquareBracket') {
      const linkInline = {
        type: 'LinkInline',
        operators: ['['],
        href: null,
        title: null,
        body: [],
        isClosed: false,
        parent: node,
      };

      node.body.push(linkInline);
      node = linkInline;
      current++;
      continue;
    }

    if (tokens[current].type === 'RightSquareBracket') {
      const closedOperator = tokens[current].value;
      let n = node;

      while (!n || n.type !== 'LinkInline') {
        n = n.parent;
      }

      if (n.type === 'LinkInline') {
        let j = current + 1;

        if (tokens[j].type === 'Chars'
           && !tokens[j].value.trim().length) {
          j++;
        }

        if (tokens[j].type === 'LeftParenthesis') {
          const href = {
            operators: [tokens[j].value],
          };
          let title = null;
          j++;

          if (tokens[j].type === 'Chars') {
            let value = tokens[j].value.split(' ');

            if (value[0]) {
              href.value = value[0].trim();
            }

            if (value[1]) {
              title = {
                operator: value[1].trim().slice(0, 1),
                value: value[1].trim().slice(1, -1),
              };
            }

            j++;
          }

          if (tokens[j].type === 'RightParenthesis') {
            n.isClosed = true;
            n.operators.push(closedOperator);
            n.href = href;
            n.href.operators.push(tokens[j].value);
            n.title = title;
            node = node.parent;

            current += j - current + 1;
            continue;
          }
        }
      }
    }

    if (tokens[current].type === 'Chars'
      || tokens[current].type === 'RightSquareBracket'
      || tokens[current].type === 'LeftParenthesis'
      || tokens[current].type === 'LeftSquareBracket'
      || tokens[current].type === 'RightParenthesis') {

      const siblings = node.body;
      if (siblings[siblings.length - 1]
        && siblings[siblings.length - 1].type === 'Chars') {
        siblings[siblings.length - 1].value += tokens[current].value;
      } else {
        const chars = {
          type: 'Chars',
          value: tokens[current].value,
          parent: node,
        };

        node.body.push(chars);
      }

      current++;
      continue;
    }

    throw new Error(
      `Token is incorrect.\n${JSON.stringify(tokens[current], null, 4)}`
    );
  }

  return ast;
}

module.exports = parser;
