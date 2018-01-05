const patterns = require('./patterns');
const markdown = require('../__test__/fixtures').markdown;

/* eslint complexity: 0 */
function tokenizer(rawText) {
  if (typeof rawText !== 'string') {
    throw new TypeError(
      `rawText is ${typeof rawText}. It should be string.`
    );
  }

  const tokens = [];
  const {markdown, variables} = extractVariables(rawText);

  let i = 0;
  while (i < markdown.length) {
    if (markdown[i] === '\n' || i === 0) {
      const value = markdown[i];
      let start = i;

      let amountOfNewLines = 0;
      for (; markdown[i] === '\n'; i++) {
        amountOfNewLines++;
      }

      let amountOfSpaces = 0;
      for (; markdown[i] === ' '; i++) {
        amountOfSpaces++;
      }

      // greater
      if (markdown[i] === '>') {
        let depth = 0;

        while (markdown[i] === '>') {
          let j = i;

          do {
            j++;
          } while (markdown[j] === ' ');

          if (markdown[j - 1] === ' ' || markdown[j] === '\n') {
            i = j;

            if (amountOfNewLines >= 2) {
              tokens.push({
                type: 'NewLine',
                amount: amountOfNewLines,
                value,
                start,
                end: start + amountOfNewLines,
              });

              start = start + amountOfNewLines;
            }

            tokens.push({
              type: 'Greater',
              depth,
              value: '>',
              start,
              end: i,
            });

            start = i;
            depth += 1;
            amountOfNewLines = 0;
            amountOfSpaces = 0;
            continue;
          }

          break;
        }

        if (markdown[i] === '\n') {
          continue;
        }
      }

      // hashes
      if (markdown[i] === '#') {
        let amountOfNewLines = 1;

        let j = i + 1;
        for (; markdown[j] === '#'; j++) {
          amountOfNewLines++;
        }

        if (amountOfNewLines <= 6) {
          i = j;

          while (markdown[i] === ' ') {
            i++;
          }

          tokens.push({
            type: 'Hashes',
            value: '#',
            amount: amountOfNewLines,
            start,
            end: i,
          });
          continue;
        }
      }

      // signs and hyphens
      if (tokens[tokens.length - 1]
        && tokens[tokens.length - 1].type === 'Chars'
        && (markdown[i] === '=' || markdown[i] === '-')) {
        const value = markdown[i];
        let amount = 0;

        let j = i;
        for (; markdown[j] === value; j++) {
          amount++;
        }

        if (markdown[j] === '\n') {
          i = j + 1;

          tokens.push({
            type: value === '-' ? 'Hyphens' : 'Signs',
            amount,
            value,
            start,
            end: i,
          });
          continue;
        }
      }

      //code block
      if (markdown[i] === '`' && markdown[i + 1] === '`' && markdown[i + 2] === '`') {
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
          end: ++i,
        });
        continue;
      }

      // horizontal rule
      if ((tokens[tokens.length - 1] == null
        || tokens[tokens.length - 1].type !== 'Chars')
        && (markdown[i] === '-' || markdown[i] === '*')) {
        const value = markdown[i];

        let j = i;
        while (markdown[j] === value || markdown[j] === ' ') {
          j++;
        }

        if (markdown[j] === '\n' || j === markdown.length) {
          i = j;

          tokens.push({
            type: 'HorizontalRule',
            value,
            start,
            end: i,
          });
          continue;
        }
      }

      // bullet
      if (markdown[i] === '*' || markdown[i] === '+' || markdown[i] === '-') {
        let depth = Math.floor(amountOfSpaces * 0.5);

        while (markdown[i] === '*' || markdown[i] === '+' || markdown[i] === '-') {
          const value = markdown[i];

          let j = i + 1;
          while (markdown[j] === ' ') {
            j++;
          }

          if (markdown[j - 1] === ' ') {
            i = j;

            tokens.push({
              type: 'Bullet',
              depth,
              value,
              start,
              end: i,
            });

            start = i;
            amountOfSpaces = 0;
            amountOfNewLines = 0;
            depth += 1;
            continue;
          }

          break;
        }
      }

      // item
      if (/\d/.test(markdown[i])) {
        let depth = Math.floor(amountOfSpaces * 0.5);

        while (/\d/.test(markdown[i])) {
          let value = '';
          let j = i;
          while (/\d/.test(markdown[j])) {
            value += markdown[j];
            j++;
          }

          if (markdown[j] === '.') {
            do {
              j++;
            } while (markdown[j] === ' ');

            if (markdown[j - 1] === ' ') {
              i = j;

              tokens.push({
                type: 'Item',
                depth,
                value,
                start,
                end: i,
              });

              start = i;
              amountOfSpaces = 0;
              amountOfNewLines = 0;
              depth += 1;
              continue;
            }
          }

          break;
        }
      }

      // new line and chars
      if (value === '\n') {
        if (amountOfNewLines > 1 && value === '\n') {
          tokens.push({
            type: 'NewLine',
            amount: amountOfNewLines,
            value,
            start,
            end: i,
          });
        } else if (tokens[tokens.length - 1]
          && tokens[tokens.length - 1].type === 'Chars') {
          amountOfSpaces += amountOfNewLines;

          tokens[tokens.length - 1].end += amountOfSpaces;
          tokens[tokens.length - 1].value += ' '.repeat(amountOfSpaces);
        } else {
          amountOfSpaces += amountOfNewLines;

          tokens.push({
            type: 'Chars',
            value: ' '.repeat(amountOfSpaces),
            start,
            end: i + amountOfSpaces,
          });
        }

        continue;
      }
    }

    // autolink
    if (markdown[i] === '<') {
      const start = i;
      const operators = [markdown[i]];
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

    // square bracket
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

    // parenthesis
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

    // asterisk
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

    // underscore
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

    // code
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

    // opened image bracket
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

    // chars
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

  let results = {tokens};

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
    markdown: markdownByNewLine.join('\n').trim(),
    variables,
  };
}

tokenizer(markdown.linksInline.withBackslashEscape[1]);

module.exports = tokenizer;
