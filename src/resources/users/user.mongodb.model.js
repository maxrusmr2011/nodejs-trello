const uuid = require('uuid');
const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuid
    },
    name: {
      type: String,
      default: 'USER (mongodb)'
    },
    login: {
      type: String,
      default: 'user'
    },
    password: {
      type: String,
      default: 'P@55w0rd'
    }
  },
  { versionKey: false }
);

userSchema.statics.toResponse = user => {
  const { id, name, login } = user;
  return { id, name, login };
};

const User = mongoose.model('User', userSchema);

module.exports = User;
