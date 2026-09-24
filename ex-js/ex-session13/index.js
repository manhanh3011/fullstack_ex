// Bài 1: Viết hàm calculate(a, b, callback) nhận vào 2 số và 1 hàm callback, thực hiện phép tính do callback quy định.

function add(a, b) {
  return a + b;
}
function multiply(a, b) {
  return a * b;
}

// Hàm calculate nhận vào 2 số a, b và 1 callback
function calculate(a, b, callback) {
  if (typeof callback === "function") {
    return callback(a, b);
  }
}

console.log(calculate(3, 4, add));
console.log(calculate(3, 4, multiply));

// Bài 2: Viết hàm createCounter() trả về một hàm, mỗi lần gọi hàm đó thì số đếm tăng lên 1.
function createCounter() {
  let count = 0;
  return function () {
    count += 1;
    return count;
  };
}

const counter = createCounter();
console.log(counter());
console.log(counter());
console.log(counter());

// Bài 3: Viết hàm repeatTimes(n, callback) gọi hàm callback liên tiếp n lần, mỗi lần truyền vào một số thứ tự (index) bắt đầu từ 0.
function repeatTimes(n, callback) {
  if (typeof callback === "function") {
    for (let i = 0; i < n; i++) {
      callback(i);
    }
  }
}

repeatTimes(5, (index) => {
  console.log(`Lần thứ ${index}`);
});

// Bài 4: Viết hàm createGreeter(greeting) trả về một hàm nhận name và in ra câu chào.
function createGreeter(greeting) {
  return function (name) {
    console.log(`${greeting}, ${name}!`);
  };
}

const greetVi = createGreeter("Xin chào");
const greetEn = createGreeter("Hello");

greetVi("Ánh");
greetEn("Ánh");

// Bài 5: Viết hàm fetchDataMock(id, callback) mô phỏng gọi API
function fetchDataMock(id, callback) {
  const randomDelay = Math.floor(Math.random() * 1000) + 100; // Độ trễ từ 100ms đến 1100ms

  setTimeout(() => {
    if (id > 0) {
      callback(null, `Dữ liệu của id ${id}`);
    } else {
      callback("Invalid id", null);
    }
  }, randomDelay);
}

fetchDataMock(5, (error, data) => {
  if (error) return console.log("Error:", error);
  console.log("Data:", data);
});

fetchDataMock(-1, (error, data) => {
  if (error) return console.log("Error:", error);
});

// gọi fetchDataMock 3 lần liên tiếp với độ trễ ngẫu nhiên
fetchDataMock(10, (error, data) => {
  if (error) return console.log("Call 1 - Error:", error);
  console.log("Call 1 - Data:", data);
});

fetchDataMock(20, (error, data) => {
  if (error) return console.log("Call 2 - Error:", error);
  console.log("Call 2 - Data:", data);
});

fetchDataMock(-5, (error, data) => {
  if (error) return console.log("Call 3 - Error:", error);
  console.log("Call 3 - Data:", data);
});

// Bài 6: Viết một "ngân hàng mini" bằng closure.
function createAccount(initialBalance) {
  let balance = initialBalance;
  let depositCount = 0;
  let withdrawalCount = 0;

  return function (action, amount) {
    if (action === "deposit") {
      balance += amount;
      depositCount++;
    } else if (action === "withdraw") {
      if (amount > balance) {
        console.log("Insufficient balance");
        return;
      }
      balance -= amount;
      withdrawalCount++;
    } else if (action === "balance") {
      return balance;
    } else if (action === "history") {
      return `Deposits: ${depositCount}, Withdrawals: ${withdrawalCount}`;
    }
  };
}

const account = createAccount(100000);

account("deposit", 50000);
account("withdraw", 30000);
console.log(account("balance"));

account("withdraw", 999999);

console.log(account("history"));
