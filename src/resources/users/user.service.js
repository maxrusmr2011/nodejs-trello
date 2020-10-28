// const usersRepo = require('./user.memory.repository');
const usersRepo = require('./user.mongodb.repository');
const taskService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getOne = id => usersRepo.getOne(id);

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

const updateOne = (id, body) => usersRepo.updateOne(id, body);

const createOne = body => usersRepo.createOne(body);

module.exports = {
  getAll,
  getOne,
  delOne,
  updateOne,
  createOne
};
