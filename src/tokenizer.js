/* const {text} = require('../__test__/fixtures'); // eslint-disable-line */

function tokenizer(text) { // eslint-disable-line
  let tokens = [];
  let patternBullet = /\s{0,}(\*|\+|-)\s+/g;
  const patternCharsOfBullet = /(\*|\+|-)/;

  tokens.push({
    type: 'BOF',
  });

  for (let i = 0; i < text.length; i++) {
    let char = text[i];

    if (tokens[tokens.length - 1].type === 'BOF'
      || char === '\n'
      || patternCharsOfBullet.test(char)
      && tokens[tokens.length - 1].type === 'Bullet') {
      patternBullet.lastIndex = i;

      const result = patternBullet.exec(text);

      if (result && result.index === i) {
        let depth = 0;

        for (let i = 0; i < result[0].length; i++) {
          const char = result[0][i];

          if (char === ' ') {
            depth += 0.5;
            continue;
          }

          if (char !== '\n') {
            break;
          }
        }

        if (patternCharsOfBullet.test(char)
          && tokens[tokens.length - 1].type !== 'BOF') {
          for (let j = tokens.length - 1; j > 0; j--) { // eslint-disable-line
            if (tokens[j].type === 'Bullet') {
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
          value: result[0].trim(),
          start: i,
          end: i + result[0].length,
        });

        i += result[0].length - 1;
        continue;
      }
    }

    if (char === '\n') {
      const start = i;
      let amount = 1;

      for (i++; text[i] === '\n'; i++) {
        amount++;
      }

      if (amount > 1) {
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

  tokens.push({
    type: 'EOF',
  });

  return tokens;
}

/* tokenizer(text.unorderList); */

module.exports = tokenizer;
