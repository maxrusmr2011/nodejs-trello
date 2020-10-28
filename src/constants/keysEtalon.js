module.exports = {
  user: {
    name: 'User',
    list: { name: 'string', login: 'string', password: 'string' }
  },
  board: { name: 'Board', list: { title: 'string', columns: 'object' } },
  task: {
    name: 'Task',
    list: {
      title: 'string',
      order: 'number',
      description: 'string',
      boardId: 'string',
      columnId: 'string',
      userId: 'string'
    }
  },
  columns: { name: 'Columns', list: { title: 'string', order: 'number' } }
};
