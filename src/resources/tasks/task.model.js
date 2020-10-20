const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'TITLE TASK',
    order = 0,
    description = 'description',
    boardId = null,
    columnId = null,
    userId = null
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.boardId = boardId;
    this.columnId = columnId;
    this.userId = userId;
  }

  static toResponse(task) {
    const { id, title, order, description, userId } = task;
    return {
      id,
      title,
      order,
      description,
      userId
    };
  }
}

module.exports = Task;
