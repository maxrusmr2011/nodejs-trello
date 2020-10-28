const Task = require('./task.mongodb.model');
// const { dbTasks } = require('../../dataBase/mongoDB');

const getAll = async () => Task.find({});

const getByUser = async userId => Task.find({ userId });

const getByBoard = async boardId => Task.find({ boardId });

const getOne = async id => Task.findById(id);

const delOne = async id => Task.findByIdAndDelete(id);

const updateOne = async (id, body) => {
  await Task.findByIdAndUpdate(id, body);
  return Task.findById(id);
};

const createOne = async body => Task.create(body);

module.exports = {
  getAll,
  getOne,
  delOne,
  updateOne,
  createOne,
  getByUser,
  getByBoard
};
