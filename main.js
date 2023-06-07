const addItemBtn = document.getElementById("add-item");
const remaingTodosList = document.getElementById("remaing-list");
const completedTodosList = document.getElementById("done-list");

async function getRemaingTodos() {
  return new Promise(async () => {
    const remaingTodosArr = await axios.get(
      "https://crudcrud.com/api/2ac6bca2acf54022b8212376dca21487/remaingTodos"
    );
    const remaingTodos = remaingTodosArr.data;
    console.log("remaing todos called!!!!");
    return remaingTodos;
  });
}
async function getDoneTods() {
  return new Promise(async () => {
    const doneTodosArr = await axios.get(
      "https://crudcrud.com/api/2ac6bca2acf54022b8212376dca21487/doneTodos"
    );
    const doneTodos = doneTodosArr.data;
    console.log("done todos called !!!");
    return doneTodos;
  });
}
// const remaingTodos = [
//   { todoName: "drink water", description: "I like water" },
//   { todoName: "drink tea", description: "I like tea" },
//   { todoName: "drink cofee", description: "I like cofee" },
// ];

// const doneTodos = [
//   { todoName: "do break fast", description: "I love breakfast" },
// ];

async function addTodo(e) {
  e.preventDefault();
  try {
    const todoName = document.getElementById("todo-name").value;
    const description = document.getElementById("todo-description").value;

    let response = await axios.post(
      "https://crudcrud.com/api/2ac6bca2acf54022b8212376dca21487/remaingTodos",
      {
        todoName,
        description,
      }
    );
    //   const data = {
    //     todoName,
    //     description,
    //   };
    //   remaingTodos.push(data);

    remaingTodosList.innerHTML = "";
    renderItemsToPage();

    document.getElementById("todo-name").value = "";
    document.getElementById("todo-description").value = "";

    document.getElementById("todo-name").focus();
  } catch (e) {
    console.log(e);
  }
}

async function renderItemsToPage() {
  try {
    const remaingTodos = await getRemaingTodos();
    remaingTodosList.innerHTML = "";
    remaingTodos.forEach((item) => {
      const todoItem = document.createElement("li");
      todoItem.innerHTML = `${item.todoName}--${item.description}
      <button id="check-icon"><i class="fa-solid fa-check my-icon"></i></button>
      <button id="cross-icon"><i class="fa-solid fa-xmark my-icon"></i></button>`;
      remaingTodosList.appendChild(todoItem);
    });

    const doneTodos = await getDoneTods();

    completedTodosList.innerHTML = "";
    doneTodos.forEach((item) => {
      const todoItem = document.createElement("li");
      todoItem.innerHTML = `${item.todoName}--${item.description}
      <button id="cross-icon"><i class="fa-solid fa-xmark my-icon"></i></button>`;
      completedTodosList.appendChild(todoItem);
    });
  } catch (e) {
    console.log(e);
  }
}

async function handleSaveAndDelete(e) {
  if (e.target.className === "fa-solid fa-check my-icon") {
    try {
      let [todoName, description] =
        e.target.parentElement.parentElement.innerText.split("--");
      const remaingTodos = await getRemaingTodos();

      let itemIndex;
      remaingTodos.forEach((item, index) => {
        if (item.todoName === todoName) {
          // itemIndex = index;
          itemIndex = item._id;
        }
      });
      // remaingTodos.splice(itemIndex, 1);
      let response = await axios.delete(
        "https://crudcrud.com/api/2ac6bca2acf54022b8212376dca21487/remaingTodos/" +
          itemIndex
      );

      let response1 = await axios.post(
        "https://crudcrud.com/api/2ac6bca2acf54022b8212376dca21487/doneTodos",
        {
          todoName,
          description,
        }
      );
      // let data = {
      //   todoName,
      //   description,
      // };
      // doneTodos.push(data);
      renderItemsToPage();
    } catch (e) {
      console.log(e);
    }
  } else if (e.target.className === "fa-solid fa-xmark my-icon") {
    try {
      let [todoName, description] =
        e.target.parentElement.parentElement.innerText.split("--");

      const remaingTodos = await getRemaingTodos();
      let itemIndex;
      remaingTodos.forEach((item, index) => {
        if (item.todoName === todoName) {
          // itemIndex = index;
          itemIndex = item._id;
        }
      });
      // remaingTodos.splice(itemIndex, 1);
      let response2 = await axios.delete(
        "https://crudcrud.com/api/2ac6bca2acf54022b8212376dca21487/remaingTodos/" +
          itemIndex
      );
      renderItemsToPage();
    } catch (e) {
      console.log(e);
    }
  }
}

async function deleteTodoFromCompltedList(e) {
  if (e.target.className === "fa-solid fa-xmark my-icon") {
    try {
      let [todoName, description] =
        e.target.parentElement.parentElement.innerText.split("--");

      const doneTodos = await getDoneTods();
      let itemIndex;
      doneTodos.forEach((item, index) => {
        if (item.todoName === todoName) {
          // itemIndex = index;
          itemIndex = item._id;
        }
      });
      // doneTodos.splice(itemIndex, 1);
      let response4 = axios.delete(
        "https://crudcrud.com/api/2ac6bca2acf54022b8212376dca21487/doneTodos/" +
          itemIndex
      );
      renderItemsToPage();
    } catch (e) {
      console.log(e);
    }
  }
}
addItemBtn.addEventListener("click", addTodo);
remaingTodosList.addEventListener("click", handleSaveAndDelete);
completedTodosList.addEventListener("click", deleteTodoFromCompltedList);
// renderItemsToPage();

async function getArrs() {
  const remaingArr = await getRemaingTodos();
  const doneArr = await getDoneTods();

  console.log(remaingArr);
  console.log(doneArr);
}
getArrs();
