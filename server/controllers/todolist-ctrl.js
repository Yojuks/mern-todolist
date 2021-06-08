const TodoItem = require('../models/todolist-model');

createTodoItem = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a todoitem',
    });
  }

  const todoitem = new TodoItem(body);

  if (!todoitem) {
    return res.status(400).json({ success: false, error: err });
  }

  todoitem
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: todoitem._id,
        message: 'TodoItem created!',
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: 'TodoItem not created!',
      });
    });
};

updateTodoitem = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a body to update',
    });
  }

  TodoItem.findOne({ _id: req.params.id }, (err, todoitem) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'TodoItem not found!',
      });
    }
    todoitem.isDone = body.isDone;
    todoitem.title = body.title;
    todoitem
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: todoitem._id,
          message: 'TodoItem updated!',
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: 'TodoItem not updated!',
        });
      });
  });
};

deleteTodoitem = async (req, res) => {
  await TodoItem.findOneAndDelete({ _id: req.params.id }, (err, todoitem) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!todoitem) {
      return res.status(200).json({ success: false, error: `TodoItem not found`, data: [] });
    }

    return res.status(200).json({ success: true, data: todoitem });
  }).catch((err) => console.log(err));
};

deleteCompeteItems = async (req, res) => {
  const body = req.body.list;
  let myquery = { _id: { $in: body } };

  await TodoItem.deleteMany(myquery, (err, todoitem) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!todoitem) {
      return res.status(404).json({ success: false, error: `TodoItem not found` });
    }

    return res.status(200).json({ success: true });
  }).catch((err) => console.log(err));
};

getTodoById = async (req, res) => {
  await TodoItem.findOne({ _id: req.params.id }, (err, todoitem) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!todoitem) {
      return res.status(404).json({ success: false, error: `Movie not found` });
    }
    return res.status(200).json({ success: true, data: todoitem });
  }).catch((err) => console.log(err));
};

getTodoItems = async (req, res) => {
  await TodoItem.find({}, (err, todoitem) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }
    if (!todoitem.length) {
      return res.status(200).json({ success: false, error: `Movie not found`, data: [] });
    }
    return res.status(200).json({ success: true, data: todoitem });
  }).catch((err) => console.log(err));
};

module.exports = {
  createTodoItem,
  updateTodoitem,
  deleteTodoitem,
  getTodoItems,
  getTodoById,
  deleteCompeteItems,
};
