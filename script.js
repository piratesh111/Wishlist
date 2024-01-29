
let todoInput = document.querySelector(".input");
let addTodoButton = document.querySelector(".button");
let todo;

let localData = JSON.parse(localStorage.getItem("todo"));
let todoList = localData || [];
let showTodos = document.querySelector(".todos-container")


/** Creating unique id function */

function uid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (param) {
        let number = Math.random()*16 | 0
        let randomNumber = param == 'x' ? number : (number & 0x3 | 0x8);
            return randomNumber.toString(16);
        
    })
}

addTodoButton.addEventListener("click",(event)=>{
    event.preventDefault();
    todo = todoInput.value;
    if (todo.length>0){
        todoList.push({id: uid(), todo, isCompleted: false})
    }
    renderTodolist(todoList);
    localStorage.setItem("todo", JSON.stringify(todoList));
    todoInput.value = "";
});

showTodos.addEventListener("click", (event)=>{
    let key = event.target.dataset.key;
    let delTodoKey = event.target.dataset.todokey
    todoList = todoList.map(todo => todo.id === key ? {...todo, isCompleted: !todo.isCompleted} : todo);
    todoList = todoList.filter(todo => todo.id !== delTodoKey)
    renderTodolist(todoList);
    localStorage.setItem("todo",JSON.stringify(todoList))
    console.log(todoList)
})

function renderTodolist(todoList){
    console.log(todoList)
    showTodos.innerHTML = todoList.map(({id, todo, isCompleted}) => `<div class="relative"><input class="t-checkbox t-pointer" id="item-${id}"
    type="checkbox" data-key=${id} ${isCompleted ? "checked": ""}><label for="item-${id}"
     class="todo todo-text t-pointer ${isCompleted ? "checked-todo" : ""}" data-key=${id}>${todo}
     </label><button class="absolute right-0 button cursor" ><span data-todokey=${id} class="material-icons-outlined">
     delete
     </span></button></div>`)
}

renderTodolist(todoList)