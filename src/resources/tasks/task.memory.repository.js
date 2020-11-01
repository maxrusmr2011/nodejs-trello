const Task = require('./task.model');
const { dbTasks } = require('../../dataBase/memoDB');

const getAll = async () => dbTasks;

const getByUser = async userId =>
  dbTasks.filter(item => item.userId === userId);

const getByBoard = async boardId =>
  dbTasks.filter(item => item.boardId === boardId);

const getOne = async id => {
  return dbTasks.find(item => item.id === id);
};

const delOne = async id => {
  const indexOne = dbTasks.findIndex(item => item.id === id);
  return indexOne > -1 ? dbTasks.splice(indexOne, 1)[0] : null;
};

const updateOne = async (id, body) => {
  const indexOne = dbTasks.findIndex(item => item.id === id);
  dbTasks[indexOne] = { ...dbTasks[indexOne], ...body };
  return dbTasks[indexOne];
};

const createOne = async body => {
  const newTask = new Task(body);
  dbTasks.push(newTask);
  return newTask;
};

module.exports = {
  getAll,
  getOne,
  delOne,
  updateOne,
  createOne,
  getByUser,
  getByBoard
};
