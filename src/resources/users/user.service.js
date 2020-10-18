const usersRepo = require('./user.memory.repository');

const getAll = async () => await usersRepo.getAll();

const getOne = async id => await usersRepo.getOne(id);

const delOne = async id => await usersRepo.delOne(id);

const updateOne = async (id, body) => await usersRepo.updateOne(id, body);

const createOne = async body => await usersRepo.createOne(body);

module.exports = {
  getAll,
  getOne,
  delOne,
  updateOne,
  createOne
};
