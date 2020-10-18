const usersRepo = require('./user.memory.repository');

const getAll = async () => await usersRepo.getAll();

const getOne = async id => await usersRepo.getOne(id);

module.exports = {
  getAll,
  getOne
};
