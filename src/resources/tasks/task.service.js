const taskRepo = require('./task.memory.repository');

const getAll = async boardId => await taskRepo.getAll(boardId);
const getByUser = async userId => await taskRepo.getByUser(userId);
const getByBoard = async boardId => await taskRepo.getByBoard(boardId);

const getOne = async (id, boardId) => await taskRepo.getOne(id, boardId);

const delOne = async (id, boardId) => await taskRepo.delOne(id, boardId);

const updateOne = async (id, boardId, body) =>
  await taskRepo.updateOne(id, boardId, body);

const createOne = async (boardId, body) =>
  await taskRepo.createOne(boardId, body);

module.exports = {
  getAll,
  getOne,
  delOne,
  updateOne,
  createOne,
  getByUser,
  getByBoard
};
