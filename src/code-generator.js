/* eslint complexity: "off" */
function codeGenerator(ast, options) {
  if (ast && ast.__proto__.constructor !== Object) {
    throw TypeError(`ast is ${typeof rawText}. It should be object.`);
  }
  let html = '';
  let stack = [];

  stack.push({
    node: ast,
    i: 0,
  });

  while (stack.length) {
    const item = stack[stack.length - 1];
    const { node } = item;
    const { type, body, isClosed } = node;

    if (!body || body.length === item.i) {
      if (isClosed) {
        if (type === 'Paragraph') {
          html += '</p>\n';
        } else if (type === 'Header') {
          html += `</h${node.level}>\n`;
        } else if (type === 'ListItem') {
          html += '</li>';
        } else if (type === 'UnorderList') {
          html += '</ul>';
        } else if (type === 'OrderList') {
          html += '</ol>';
        } else if (type === 'CodeBlock') {
          html += '\n</code></pre>\n';
        } else if (type === 'Bold') {
          html += '</strong>';
        } else if (type === 'Italic') {
          html += '</em>';
        } else if (type === 'Code') {
          html += '</code>';
        } else if (type === 'Link') {
          html += '</a>';
        }
      } else {
        if (type === 'Blockquote') {
          html += '</blockquote>';
        }
      }

      stack.pop();
    }

    while (item.node.body && item.node.body.length > item.i) {
      const node = item.node.body[item.i];
      const { type, isClosed } = node;

      if (isClosed) {
        if (type === 'Paragraph') {
          html += '<p>';
        } else if (type === 'Header') {
          html += `<h${node.level}>`;
        } else if (type === 'ListItem') {
          html += '<li>';
        } else if (type === 'UnorderList') {
          html += '<ul>';
        } else if (type === 'OrderList') {
          const start = ` start="${node.start}"`;

          html += `<ol${start}>`;
        } else if (type === 'CodeBlock') {
          html += '<pre><code>\n';
        } else if (type === 'Bold') {
          html += '<strong>';
        } else if (type === 'Italic') {
          html += '<em>';
        } else if (type === 'Code') {
          html += '<code>';
        } else if (type === 'Link') {
          const href = node.href ? ` href="${node.href.value}"` : '';
          const title = node.title ? ` title="${node.title.value}"` : '';

          html += `<a${href}${title}>`;
        }
      } else {
        if (type === 'Blockquote') {
          html += '<blockquote>';
        } else if (type === 'Header') {
          const { amount } = node;

          html += node.operator.repeat(amount);
        } else if (type === 'Link') {
          for (let i = 0; i < node.operators.length; i++) {
            html += node.operators;
          }
        } else if (node.type === 'Image') {
          const src = node.src ? ` src="${node.src.value}"` : '';
          const alt = node.alt ? ` alt="${node.alt}"` : '';
          const title = node.title ? ` title="${node.title.value}"` : '';

          html += `<img${src}${alt}${title}>`;
          item.i++;
          continue;
        } else if (type === 'Chars') {
          html += node.value;
          item.i++;
          continue;
        } else if (type === 'HorizontalRule') {
          html += '<hr>\n';
          item.i++;
          continue;
        } else if (type === 'SoftLineBreak') {
          let isDroped = item.node.body.length - 1 === item.i;

          for (let j = item.i; j < item.node.body.length; j++) {
            if (item.node.body[j].type === 'UnorderList'
                || item.node.body[j].type === 'OrderList') {
              isDroped = true;
              break;
            }
          }

          if (isDroped) {
            html += '';
          } else if (options['soft-line-break'] === 'spaces') {
            html += ' ';
          } else if (options['soft-line-break'] === 'line-break') {
            html += '\n';
          } else if (options['soft-line-break'] === 'hard-line-break') {
            html += '<br />\n';
          }

          item.i++;
          continue;
        } else if (type === 'HardLineBreak') {
          html += '<br />\n';
          item.i++;
          continue;
        } else {
          html += node.operator;
        }
      }

      stack.push({
        node: node,
        i: 0,
      });
      item.i++;
      break;
    }
  }

  return html.trim();
}

module.exports = codeGenerator;
