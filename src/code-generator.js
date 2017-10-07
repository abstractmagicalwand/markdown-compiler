/* const {ast} = require('../__test__/fixtures'); // eslint-disable-line */

function codeGenerator(ast) { // eslint-disable-line
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
          html += '</p>\n';
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
        case 'ListItem':
          html += '<li>';
          break;
        case 'UnorderList':
          html += '<ul>';
          break;
        case 'OrderList':
          html += `<ol start="${node.start}">`;
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

/* codeGenerator(ast.unorderList); */

module.exports = codeGenerator;
