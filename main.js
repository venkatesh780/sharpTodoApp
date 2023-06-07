const addItemBtn = document.getElementById("add-item");
const remaingTodosList = document.getElementById("remaing-list");
const completedTodosList = document.getElementById("done-list");
const updatItemBtn = document.getElementById("update-item");

updatItemBtn.style.display = "none";

async function addTodo(e) {
  e.preventDefault();
  try {
    const todoName = document.getElementById("todo-name").value;
    const description = document.getElementById("todo-description").value;

    let response = await axios.post(
      "https://crudcrud.com/api/08391bf90ba04ac7964e6f81b21e06b5/remaingTodos",
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
    const remaingTodosArr = await axios.get(
      "https://crudcrud.com/api/08391bf90ba04ac7964e6f81b21e06b5/remaingTodos"
    );
    const remaingTodos = remaingTodosArr.data;

    remaingTodosList.innerHTML = "";
    remaingTodos.forEach((item) => {
      const todoItem = document.createElement("li");
      todoItem.innerHTML = `${item.todoName}--${item.description}
      <button id="check-icon"><i class="fa-solid fa-check my-icon"></i></button>
      <button id="cross-icon"><i class="fa-solid fa-xmark my-icon"></i></button>
      <button id="edit-icon"><i class="fa-solid fa-pen-to-square my-icon"></i></button>`;
      remaingTodosList.appendChild(todoItem);
    });

    const doneTodosArr = await axios.get(
      "https://crudcrud.com/api/08391bf90ba04ac7964e6f81b21e06b5/doneTodos"
    );
    const doneTodos = doneTodosArr.data;

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
async function handleEdit(itemIndex) {
  const todoName = document.getElementById("todo-name").value;
  const description = document.getElementById("todo-description").value;

  let response = await axios.put(
    "https://crudcrud.com/api/08391bf90ba04ac7964e6f81b21e06b5/remaingTodos/" +
      itemIndex,
    {
      todoName,
      description,
    }
  );

  renderItemsToPage();

  updatItemBtn.style.display = "none";
  addItemBtn.style.display = "block";

  document.getElementById("todo-name").value = "";
  document.getElementById("todo-description").value = "";
}
async function handleSaveAndDeleteEdit(e) {
  if (e.target.className === "fa-solid fa-check my-icon") {
    try {
      let [todoName, description] =
        e.target.parentElement.parentElement.innerText.split("--");
      const remaingTodosArr = await axios.get(
        "https://crudcrud.com/api/08391bf90ba04ac7964e6f81b21e06b5/remaingTodos"
      );
      const remaingTodos = remaingTodosArr.data;

      let itemIndex;
      remaingTodos.forEach((item, index) => {
        if (item.todoName === todoName) {
          // itemIndex = index;
          itemIndex = item._id;
        }
      });
      // remaingTodos.splice(itemIndex, 1);
      let response = await axios.delete(
        "https://crudcrud.com/api/08391bf90ba04ac7964e6f81b21e06b5/remaingTodos/" +
          itemIndex
      );

      let response1 = await axios.post(
        "https://crudcrud.com/api/08391bf90ba04ac7964e6f81b21e06b5/doneTodos",
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

      const remaingTodosArr = await axios.get(
        "https://crudcrud.com/api/08391bf90ba04ac7964e6f81b21e06b5/remaingTodos"
      );
      const remaingTodos = remaingTodosArr.data;
      let itemIndex;
      remaingTodos.forEach((item, index) => {
        if (item.todoName === todoName) {
          // itemIndex = index;
          itemIndex = item._id;
        }
      });
      // remaingTodos.splice(itemIndex, 1);
      let response2 = await axios.delete(
        "https://crudcrud.com/api/08391bf90ba04ac7964e6f81b21e06b5/remaingTodos/" +
          itemIndex
      );
      renderItemsToPage();
    } catch (e) {
      console.log(e);
    }
  } else if (e.target.className === "fa-solid fa-pen-to-square my-icon") {
    addItemBtn.style.display = "none";
    updatItemBtn.style.display = "block";
    let [todoName, description] =
      e.target.parentElement.parentElement.innerText.split("--");

    const remaingTodosArr = await axios.get(
      "https://crudcrud.com/api/08391bf90ba04ac7964e6f81b21e06b5/remaingTodos"
    );
    const remaingTodos = remaingTodosArr.data;
    let itemIndex;
    remaingTodos.forEach((item, index) => {
      if (item.todoName === todoName) {
        // itemIndex = index;
        itemIndex = item._id;
      }
    });
    document.getElementById("todo-name").value = todoName;
    document.getElementById("todo-description").value = description;

    updatItemBtn.addEventListener("click", (e) => {
      e.preventDefault();
      handleEdit(itemIndex);
    });
  }
}

async function deleteTodoFromCompltedList(e) {
  if (e.target.className === "fa-solid fa-xmark my-icon") {
    try {
      let [todoName, description] =
        e.target.parentElement.parentElement.innerText.split("--");

      const doneTodosArr = await axios.get(
        "https://crudcrud.com/api/08391bf90ba04ac7964e6f81b21e06b5/doneTodos"
      );
      const doneTodos = doneTodosArr.data;
      let itemIndex;
      doneTodos.forEach((item, index) => {
        if (item.todoName === todoName) {
          // itemIndex = index;
          itemIndex = item._id;
        }
      });
      // doneTodos.splice(itemIndex, 1);
      let response4 = axios.delete(
        "https://crudcrud.com/api/08391bf90ba04ac7964e6f81b21e06b5/doneTodos/" +
          itemIndex
      );
      renderItemsToPage();
    } catch (e) {
      console.log(e);
    }
  }
}

addItemBtn.addEventListener("click", addTodo);
remaingTodosList.addEventListener("click", handleSaveAndDeleteEdit);
completedTodosList.addEventListener("click", deleteTodoFromCompltedList);
renderItemsToPage();
