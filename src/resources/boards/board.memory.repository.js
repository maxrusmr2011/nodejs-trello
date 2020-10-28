const { Board } = require('./board.model');
const { dbBoards } = require('../../dataBase/memoDB');

const getAll = async () => dbBoards;

const getOne = async boardId => dbBoards.find(item => item.id === boardId);

const delOne = async boardId => {
  const indexOne = dbBoards.findIndex(item => item.id === boardId);
  return indexOne > -1 ? dbBoards.splice(indexOne, 1)[0] : null;
};

const updateOne = async (boardId, body) => {
  const indexOne = dbBoards.findIndex(item => item.id === boardId);
  dbBoards[indexOne] = { ...dbBoards[indexOne], ...body };
  return dbBoards[indexOne];
};

const createOne = async body => {
  const newBoard = new Board(body);
  dbBoards.push(newBoard);
  return newBoard;
};

module.exports = {
  getAll,
  getOne,
  delOne,
  updateOne,
  createOne,
  dbBoards
};
