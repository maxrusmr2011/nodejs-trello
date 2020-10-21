const usersRepo = require('./user.memory.repository');
const taskService = require('../tasks/task.service');

const getAll = async () => await usersRepo.getAll();

const getOne = async id => await usersRepo.getOne(id);

const delOne = async id => {
  const deleted = await usersRepo.delOne(id);
  const list = await taskService.getByUser(id);
  if (list.length) {
    await Promise.all(
      list.map(item => taskService.updateOne(item.id, { userId: null }))
    );
  }
  return deleted;
};

const updateOne = async (id, body) => await usersRepo.updateOne(id, body);

const createOne = async body => await usersRepo.createOne(body);

module.exports = {
  getAll,
  getOne,
  delOne,
  updateOne,
  createOne
};
