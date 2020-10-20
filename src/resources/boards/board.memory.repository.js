const { Board, Column } = require('./board.model');
const listColumn = [
  new Column({ order: 0 }),
  new Column({ order: 1 }),
  new Column({ order: 2 })
];
const dbBoards = [new Board({ columns: listColumn })];

const getAll = async () => {
  return dbBoards;
};

const getOne = async boardId => {
  const one = dbBoards.find(item => item.id === boardId);
  if (!one) throw Error(`Board not found, id: ${boardId}`);
  return one;
};

const delOne = async boardId => {
  const indexOne = dbBoards.findIndex(item => item.id === boardId);
  if (indexOne === -1) throw Error(`Board not found, id: ${boardId}`);
  return dbBoards.splice(indexOne, 1)[0];
};

const updateOne = async (boardId, body) => {
  const keysEtalon = ['title', 'columns'];
  const keys = Object.keys(body);
  const valid = keysEtalon.some(item => keys.indexOf(item) !== -1);
  const indexOne = dbBoards.findIndex(item => item.id === boardId);
  if (indexOne === -1 || !valid) {
    throw Error(`Bad request, id: ${boardId}`);
  }
  dbBoards[indexOne] = { ...dbBoards[indexOne], ...body };
  return dbBoards[indexOne];
};

const createOne = async body => {
  const keysEtalon = ['title', 'columns'];
  const keys = Object.keys(body);
  const valid = keysEtalon.every(item => keys.indexOf(item) !== -1);
  if (!valid) {
    throw Error('Bad request');
  }
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
