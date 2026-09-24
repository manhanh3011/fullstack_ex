// Bài 1: Quản lý giỏ hàng
const cart = [
  { name: "Áo thun", price: 150000, quantity: 2 },
  { name: "Quần jean", price: 350000, quantity: 1 },
  { name: "Giày", price: 500000, quantity: 1 },
];

// Tính tổng tiền của toàn bộ giỏ hàng
const totalAmount = cart.reduce((sum, item) => {
  return sum + (item.price * item.quantity);
}, 0);
console.log("Tổng tiền giỏ hàng:", totalAmount);

// Tìm sản phẩm có giá trị cao nhất
const maxValuedProduct = cart.reduce((maxItem, currentItem) => {
  const maxValue = maxItem.price * maxItem.quantity;
  const currentValue = currentItem.price * currentItem.quantity;
  return currentValue > maxValue ? currentItem : maxItem;
});
console.log("Sản phẩm có giá trị cao nhất:", maxValuedProduct.name);

// In ra danh sách tên sản phẩm có quantity > 1
const productsWithMultipleQuantity = cart
  .filter(item => item.quantity > 1)
  .map(item => item.name);
console.log("Danh sách sản phẩm có số lượng > 1:", productsWithMultipleQuantity);

// Bài 2: Object quản lý học sinh (dùng this)
const student = {
  name: "Minh",
  scores: [8, 7.5, 9, 6],
  
  getAverage: function() {
    const sum = this.scores.reduce((acc, score) => acc + score, 0);
    return sum / this.scores.length;
  },
  
  getStatus: function() {
    const avg = this.getAverage();
    if (avg >= 8) {
      return "Giỏi";
    } else if (avg >= 6.5) {
      return "Khá";
    } else {
      return "Trung bình";
    }
  }
};

console.log(`${student.name} đạt loại ${student.getStatus()} với điểm trung bình ${student.getAverage().toFixed(1)}`);

// Bài 3: Chuyển đổi mảng ⇄ object
const employees = [
  { id: "E01", name: "An", department: "Sales" },
  { id: "E02", name: "Bình", department: "IT" },
  { id: "E03", name: "Chi", department: "IT" },
];

// Chuyển mảng thành object
const employeesObj = employees.reduce((acc, emp) => {
  acc[emp.id] = emp;
  return acc;
}, {});
console.log("Object nhân viên:", employeesObj);

// Chuyển ngược lại thành mảng
const employeesArray = Object.values(employeesObj);
console.log("Mảng nhân viên:", employeesArray);

// Đếm số lượng nhân viên theo từng department
const departmentCount = employees.reduce((acc, emp) => {
  acc[emp.department] = (acc[emp.department] || 0) + 1;
  return acc;
}, {});
console.log("Đếm nhân viên theo phòng ban:", departmentCount);

// Bài 4: Object quản lý sản phẩm — dùng this
const product = {
  name: "Bàn phím cơ",
  price: 890000,
  discount: 10,
  
  getFinalPrice: function() {
    return this.price - (this.price * this.discount) / 100;
  },
  
  showInfo: function() {
    console.log(`${this.name}: giá gốc ${this.price}, giá sau giảm ${this.getFinalPrice()}`);
  }
};

product.showInfo();
product.discount = 20;
product.showInfo();

// Bài 5: Danh sách công việc (Todo)
const todos = [
  { task: "Học JavaScript", done: false },
  { task: "Làm bài tập", done: true },
  { task: "Đọc sách", done: false },
];

// Lấy danh sách các công việc chưa hoàn thành
const pendingTasks = todos.filter(todo => todo.done === false);
console.log("Công việc chưa hoàn thành:", pendingTasks);

// Mảng chỉ chứa tên các công việc
const taskNames = todos.map(todo => todo.task);
console.log("Tên các công việc:", taskNames);

// Đếm số công việc đã hoàn thành
function countDone(todosArr) {
  return todosArr.filter(todo => todo.done === true).length;
}
console.log("Số công việc đã hoàn thành:", countDone(todos));

// Đánh dấu công việc đã hoàn thành
function markAsDone(todosArr, taskName) {
  const foundTask = todosArr.find(todo => todo.task === taskName);
  if (foundTask) {
    foundTask.done = true;
  }
}

markAsDone(todos, "Đọc sách");
console.log("Todos sau khi markAsDone:", todos);
