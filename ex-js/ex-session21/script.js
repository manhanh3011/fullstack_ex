//BÀI TẬP: TODO LIST BẰNG JAVASCRIPT THUẦN (VANILLA JS)
  
// BƯỚC 0: LẤY CÁC PHẦN TỬ DOM CẦN DÙNG
const addForm = document.getElementById("add-form");
const todoInput = document.getElementById("todo-input");
const todoListEl = document.getElementById("todo-list");
const emptyStateEl = document.getElementById("empty-state");
const itemsLeftEl = document.getElementById("items-left");
const clearCompletedBtn = document.getElementById("clear-completed");
const filtersEl = document.getElementById("filters");

// BƯỚC 1: STATE (DỮ LIỆU CỦA APP)
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

// BƯỚC 2: CÁC HÀM XỬ LÝ DỮ LIỆU
// TODO 2.1: Viết hàm saveTodos()
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// TODO 2.2: Viết hàm addTodo(text)
function addTodo(text) {
  const newTodo = {
    id: Date.now(),
    text: text,
    completed: false
  };
  todos.push(newTodo);
  saveTodos();
  render();
}

// TODO 2.3: Viết hàm deleteTodo(id)
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  render();
}

// TODO 2.4: Viết hàm toggleTodo(id)
function toggleTodo(id) {
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
    render();
  }
}

// TODO 2.5: Viết hàm editTodo(id, newText)
function editTodo(id, newText) {
  const text = newText.trim();
  if (!text) {
    deleteTodo(id);
    return;
  }
  
  const todo = todos.find((todo) => todo.id === id);
  if (todo) {
    todo.text = text;
    saveTodos();
    render();
  }
}

// TODO 2.6: Viết hàm clearCompleted()
function clearCompleted() {
  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  render();
}

// BƯỚC 3: RENDER (VẼ DANH SÁCH RA MÀN HÌNH)
// TODO 3.1: Viết hàm getFilteredTodos()
function getFilteredTodos() {
  if (currentFilter === "active") {
    return todos.filter((todo) => !todo.completed);
  } else if (currentFilter === "completed") {
    return todos.filter((todo) => todo.completed);
  }
  return todos;
}

// TODO 3.2: Viết hàm render()
function render() {
  todoListEl.innerHTML = "";
  const filteredTodos = getFilteredTodos();
  const template = document.getElementById("todo-item-template");

  filteredTodos.forEach((todo) => {
    const clone = template.content.cloneNode(true);
    const li = clone.querySelector("li");
    li.dataset.id = todo.id;

    if (todo.completed) {
      li.classList.add("is-completed");
    }

    const textSpan = clone.querySelector(".todo-item__text");
    textSpan.textContent = todo.text;

    const checkBtn = clone.querySelector(".todo-item__check");
    checkBtn.addEventListener("click", () => toggleTodo(todo.id));

    const deleteBtn = clone.querySelector(".todo-item__delete");
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

    const editBtn = clone.querySelector(".todo-item__edit");
    editBtn.addEventListener("click", () => {
      // Đang sửa rồi thì không tạo thêm ô input nữa
      if (textSpan.style.display === "none") return;
      
      textSpan.style.display = "none";
      editBtn.style.display = "none";
      
      // Tạo ô input mới
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = todo.text;
      
      editInput.style.flex = "1";
      editInput.style.padding = "4px 8px";
      editInput.style.margin = "0 10px";
      editInput.style.fontSize = "inherit";
      editInput.style.fontFamily = "inherit";
      editInput.style.border = "1px solid #ccc";
      editInput.style.borderRadius = "4px";
      editInput.style.outline = "none";
      
      // Chèn input vào đúng vị trí trước nút Edit
      li.insertBefore(editInput, editBtn);
      
      editInput.focus();
      
      // Lắng nghe phím Enter và Esc
      editInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          editTodo(todo.id, editInput.value);
        } else if (e.key === "Escape") {
          render();
        }
      });
    });

    todoListEl.appendChild(clone);
  });

  if (filteredTodos.length === 0) {
    emptyStateEl.style.display = "block";
  } else {
    emptyStateEl.style.display = "none";
  }

  updateItemsLeft();
}

// TODO 3.3: Viết hàm updateItemsLeft()
function updateItemsLeft() {
  const activeCount = todos.filter((todo) => !todo.completed).length;
  itemsLeftEl.textContent = `${activeCount} việc còn lại`;
}

// BƯỚC 4: GẮN SỰ KIỆN (EVENT LISTENERS)
// TODO 4.1: Lắng nghe sự kiện "submit" trên addForm
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = todoInput.value.trim();
  if (!text) return;

  addTodo(text);
  todoInput.value = "";
});

// TODO 4.2: Lắng nghe sự kiện "click" trên clearCompletedBtn
clearCompletedBtn.addEventListener("click", () => {
  clearCompleted();
});

// TODO 4.3: Lắng nghe sự kiện "click" trên filtersEl (event delegation)
filtersEl.addEventListener("click", (e) => {
  if (e.target.classList.contains("filters__btn")) {
    const btns = filtersEl.querySelectorAll(".filters__btn");
    btns.forEach((btn) => btn.classList.remove("is-active"));
    e.target.classList.add("is-active");

    currentFilter = e.target.dataset.filter;
    render();
  }
});

// BƯỚC 5: KHỞI CHẠY APP
// TODO 5.1: Hiển thị ngày hôm nay vào phần tử #today-date
const todayDateEl = document.getElementById("today-date");
if (todayDateEl) {
  const options = { weekday: "long", day: "numeric", month: "long" };
  todayDateEl.textContent = new Date().toLocaleDateString("vi-VN", options);
}

// TODO 5.2: Gọi render() một lần khi tải trang để hiển thị dữ liệu ban đầu
render();