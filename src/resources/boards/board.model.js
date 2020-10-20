const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title = 'TITLE COLUMN', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

class Board {
  constructor({ id = uuid(), title = 'TITLE BOARD', columns = null } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = { Board, Column };
