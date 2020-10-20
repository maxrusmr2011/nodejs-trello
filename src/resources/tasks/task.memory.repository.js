const Task = require('./task.model');
const { dbUsers } = require('../users/user.memory.repository');
const { dbBoards } = require('../boards/board.memory.repository');
const dbTasks = [
  new Task({
    boardId: dbBoards[0].id,
    columnId: dbBoards[0].columns[0].id,
    userId: dbUsers[0].id
  }),
  new Task({
    boardId: dbBoards[0].id,
    columnId: dbBoards[0].columns[1].id,
    userId: dbUsers[1].id
  }),
  new Task({
    boardId: dbBoards[0].id,
    columnId: dbBoards[0].columns[2].id,
    userId: dbUsers[2].id
  })
];

const getAll = async boardId => {
  return dbTasks.filter(item => item.boardId === boardId);
};

const getByUser = async userId =>
  dbTasks.filter(item => item.userId === userId);

const getByBoard = async boardId =>
  dbTasks.filter(item => item.boardId === boardId);

const getOne = async (taskId, boardId) => {
  const one = dbTasks.find(item => item.id === taskId);
  if (!one) throw Error(`Task not found, id: ${taskId} in board ${boardId}`);
  return one;
};

const delOne = async (taskId, boardId) => {
  const indexOne = dbTasks.findIndex(item => item.id === taskId);
  if (indexOne === -1) {
    throw Error(`User not found, id: ${taskId} in board ${boardId}`);
  }
  return dbTasks.splice(indexOne, 1)[0];
};

const updateOne = async (taskId, boardId, body) => {
  const keysEtalon = [
    'title',
    'order',
    'description',
    'boardId',
    'columnId',
    'userId'
  ];
  const keys = Object.keys(body);
  const valid = keysEtalon.some(item => keys.indexOf(item) !== -1);
  if (!valid) {
    throw Error(`Bad request, id: ${taskId} in board ${boardId}`);
  }
  const indexOne = dbTasks.findIndex(item => item.id === taskId);
  if (indexOne === -1) {
    throw Error(`Task not found, id: ${taskId} in board ${boardId}`);
  }
  dbTasks[indexOne] = { ...dbTasks[indexOne], ...body };
  return dbTasks[indexOne];
};

const createOne = async (boardId, body) => {
  const keysEtalon = [
    'title',
    'order',
    'description',
    'boardId',
    'columnId',
    'userId'
  ];
  const keys = Object.keys(body);
  const valid = keysEtalon.some(item => keys.indexOf(item) !== -1);
  const excess = keys.some(item => keysEtalon.indexOf(item) === -1);
  if (!valid || excess) {
    throw Error('Bad request');
  }
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
