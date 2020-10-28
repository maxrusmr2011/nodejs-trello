const User = require('./user.model');
const { dbUsers } = require('../../dataBase/memoDB');
// const db = require('../../dataBase/mongoDB');
// if (db) {
//   console.log('get db');
// }

const getAll = async () => dbUsers;

const getOne = async id => dbUsers.find(item => item.id === id);

const delOne = async id => {
  const indexOne = dbUsers.findIndex(item => item.id === id);
  return indexOne > -1 ? dbUsers.splice(indexOne, 1)[0] : null;
};

const updateOne = async (id, body) => {
  const indexOne = dbUsers.findIndex(item => item.id === id);
  dbUsers[indexOne] = { ...dbUsers[indexOne], ...body };
  return dbUsers[indexOne];
};

const createOne = async body => {
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
