/* const {text} = require('../__test__/fixtures'); // eslint-disable-line */

function tokenizer(text) { // eslint-disable-line
  let tokens = [];

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
          value: char,
          start: i,
          end: i + 1,
        };

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

  return tokens;
}

/* tokenizer(text.setextHeader); */

module.exports = tokenizer;
