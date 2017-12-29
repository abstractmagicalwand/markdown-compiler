/* eslint complexity: 0 */
function parser({tokens, variables}) { // eslint-disable-line
  if (!Array.isArray(tokens)) {
    throw new TypeError('tokens is not array');
  }

  if (variables && variables.__proto__.constructor !== Object) {
    throw new TypeError('variables is not object');
  }

  const ast = {
    type: 'Program',
    body: [],
    parent: null,
  };

  let current = 0;
  let node = ast;
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

    // blockquote
    if (tokens[current].type === 'Greater') {
      let n = node;

      while (tokens[current].type === 'Greater') {
        while (n && n.type !== 'Blockquote') {
          n = n.parent;

          if (n && n.type === 'Blockquote' && n.depth > tokens[current].depth) {
            n = n.parent;
          }
        }

        if (tokens[current + 1].type === 'Greater'
          && tokens[current].depth === tokens[current + 1].depth) {
          while (node !== n) {
            if (node.type === 'Paragraph'
              || node.type === 'OrderList'
              || node.type === 'UnorderList'
              || node.type === 'ListItem'
              || node.type === 'Header') {
              node.isClosed = true;
            }

            node = node.parent;
          }
        }

        if (n === null || n.depth < tokens[current].depth) {
          const blockquote = {
            type: 'Blockquote',
            depth: tokens[current].depth,
            operator: tokens[current].value,
            body: [],
            parent: node,
          };

          node.body.push(blockquote);
          node = blockquote;
        } else if (tokens[current - 1].type === 'Chars'
          && tokens[current + 1].type === 'Chars') {
          node.body[node.body.length - 1].value += ' ';
        }

        current++;
      }
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

      while (node.parent && node.type !== 'Blockquote') {
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
    if (node.type === 'Blockquote'
      || node.type === 'Program'
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

    // link
    if (tokens[current].type === 'LeftSquareBracket') {
      const link = {
        type: 'Link',
        operators: ['['],
        label: null,
        href: null,
        title: null,
        body: [],
        isClosed: false,
        parent: node,
      };

      node.body.push(link);
      node = link;
      current++;
      continue;
    }

    if (tokens[current].type === 'RightSquareBracket') {
      const closedOperator = tokens[current].value;
      let n = node;

      while (n && n.type !== 'Link') {
        n = n.parent;
      }

      if (n && n.type === 'Link') {
        let j = current + 1;

        if (tokens[j].type === 'Chars' && !tokens[j].value.trim().length) {
          j++;
        }

        // link inline
        if (tokens[j].type === 'LeftParenthesis') {
          const closedOperator2 = tokens[j].value;
          j++;

          if (tokens[j].type === 'Chars') {
            const {title, url} = extractTitleAndUrl(tokens[j].value);
            n.title = title;
            n.href = url;

            j++;
          }

          if (tokens[j].type === 'RightParenthesis') {
            n.isClosed = true;
            n.operators.push(closedOperator, closedOperator2, tokens[j].value);
            node = node.parent;

            current += j - current + 1;
            continue;
          }
        } else if (variables && tokens[j].type === 'LeftSquareBracket') { // link reference
          const closedOperator2 = tokens[j].value;
          j++;

          let label = '';
          if (tokens[j].type === 'Chars') {
            label = tokens[j].value.toLowerCase().trim();
            j++;
          } else if (n.body[n.body.length - 1].type === 'Chars') {
            label = n.body[n.body.length - 1].value.toLowerCase().trim();
          }

          if (variables[label] && tokens[j].type === 'RightSquareBracket') {
            n.isClosed = true;
            n.label = label;
            n.operators.push(closedOperator, closedOperator2, tokens[j].value);

            const {title, url} = extractTitleAndUrl(variables[label]);
            n.title = title;
            n.href = url;

            node = node.parent;
            current += j - current + 1;
            continue;
          }
        }
      }
    }

    if (tokens[current].type === 'OpenedImageBracket') {
      let j = current;
      const image = {
        type: 'Image',
        operators: ['!['],
        label: null,
        src: null,
        title: null,
        alt: null,
        parent: node,
      };
      j++;

      if (tokens[j].type === 'Chars') {
        image.alt = tokens[j].value;
        j++;
      }

      if (tokens[j].type === 'RightSquareBracket') {
        image.operators.push(tokens[j].value);
        j++;

        if (tokens[j].type === 'Chars' && !tokens[j].value.trim().length) {
          j++;
        }

        if (tokens[j].type === 'LeftParenthesis') {
          image.operators.push(tokens[j].value);
          j++;

          if (tokens[j].type === 'Chars') {
            const {title, url} = extractTitleAndUrl(tokens[j].value);
            image.src = url;
            image.title = title;

            j++;
          }

          if (tokens[j].type === 'RightParenthesis') {
            image.operators.push(tokens[j].value);
            node.body.push(image);

            current += j - current + 1;
            continue;
          }
        } else if (variables && tokens[j].type === 'LeftSquareBracket') { // image reference
          image.operators.push(tokens[j].value);
          j++;


          if (tokens[j].type === 'Chars') {
            image.label = tokens[j].value.toLowerCase().trim();
            j++;
          } else if (image.alt) {
            image.label = image.alt.toLowerCase().trim();
          }

          if (image.label
            && variables[image.label]
            && tokens[j].type === 'RightSquareBracket') {
            image.operators.push(tokens[j].value);

            const {title, url} = extractTitleAndUrl(variables[image.label]);
            image.src = url;
            image.title = title;

            node.body.push(image);
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
      || tokens[current].type === 'RightParenthesis'
      || tokens[current].type === 'OpenedImageBracket') {

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

function extractTitleAndUrl(rawText) {
  const text = rawText.trim();
  const rawBorder = text.match(/\s+/i);
  const border = rawBorder && rawBorder.index ? rawBorder.index : -1;

  let rawUrl = null;
  let rawTitle = null;
  if (border === -1) {
    rawUrl = text;
  } else if (border > -1) {
    rawUrl = text.slice(0, border);
    rawTitle = text.slice(border).trim();
  }

  let url = null;
  if (rawUrl) {
    const urlOperator = rawUrl[0];
    url = urlOperator === '<' ? {
      operators: [urlOperator, rawUrl[rawUrl.length - 1]],
      value: rawUrl.slice(1, -1),
    } : {
      operators: null,
      value: rawUrl,
    };
  }

  let title = null;
  if (rawTitle) {
    title = {
      operators: [],
      value: rawTitle.slice(1, -1),
    };

    const titleOperator = rawTitle[0];
    if (titleOperator === '\'') {
      title.operators.push(titleOperator);
    } else if (titleOperator === '"') {
      title.operators.push(titleOperator);
    } else if (titleOperator === '(') {
      title.operators.push(
        titleOperator,
        rawTitle[rawTitle.length - 1]
      );
    }

    if (!title.operators.length) {
      title = null;
    }
  }

  return {title, url};
}

module.exports = {
  parser,
  extractTitleAndUrl,
};
