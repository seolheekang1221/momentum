const todoForm = document.querySelector(".todo-form");
const todos = document.querySelector('#todos');

class Todo {
    constructor(id, desc, done = false) {
        this.id = id;
        this.desc = desc;
        this.done = done;
    }

    toString() {
        return `${this.id}, ${this.desc}, ${this.done}`;
    }
}

let todoList = [];

let currentTodo = '';
const LS_TODO_KEY = {
    TODOS: 'todos'
}

function renderTodo(todo) {
    return `<li class="item" data-id=${todo.id}>
    <input type="checkbox" ${todo.done && 'checked'}>
    <span class="todo" ${todo.done && 'style="text-decoration: line-through"'}>${todo.desc}</span>
    <span class="update">📝</span>
    <span class="delete">🗑️</span>
</li>`
}

function saveDataToDB() {
    localStorage.setItem(LS_TODO_KEY.TODOS, JSON.stringify(todoList));
}

function todoSubmitHandler(event) {
    event.preventDefault();

    const todoValue = this.firstElementChild.value;
    const todo = new Todo(todoList.length, todoValue, false);

    todoList.push(todo);
    saveDataToDB();
    todos.innerHTML += renderTodo(todo);
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
    console.log(todoList)
}

function todosClickHandler(e) {
    console.log(e.target, e.target.classList.contains("delete"))
    if (e.target.classList.contains("delete")) {
        const targetTodo = e.target.previousElementSibling.previousElementSibling.innerText;
        const idx = todoList.findIndex(e => e.desc === targetTodo);
        todos.removeChild(todos.children[idx]);
        todoList.splice(idx, 1);
        console.log("remove:", todoList);
        localStorage.setItem(LS_TODO_KEY.TODOS, JSON.stringify(todoList));
    } else if (e.target.nodeName === 'INPUT') {
        const idx = e.target.parentElement.dataset.id;
        if (e.target.checked) {
            todoList[idx].done = true;
            saveDataToDB();
            e.target.nextElementSibling.style.textDecoration = 'line-through';
            e.target.parentElement.lastElementChild.disabled = true;
        } else {
            todoList[idx].done = false;
            saveDataToDB();
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
            console.log(todoList)
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