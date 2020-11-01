const { Board, Column } = require('./board.mongodb.model');
const { dbBoards } = require('../../dataBase/memoDB');

const getAll = async () => Board.find({});

const getOne = async boardId => Board.findById(boardId);

const delOne = async boardId => Board.findByIdAndDelete(boardId);

const updateOne = async (boardId, body) => {
  if (body.columns && body.columns.length) {
    body.columns = body.columns.map(col => new Column(col));
  }
  await Board.findByIdAndUpdate(boardId, body);
  return Board.findById(boardId);
};

const createOne = async body => {
  if (body.columns && body.columns.length) {
    body.columns = body.columns.map(col => new Column(col));
  }
  return Board.create(body);
};

module.exports = {
  getAll,
  getOne,
  delOne,
  updateOne,
  createOne,
  dbBoards
};
