const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoItem = new Schema(
  {
    title: { type: String, required: true },
    isDone: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('todolist', TodoItem);
