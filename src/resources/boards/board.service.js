// const boardRepo = require('./board.memory.repository');
const boardRepo = require('./board.mongodb.repository');
const taskService = require('../tasks/task.service');

const getAll = () => boardRepo.getAll();

const getOne = id => boardRepo.getOne(id);

const delOne = async id => {
  const deleted = await boardRepo.delOne(id);
  const list = await taskService.getByBoard(id);
  if (list.length) {
    await Promise.all(list.map(item => taskService.delOne(item.id)));
  }
  return deleted;
};

const updateOne = (id, body) => boardRepo.updateOne(id, body);

const createOne = body => boardRepo.createOne(body);

module.exports = {
  getAll,
  getOne,
  delOne,
  updateOne,
  createOne
};
