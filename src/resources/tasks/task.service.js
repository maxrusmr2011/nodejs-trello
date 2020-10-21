const taskRepo = require('./task.memory.repository');

const getAll = async boardId => await taskRepo.getAll(boardId);
const getByUser = async userId => await taskRepo.getByUser(userId);

const getByBoard = async boardId => await taskRepo.getByBoard(boardId);

const getOne = async id => await taskRepo.getOne(id);

const delOne = async id => await taskRepo.delOne(id);

const updateOne = async (id, body) => await taskRepo.updateOne(id, body);

const createOne = async body => await taskRepo.createOne(body);

module.exports = {
  getAll,
  getOne,
  delOne,
  updateOne,
  createOne,
  getByUser,
  getByBoard
};
