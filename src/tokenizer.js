const patterns = require('./patterns');

/* eslint complexity: 0 */
function tokenizer(rawText) {
  if (typeof rawText !== 'string') {
    throw new TypeError(
      `rawText is ${typeof rawText}. It should be string.`
    );
  }

  const tokens = [];
  const { markdown, variables } = extractVariables(rawText);

  let i = 0;
  while (i < markdown.length) {
    // New line
    if (markdown[i] === '\n') {
      const start = i;
      const value = markdown[i];
      let amount = 0;

      for (; i < markdown.length && markdown[i] === '\n'; i++) {
        amount++;
      }

      tokens.push({
        type: 'NewLine',
        amount,
        value,
        start,
        end: i,
      });
      continue;
    }

    // Horizontal rule
    let isRule = false;
    if (markdown[i] === '-' || markdown[i] === '*') {
      if (tokens[tokens.length - 1] == null
        || tokens[tokens.length - 1].type === 'NewLine') {
        isRule = true;
      }

      if (tokens[tokens.length - 2]
        && tokens[tokens.length - 2].type === 'Chars') {
        isRule = false;
      }
    }

    if (isRule) {
      const start = i;
      let value = '';
      let amount = 0;

      let j = i;

      for (; j < markdown.length; j++) {
        if (markdown[j] !== ' ' && markdown[j] !== markdown[i]) {
          break;
        }

        if (markdown[j] === markdown[i]) {
          amount++;
        }

        value += markdown[j];
      }

      if (amount > 2 && markdown[j] === '\n' || j === markdown.length) {
        i = j;

        tokens.push({
          type: 'HorizontalRule',
          amount,
          value,
          start,
          end: i,
        });
        continue;
      }
    }

    // Signs and hyphens
    if (/[=-]/.test(markdown[i])
      && tokens[tokens.length - 1]
      && tokens[tokens.length - 1].type === 'NewLine') {
      const start = i;
      const type = markdown[i] === '-' ? 'Hyphens' : 'Signs';
      let value = '';
      let amount = 0;

      let j = i;

      for (; /[ -=]/.test(markdown[j]); j++) {
        amount++;
        value += markdown[j];
      }

      if (markdown[j] === '\n') {
        i = j;

        tokens.push({
          type,
          amount,
          value,
          start,
          end: i,
        });
        continue;
      }
    }

    // Greater
    if (markdown[i] === '>'
      && (tokens[tokens.length - 1] == null
      || tokens[tokens.length - 1].type === 'NewLine')) {
      let start = i;
      let depth = 0;

      while (markdown[i] === '>') {
        let value = markdown[i];
        let amountOfSpacesAfter = 0;

        let j = i + 1;

        for (; j < markdown.length && markdown[j] === ' '; j++) {
          amountOfSpacesAfter++;
          value += markdown[j];
        }

        if (amountOfSpacesAfter >= 1 || markdown[j] === '\n') {
          i = j;

          tokens.push({
            type: 'Greater',
            value,
            depth,
            start,
            end: i,
          });

          start = i;
          depth += 1;
          amountOfSpacesAfter = 0;
          continue;
        }

        break;
      }

      if (markdown[i] === '\n') {
        continue;
      }
    }

    if (/[-+*\s\d]/.test(markdown[i])
      && (tokens[tokens.length - 1] == null
      || tokens[tokens.length - 1].type === 'NewLine'
      || tokens[tokens.length - 1].type === 'Greater')) {
      let start = i;

      let j = i;

      let amountOfSpacesBefore = 0;
      for (; j < markdown.length && markdown[j] === ' '; j++) {
        amountOfSpacesBefore++;
      }
      let depth = Math.floor(amountOfSpacesBefore * 0.5);

      // Bullet
      while (/[*+-]/.test(markdown[j])) {
        const value = markdown[j];
        let amountOfSpacesAfter = 0;
        for (j++; j < markdown.length && markdown[j] === ' '; j++) {
          amountOfSpacesAfter++;
        }

        if (amountOfSpacesAfter !== 0) {
          i = j;

          tokens.push({
            type: 'Bullet',
            depth,
            value: ' '.repeat(amountOfSpacesBefore)
              + value
              + ' '.repeat(amountOfSpacesAfter),
            start,
            end: i,
          });
          depth += 1;
          start = i;
          continue;
        }

        break;
      }

      // Item
      while (/\d/.test(markdown[j])) {
        let number = '';
        for (; j < markdown.length && /\d/.test(markdown[j]); j++) {
          number += markdown[j];
        }

        if (markdown[j] === '.') {
          let value = markdown[j];

          for (j++; j < markdown.length && markdown[j] === ' '; j++) {
            value += markdown[j];
          }

          if (value.length) {
            i = j;

            tokens.push({
              type: 'Item',
              depth,
              value: ' '.repeat(amountOfSpacesBefore) + number + value,
              start,
              end: i,
            });

            start = i;
            amountOfSpacesBefore = 0;
            depth += 1;
            continue;
          }
        }

        break;
      }
    }

    // Hashes
    if (markdown[i] === '#'
      && (tokens[tokens.length - 1] == null
      || tokens[tokens.length - 1].type === 'NewLine'
      || tokens[tokens.length - 1].type === 'Greater')) {
      const start = i;
      let amount = 0;
      let value = '';

      let j = i;

      for (; markdown[j] === '#'; j++) {
        amount++;
        value += markdown[j];
      }

      if (amount <= 6) {
        i = j;

        for (; i < markdown.length && markdown[i] === ' '; i++) {
          value += markdown[i];
        }

        tokens.push({
          type: 'Hashes',
          value,
          amount,
          start,
          end: i,
        });
        continue;
      }
    }

    // Backslash
    if (markdown[i] === '\\' && markdown[i + 1] === '\n') {
      let start = i;
      tokens.push({
        type: 'Backslash',
        value: '\\',
        start,
        end: ++i,
      });

      start = i;

      let amount = 0;
      for (; i < markdown.length && markdown[i] === '\n'; i++) {
        amount++;
      }

      tokens.push({
        type: 'NewLine',
        amount,
        value: '\n',
        start,
        end: i,
      });


      let j = start = i;

      let value = '';
      for (; j < markdown.length && markdown[j] === ' '; j++) {
        value += markdown[j];
      }

      if (value.length) {
        i = j;

        tokens.push({
          type: 'Spaces',
          amount: value.length,
          value,
          start,
          end: i,
        });
      }

      continue;
    }

    //Code block
    if ((tokens[tokens.length - 1] == null
      || tokens[tokens.length - 1].type === 'NewLine'
      || tokens[tokens.length - 1].type === 'Greater')
      && markdown[i] === '`'
      && markdown[i + 1] === '`'
      && markdown[i + 2] === '`') {
      const start = i;
      i += 3;

      const currDepth = tokens[tokens.length - 1]
        && tokens[tokens.length - 1].type === 'Greater'
        ? tokens[tokens.length - 1].depth
        : -1;

      let value = '';
      let amountOfClosedBackticks = 0;
      let level = currDepth;
      for (; i < markdown.length && amountOfClosedBackticks < 3; i++) {
        if (markdown[i] === '`') {
          amountOfClosedBackticks++;
        } else if (markdown[i] === '>' && level === -1) {
          value += markdown[i];
        } else if (markdown[i] === '>' && markdown[i + 1] === ' ') {
          level--;
          i++;
        } else if (markdown[i] === '\n') {
          level = currDepth;
          value += '\n';
        } else {
          value += markdown[i];
        }
      }

      tokens.push({
        type: 'CodeBlock',
        value: value.replace(/^[\n\uFEFF\xA0]+|[\n\uFEFF\xA0]+$/g, ''),
        isClosed: amountOfClosedBackticks === 3,
        start,
        end: i,
      });
      continue;
    }

    // Space
    if (markdown[i] === ' ') {
      let start = i;

      let j = i;

      let amountOfSpacesBefore = 0;
      while (markdown[j] !== '\n' && markdown[j] === ' ') {
        amountOfSpacesBefore++;
        j++;
      }

      if (markdown[j] === '\n') {
        i = j;

        tokens.push({
          type: 'Spaces',
          amount: amountOfSpacesBefore,
          value: ' ',
          start,
          end: i,
        });

        start = i;
        i++;
        tokens.push({
          type: 'NewLine',
          amount: 1,
          value: '\n',
          start,
          end: i,
        });

        start = i;
        let amountOfSpacesAfter = 0;
        while (markdown[i] === ' ') {
          amountOfSpacesAfter++;
          i++;
        }
        if (amountOfSpacesAfter) {
          tokens.push({
            type: 'Spaces',
            amount: amountOfSpacesAfter,
            value: ' ',
            start,
            end: i,
          });
        }

        continue;
      }
    }

    // Autolink
    if (markdown[i] === '<') {
      const start = i;
      const operators = [ markdown[i] ];

      let j = i + 1;

      let value = '';
      let isClosed = false;
      for (; !/\s/.test(markdown[j]); j++) {
        if (markdown[j] === '>') {
          isClosed = true;
          operators.push(markdown[j]);
          break;
        }

        value += markdown[j];
      }

      if (isClosed && patterns.url.test(value)) {
        i = j + 1;

        tokens.push({
          type: 'Autolink',
          kind: 'url',
          operators,
          value,
          start,
          end: i,
        });
        continue;
      } else if (isClosed && patterns.email.test(value)) {
        i = j + 1;

        tokens.push({
          type: 'Autolink',
          kind: 'email',
          operators,
          value,
          start,
          end: i,
        });
        continue;
      }
    }

    // Square bracket
    if (markdown[i] === '[') {
      tokens.push({
        type: 'LeftSquareBracket',
        value: markdown[i],
        start: i,
        end: ++i,
      });
      continue;
    }

    if (markdown[i] === ']') {
      tokens.push({
        type: 'RightSquareBracket',
        value: markdown[i],
        start: i,
        end: ++i,
      });
      continue;
    }

    // Parenthesis
    if (markdown[i] === '(') {
      tokens.push({
        type: 'LeftParenthesis',
        value: markdown[i],
        start: i,
        end: ++i,
      });
      continue;
    }

    if (markdown[i] === ')') {
      tokens.push({
        type: 'RightParenthesis',
        value: markdown[i],
        start: i,
        end: ++i,
      });
      continue;
    }

    // Asterisk
    if (markdown[i] === '*') {
      const start = i;
      const value = markdown[i];

      let amount = 0;
      for (; markdown[i] === value; i++) {
        amount++;
      }

      tokens.push( {
        type: 'Asterisk',
        amount,
        value,
        start,
        end: i,
      });
      continue;
    }

    // Underscore
    if (markdown[i] === '_') {
      const start = i;
      const value = markdown[i];

      let amount = 0;
      for (; markdown[i] === value; i++) {
        amount++;
      }

      tokens.push( {
        type: 'Underscore',
        amount,
        value,
        start,
        end: i,
      });
      continue;
    }

    // Code
    if (markdown[i] === '`') {
      const start = i;

      let j = i;

      let amountOfOpenedBackticks = 0;
      for (; markdown[j] === '`'; j++) {
        amountOfOpenedBackticks++;
      }

      let value = '';
      let isClosed = false;
      while (j < markdown.length) {
        if (markdown[j] === '`') {
          let amountOfClosedBackticks = 0;
          for (; markdown[j] === '`'; j++) {
            amountOfClosedBackticks++;
          }

          if (amountOfClosedBackticks === amountOfOpenedBackticks) {
            isClosed = true;
            break;
          }

          value += '`'.repeat(amountOfClosedBackticks);
          continue;
        } else if (markdown[j] === '\n' && markdown[j + 1] === '\n') {
          break;
        } else if (markdown[j] === '\n' || markdown[j] === ' ') {
          while (j < markdown.length
            && (markdown[j] === '\n' || markdown[j] === ' ')){
            j++;
          }

          value += ' ';
          continue;
        } else {
          value += markdown[j];
        }

        j++;
      }

      if (isClosed) {
        i = j;

        tokens.push({
          type: 'Code',
          value: value.trim(),
          isClosed,
          start,
          end: i,
        });
        continue;
      }
    }

    // Opened image bracket
    if (markdown[i] === '!' && markdown[i + 1] === '[') {
      const start = i;
      i += 2;

      tokens.push({
        type: 'OpenedImageBracket',
        value: '![',
        start,
        end: i,
      });
      continue;
    }

    const start = i;
    if (markdown[i] === '\\' && patterns.punctuation.test(markdown[i + 1])) {
      i++;
    }

    // Chars
    if (tokens[tokens.length - 1]
      && tokens[tokens.length - 1].type === 'Chars') {
      tokens[tokens.length - 1].value += markdown[i];
      tokens[tokens.length - 1].end = start + 1;
    } else {
      tokens.push({
        type: 'Chars',
        value: markdown[i],
        start,
        end: i + 1,
      });
    }

    i++;
  }

  let results = { tokens };

  if (Object.keys(variables).length) {
    results.variables = variables;
  }

  return results;
}

function extractVariables(markdown) {
  const variables = {};

  const markdownByNewLine = markdown.split('\n');
  for (let i = 0; i < markdownByNewLine.length; i++) {
    if (/^ {0,3}\[.+\]:/.test(markdownByNewLine[i])) {
      let rawValue = markdownByNewLine[i].split(/:\s/);

      const id = rawValue[0].trim().slice(1, -1);

      if (!rawValue[1]) {
        continue;
      }

      variables[id] = rawValue[1];
      markdownByNewLine.splice(i, 1);

      if (markdownByNewLine[i] && /^\s+['"(]/.test(markdownByNewLine[i])) {
        variables[id] += `\n${markdownByNewLine[i]}`;
        markdownByNewLine.splice(i, 1);
      }

      i--;
    }
  }

  return {
    markdown: markdownByNewLine.join('\n'),
    variables,
  };
}

module.exports = tokenizer;
