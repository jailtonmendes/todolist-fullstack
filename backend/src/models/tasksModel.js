const connection = require('./connection');

// CAMADA DE module, FUNÇÕES BAIXA, QUE VAI CONECTAR DIRETO COM O BANCO

// RETORNAR TODAS AS TAREFAS
const getAll = async () => {

    const tasks = await connection.execute('SELECT * FROM tasks');
    return tasks[0];

};

// CRIAR TAREFA
const createTask = async (task) => {

    const { title } = task;

    const dateUTC = new Date(Date.now()).toUTCString();

    const query = 'INSERT INTO tasks(title, status, created_at) VALUES (?, ?, ?)';

    const [createdTask] = await connection.execute(query, [title, 'pendente', dateUTC]);

    return {insertId: createdTask.insertId};
}


// DELETAR TAREFA
const deleteTask = async (id) => {

    const removedTask = await connection.execute('DELETE FROM tasks WHERE id = ?', [id])
    return removedTask;
}


// ATUALIZAR TAREFA
const updateTask = async (id, task) => {

    const { title, status } = task;

    const query = 'UPDATE tasks SET title = ?, status = ? WHERE id = ?';

    const updateTask = await connection.execute(query, [title, status, id]);

    return updateTask;
}



module.exports = {
    getAll,
    createTask,
    deleteTask,
    updateTask
};