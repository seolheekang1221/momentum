const todoForm = document.querySelector(".todo-form");
const todos = document.querySelector('.todos');
const todoList = [];

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

function todoSubmitHandler(event) {
    event.preventDefault();
    // Todo: firstElementChild vs firstChild
    const todoValue = this.firstElementChild.value;
    todoList.push(todoValue);
    todos.innerHTML += renderTodo(todoValue);
    this.firstElementChild.value = '';
}

function main() {
    todoForm.onsubmit = todoSubmitHandler;
    todos.innerHTML = ''
    todoList.forEach(todo => {
        todos.innerHTML += renderTodo(todo);
    })
}

main();