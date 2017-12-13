/* eslint complexity: 0 */
function tokenizer(rawText) {
  const tokens = [];
  const {text, variables} = extractVariables(rawText);

  // bof
  tokens.push({
    type: 'BOF',
  });

  for (let i = 0; i < text.length; i++) {
    let lastToken = tokens[tokens.length - 1];
    let char = text[i];

    let patternBullets = /(\*|\+|-)/;
    let patternItems = /\d/;
    if (lastToken.type === 'BOF' || char === '\n'
      || patternBullets.test(char) && lastToken.type === 'Bullet'
      || patternItems.test(char) && lastToken.type === 'Item') {
      // code block
      let patternCodeBlock = lastToken.type === 'BOF'
        ? /```\n/g
        : /\n\n?```\n/g;
      patternCodeBlock.lastIndex = i;
      const codeBlock = patternCodeBlock.exec(text);
      if (codeBlock && codeBlock.index === i) {
        const start = i;

        for (; i < text.length; i++) {
          if (text[i] === '\n' || text[i] === '`') {
            continue;
          }

          break;
        }

        let value = '';
        let backtickCounter = 0;
        for (; i < text.length && backtickCounter < 3; i++) {
          if (text[i] === '`') {
            backtickCounter++;
          } else if (text[i] === '&') {
            value += '&amp;';
          } else if (text[i] === '<') {
            value += '&lt;';
          } else if (text[i] === '>') {
            value += '&gt;';
          } else {
            value += text[i];
          }
        }

        tokens.push({
          type: 'CodeBlock',
          value: value.trim(),
          isClosed: backtickCounter === 3,
          start: start,
          end: i + 1,
        });
        continue;
      }

      // horizontal rule
      if (lastToken.type !== 'Chars' && lastToken.type !== 'CodeBlock') {
        const start = i;

        let isRule = true;
        let k = i + 1;
        for (; k < text.length; k++) {
          if (/\S/.test(text[k])) {
            break;
          }
        }

        const value = text[k];
        let j = k;
        for (; j < text.length; j++) {
          if (text[j] === '\n') {
            if (j - start <= 1) {
              isRule = false;
            }

            break;
          }

          if (text[j] !== value && text[j] !== ' ') {
            isRule = false;
            break;
          }
        }

        if (isRule) {
          i = j - 1;
          tokens.push({
            type: 'HorizontalRule',
            value,
            start,
            end: i + 1,
          });

          continue;
        }
      }

      // bullet
      let patternBullet = /\s{0,}(\*|\+|-)\s+/g;
      patternBullet.lastIndex = i;
      const bullet = patternBullet.exec(text);
      if (bullet && bullet.index === i) {
        let depth = 0;

        for (let i = 0; i < bullet[0].length; i++) {
          const char = bullet[0][i];

          if (char === ' ') {
            depth += 0.5;
            continue;
          }

          if (char !== '\n') {
            break;
          }
        }

        if (patternBullets.test(char) && lastToken.type !== 'BOF') {
          for (let j = tokens.length - 1; j > 0; j--) { // eslint-disable-line
            if (tokens[j].type === 'Bullet' || tokens[j].type === 'Item') {
              depth = tokens[j].depth + 1;
              break;
            }
          }
        } else {
          depth = Math.floor(depth);
        }

        tokens.push({
          type: 'Bullet',
          depth,
          value: bullet[0].trim(),
          start: i,
          end: i + bullet[0].length,
        });

        i += bullet[0].length - 1;
        continue;
      }

      // item
      let patternItem = /\s{0,}\d+\.\s+/g;
      patternItem.lastIndex = i;
      const item = patternItem.exec(text);
      if (item && item.index === i) {
        let depth = 0;

        for (let i = 0; i < item[0].length; i++) {
          const char = item[0][i];

          if (char === ' ') {
            depth += 0.5;
            continue;
          }

          if (char !== '\n') {
            break;
          }
        }

        if (patternItems.test(char)
          && tokens[tokens.length - 1].type !== 'BOF') {
          for (let j = tokens.length - 1; j > 0; j--) { // eslint-disable-line
            if (tokens[j].type === 'Bullet' || tokens[j].type === 'Item') {
              depth = tokens[j].depth + 1;
              break;
            }
          }
        } else {
          depth = Math.floor(depth);
        }

        tokens.push({
          type: 'Item',
          depth,
          value: `${parseInt(item[0], 10)}`,
          start: i,
          end: i + item[0].length,
        });

        i += item[0].length - 1;
        continue;
      }

      // hashes
      let patternHashes = /\n#{1,6} |^#/g ;
      patternHashes.lastIndex = i;
      const hashes = patternHashes.exec(text);
      if (hashes && hashes.index === i) {
        let hashes = {
          type: 'Hashes',
          value: '#',
          amount: 0,
          start: i,
        };

        while (text[i] !== ' ') {
          if (text[i] === '#') {
            hashes.amount++;
          }
          i++;
        }

        hashes.end = i + 1;
        tokens.push(hashes);
        continue;
      }

      // signs and hyphens
      let patternSignsOrHyphens = /\n+(=|-)+\n+/g; // \n+ is the good solution
      patternSignsOrHyphens.lastIndex = i;
      const SignsOrHyphens = patternSignsOrHyphens.exec(text);
      if (SignsOrHyphens && SignsOrHyphens.index === i) {
        const char = SignsOrHyphens[0][1];
        let signsOrHyphens = {
          type: char === '-' ? 'Hyphens' : 'Signs',
          amount: 0,
          value: char,
          start: i,
          end: i + 1,
        };

        for (let j = 0; j < SignsOrHyphens[0].length; j++) {
          if (SignsOrHyphens[0][j] === char) {
            signsOrHyphens.amount++;
          }
        }

        while (text[signsOrHyphens.end] === char) {
          signsOrHyphens.end++;
          i++;
        }

        tokens.push(signsOrHyphens);
        continue;
      }
    }

    // new line
    if (char === '\n') {
      const start = i;
      let amount = 1;

      i++;
      for (; text[i] === '\n'; i++) {
        amount++;
      }

      if (amount > 1
        || lastToken.type === 'Signs'
        || lastToken.type === 'Hyphens') {
        tokens.push({
          type: 'NewLine',
          amount,
          value: char,
          start,
          end: i,
        });
      } else if (tokens[tokens.length - 1]
        && tokens[tokens.length - 1].type === 'Chars') {
        tokens[tokens.length - 1].end++;
        tokens[tokens.length - 1].value += ' ';
      } else {
        tokens.push({
          type: 'Chars',
          value: ' ',
          start,
          end: i,
        });
      }

      char = text[i];
    }

    // square bracket
    if (char === '[') {
      let token = {
        type: 'LeftSquareBracket',
        value: char,
        start: i,
        end: i + 1,
      };

      tokens.push(token);
      continue;
    }

    if (char === ']') {
      let token = {
        type: 'RightSquareBracket',
        value: char,
        start: i,
        end: i + 1,
      };

      tokens.push(token);
      continue;
    }

    // parenthesis
    if (char === '(') {
      let token = {
        type: 'LeftParenthesis',
        value: char,
        start: i,
        end: i + 1,
      };

      tokens.push(token);
      continue;
    }

    if (char === ')') {
      let token = {
        type: 'RightParenthesis',
        value: char,
        start: i,
        end: i + 1,
      };

      tokens.push(token);
      continue;
    }

    // asterisk
    if (char === '*') {
      let token = {
        type: 'Asterisk',
        amount: 1,
        value: char,
        start: i,
        end: i + 1,
      };

      for (let j = i + 1; j < text.length; j++) {
        if (text[j] === char) {
          token.end++;
          token.amount++;
          continue;
        }

        i = j - 1;
        break;
      }

      tokens.push(token);
      continue;
    }

    // underscore
    if (char === '_') {
      let token = {
        type: 'Underscore',
        amount: 1,
        value: char,
        start: i,
        end: i + 1,
      };

      for (let j = i + 1; j < text.length; j++) {
        if (text[j] === char) {
          token.end++;
          token.amount++;
          continue;
        }

        i = j - 1;
        break;
      }

      tokens.push(token);
      continue;
    }

    // code
    if (char === '`') {
      let value = '';
      const start = i;

      let amountOpenedBacktick = 1;
      for (let j = i + 1; j < text.length; j++) {
        if (text[j] === '`') {
          amountOpenedBacktick++;
          continue;
        }

        i = j - 1;
        break;
      }

      let isClosed = false;
      for (let j = i + 1; j < text.length; j++) {
        if (text[j] === '`') {
          let amountClosedBacktick = 1;
          for (let k = j + 1; k < text.length
            || amountClosedBacktick === amountOpenedBacktick; k++) {
            if (text[k] === '`') {
              amountClosedBacktick++;
              continue;
            }

            j = k - 1;
            break;
          }

          if (amountClosedBacktick === amountOpenedBacktick) {
            isClosed = true;
            i = j;
            break;
          } else {
            value += char.repeat(amountClosedBacktick);
          }
        } else if (text[j] === '&') {
          value += '&amp;';
        } else if (text[j] === '<') {
          value += '&lt;';
        } else if (text[j] === '>') {
          value += '&gt;';
        } else {
          value += text[j];
        }
      }

      tokens.push({
        type: 'Code',
        value: value.trim(),
        isClosed,
        start,
        end: i + 1,
      });
      continue;
    }

    // opened image bracket
    if (text[i] === '!' && text[i + 1] === '[') {
      tokens.push({
        type: 'OpenedImageBracket',
        value: '![',
        start: i,
        end: i + 2,
      });

      i += 1;
      continue;
    }

    // chars
    if (tokens[tokens.length - 1]
      && tokens[tokens.length - 1].type === 'Chars') {
      tokens[tokens.length - 1].end++;
      tokens[tokens.length - 1].value += char;
    } else {
      tokens.push({
        type: 'Chars',
        value: char,
        start: i,
        end: i + 1,
      });
    }
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

  const textByNewLine = rawText.split(/\n/g);
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
