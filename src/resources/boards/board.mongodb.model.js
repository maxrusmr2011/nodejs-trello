const uuid = require('uuid');
const mongoose = require('mongoose');

const boardSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    title: {
      type: String,
      default: 'BOARD TITLE (mongodb)'
    },
    columns: {
      type: Object,
      default: null
    }
  },
  { versionKey: false }
);

boardSchema.statics.toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};
class Column {
  constructor({ id = uuid(), title = 'TITLE COLUMN', order = 0 } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

const Board = mongoose.model('Board', boardSchema);

module.exports = { Board, Column };
