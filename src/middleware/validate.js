// const { nameEntity } = require('../constants');
module.exports = keysEtalon => (req, res, next) => {
  const { params, body } = req;
  const obj = { ...body, ...params };
  delete obj.id;
  const keys = Object.keys(obj);
  const listKeys = Object.keys(keysEtalon.list);

  const valid = listKeys.some(item => item in obj);
  if (!valid) {
    return next(Error(`400${keysEtalon.name} (not found any key)`));
  }
  const excess = keys.some(item => !(item in keysEtalon.list));
  if (excess) {
    return next(Error(`400${keysEtalon.name} (found excess key)`));
  }
  const types = keys.every(
    item => typeof obj[item] === keysEtalon.list[item] || obj[item] === null
  );
  if (!types) {
    return next(Error(`400${keysEtalon.name} (type of value is wrong)`));
  }
  return next();
};
