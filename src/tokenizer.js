const {text} = require('../__test__/fixtures'); // eslint-disable-line

function tokenizer(text) { // eslint-disable-line
  let tokens = [];
  let patternBullet = /\s{0,}(\*|\+|-)\s+/g;
  const patternCharsOfBullet = /(\*|\+|-)/;
  const patternItem = /\s{0,}\d+\.\s+/g;
  const patternNumbers = /\d/;

  tokens.push({
    type: 'BOF',
  });

  for (let i = 0; i < text.length; i++) {
    let char = text[i];
    patternNumbers.test(char);
    if (tokens[tokens.length - 1].type === 'BOF'
      || char === '\n'
      || patternCharsOfBullet.test(char)
      && tokens[tokens.length - 1].type === 'Bullet'
      || patternNumbers.test(char)
      && tokens[tokens.length - 1].type === 'Item') {
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

        if (patternCharsOfBullet.test(char)
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
          type: 'Bullet',
          depth,
          value: bullet[0].trim(),
          start: i,
          end: i + bullet[0].length,
        });

        i += bullet[0].length - 1;
        continue;
      }

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

        if (patternNumbers.test(char)
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

tokenizer(text.orderList);

module.exports = tokenizer;
