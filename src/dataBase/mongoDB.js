const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../common/config');
const User = require('../resources/users/user.mongodb.model');
const { Board, Column } = require('../resources/boards/board.mongodb.model');
// const Task = require('../resources/tasks/task.model');
const bcrypt = require('bcrypt');

const connectMongoose = fn => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', async () => {
    console.log('success connected to mongoDB');
    db.dropDatabase();
    const adm = await bcrypt.hash('admin', 10);
    const dbUsers = [
      new User({ login: 'admin', password: adm }),
      new User(),
      new User()
    ];
    dbUsers.forEach(user => user.save());
    const listColumn = [
      new Column({ order: 0 }),
      new Column({ order: 1 }),
      new Column({ order: 2 })
    ];
    Board.create({ columns: listColumn });

    fn();
  });
};

module.exports = connectMongoose;
