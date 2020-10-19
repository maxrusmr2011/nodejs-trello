const User = require('./user.model');
const dbUsers = [new User(), new User(), new User()];

const getAll = async () => {
  return dbUsers;
};

const getOne = async id => {
  const one = dbUsers.find(item => item.id === id);
  if (!one) throw Error(`User not found, id: ${id}`);
  return one;
};

const delOne = async id => {
  const indexOne = dbUsers.findIndex(item => item.id === id);
  if (indexOne === -1) throw Error(`User not found, id: ${id}`);
  return dbUsers.splice(indexOne, 1)[0];
};

const updateOne = async (id, body) => {
  const keysEtalon = ['name', 'login', 'password'];
  const keys = Object.keys(body);
  const valid = keysEtalon.some(item => keys.indexOf(item) !== -1);
  const indexOne = dbUsers.findIndex(item => item.id === id);
  if (indexOne === -1 || !valid) {
    throw Error(`Bad request, id: ${id}`);
  }
  dbUsers[indexOne] = { ...dbUsers[indexOne], ...body };
  return dbUsers[indexOne];
};

const createOne = async body => {
  const keysEtalon = ['name', 'login', 'password'];
  const keys = Object.keys(body);
  const valid = keysEtalon.every(item => keys.indexOf(item) !== -1);
  const excess = keys.some(item => keysEtalon.indexOf(item) === -1);
  if (!valid || excess) {
    throw Error('Bad request');
  }
  const newUser = new User(body);
  dbUsers.push(newUser);
  return newUser;
};

module.exports = {
  getAll,
  getOne,
  delOne,
  updateOne,
  createOne,
  dbUsers
};
