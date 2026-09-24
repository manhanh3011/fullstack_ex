# 5 Bài tập JavaScript về String (mức độ vừa)

## Bài 1: Đếm nguyên âm
Viết hàm `countVowels(str)` nhận vào một chuỗi và đếm số lượng nguyên âm (a, e, i, o, u — không phân biệt hoa thường) xuất hiện trong chuỗi đó.

**Ví dụ:**
```javascript
countVowels("Xin chao cac ban"); // → 5
```
**Gợi ý:** Dùng vòng lặp for duyệt từng ký tự, kết hợp if/else kiểm tra ký tự có phải nguyên âm không.

## Bài 2: Kiểm tra chuỗi đối xứng (Palindrome)
Viết hàm `isPalindrome(str)` kiểm tra một chuỗi có phải là chuỗi đối xứng hay không (đọc xuôi và đọc ngược giống nhau), bỏ qua khoảng trắng và không phân biệt hoa thường.

**Ví dụ:**
```javascript
isPalindrome("madam");        // → true
isPalindrome("Toi yeu Viet Nam"); // → false
```
**Gợi ý:** Dùng vòng lặp so sánh ký tự đầu với ký tự cuối, tiến dần vào giữa chuỗi.

## Bài 3: Đảo ngược từng từ trong câu
Viết hàm `reverseEachWord(str)` giữ nguyên thứ tự các từ trong câu, nhưng đảo ngược thứ tự ký tự trong từng từ.

**Ví dụ:**
```javascript
reverseEachWord("Hoc lap trinh"); // → "coH pal hnirt"
```
**Gợi ý:** Hãy thử không dùng `split()`. Dùng một vòng lặp `for` duyệt qua từng ký tự của chuỗi, gom các ký tự vào một biến chuỗi tạm gọi là `currentWord`. Khi gặp ký tự khoảng trắng (hoặc đến cuối chuỗi), đó là dấu hiệu kết thúc một từ — lúc này dùng một vòng lặp con để đảo ngược `currentWord` (duyệt từ ký tự cuối về đầu và nối vào biến `result`), sau đó thêm khoảng trắng vào `result` và reset `currentWord = ""` để bắt đầu từ tiếp theo.

## Bài 4: Nén chuỗi ký tự lặp lại
Viết hàm `compressString(str)` nén các ký tự liên tiếp giống nhau thành dạng ký_tự + số_lần. Nếu chuỗi nén không ngắn hơn chuỗi gốc, trả về chuỗi gốc.

**Ví dụ:**
```javascript
compressString("aaabbbccd"); // → "a3b3c2d1"
compressString("abc");       // → "abc" (vì nén ra "a1b1c1" dài hơn)
```
**Gợi ý:** Dùng vòng lặp `for`, biến đếm số lần lặp, so sánh ký tự hiện tại với ký tự trước đó bằng if/else.

## Bài 5: Kiểm tra hai chuỗi có phải là "Anagram" của nhau không
Viết hàm `isAnagram(str1, str2)` kiểm tra hai chuỗi có chứa đúng các ký tự giống nhau (số lượng mỗi ký tự bằng nhau) hay không, không phân biệt hoa thường và bỏ qua khoảng trắng.

**Ví dụ:**
```javascript
isAnagram("nghe si", "sinh nghe");   // → true (nếu cùng tập ký tự) 
isAnagram("hello", "world");      // → false
```
**Gợi ý:**
1. Đầu tiên kiểm tra độ dài (sau khi bỏ khoảng trắng) của hai chuỗi có bằng nhau không — nếu không thì trả về false ngay.
2. Dùng vòng lặp `for` duyệt qua từng ký tự của `str1`. Với mỗi ký tự, dùng một vòng lặp con đếm số lần ký tự đó xuất hiện trong `str1`, rồi đếm số lần xuất hiện trong `str2`. Nếu số lần khác nhau ở bất kỳ ký tự nào → trả về false.
3. Nếu duyệt hết mà không có sai khác → trả về true.

<br>

# Bài tập về Callback và Closure

## Bài 1: Hàm calculate với callback
Viết hàm `calculate(a, b, callback)` nhận vào 2 số và 1 hàm callback, thực hiện phép tính do callback quy định.

```javascript
function add(a, b) { return a + b; }
function multiply(a, b) { return a * b; }

// viết hàm ở đây

calculate(3, 4, add);      // 7
calculate(3, 4, multiply); // 12
```

## Bài 2: Closure cơ bản (Bộ đếm)
Viết hàm `createCounter()` trả về một hàm, mỗi lần gọi hàm đó thì số đếm tăng lên 1.

```javascript
// viết hàm ở đây

const counter = createCounter();
counter(); // 1
counter(); // 2
counter(); // 3
```

## Bài 3: Lặp với callback
Viết hàm `repeatTimes(n, callback)` gọi hàm callback liên tiếp n lần, mỗi lần truyền vào một số thứ tự (index) bắt đầu từ 0.

```javascript
// viết hàm ở đây

repeatTimes(5, (index) => {
  console.log(`Lần thứ ${index}`);
});
// In ra: Lần thứ 0, Lần thứ 1, ..., Lần thứ 4
```

## Bài 4: Closure lưu trữ tham số (Trình chào hỏi)
Viết hàm `createGreeter(greeting)` trả về một hàm nhận name và in ra câu chào.

```javascript
// viết hàm ở đây

const greetVi = createGreeter("Xin chào");
const greetEn = createGreeter("Hello");

greetVi("An"); // "Xin chào, An!"
greetEn("An"); // "Hello, An!"
```

## Bài 5: Giả lập gọi API với setTimeout
Viết hàm `fetchDataMock(id, callback)` mô phỏng gọi API (dùng setTimeout để giả lập độ trễ). Nếu `id` là số dương thì callback trả về dữ liệu (chuỗi), nếu không thì trả về lỗi — theo chuẩn error-first callback: `callback(error, data)`.

```javascript
// viết hàm ở đây

fetchDataMock(5, (error, data) => {
  if (error) return console.log("Error:", error);
  console.log("Data:", data);
});

fetchDataMock(-1, (error, data) => {
  if (error) return console.log("Error:", error); // phải in ra lỗi
});
```
**Gợi ý:** Khi thành công thì gọi `callback(null, "some data")`, khi lỗi thì gọi `callback("Invalid id", null)` — không cần dùng object hay Error, dùng chuỗi (string) và null là đủ.

**Yêu cầu thêm:** Gọi `fetchDataMock` 3 lần liên tiếp với độ trễ ngẫu nhiên, đảm bảo mỗi lần gọi log ra đúng dữ liệu tương ứng của nó (không bị lẫn lộn giữa các lần gọi).

## Bài 6: Ngân hàng mini bằng closure
Viết một "ngân hàng mini" bằng closure. Hàm `createAccount(initialBalance)` trả về một hàm duy nhất tên `account`, hàm này nhận vào `action` (chuỗi: "deposit", "withdraw", hoặc "balance") và `amount` (số, không bắt buộc khi xem số dư).

Số dư (`balance`) phải là biến private, không thể truy cập trực tiếp từ bên ngoài.

```javascript
function createAccount(initialBalance) {
  // code ở đây
}

const account = createAccount(100000);

account("deposit", 50000);
account("withdraw", 30000);
console.log(account("balance")); // 120000

account("withdraw", 999999); // phải báo lỗi "Insufficient balance", không cho rút âm
```
**Yêu cầu thêm:** Đếm số lần deposit và số lần withdraw đã thực hiện (dùng 2 biến số nguyên trong closure), và cho phép xem qua action = "history":
```javascript
console.log(account("history")); // "Deposits: 2, Withdrawals: 2"
```

<br>

# Bài tập về Mảng (Array)

## Bài 1: Tìm số lớn thứ 2
Cho một mảng số, hãy tìm giá trị lớn thứ hai trong mảng không sử dụng `sort()`.

```javascript
const arr = [3, 7, 2, 9, 9, 5];
```

**Yêu cầu:**
- Không dùng `sort()`.
- Nếu số lớn nhất xuất hiện nhiều lần thì số lớn thứ hai phải khác số lớn nhất.

**Gợi ý:**
- Duyệt mảng một lần.
- Sử dụng 2 biến: `max1` (số lớn nhất) và `max2` (số lớn thứ hai).
- Cập nhật giá trị khi duyệt.

## Bài 2: Đếm số lần xuất hiện của từng phần tử
Cho một mảng chuỗi, hãy đếm xem mỗi từ xuất hiện bao nhiêu lần.

```javascript
const words = ["a", "b", "a", "c", "b", "a"];
```

**Kết quả mong muốn:**
```
a: 3
b: 2
c: 1
```

**Gợi ý:**
- Duyệt từng phần tử.
- Có thể dùng 2 mảng song song: một mảng lưu các từ đã gặp, một mảng lưu số lần xuất hiện tương ứng.

## Bài 3: Tìm độ dài dãy tăng liên tiếp dài nhất
Cho một mảng số, hãy tìm độ dài của dãy con liên tiếp tăng dần dài nhất.

```javascript
const arr = [1, 2, 2, 3, 4, 1, 5, 6, 7];
```

**Kết quả mong muốn:**
```
4 // 1,5,6,7
```

**Gợi ý:**
- Duyệt từ phần tử thứ hai.
- Nếu phần tử hiện tại lớn hơn phần tử trước: tăng biến đếm.
- Ngược lại: reset về 1.
- Luôn lưu lại giá trị lớn nhất tìm được.

## Bài 4: Đảo ngược thứ tự các từ trong câu
Cho một chuỗi, hãy đảo ngược thứ tự các từ, không đảo ký tự bên trong từng từ.

```javascript
const sentence = "hôm nay trời đẹp";
```

**Kết quả mong muốn:**
```
"đẹp trời nay hôm"
```

**Gợi ý:**
- Dùng `split(" ")` để tách chuỗi thành mảng.
- Đảo ngược mảng.
- Ghép lại bằng `join(" ")`.

## Bài 5: Kiểm tra chuỗi Palindrome
Viết hàm kiểm tra xem một chuỗi có phải là Palindrome hay không.

**Yêu cầu:**
- Không phân biệt chữ hoa/thường.
- Bỏ qua khoảng trắng.

**Ví dụ:**
```javascript
isPalindrome("Nam va van"); // false
isPalindrome("madam");      // true
isPalindrome("hello");      // false
```

**Gợi ý:**
- Chuyển chuỗi về chữ thường.
- Loại bỏ khoảng trắng.
- Dùng 2 con trỏ `left` và `right`.
- So sánh ký tự ở hai đầu rồi tiến dần vào giữa.

## Bài 6: Two Sum
Cho một mảng số và một số `target`, hãy tìm 2 phần tử có tổng bằng `target` và in ra vị trí (index) của chúng.

```javascript
const nums = [2, 7, 11, 15];
const target = 9;
```

**Kết quả mong muốn:**
```
Index: 0 và 1
```
*(Vì `nums[0] + nums[1] = 2 + 7 = 9`)*

**Gợi ý:**
- Dùng 2 vòng lặp `for` lồng nhau.
- Duyệt từng cặp số.
- Nếu tổng bằng `target` thì in ra index.

<br>

# Bài tập về Đối tượng (Object)

## Bài 1: Quản lý giỏ hàng
Cho một mảng các object sản phẩm:

```javascript
const cart = [
  { name: "Áo thun", price: 150000, quantity: 2 },
  { name: "Quần jean", price: 350000, quantity: 1 },
  { name: "Giày", price: 500000, quantity: 1 },
];
```

**Yêu cầu:**
- Tính tổng tiền của toàn bộ giỏ hàng (`price × quantity` của từng sản phẩm, cộng lại).
- Tìm sản phẩm có giá trị (`price × quantity`) cao nhất.
- In ra danh sách tên sản phẩm có `quantity > 1`.

**Gợi ý:**
- Dùng `reduce` để tính tổng.
- Dùng `reduce` hoặc `sort` để tìm sản phẩm có giá trị lớn nhất.
- Dùng `filter` kết hợp `map` để lấy danh sách tên sản phẩm.

## Bài 2: Object quản lý học sinh (dùng this)
Tạo một object `student` có các thuộc tính: `name`, `scores` (mảng điểm số), và các phương thức:

```javascript
const student = {
  name: "Minh",
  scores: [8, 7.5, 9, 6],
  // TODO: Viết các method dưới đây
};
```

**Yêu cầu:**
- Viết method `getAverage()` trả về điểm trung bình, sử dụng `this.scores`.
- Viết method `getStatus()`:
  - Method này phải gọi lại `this.getAverage()`.
  - Trả về `"Giỏi"` nếu điểm trung bình ≥ 8.
  - Trả về `"Khá"` nếu điểm trung bình ≥ 6.5.
  - Còn lại trả về `"Trung bình"`.
- In ra kết quả theo định dạng: `Minh đạt loại Giỏi với điểm trung bình 7.6`.

## Bài 3: Chuyển đổi mảng ⇄ object
Cho mảng thông tin nhân viên:

```javascript
const employees = [
  { id: "E01", name: "An", department: "Sales" },
  { id: "E02", name: "Bình", department: "IT" },
  { id: "E03", name: "Chi", department: "IT" },
];
```

**Yêu cầu:**
1. Chuyển mảng trên thành một object, sử dụng `reduce`.
   **Kết quả mong muốn:** (Key là `id`, Value là object nhân viên tương ứng)
   ```javascript
   {
     E01: { id: "E01", name: "An", department: "Sales" },
     E02: { id: "E02", name: "Bình", department: "IT" },
     E03: { id: "E03", name: "Chi", department: "IT" }
   }
   ```
2. Từ object vừa tạo, dùng `Object.values()` để chuyển ngược lại thành mảng.
3. Đếm số lượng nhân viên theo từng department.
   **Ví dụ:**
   ```javascript
   {
     Sales: 1,
     IT: 2
   }
   ```

## Bài 4: Object quản lý sản phẩm — dùng this
Cho object sau:

```javascript
const product = {
  name: "Bàn phím cơ",
  price: 890000,
  discount: 10, // %
  // TODO: Viết các method dưới đây
};
```

**Yêu cầu:**
- Viết method `getFinalPrice()` để tính giá sau khi giảm giá, sử dụng `this.price` và `this.discount`.
  - Công thức: `price - (price * discount) / 100;`
- Viết method `showInfo()` để in ra thông tin theo định dạng: `Bàn phím cơ: giá gốc 890000, giá sau giảm 801000`.
  - Method này phải gọi lại `this.getFinalPrice()` để lấy giá sau giảm.
- Đổi giá trị `discount` thành 20, sau đó gọi lại `showInfo()` để kiểm tra kết quả có thay đổi hay không.

## Bài 5: Danh sách công việc (Todo)
Cho mảng sau:

```javascript
const todos = [
  { task: "Học JavaScript", done: false },
  { task: "Làm bài tập", done: true },
  { task: "Đọc sách", done: false },
];
```

**Yêu cầu:**
- Dùng `filter()` để lấy danh sách các công việc chưa hoàn thành (`done === false`).
- Dùng `map()` để tạo mảng chỉ chứa tên các công việc (`task`).
  **Ví dụ:** `["Học JavaScript", "Làm bài tập", "Đọc sách"]`
- Viết hàm `countDone(todos)` để đếm số công việc đã hoàn thành. (Có thể sử dụng: `filter()` kết hợp `.length` hoặc `reduce()`).
- Viết hàm `markAsDone(todos, taskName)`:
  - Tìm công việc có `task` trùng với `taskName` bằng `find()`.
  - Đổi thuộc tính `done` thành `true`.
  **Ví dụ:** `markAsDone(todos, "Đọc sách");`
  **Sau khi gọi hàm:**
  ```javascript
  [
    { task: "Học JavaScript", done: false },
    { task: "Làm bài tập", done: true },
    { task: "Đọc sách", done: true },
  ];
  ```

<br>

# Bài tập Nâng cao về Object (Buổi 17)

## Bài 1: Function Constructor & Prototype
Viết một Function Constructor tên `Product` có các thuộc tính `name`, `price`, `quantity`.
Thêm một phương thức `getTotal()` vào `prototype` để tính tổng tiền (`price * quantity`).

**Yêu cầu:**
- Tạo 2 object từ constructor này.
- In ra tổng tiền của mỗi object.
- Kiểm tra xem phương thức `getTotal` có được chia sẻ (share) giữa các instance hay không bằng cách so sánh `product1.getTotal === product2.getTotal`.

## Bài 2: Class và Kế thừa (Inheritance)
Viết một Class tên `Employee` với constructor nhận `name`, `baseSalary`.
Tạo class `Manager` kế thừa từ `Employee`, có thêm thuộc tính `bonus`.

**Yêu cầu:**
- `Manager` có phương thức `getSalary()` trả về `baseSalary + bonus`.
- Sử dụng từ khóa `super` trong constructor của `Manager`.
- Tạo một instance của `Manager` và in ra lương thực nhận.

## Bài 3: Deep Compare (So sánh sâu)
Cho hai object sau:

```javascript
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
```

**Yêu cầu:**
- Giải thích tại sao `obj1 === obj2` trả về `false`.
- Viết một hàm `deepEqual(objA, objB)` để so sánh sâu (deep compare) hai object bất kỳ, trả về `true/false`.
- Test hàm với `obj1` và `obj2` ở trên.

## Bài 4: Shallow Copy vs Deep Copy
Cho object sau:

```javascript
const original = {
  name: "Alice",
  address: {
    city: "Hanoi",
    zip: "10000"
  }
};
```

**Yêu cầu:**
- Tạo bản sao **shallow copy** bằng spread operator hoặc `Object.assign`, sau đó thay đổi `city` trong bản sao và kiểm tra xem `original` có bị ảnh hưởng không.
- Tạo bản sao **deep copy** (dùng `structuredClone`, `JSON.parse(JSON.stringify())`, hoặc tự viết hàm đệ quy) sao cho thay đổi bản sao không ảnh hưởng đến `original`.
- So sánh kết quả giữa hai cách trên và giải thích sự khác biệt.

## Bài 5: Destructuring
Cho dữ liệu sau:

```javascript
const user = {
  id: 1,
  name: "Bình",
  contact: {
    email: "binh@example.com",
    phone: "0909123456"
  },
  hobbies: ["reading", "coding", "gaming"]
};
```

**Yêu cầu:**
- Dùng destructuring để lấy ra `name`, `email` (từ contact), và `phone` (từ contact) chỉ trong một dòng khai báo.
- Dùng destructuring với giá trị mặc định để lấy `age`, nếu không tồn tại thì mặc định là `18`.
- Dùng destructuring để lấy 2 hobby đầu tiên từ mảng `hobbies` vào hai biến `hobby1`, `hobby2`, và các hobby còn lại vào một mảng `restHobbies` (dùng rest operator).

<br>

# Bài tập về Promise (Buổi 18)

## Bài 1: Tạo Promise cơ bản
Viết một hàm `checkAge(age)` trả về một Promise:
- Nếu `age >= 18`, resolve với thông báo `"Đủ tuổi"`.
- Nếu `age < 18`, reject với lỗi `"Chưa đủ tuổi"`.
- Sau đó gọi hàm này với `.then()` và `.catch()` để in kết quả ra console.

**Gợi ý khung code:**
```javascript
function checkAge(age) {
  return new Promise((resolve, reject) => {
    // code ở đây
  });
}
```

## Bài 2: Giả lập gọi API với setTimeout
Viết hàm `fetchUser(id)` trả về Promise, sử dụng `setTimeout` để giả lập độ trễ mạng 1 giây, sau đó resolve về một object:
```javascript
{
  id,
  name: "User " + id
}
```
**Yêu cầu:**
- Gọi hàm này 1 lần và in kết quả ra console.
- Đồng thời, in thêm một dòng `console.log("Đang chờ...");` ngay sau khi gọi hàm và trước `.then()`.

## Bài 3: Chuỗi Promise (Promise Chaining)
Viết 3 hàm:
- `layDonHang(id)` → resolve về `{ id, sanPham: "Áo thun" }`
- `tinhTien(donHang)` → resolve về giá tiền dựa trên đơn hàng
- `apDungGiamGia(gia)` → resolve về giá sau khi giảm 10%

**Yêu cầu:**
- Dùng `.then()` để nối tiếp 3 hàm trên và tính ra giá cuối cùng.
- Sau đó in kết quả ra console.

## Bài 4: Promise.all()
Viết 3 hàm giả lập lấy dữ liệu. Mỗi hàm sử dụng `setTimeout` với thời gian khác nhau:
- `layDiemToan()` → resolve 8 → delay 1 giây
- `layDiemVan()` → resolve 7 → delay 2 giây
- `layDiemAnh()` → resolve 9 → delay 3 giây

**Yêu cầu:**
- Sử dụng `Promise.all()` để chờ cả 3 Promise hoàn thành.
- Lấy kết quả của cả 3 Promise.
- Tính điểm trung bình và in điểm trung bình ra console.
- Đo thời gian thực thi tổng cộng (kết quả thời gian thực thi dự kiến khoảng 3 giây, không phải 6 giây).

## Bài 5: Xử lý lỗi với Promise.all()
Viết 3 hàm giả lập gọi API, trong đó có 1 hàm bị reject (có thể giả lập lỗi mạng bằng `setTimeout` kết hợp với `reject()`).

**Yêu cầu:**
- **Phần 1 — Sử dụng Promise.all():** Sử dụng `Promise.all()` và `.catch()` để kiểm tra điều gì xảy ra khi một trong các Promise bị reject.
- **Phần 2 — Sử dụng Promise.allSettled():** Thay `Promise.all()` bằng `Promise.allSettled()` và so sánh kết quả. Quan sát cách `Promise.allSettled()` trả về trạng thái của từng Promise (`fulfilled`, `rejected`).

<br>

# Bài tập về Fetch API và Async/Await (Buổi 19)

## Bài 1: Lấy và hiển thị danh sách
Viết `async function getAllProducts()` fetch toàn bộ sản phẩm từ `/products`, in ra bằng `console.table()`.

## Bài 2: Lấy 1 item theo ID
Viết `getProductById(id)`.
- Nếu `response.status === 404`, in `"Không tìm thấy sản phẩm"`.
- Nếu tìm thấy, in thông tin sản phẩm.

## Bài 3: Xử lý lỗi với try/catch
Viết `safeFetch(url)` bọc bằng `try/catch`.
Phân biệt:
- Lỗi mạng: `catch` bắt được.
- Lỗi HTTP: `response.ok === false`.
In thông báo lỗi tương ứng ra console.

## Bài 4: Thêm dữ liệu (POST)
Viết `addProduct(product)` gửi request `POST`.
Sau khi thêm thành công, in ra object vừa được tạo, bao gồm `id` mới.

## Bài 5: Cập nhật dữ liệu (PATCH)
Viết `updateProduct(id, updatedFields)` chỉ cập nhật một vài trường.
- Ví dụ: thay đổi `price`.
- Sau khi cập nhật, in ra object sau khi cập nhật để so sánh với dữ liệu trước đó.

## Bài 6: Xóa dữ liệu (DELETE)
Viết `deleteProduct(id)`.
Sau khi xóa thành công:
- Gọi lại `getAllProducts()`.
- In danh sách sản phẩm mới.
- Kiểm tra và xác nhận sản phẩm đã được xóa thành công.

## Bài 7: Tìm kiếm/lọc qua Query Params
Viết `searchProducts(keyword, minPrice, maxPrice)`.
Sử dụng query string:
`?name_like=&price_gte=&price_lte=`
Sau đó in ra kết quả lọc được.

## Bài 8: Gọi API tuần tự
Viết `getUserWithPosts(userId)`.
Thực hiện theo thứ tự:
- `await` lấy user từ `/users/:id`.
- Sau khi lấy user thành công, tiếp tục `await` lấy bài viết từ `/posts?userId=:id`.
In ra object gộp:
```javascript
{
  user,
  posts
}
```

## Bài 9: Gọi API song song
Viết `getDashboardData()` sử dụng `Promise.all()` để gọi đồng thời:
- `/products`
- `/users`
- `/orders`
Sử dụng `console.time()` và `console.timeEnd()` để so sánh thời gian thực thi giữa:

**Cách 1 – Gọi tuần tự**
```javascript
await products
await users
await orders
```

**Cách 2 – Gọi song song**
```javascript
await Promise.all([
  products,
  users,
  orders
])
```
Nhận xét sự khác nhau về thời gian thực thi.

## Bài 10: Mini CRUD qua Console
Tạo một "menu" giả lập bằng cách gọi tuần tự các hàm trong một hàm `main()`.

Thực hiện các bước:
- **Bước 1:** Lấy danh sách sản phẩm.
- **Bước 2:** Thêm một sản phẩm mới.
- **Bước 3:** Sửa giá của sản phẩm vừa thêm.
- **Bước 4:** Xóa sản phẩm vừa thêm.
- **Bước 5:** Lấy lại danh sách sản phẩm để xác nhận.

Mỗi bước cần in kết quả rõ ràng ra console.
Có thể sử dụng:
```javascript
console.log("--- Bước 1: Lấy danh sách sản phẩm ---");
```

**Yêu cầu:**
- Toàn bộ flow sử dụng `async/await`.
- Xử lý lỗi bằng `try/catch`.
- Các bước phải được thực hiện tuần tự.
- Kết quả của mỗi bước phải được in rõ ràng ra console.
