/* eslint complexity: 0 */
function codeGenerator(ast) {
  let html = '';
  let stack = [];

  stack.push({
    node: ast,
    i: 0,
  });

  while (stack.length) {
    const item = stack[stack.length - 1];

    if (!item.node.body || item.node.body.length === item.i) {
      if (item.node.isClosed) {
        switch (item.node.type) {
        case 'Paragraph':
          html += '</p>\n';
          break;
        case 'Header':
          html += `</h${item.node.amount}>\n`;
          break;
        case 'ListItem':
          html += '</li>';
          break;
        case 'UnorderList':
          html += '</ul>';
          break;
        case 'OrderList':
          html += '</ol>';
          break;
        case 'CodeBlock':
          html += '\n</code></pre>\n';
          break;
        case 'Chars':
          break;
        case 'Bold':
          html += '</strong>';
          break;
        case 'Italic':
          html += '</em>';
          break;
        case 'Code':
          html += '</code>';
          break;
        default:
          break;
        }
      }

      stack.pop();
    }

    while (item.node.body.length > item.i) {
      const node = item.node.body[item.i];

      if (node.isClosed) {
        switch (node.type) {
        case 'Paragraph':
          html += '<p>';
          break;
        case 'Header':
          html += `<h${node.amount}>`;
          break;
        case 'ListItem':
          html += '<li>';
          break;
        case 'UnorderList':
          html += '<ul>';
          break;
        case 'OrderList':
          html += `<ol start="${node.start}">`;
          break;
        case 'CodeBlock':
          html += '<pre><code>\n';
          break;
        case 'Bold':
          html += '<strong>';
          break;
        case 'Italic':
          html += '<em>';
          break;
        case 'Code':
          html += '<code>';
          break;
        default:
          break;
        }
      } else if (node.type === 'Chars') {
        html += node.value;

        item.i++;
        continue;
      } else if (node.type === 'HorizontalRule') {
        html += '<hr>\n';

        item.i++;
        continue;
      } else if (node.type === 'BOF') {
        item.i++;
        continue;
      } else if (node.type === 'EOF') {
        html = html.trim();

        item.i++;
        continue;
      } else {
        html += node.operator;
      }

      stack.push({
        node: node,
        i: 0,
      });
      item.i++;
      break;
    }
  }

  return html;
}

module.exports = codeGenerator;
