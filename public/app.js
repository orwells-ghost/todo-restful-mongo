document.addEventListener('DOMContentLoaded', e => {
    fetch('/api/todos')
        .then(handleErrors)
        .then(parseJSON)
        .then(addTodos)
        .catch(displayErrors);
    
    document.getElementById('todoInput').addEventListener('keypress', e => {
        if (e.which == 13) { createTodo() };
    });

    document.querySelector('.list').addEventListener('click', e => {
        if (e.target && e.target.nodeName == 'SPAN'){
            removeTodo(e.target.parentNode);
        };
        if (e.target && e.target.nodeName == 'LI') {
            updateTodo(e.target);
        };
    });
});

const handleErrors = res => {
    if (!res.ok) {
        throw Error(res.status)
    }
    return res;
}

const parseJSON = res => res.json();

const addTodos = todos => todos.forEach(todo => addTodo(todo));
    
const displayErrors = error => console.log(error);

const addTodo = todo => {
    const newTodo = `
        <li id="${todo._id}" data-completed="${todo.completed}" class="task${todo.completed ? ' done' : ''}">${todo.name}<span>X</span></li>
    `;
    document.querySelector('.list').insertAdjacentHTML('afterbegin', newTodo);
}

const createTodo = () => {
    const userInput = document.getElementById('todoInput').value;
    fetch('/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: userInput })
    })
        // After successfully posting the new todo, it will be returned
        .then(parseJSON)
        .then(newTodo => {
            document.getElementById('todoInput').value = '';
            addTodo(newTodo)
        })
        .catch(err => console.log(err))
}

const removeTodo = todo => {
    const clickedId = todo.id;
    const deleteUrl = '/api/todos/' + clickedId;
    fetch(deleteUrl, {
        method: 'DELETE',
    })
        .then(data => todo.parentNode.removeChild(todo))
        .catch(err => console.log(err));
}

const updateTodo = todo => {
    const clickedId = todo.id;
    const updateUrl = '/api/todos/' + clickedId;
    const isDone = !(todo.dataset.completed == 'true');
    fetch(updateUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            completed: isDone
        })
    })
        .then(updateTodo => {
            todo.classList.toggle('done');
            todo.dataset.completed = isDone;

        })
        .catch(err => console.log(err));
}