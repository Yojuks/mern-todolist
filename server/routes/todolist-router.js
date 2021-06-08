const express = require('express');

const TodolistCtrl = require('../controllers/todolist-ctrl');

const router = express.Router();

router.post('/todolist', TodolistCtrl.createTodoItem);
router.put('/todolist/:id', TodolistCtrl.updateTodoitem);
router.delete('/todolist/:id', TodolistCtrl.deleteTodoitem);
router.get('/todolist/:id', TodolistCtrl.getTodoById);
router.get('/todolists', TodolistCtrl.getTodoItems);
router.post('/kill', TodolistCtrl.deleteCompeteItems);

module.exports = router;
