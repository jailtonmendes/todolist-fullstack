const { response } = require('express');
const taskModel = require('../models/tasksModel');

// LISTAR TODAS AS TAREFAS
const getAll = async (_request, response) => {

    const tasks = await taskModel.getAll();

    return response.status(200).json(tasks); 
};

const createTask = async (request, response) => {
    // CRIANDO TAREFA
    const createdTask = await taskModel.createTask(request.body);

    // RETORNANDO TAREFA - RETORNO DO MÉTODO
    return response.status(201).json(createdTask);
};


// DELETANDO TAREFA
const deleteTask = async (request, response) => {

    const { id } = request.params;
    await taskModel.deleteTask(id);
    return response.status(204).json();
};


// ATUALIZANDO TAREFA
const updateTask = async (request, response) => {

    const { id } = request.params;

    await taskModel.updateTask(id, request.body);
    return response.status(204).json();
};



module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask
};