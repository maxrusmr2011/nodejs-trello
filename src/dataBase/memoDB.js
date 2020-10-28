const User = require('../resources/users/user.model');
const { Board, Column } = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const DB = { dbUsers: [], dbBoards: [], dbTasks: [] };
DB.dbUsers = [new User(), new User(), new User()];
const listColumn = [
  new Column({ order: 0 }),
  new Column({ order: 1 }),
  new Column({ order: 2 })
];
DB.dbBoards = [new Board({ columns: listColumn })];
DB.dbTasks = [
  new Task({
    boardId: DB.dbBoards[0].id,
    columnId: DB.dbBoards[0].columns[0].id,
    userId: DB.dbUsers[0].id
  }),
  new Task({
    boardId: DB.dbBoards[0].id,
    columnId: DB.dbBoards[0].columns[1].id,
    userId: DB.dbUsers[1].id
  }),
  new Task({
    boardId: DB.dbBoards[0].id,
    columnId: DB.dbBoards[0].columns[2].id,
    userId: DB.dbUsers[2].id
  })
];

module.exports = DB;
