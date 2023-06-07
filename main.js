const addItemBtn = document.getElementById("add-item");
const remaingTodosList = document.getElementById("remaing-list");
const completedTodosList = document.getElementById("done-list");

const remaingTodos = [
  { todoName: "drink water", description: "I like water" },
  { todoName: "drink tea", description: "I like tea" },
  { todoName: "drink cofee", description: "I like cofee" },
];

const doneTodos = [
  { todoName: "do break fast", description: "I love breakfast" },
];

renderItemsToPage();

// const checkIcon = document.getElementById("check-icon");
// const crossIcon = document.getElementById("cross-icon");

function addTodo(e) {
  e.preventDefault();
  const todoName = document.getElementById("todo-name").value;
  const description = document.getElementById("todo-description").value;

  const data = {
    todoName,
    description,
  };
  itemsArr.push(data);

  remaingTodosList.innerHTML = "";
  renderItemsToPage();

  document.getElementById("todo-name").value = "";
  document.getElementById("todo-description").value = "";

  document.getElementById("todo-name").focus();
}
function renderItemsToPage() {
  remaingTodos.forEach((item) => {
    const todoItem = document.createElement("li");
    todoItem.innerHTML = `${item.todoName}--${item.description}
    <button id="check-icon"><i class="fa-solid fa-check my-icon"></i></button>
    <button id="cross-icon"><i class="fa-solid fa-xmark my-icon"></i></button>`;
    remaingTodosList.appendChild(todoItem);
  });

  doneTodos.forEach((item) => {
    const todoItem = document.createElement("li");
    todoItem.innerHTML = `${item.todoName}--${item.description}
    <button id="cross-icon"><i class="fa-solid fa-xmark my-icon"></i></button>`;
    completedTodosList.appendChild(todoItem);
  });
}

function markTodoAsDone(e) {
  if (e.target.className === "fa-solid fa-check my-icon") {
  }
}
addItemBtn.addEventListener("click", addTodo);
remaingTodosList.addEventListener("click", markTodoAsDone);

// checkIcon.addEventListener("click", markTodoAsDone);