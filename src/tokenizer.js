function tokenizer(text) { // eslint-disable-line
  const tokens = [];

  for (let i = 0; i < text.length; i++) { // eslint-disable-line
    let char = text[i];

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

tokenizer(`**Guardian Angel**

I love You, My Guardian Angel, in gloom.
In gloom, that has followed me out of the womb.

Because you were once my fair gorgeous bride.
Because you have seen all the secrets I hide.

Because we are bound by secrets and night.
Because you’re my sister, my daughter, my bride.`);

module.exports = tokenizer;
