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
      if (item.node.closed) {
        switch (item.node.type) {
        case 'Paragraph':
          html += '</p>';
          break;
        case 'Chars':
          break;
        case 'Bold':
          html += '</strong>';
          break;
        case 'Italic':
          html += '</em>';
          break;
        default:
          break;
        }
      }

      stack.pop();
    }

    while (item.node.body.length > item.i) {
      const node = item.node.body[item.i];

      if (node.closed) {
        switch (node.type) {
        case 'Paragraph':
          html += '<p>';
          break;
        case 'Bold':
          html += '<strong>';
          break;
        case 'Italic':
          html += '<em>';
          break;
        default:
          break;
        }
      } else if (node.type === 'Chars') {
        html += node.value;

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
