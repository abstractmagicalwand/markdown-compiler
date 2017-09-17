const isMatch = (object, sources, test) => { // eslint-disable-line
  sources = sources || [{}]; // eslint-disable-line

  sources.forEach(source => {
    Object.keys(object).forEach(key => {
      if (typeof object[key] !== 'object' || object[key] === null) {
        test(object[key], source[key]);
      }
    });
  });

  if (object.body) {
    object.body.forEach((object, i) => isMatch(
      object,
      sources.map(source => source.body && source.body[i] || {}),
      test
    ));
  }
};

module.exports = isMatch;
