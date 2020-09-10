const todoForm = document.querySelector(".todo-form");
const todos = document.querySelector('#todos');
let todoList = [];
let currentTodo = '';
const LS_TODO_KEY = {
    TODOS: 'todos'
}

/*
<li class="item">
    <input type="checkbox" name="" id="">
    <span class="todo">Study react and english</span>
    <span class="update">📝</span>
    <span class="delete">🗑️</span>
</li>
*/

function renderTodo(todo) {
    return `<li class="item">
    <input type="checkbox">
    <span class="todo">${todo}</span>
    <span class="update">📝</span>
    <span class="delete">🗑️</span>
</li>`
}

function saveDataToDB(todoArray) {
    localStorage.setItem(LS_TODO_KEY.TODOS, JSON.stringify(todoArray));
}

function todoSubmitHandler(event) {
    event.preventDefault();
    // Todo: firstElementChild vs firstChild
    const todoValue = this.firstElementChild.value;
    todoList.push(todoValue);
    saveDataToDB(todoList);
    todos.innerHTML += renderTodo(todoValue);
    this.firstElementChild.value = '';
}

function getDataFromDB() {
    return JSON.parse(localStorage.getItem(LS_TODO_KEY.TODOS)) || []
}

function modifiedTagToInput(e) {
    const input = document.createElement('input');
    input.value = e.innerHTML;
    input.classList.add('todo')
    currentTodo = input.value;
    return input;
}

function modifiedTagToSpan(e) {
    console.log(e);
    const span = document.createElement('span');
    span.innerText = e.value;
    span.classList.add('todo')
    return span;
}

function updateDataToTodoList(current, update) {
    const idx = todoList.findIndex(e => e === current);
    todoList[idx] = update;
}

function todosClickHandler(e) {
    console.log(e.target, e.target.classList.contains("delete"))
    if (e.target.classList.contains("delete")) {
        const targetTodo = e.target.previousElementSibling.previousElementSibling.innerText;
        // console.log(e.target.parentElement.firstElementChild.nextElementSibling.innerText)
        const idx = todoList.findIndex(e => e === targetTodo);
        todos.removeChild(todos.children[idx]);
        todoList.splice(idx, 1);
        console.log("remove:", todoList);
        localStorage.setItem(LS_TODO_KEY.TODOS, JSON.stringify(todoList));
    } else if (e.target.nodeName === 'INPUT') {
        if (e.target.checked) {
            // css => text-decoration: line-through;
            e.target.nextElementSibling.style.textDecoration = 'line-through';
            // const deleteButton = e.target.parentElement.querySelector('.delete');
            // deleteButton.disabled = true;
            e.target.parentElement.lastElementChild.disabled = true;
        } else {
            e.target.nextElementSibling.style.textDecoration = '';
            e.target.parentElement.lastElementChild.disabled = false;
        }
    } else if (e.target.classList.contains("update")) {
        let updatedElement;
        if (e.target.previousElementSibling.nodeName === 'SPAN') {
            updatedElement = modifiedTagToInput(e.target.previousElementSibling);
        } else {
            updatedElement = modifiedTagToSpan(e.target.previousElementSibling);
            updateDataToTodoList(currentTodo, updatedElement.innerHTML);
            saveDataToDB();
        }
        console.log(updatedElement)
        e.target.parentElement.replaceChild(updatedElement, e.target.parentElement.children[1]);
    }
}

function main() {
    todoList = getDataFromDB();
    todoForm.onsubmit = todoSubmitHandler;
    todos.innerHTML = ''
    todos.onclick = todosClickHandler;
    todoList.forEach(todo => {
        todos.innerHTML += renderTodo(todo);
    })
}

main();