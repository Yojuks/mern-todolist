const mongoose = require('mongoose');

const connectionString =
  'mongodb://root:rootpassword@mongo:27017/todolist?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false';

mongoose.connect(connectionString, { useNewUrlParser: true }).catch((e) => {
  console.error('Connection error', e.message);
});

const db = mongoose.connection;

module.exports = db;
