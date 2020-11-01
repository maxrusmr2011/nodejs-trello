const User = require('./user.mongodb.model');
// const { dbUsers } = require('../../dataBase/memoDB');

const getAll = async () => User.find({});

const getOne = async id => User.findById(id);

const delOne = async id => User.findByIdAndDelete(id);

const updateOne = async (id, body) => {
  await User.findByIdAndUpdate(id, body);
  return User.findById(id);
};

const createOne = async body => User.create(body);

module.exports = {
  getAll,
  getOne,
  delOne,
  updateOne,
  createOne
  // dbUsers
};
