const { BAD_REQUEST } = require('../utils/errors');

module.exports = keysEtalon => (req, res, next) => {
  const { params, body } = req;
  const obj = { ...body, ...params };
  delete obj.id;
  const keys = Object.keys(obj);
  const listKeys = Object.keys(keysEtalon.list);

  const valid = listKeys.some(item => item in obj);
  if (!valid) {
    return next(BAD_REQUEST.text(`${keysEtalon.name} (not found any key)`));
  }
  const excess = keys.some(item => !(item in keysEtalon.list));
  if (excess) {
    return next(BAD_REQUEST.text(`${keysEtalon.name} (found excess key)`));
  }
  const types = keys.every(
    item => typeof obj[item] === keysEtalon.list[item] || obj[item] === null
  );
  if (!types) {
    return next(
      BAD_REQUEST.text(`${keysEtalon.name} (type of value is wrong)`)
    );
  }
  const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[+\-_@$!%*?&#.,;:[\]{}]).{8,}$/;
  if ('password' in obj && !reg.test(obj.password)) {
    return next(
      BAD_REQUEST.text(
        `${keysEtalon.name} (password is wrong: 8 letter and more 0-9,A-Z,a-z, +-_@$!%*?&#.,;:[]{} )`
      )
    );
  }
  return next();
};
