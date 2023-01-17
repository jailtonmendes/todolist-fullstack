
const tbody = document.querySelector("tbody");
const addForm = document.querySelector('.add-form');
const inputTask = document.querySelector('.input-task');

// BUSCAR TAREFAS NO BANCO DE DADOS
const fetchTasks = async () => {
    const response = await fetch('http://localhost:3333/tasks');
    const tasks = await response.json();
    return tasks;
}

// ADICIONAR TAREFA
const addTask = async (event) => {
    // Anulando movimento padrão de atualizar página
    event.preventDefault();

    const task = { title: inputTask.value}
    
    await fetch('http://localhost:3333/tasks', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task),
    });

    loadTasks();

    inputTask.value = '';
}


// DELETAR TAREFA
const deleteTask = async (id) => {
    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'delete',
    });

    loadTasks();

}

// ATUALIAR TAREFA
const updateTask = async ({ id, title, status }) => {

    await fetch(`http://localhost:3333/tasks/${id}`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ title, status }),
    });

    loadTasks();

}


// FORMATAR DATA
const formatDate = (dateUTC) => {
    const options = { dateStyle: 'long', timeStyle: 'short'};
    const date = new Date(dateUTC).toLocaleString('pt-br', options);
    return date;
}



// FUNÇÃO PARA CRIAR ELEMENTO NO HTML
const createElement = (tag, innerText = '', innerHTML = '') => {
    const element = document.createElement(tag);

    if(innerText) {
        element.innerText = innerText;
    }

    if(innerHTML) {
        element.innerHTML = innerHTML;
    }

    return element;
}


const createSelect = (value) => {
    const options = `
     <option value="pendente">pendente</option>
     <option value="em andamento">em andamento</option>
     <option value="concluida">concluida</option> 
    `;

    const select = createElement('select', '', options);

    select.value = value;

    return select;

}


const task = {
    id: 1,
    title: 'inscreva-se no ',
    created_at: '00 JAN DE 2023 00:12',
    status: 'concluida'
}

// MONTAR ESTRUTURA HTML
const createRow = (task) => {

    const {id, title, created_at, status } = task;

    const tr = createElement('tr');
    const tdTitle = createElement('td', title);
    const tdCreatedAt = createElement('td', formatDate(created_at));
    const tdStatus = createElement('td');
    const tdActions = createElement('td');

    const select = createSelect(status);

    // CHAMANDO FUNÇÃO AO ALTERAR VALOR DO SELECT
    select.addEventListener('change', ({ target }) => updateTask({ ...task, status: target.value}))

   const editButton = createElement('button', '', '<span class="material-symbols-outlined">edit</span>');
   const deletetButton = createElement('button', '', '<span class="material-symbols-outlined">delete</span>');

   const editForm = createElement('form');
   const editInput = createElement('input');

   editForm.addEventListener('submit', (event) => {
        event.preventDefault();

        updateTask({ id, title: editInput.value, status });
   })
   
   //EDITANDO CAMPO TITULO
   editInput.value = title;
   editForm.appendChild(editInput);
   editButton.addEventListener('click', () => {
        tdTitle.innerText = '';
        tdTitle.appendChild(editForm);
   })

   editButton.classList.add('btn-action');
   deletetButton.classList.add('btn-action');

//    CHAMADO FUNÇÃO DE DELETAR TASK
   deletetButton.addEventListener('click', () => { deleteTask(id)});

   tdActions.appendChild(editButton);
   tdActions.appendChild(deletetButton);

   tdStatus.appendChild(select);

   //MONTANDO TABELA
   tr.appendChild(tdTitle);
   tr.appendChild(tdCreatedAt);
   tr.appendChild(tdStatus);
   tr.appendChild(tdActions);

    return tr;
//    tbody.appendChild(tr);
}

// CHAMANDO FUNÇÃO E CRIANDO TABELA
const loadTasks = async () => {
    const tasks = await fetchTasks();

    tbody.innerHTML = '';

    tasks.forEach((task) => {
        const tr = createRow(task);
        tbody.appendChild(tr);
    });
}

// EXECUTANDO FUNÇÃO DE ADD TAREFA
addForm.addEventListener('submit', addTask);

loadTasks();