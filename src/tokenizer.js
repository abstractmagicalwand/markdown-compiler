function tokenizer(text) { // eslint-disable-line
  const tokens = [];

  for (let i = 0; i < text.length; i++) { // eslint-disable-line
    const char = text[i];

    if (char === '*') {
      if (tokens[tokens.length - 1]
        && tokens[tokens.length - 1].value === char) {
        tokens[tokens.length - 1].end++;
        tokens[tokens.length - 1].amount++;
      } else {
        tokens.push({
          type: 'Asterisk',
          amount: 1,
          value: char,
          start: i,
          end: i + 1,
        });
      }

      continue;
    }

    if (char === '_') {
      if (tokens[tokens.length - 1]
        && tokens[tokens.length - 1].value === char) {
        tokens[tokens.length - 1].end++;
        tokens[tokens.length - 1].amount++;
      } else {
        tokens.push({
          type: 'Underscore',
          amount: 1,
          value: char,
          start: i,
          end: i + 1,
        });
      }

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

  return tokens;
}

tokenizer('**Homo** *Sapiens* _non_ __urinat__ **_in_** **ventum_');

module.exports = tokenizer;
