const uuid = require('uuid');
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: {
      type: String,
      default: 'TITLE TASK (mongodb)'
    },
    description: {
      type: String,
      default: 'description'
    },
    order: {
      type: Number,
      default: 0
    },
    boardId: {
      type: String,
      default: null
    },
    columnId: {
      type: String,
      default: null
    },
    userId: {
      type: String,
      default: null
    }
  },
  { versionKey: false }
);

taskSchema.statics.toResponse = task => {
  const { id, title, order, description, userId, boardId, columnId } = task;
  return {
    id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  };
};

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
