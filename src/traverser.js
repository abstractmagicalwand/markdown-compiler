function traverser(ast, visitor) { // eslint-disable-line
  const stack = [];
  const originType = ast.type;

  if (visitor[ast.type]) {
    visitor[ast.type].enter(ast, null);
  }

  stack.push({
    node: ast,
    i: 0,
    originType,
  });

  while (stack.length) {
    const item = stack[stack.length - 1];

    if (!item.node.body || item.node.body.length === item.i) {
      if (visitor[item.originType]) {
        visitor[item.originType].exit(
          item.node,
          stack[stack.length - 2] || null
        );
      }

      stack.pop();
      continue;
    }

    while (item.node.body && item.i < item.node.body.length) {
      const originType = item.node.body[item.i].type;

      if (visitor[item.node.body[item.i].type]) {
        visitor[item.node.body[item.i].type].enter(
          item.node.body[item.i],
          item.node
        );
      }

      stack.push({
        node: item.node.body[item.i],
        i: 0,
        originType,
      });
      item.i++;
      break;
    }
  }

  return ast;
}

module.exports = traverser;
