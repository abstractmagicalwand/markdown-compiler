const flow = require('lodash/flow');
const stripIndent = require('strip-indent');

module.exports = flow(
  str => str
    .replace(/^\n+/i, '')
    .replace(/\s+$/i, ''),
  stripIndent
);
