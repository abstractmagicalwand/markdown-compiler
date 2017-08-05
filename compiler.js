/* eslint
  comma-dangle: 0,
  no-param-reassign: 0
  complexity: 0
*/

const {nodes} = require('./constants')

const italic = s => `<em>${s}</em>`
const bold = s => `<strong>${s}</strong>`

function compiler(node, html = '') {
  if (node.type === nodes.CHARS) {
    html += node.value
  } else if (node.body && node.closed) {
    const wrapper = node.type === nodes.ITALIC ? italic : bold

    html = html + wrapper(
      node.body.reduce((acc, childNode) => compiler(childNode, acc), '')
    )
  } else if (node.body) {
    html = html + (node.operator || '') + node.body.reduce(
      (acc, childNode) => compiler(childNode, acc),
      ''
    )
  }

  return html
}

module.exports = compiler
