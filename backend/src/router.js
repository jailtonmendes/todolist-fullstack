const { Router } = require('express');
const express = require('express');
const tasksController = require('./controllers/tasksController');
const tasksMiddleware = require('./middlewares/tasksMiddleware');

const router = express.Router();

// LISTAR TAREFAS
router.get('/tasks', tasksController.getAll);

// CADASTRAR TAREFA
router.post('/tasks', tasksMiddleware.validateFieldTitle, tasksController.createTask);


// DELETAR TAREFA
router.delete('/tasks/:id', tasksController.deleteTask);

// ATUALIZAR TAREFA
router.put('/tasks/:id', tasksMiddleware.validateFieldTitle, tasksMiddleware.validateFieldStatus, tasksController.updateTask);


module.exports = router;