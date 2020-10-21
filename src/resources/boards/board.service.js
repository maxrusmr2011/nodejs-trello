const boardRepo = require('./board.memory.repository');
const taskService = require('../tasks/task.service');

const getAll = async () => await boardRepo.getAll();

const getOne = async id => await boardRepo.getOne(id);

const delOne = async id => {
  const deleted = await boardRepo.delOne(id);
  const list = await taskService.getByBoard(id);
  if (list.length) {
    await Promise.all(list.map(item => taskService.delOne(item.id)));
  }
  return deleted;
};

const updateOne = async (id, body) => await boardRepo.updateOne(id, body);

const createOne = async body => await boardRepo.createOne(body);

module.exports = {
  getAll,
  getOne,
  delOne,
  updateOne,
  createOne
};
