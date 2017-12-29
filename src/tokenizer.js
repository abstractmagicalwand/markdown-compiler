/* eslint complexity: 0 */
function tokenizer(rawText) {
  const tokens = [];
  const {text, variables} = extractVariables(rawText);

  // bof
  tokens.push({
    type: 'BOF',
  });

  let i = 0;
  while (i < text.length) {
    let lastToken = tokens[tokens.length - 1];

    if (text[i] === '\n' || i === 0) {
      const value = text[i];
      let start = i;

      let amountOfNewLines = 0;
      for (; text[i] === '\n'; i++) {
        amountOfNewLines++;
      }

      let amountOfSpaces = 0;
      for (; text[i] === ' '; i++) {
        amountOfSpaces++;
      }

      // greater
      if (text[i] === '>') {
        let depth = 0;

        while (text[i] === '>') {
          let j = i;

          do {
            j++;
          } while (text[j] === ' ');

          if (text[j - 1] === ' ' || text[j] === '\n') {
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

        if (text[i] === '\n') {
          continue;
        }
      }

      // hashes
      if (text[i] === '#') {
        let amountOfNewLines = 1;

        let j = i + 1;
        for (; text[j] === '#'; j++) {
          amountOfNewLines++;
        }

        if (amountOfNewLines <= 6) {
          i = j;

          while (text[i] === ' ') {
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
      if (lastToken.type === 'Chars' && (text[i] === '=' || text[i] === '-')) {
        const value = text[i];
        let amount = 0;

        let j = i;
        for (; text[j] === value; j++) {
          amount++;
        }

        if (text[j] === '\n') {
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
      if (text[i] === '`' && text[i + 1] === '`' && text[i + 2] === '`') {
        i += 3;

        const currDepth = tokens[tokens.length - 1].type === 'Greater'
          ? tokens[tokens.length - 1].depth
          : -1;

        let value = '';
        let amountOfClosedBackticks = 0;
        let level = currDepth;
        for (; i < text.length && amountOfClosedBackticks < 3; i++) {
          if (text[i] === '`') {
            amountOfClosedBackticks++;
          } else if (text[i] === '&') {
            value += '&amp;';
          } else if (text[i] === '<') {
            value += '&lt;';
          } else if (text[i] === '>' && level === -1) {
            value += '&gt;';
          } else if (text[i] === '>' && text[i + 1] === ' ') {
            level--;
            i++;
          } else if (text[i] === '\n') {
            level = currDepth;
            value += '\n';
          } else {
            value += text[i];
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
      if (lastToken.type !== 'Chars' && (text[i] === '-' || text[i] === '*')) {
        const value = text[i];

        let j = i;
        while (text[j] === value || text[j] === ' ') {
          j++;
        }

        if (text[j] === '\n' || j === text.length) {
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
      if (text[i] === '*' || text[i] === '+' || text[i] === '-') {
        let depth = Math.floor(amountOfSpaces * 0.5);

        while (text[i] === '*' || text[i] === '+' || text[i] === '-') {
          const value = text[i];

          let j = i + 1;
          while (text[j] === ' ') {
            j++;
          }

          if (text[j - 1] === ' ') {
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
      if (/\d/.test(text[i])) {
        let depth = Math.floor(amountOfSpaces * 0.5);

        while (/\d/.test(text[i])) {
          let value = '';
          let j = i;
          while (/\d/.test(text[j])) {
            value += text[j];
            j++;
          }

          if (text[j] === '.') {
            do {
              j++;
            } while (text[j] === ' ');

            if (text[j - 1] === ' ') {
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

    // square bracket
    if (text[i] === '[') {
      tokens.push({
        type: 'LeftSquareBracket',
        value: text[i],
        start: i,
        end: ++i,
      });
      continue;
    }

    if (text[i] === ']') {
      tokens.push({
        type: 'RightSquareBracket',
        value: text[i],
        start: i,
        end: ++i,
      });
      continue;
    }

    // parenthesis
    if (text[i] === '(') {
      tokens.push({
        type: 'LeftParenthesis',
        value: text[i],
        start: i,
        end: ++i,
      });
      continue;
    }

    if (text[i] === ')') {
      tokens.push({
        type: 'RightParenthesis',
        value: text[i],
        start: i,
        end: ++i,
      });
      continue;
    }

    // asterisk
    if (text[i] === '*') {
      const start = i;
      const value = text[i];

      let amount = 0;
      for (; text[i] === value; i++) {
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
    if (text[i] === '_') {
      const start = i;
      const value = text[i];

      let amount = 0;
      for (; text[i] === value; i++) {
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
    if (text[i] === '`') {
      const start = i;

      let amountOfOpenedBackticks = 0;
      for (; text[i] === '`'; i++) {
        amountOfOpenedBackticks++;
      }

      let value = '';
      let isClosed = false;
      while (i < text.length) {
        if (text[i] === '`') {
          let amountOfClosedBackticks = 0;
          for (; text[i] === '`'; i++) {
            amountOfClosedBackticks++;
          }

          if (amountOfClosedBackticks === amountOfOpenedBackticks) {
            isClosed = true;
            break;
          }

          value += '`'.repeat(amountOfClosedBackticks);
          continue;
        } else if (text[i] === '&') {
          value += '&amp;';
        } else if (text[i] === '<') {
          value += '&lt;';
        } else if (text[i] === '>') {
          value += '&gt;';
        } else {
          value += text[i];
        }
        i++;
      }

      tokens.push({
        type: 'Code',
        value: value.trim(),
        isClosed,
        start,
        end: i,
      });
      continue;
    }

    // opened image bracket
    if (text[i] === '!' && text[i + 1] === '[') {
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

    // chars
    if (tokens[tokens.length - 1]
      && tokens[tokens.length - 1].type === 'Chars') {
      tokens[tokens.length - 1].end++;
      tokens[tokens.length - 1].value += text[i];
    } else {
      tokens.push({
        type: 'Chars',
        value: text[i],
        start: i,
        end: i + 1,
      });
    }

    i++;
  }

  // eof
  tokens.push({
    type: 'EOF',
  });

  let results = {tokens};

  if (Object.keys(variables).length) {
    results.variables = variables;
  }

  return results;
}

function extractVariables(rawText) {
  const variables = {};

  const textByNewLine = rawText.split('\n');
  for (let i = 0; i < textByNewLine.length; i++) {
    if (/^ {0,3}\[.+\]:/.test(textByNewLine[i])) {
      let rawValue = textByNewLine[i].split(/:\s/);

      const id = rawValue[0].trim().slice(1, -1);

      if (!rawValue[1]) {
        continue;
      }

      variables[id] = rawValue[1];
      textByNewLine.splice(i, 1);

      if (textByNewLine[i] && /^\s+['"(]/.test(textByNewLine[i])) {
        variables[id] += `\n${textByNewLine[i]}`;
        textByNewLine.splice(i, 1);
      }

      i--;
    }
  }

  return {
    text: textByNewLine.join('\n').trim(),
    variables,
  };
}

module.exports = tokenizer;
