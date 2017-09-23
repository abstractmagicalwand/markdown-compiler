const blockquote = require('./blockquote');
const emphasis = require('./emphasis');
const paragraph = require('./paragraph');
const unorderList = require('./unorder-list');
const orderList = require('./order-list');
const traverser = require('./traverser');

module.exports = {
  text: {
    blockquote: blockquote.text,
    emphasis: emphasis.text,
    paragraph: paragraph.text,
    unorderList: unorderList.text,
    orderList: orderList.text,
  },
  tokens: {
    blockquote: blockquote.tokens,
    emphasis: emphasis.tokens,
    paragraph: paragraph.tokens,
    unorderList: unorderList.tokens,
    orderList: orderList.tokens,
  },
  ast: {
    blockquote: blockquote.ast,
    emphasis: emphasis.ast,
    paragraph: paragraph.ast,
    unorderList: unorderList.ast,
    orderList: orderList.ast,
  },
  html: {
    blockquote: blockquote.html,
    emphasis: emphasis.html,
    paragraph: paragraph.html,
    unorderList: unorderList.html,
    orderList: orderList.html,
  },
  traverser,
};
