
function mapCharsToCharsAndSpaces(charsValue, start, end) {
  // 'This is just a regular paragraph.'
  const result = [];

  for (let i = 0; i < charsValue.length; i++) {
    if (charsValue[i] === ' ') {
      const _start = start + i;
      let raw = '';

      for (; i < charsValue.length && charsValue[i] === ' '; i++) {
        raw += charsValue[i];
      }

      result.push( {
        type: 'Spaces',
        amount: raw.length,
        raw,
        start: _start,
        end: start + i,
      });
      i--;
    } else if (charsValue[i] === '-') {
      const _start = start + i;
      let raw = '';

      for (; i < charsValue.length && charsValue[i] === '-'; i++) {
        raw += charsValue[i];
      }

      result.push( {
        type: 'Hyphens',
        amount: raw.length,
        raw,
        start: _start,
        end: start + i,
      });
      i--;
    } else if (charsValue[i] !== ' ' && charsValue[i] !== '-') {
      const _start = start + i;
      let raw = '';

      for (; i < charsValue.length && charsValue[i] !== '-' && charsValue[i] !== ' '; i++) {
        raw += charsValue[i];
      }

      result.push( {
        type: 'Chars',
        value: raw,
        raw,
        start: _start,
        end: start + i,
      });
      i--;
    }
  }

  console.log(
    JSON.stringify(result, null, 2)
      .replace(/"type"/g, 'type')
      .replace(/"value"/g, 'value')
      .replace(/"raw"/g, 'raw')
      .replace(/"start"/g, 'start')
      .replace(/"end"/g, 'end')
      .replace(/"amount"/g, 'amount')
  );
}
