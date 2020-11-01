// const taskRepo = require('./task.memory.repository');
const taskRepo = require('./task.mongodb.repository');

const getAll = boardId => taskRepo.getAll(boardId);
const getByUser = userId => taskRepo.getByUser(userId);

const getByBoard = boardId => taskRepo.getByBoard(boardId);

const getOne = id => taskRepo.getOne(id);

const delOne = id => taskRepo.delOne(id);

const updateOne = (id, body) => taskRepo.updateOne(id, body);

const createOne = body => taskRepo.createOne(body);

module.exports = {
  getAll,
  getOne,
  delOne,
  updateOne,
  createOne,
  getByUser,
  getByBoard
};
