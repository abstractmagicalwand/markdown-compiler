const thematicBreaks = require('./thematic-breaks');
const atxHeadings = require('./atx-headings');
const setextHeadings = require('./setext-headings');
const codeBlocks = require('./code-blocks');
const paragraphs = require('./paragraphs');

const blockQuotes = require('./block-quotes');
const unorderLists = require('./lists-unorder');
const orderLists = require('./lists-order');

const backslashEscapes = require('./backslash-escapes');
const codeSpans = require('./code-spans');
const emphasis = require('./emphasis');
const linksInline = require('./links-inline');
const linksReference = require('./links-reference');
const images = require('./images');
const autolinks = require('./autolinks');

const traverser = require('./traverser');

module.exports = {
  text: {
    thematicBreaks: thematicBreaks.text,
    atxHeadings: atxHeadings.text,
    setextHeadings: setextHeadings.text,
    codeBlocks: codeBlocks.text,
    paragraphs: paragraphs.text,
    blockQuotes: blockQuotes.text,
    unorderLists: unorderLists.text,
    orderLists: orderLists.text,
    backslashEscapes: backslashEscapes.text,
    codeSpans: codeSpans.text,
    emphasis: emphasis.text,
    linksInline: linksInline.text,
    linksReference: linksReference.text,
    images: images.text,
    autolinks: autolinks.text,
  },
  tokens: {
    thematicBreaks: thematicBreaks.tokens,
    atxHeadings: atxHeadings.tokens,
    setextHeadings: setextHeadings.tokens,
    codeBlocks: codeBlocks.tokens,
    paragraphs: paragraphs.tokens,
    blockQuotes: blockQuotes.tokens,
    unorderLists: unorderLists.tokens,
    orderLists: orderLists.tokens,
    backslashEscapes: backslashEscapes.tokens,
    codeSpans: codeSpans.tokens,
    emphasis: emphasis.tokens,
    linksInline: linksInline.tokens,
    linksReference: linksReference.tokens,
    images: images.tokens,
    autolinks: autolinks.tokens,
  },
  variables: {
    images: images.variables,
    linksReference: linksReference.variables,
  },
  ast: {
    thematicBreaks: thematicBreaks.ast,
    atxHeadings: atxHeadings.ast,
    setextHeadings: setextHeadings.ast,
    codeBlocks: codeBlocks.ast,
    paragraphs: paragraphs.ast,
    blockQuotes: blockQuotes.ast,
    unorderLists: unorderLists.ast,
    orderLists: orderLists.ast,
    backslashEscapes: backslashEscapes.ast,
    codeSpans: codeSpans.ast,
    emphasis: emphasis.ast,
    linksInline: linksInline.ast,
    linksReference: linksReference.ast,
    images: images.ast,
    autolinks: autolinks.ast,
  },
  html: {
    thematicBreaks: thematicBreaks.html,
    atxHeadings: atxHeadings.html,
    setextHeadings: setextHeadings.html,
    codeBlocks: codeBlocks.html,
    paragraphs: paragraphs.html,
    blockQuotes: blockQuotes.html,
    unorderLists: unorderLists.html,
    orderLists: orderLists.html,
    backslashEscapes: backslashEscapes.html,
    codeSpans: codeSpans.html,
    emphasis: emphasis.html,
    linksInline: linksInline.html,
    linksReference: linksReference.html,
    images: images.html,
    autolinks: autolinks.html,
  },
  traverser,
};
