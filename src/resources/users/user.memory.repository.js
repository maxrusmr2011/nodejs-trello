const User = require('./user.model');
const dbUsers = [new User(), new User(), new User()];

const getAll = async () => {
  return await dbUsers;
};

const getOne = async id => {
  const one = dbUsers.find(item => item.id === id);
  if (!one) throw Error("Can't find user");
  return one;
};

module.exports = {
  getAll,
  getOne
};
