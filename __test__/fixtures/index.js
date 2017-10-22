const blockquote = require('./blockquote');
const emphasis = require('./emphasis');
const paragraph = require('./paragraph');
const unorderList = require('./unorder-list');
const orderList = require('./order-list');
const traverser = require('./traverser');
const setextHeader = require('./setext-header');
const atxHeader = require('./atx-header');
const horizontalRules = require('./horizontal-rules');

module.exports = {
  text: {
    blockquote: blockquote.text,
    emphasis: emphasis.text,
    paragraph: paragraph.text,
    unorderList: unorderList.text,
    orderList: orderList.text,
    setextHeader: setextHeader.text,
    atxHeader: atxHeader.text,
    horizontalRules: horizontalRules.text,
  },
  tokens: {
    blockquote: blockquote.tokens,
    emphasis: emphasis.tokens,
    paragraph: paragraph.tokens,
    unorderList: unorderList.tokens,
    orderList: orderList.tokens,
    setextHeader: setextHeader.tokens,
    atxHeader: atxHeader.tokens,
    horizontalRules: horizontalRules.tokens,
  },
  ast: {
    blockquote: blockquote.ast,
    emphasis: emphasis.ast,
    paragraph: paragraph.ast,
    unorderList: unorderList.ast,
    orderList: orderList.ast,
    setextHeader: setextHeader.ast,
    atxHeader: atxHeader.ast,
    horizontalRules: horizontalRules.ast,
  },
  html: {
    blockquote: blockquote.html,
    emphasis: emphasis.html,
    paragraph: paragraph.html,
    unorderList: unorderList.html,
    orderList: orderList.html,
    setextHeader: setextHeader.html,
    atxHeader: atxHeader.html,
    horizontalRules: horizontalRules.html,
  },
  traverser,
};
