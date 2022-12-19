//Selectors used are querySelector
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

//Event Listeners
document.addEventListener("DOMContentLoaded",getTodos)
todoButton.addEventListener("click", addItem)
todoList.addEventListener("click", deleteItem)
filterOption.addEventListener("click", filterTodo)

//Functions
function addItem(e) {
    e.preventDefault()
    //Todo DIV
    const todoDiv = document.createElement('div')
    todoDiv.classList.add("todo")

    // create LI
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-item')

    // Append into Div
    todoDiv.appendChild(newTodo)

    //ADD TODO to localstorage
    saveLocalTodos(todoInput.value)

    //Check Mark Button
    const completeButton = document.createElement('button')
    completeButton.innerHTML = '<i class="fas fa-check"></i>'
    completeButton.classList.add("complete-btn")

    // Append into Div
    todoDiv.appendChild(completeButton)

    //Delete Mark Button
    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn")

    // Append into Div
    todoDiv.appendChild(trashButton)

    //Append to list
    todoList.appendChild(todoDiv)
    console.log(todoList)

    //clear Todo Input value
    todoInput.value = ""
}


function deleteItem(e) {
    const item = e.target
    //Delete TODO
    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement
        todo.classList.add('fall')
        removeLocalTodos(todo)
        todo.addEventListener('transitioned', () => {
            todo.remove()
        })
    }

    //check Mark
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement
        todo.classList.toggle('completed')
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex"
                break;
            case "completed":
                if (todo.classList.contains('completed')) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('uncompleted')) {
                    todo.style.display = "flex"
                } else {
                    todo.style.display = "none"
                }
        }
    })
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.forEach(function (todo) {
        //Todo DIV
        const todoDiv = document.createElement('div')
        todoDiv.classList.add("todo")

        // create LI
        const newTodo = document.createElement('li')
        newTodo.innerText = todo
        newTodo.classList.add('todo-item')

        // Append into Div
        todoDiv.appendChild(newTodo)

        //Check Mark Button
        const completeButton = document.createElement('button')
        completeButton.innerHTML = '<i class="fas fa-check"></i>'
        completeButton.classList.add("complete-btn")

        // Append into Div
        todoDiv.appendChild(completeButton)

        //Delete Mark Button
        const trashButton = document.createElement('button')
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add("trash-btn")

        // Append into Div
        todoDiv.appendChild(trashButton)

        //Append to list
        todoList.appendChild(todoDiv)
        console.log(todoList)
    })
}

function removeLocalTodos(todo){
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1)
    localStorage.setItem("todos",JSON.stringify(todos))
}
