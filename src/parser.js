const he = require('he');
const encodeToHtmlEntities = (value) =>
  he.encode(value, { 'useNamedReferences': true });

/* eslint complexity: 0 */
function parser({ tokens, variables }) {
  if (!Array.isArray(tokens)) {
    throw new TypeError(
      `tokens are ${typeof tokens}. It should be array.`
    );
  }

  if (variables && variables.__proto__.constructor !== Object) {
    throw new TypeError(
      `variables are ${typeof variables}. It should be object.`
    );
  }

  const ast = {
    type: 'Program',
    body: [],
    parent: null,
  };

  let current = 0;
  let node = ast;
  while (current <= tokens.length) {
    // Finalize
    if (tokens[current] == null) {
      while (node) {
        if (node.type === 'Paragraph'
          || node.type === 'OrderList'
          || node.type === 'UnorderList'
          || node.type === 'ListItem'
          || node.type === 'Header') { //@TODO every type?
          node.isClosed = true;
        }

        node = node.parent;
      }

      current++;
      continue;
    }

    // Setext header
    let isSetextHeader = false;
    let j = current;

    while (j < tokens.length
      && (tokens[j].type === 'Chars'
        || tokens[j].type === 'NewLine'
        && tokens[j].amount === 1)) {
      j++;
    }

    if (tokens[j - 1] && tokens[j - 1].type === 'NewLine'
      && tokens[j] && (tokens[j].type === 'Signs' || tokens[j].type === 'Hyphens')
      && tokens[j + 1] && (tokens[j + 1].type === 'NewLine' || !tokens[j + 1])) {
      isSetextHeader = true;
    }

    if (isSetextHeader) {
      const level = tokens[j].type === 'Signs' ? 1 : 2;

      let charsValue = '';
      for (; current < tokens.length; current++) {
        if (tokens[current].type === 'Chars') {
          charsValue += tokens[current].value;
        } else if (tokens[current].type === 'NewLine') {
          charsValue += charsValue && ' ';
        } else {
          break;
        }
      }

      node.body.push({
        type: 'Header',
        value: tokens[current].value,
        level,
        body: [
          {
            type: 'Chars',
            value: charsValue.trim(),
          },
        ],
        isClosed: true,
      });
      current += 2;
      continue;
    }

    // Soft line break
    if ((tokens[current].type === 'Spaces'
        && tokens[current].amount === 1
        && tokens[current + 1]
        && tokens[current + 1].type === 'NewLine'
        && tokens[current + 1].amount === 1
        || tokens[current].type === 'NewLine'
        && tokens[current].amount === 1)
      && (node.type === 'Italic'
        || node.type === 'Bold'
        || node.type === 'Link'
        || node.type === 'Paragraph'
        || node.type === 'ListItem')) {
      node.body.push({
        type: 'SoftLineBreak',
        parent: node,
      });

      current += tokens[current].type === 'NewLine' ? 1 : 2;

      if (tokens[current] && tokens[current].type === 'Spaces') {
        current++;
      }

      continue;
    }

    if (tokens[current].type === 'NewLine'
      && tokens[current].amount === 1
      && node.type === 'Header') { //@TODO every type?
      node.isClosed = true;
      node = node.parent;

      current++;
      continue;
    }

    // Hard line break
    if (tokens[current].type === 'Spaces'
      && tokens[current].amount > 1
      && tokens[current + 1].type === 'NewLine'
      && (node.type === 'Italic'
        || node.type === 'Bold'
        || node.type === 'Link'
        || node.type === 'Paragraph'
        && current + 2 < tokens.length)) {
      node.body.push({
        type: 'HardLineBreak',
        operator: '  '
          + '\n',
        parent: node,
      });

      current += 2;

      while(tokens[current] && tokens[current].type === 'Spaces') {
        current++;
      }

      continue;
    }

    if (tokens[current].type === 'Backslash'
      && tokens[current + 1].type === 'NewLine'
      && (node.type === 'Italic'
        || node.type === 'Bold'
        || node.type === 'Link'
        || node.type === 'Paragraph'
        && current + 2 < tokens.length)) {
      node.body.push({
        type: 'HardLineBreak',
        operator: tokens[current].value
          + '\n',
        parent: node,
      });

      current += 2;

      while(tokens[current] && tokens[current].type === 'Spaces') {
        current++;
      }

      continue;
    }

    // Blockquote
    if (tokens[current].type === 'NewLine'
      && tokens[current].amount > 1
      && tokens[current + 1].type === 'Greater') {
      while (node.type !== 'Blockquote'
        && node.type !== 'Program'
        && node.depth !== tokens[current + 1].depth) {
        node.isClosed = true;
        node = node.parent;
      }
    }

    if (!tokens[current - 1]
        && tokens[current].type === 'Greater'
      || tokens[current - 1]
        && tokens[current - 1].type === 'NewLine'
        && tokens[current].type === 'Greater'
      || tokens[current].type === 'NewLine'
        && tokens[current + 1]
        && tokens[current + 1].type === 'Greater') {
      let n = node;

      while (tokens[current].type === 'Greater'
        || tokens[current].type === 'NewLine'
          && tokens[current + 1]
          && tokens[current + 1].type === 'Greater') {
        current += tokens[current].type === 'Greater' ? 0 : 1;
        const step = tokens[current].type === 'Greater' ? 1 : 2;

        while (n && n.type !== 'Blockquote') {
          n = n.parent;

          if (n && n.type === 'Blockquote' && n.depth > tokens[current].depth) {
            n = n.parent;
          }
        }

        if (tokens[current].type === 'Greater'
          && tokens[current + 1].type === 'NewLine'
          && tokens[current + 2].type === 'Greater'
          && tokens[current].depth === tokens[current + 2].depth
        ) {
          while (node !== n) {
            if (node.type === 'Paragraph'
              || node.type === 'OrderList'
              || node.type === 'UnorderList'
              || node.type === 'ListItem'
              || node.type === 'Header') { //@TODO every type?
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
        }

        current += step;
      }
    }

    // Unorder list
    if (tokens[current].type === 'Bullet'
      || tokens[current].type === 'NewLine'
      && tokens[current + 1]
      && tokens[current + 1].type === 'Bullet') { //@TODO handle tokens[current - 1].type === 'NewLine'
      current += tokens[current].type === 'Bullet' ? 0 : 1;
      const step = tokens[current].type === 'Bullet' ? 1 : 2;

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

          //Node.isClosed = true;
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
      current += step;
      continue;
    }

    // Order list
    if (tokens[current].type === 'Item'
      || tokens[current].type === 'NewLine'
      && tokens[current + 1]
      && tokens[current + 1].type === 'Item') { //@TODO handle tokens[current - 1].type === 'NewLine'
      current += tokens[current].type === 'Item' ? 0 : 1;
      const step = tokens[current].type === 'Item' ? 1 : 2;

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
            start: parseInt(tokens[current].value, 10),
            body: [],
            isClosed: false,
            parent: node,
            depth: tokens[current].depth,
          };

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
          start: parseInt(tokens[current].value, 10),
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
      current += step;
      continue;
    }

    // Atx header
    if (!tokens[current - 1] && tokens[current].type === 'Hashes'
      || tokens[current + 1] && tokens[current + 1].type === 'Hashes' && tokens[current].type === 'NewLine'
      || tokens[current - 1] && tokens[current - 1].type === 'NewLine' && tokens[current].type === 'Hashes'
      || node.type === 'Blockquote' && tokens[current - 1].type === 'Greater' && tokens[current].type === 'Hashes') { //@TODO add handling spaces
      current += tokens[current].type === 'Hashes' ? 0 : 1;

      const header = {
        type: 'Header',
        level: tokens[current].amount,
        value: tokens[current].value,
        body: [],
        isClosed: false,
      };

      header.parent = node;
      node.body.push(header);
      node = header;
      current++;
      continue;
    }

    // Horizontal rule
    if (!tokens[current - 1] && tokens[current].type === 'HorizontalRule'
      || tokens[current].type === 'NewLine' && tokens[current + 1] && tokens[current + 1].type === 'HorizontalRule'
      || tokens[current - 1] && tokens[current - 1].type === 'NewLine' && tokens[current].type === 'HorizontalRule') { //@TODO add handling spaces
      current += tokens[current].type === 'HorizontalRule' ? 1 : 2;
      const rule = {
        type: 'HorizontalRule',
      };

      rule.parent = node;
      node.body.push(rule);
      continue;
    }

    // Code block
    if (!tokens[current - 1] && tokens[current].type === 'CodeBlock'
      || tokens[current].type === 'NewLine' && tokens[current + 1] && tokens[current + 1].type === 'CodeBlock'
      || tokens[current - 1] && tokens[current].type === 'CodeBlock') {
      current += tokens[current].type === 'CodeBlock' ? 0 : 1;
      const codeBlock = {
        type: 'CodeBlock',
        body: [],
      };

      while (node.parent && node.type !== 'Blockquote') { // @TODO need to take out top
        node.isClosed = true;
        node = node.parent;
      }

      codeBlock.body.push({
        type: 'Chars',
        value: encodeToHtmlEntities(tokens[current].value),
        parent: codeBlock,
      });
      codeBlock.isClosed = tokens[current].isClosed;
      codeBlock.parent = node;

      node.body.push(codeBlock);
      current++;
      continue;
    }

    // Paragraph
    if (node.type === 'Blockquote' || node.type === 'Program') {
      const n = {
        type: 'Paragraph',
        body: [],
        isClosed: false,
        parent: node,
      };

      node.body.push(n);
      node = n;
      continue;
    }

    // Bold
    if ((tokens[current].type === 'Asterisk'
      || tokens[current].type === 'Underscore')
      && tokens[current].amount === 2
      && node.type === 'Bold') {
      node.isClosed = true;
      node = node.parent;

      current++;
      continue;
    }

    if ((tokens[current].type === 'Asterisk'
      || tokens[current].type === 'Underscore')
      && tokens[current].amount === 2) {
      const bold = {
        type: 'Bold',
        operator: tokens[current].value.repeat(2),
        body: [],
        isClosed: false,
        parent: node,
      };

      node.body.push(bold);
      node = bold;

      current++;
      continue;
    }

    // Italic
    if ((tokens[current].type === 'Asterisk'
      || tokens[current].type === 'Underscore')
      && tokens[current].amount === 1
      && node.type === 'Italic') {
      node.isClosed = true;
      node = node.parent;

      current++;
      continue;
    }

    if ((tokens[current].type === 'Asterisk'
      || tokens[current].type === 'Underscore')
      && tokens[current].amount === 1) {
      const italic = {
        type: 'Italic',
        operator: tokens[current].value,
        body: [],
        isClosed: false,
        parent: node,
      };

      node.body.push(italic);
      node = italic;
      current++;
      continue;
    }

    // Code
    if (tokens[current].type === 'Code') {
      const code = {
        type: tokens[current].type,
        body: [],
        isClosed: tokens[current].isClosed,
        parent: node,
      };
      const chars = {
        type: 'Chars',
        value: encodeToHtmlEntities(tokens[current].value),
        parent: code,
      };

      code.body.push(chars);
      node.body.push(code);
      current++;
      continue;
    }

    // Autolink
    if (tokens[current].type === 'Autolink') {
      const value = encodeToHtmlEntities(tokens[current].value);

      node.body.push({
        type: 'Link',
        operators: tokens[current].operators,
        label: null,
        href: {
          operators: null,
          value: tokens[current].kind === 'email' ? `mailto:${value}` : value,
        },
        title: null,
        body: [
          {
            type: 'Chars',
            value: value,
          },
        ],
        isClosed: true,
        parent: node,
      });
      current++;
      continue;
    }

    // Link
    if (tokens[current].type === 'LeftSquareBracket') {
      const link = {
        type: 'Link',
        operators: [ '[' ],
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

        if (tokens[j] && tokens[j].type === 'Chars'
          && !tokens[j].value.trim().length) {
          j++;
        }

        // Link inline
        if (tokens[j] && tokens[j].type === 'LeftParenthesis') {
          const closedOperator2 = tokens[j].value;
          j++;

          if (tokens[j] && tokens[j].type === 'Chars') {
            const { title, url } = extractTitleAndUrl(tokens[j].value);
            n.title = title;
            n.href = url;

            j++;
          }

          if (tokens[j] && tokens[j].type === 'RightParenthesis') {
            n.isClosed = true;
            n.operators.push(closedOperator, closedOperator2, tokens[j].value);
            node = node.parent;

            current += j - current + 1;
            continue;
          }
        } else if (tokens[j] && tokens[j].type === 'LeftSquareBracket'
            && variables) { // Link reference
          const closedOperator2 = tokens[j].value;
          j++;

          let label = '';
          if (tokens[j] && tokens[j].type === 'Chars') {
            label = tokens[j].value.toLowerCase().trim();
            j++;
          } else if (n.body[n.body.length - 1].type === 'Chars') {
            label = n.body[n.body.length - 1].value.toLowerCase().trim();
          }

          if (tokens[j] && tokens[j].type === 'RightSquareBracket'
            && variables[label]) {
            n.isClosed = true;
            n.label = label;
            n.operators.push(closedOperator, closedOperator2, tokens[j].value);

            const { title, url } = extractTitleAndUrl(variables[label]);
            n.title = title;
            n.href = url;

            node = node.parent;
            current += j - current + 1;
            continue;
          }
        }
      }
    }

    // Image
    if (tokens[current].type === 'OpenedImageBracket') {
      let j = current;
      const image = {
        type: 'Image',
        operators: [ '![' ],
        label: null,
        src: null,
        title: null,
        alt: null,
        parent: node,
      };
      j++;

      if (tokens[j] && tokens[j].type === 'Chars') {
        image.alt = tokens[j].value;
        j++;
      }

      if (tokens[j] && tokens[j].type === 'RightSquareBracket') {
        image.operators.push(tokens[j].value);
        j++;

        if (tokens[j] && tokens[j].type === 'Chars'
          && !tokens[j].value.trim().length) {
          j++;
        }

        if (tokens[j] && tokens[j].type === 'LeftParenthesis') {
          image.operators.push(tokens[j].value);
          j++;

          if (tokens[j] && tokens[j].type === 'Chars') {
            const { title, url } = extractTitleAndUrl(tokens[j].value);
            image.src = url;
            image.title = title;

            j++;
          }

          if (tokens[j] && tokens[j].type === 'RightParenthesis') {
            image.operators.push(tokens[j].value);
            node.body.push(image);

            current += j - current + 1;
            continue;
          }
        } else if (tokens[j] && tokens[j].type === 'LeftSquareBracket'
          && variables) { // Image reference
          image.operators.push(tokens[j].value);
          j++;


          if (tokens[j] && tokens[j].type === 'Chars') {
            image.label = tokens[j].value.toLowerCase().trim();
            j++;
          } else if (image.alt) {
            image.label = image.alt.toLowerCase().trim();
          }

          if (image.label
            && variables[image.label]
            && tokens[j] && tokens[j].type === 'RightSquareBracket') {
            image.operators.push(tokens[j].value);

            const { title, url } = extractTitleAndUrl(variables[image.label]);
            image.src = url;
            image.title = title;

            node.body.push(image);
            current += j - current + 1;
            continue;
          }
        }
      }
    }

    // New line
    if (tokens[current].type === 'NewLine') {
      if (node.type !== 'Program' && tokens[current].amount > 1) {
        let n = node;
        while (n.type !== 'Program') {
          n.isClosed = true;
          n = n.parent;
        }
        node = n;
      }


      if (tokens[current].amount > 1) {
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
      }

      current++;
      continue;
    }

    // Chars
    let value = encodeToHtmlEntities(tokens[current].value);

    if (tokens[current].type === 'Spaces') {
      value = tokens[current].value.repeat(tokens[current].amount);
    }

    const siblings = node.body;
    if (siblings[siblings.length - 1]
        && siblings[siblings.length - 1].type === 'Chars') {
      siblings[siblings.length - 1].value += value;
    } else {
      node.body.push( {
        type: 'Chars',
        value,
        parent: node,
      });
    }

    current++;
    continue;

    throw new Error(
      `Token is incorrect.\n${JSON.stringify(tokens[current], null, 4)}`
    );
  }

  return ast;
}

function extractTitleAndUrl(_markdown) {
  const markdown = _markdown.trim();
  const rawBorder = markdown.match(/\s+/i);
  const border = rawBorder && rawBorder.index ? rawBorder.index : -1;

  let rawUrl = null;
  let rawTitle = null;
  if (border === -1) {
    rawUrl = markdown;
  } else if (border > -1) {
    rawUrl = markdown.slice(0, border);
    rawTitle = markdown.slice(border).trim();
  }

  let url = null;
  if (rawUrl) {
    const urlOperator = rawUrl[0];
    url = urlOperator === '<' ? {
      operators: [ urlOperator, rawUrl[rawUrl.length - 1] ],
      value: encodeToHtmlEntities(rawUrl.slice(1, -1)),
    } : {
      operators: null,
      value: encodeToHtmlEntities(rawUrl),
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

  return { title, url };
}

module.exports = {
  parser,
  extractTitleAndUrl,
};
