// Bài 1: Function Constructor & Prototype
function Product(name, price, quantity) {
  this.name = name;
  this.price = price;
  this.quantity = quantity;
}

Product.prototype.getTotal = function() {
  return this.price * this.quantity;
};

const product1 = new Product("Laptop", 15000000, 1);
const product2 = new Product("Chuột", 300000, 2);

console.log("Tổng tiền product1:", product1.getTotal());
console.log("Tổng tiền product2:", product2.getTotal());
console.log("getTotal có được share giữa 2 instance không?:", product1.getTotal === product2.getTotal);

// Bài 2: Class và Kế thừa (Inheritance)
class Employee {
  constructor(name, baseSalary) {
    this.name = name;
    this.baseSalary = baseSalary;
  }
}

class Manager extends Employee {
  constructor(name, baseSalary, bonus) {
    // Sử dụng super để gọi constructor của class cha
    super(name, baseSalary);
    this.bonus = bonus;
  }

  getSalary() {
    return this.baseSalary + this.bonus;
  }
}

const manager = new Manager("An", 15000000, 5000000);
console.log("Lương thực nhận của Manager:", manager.getSalary());

// Bài 3: Deep Compare (So sánh sâu)
const obj1 = { a: 1, b: { c: 2 } };
const obj2 = { a: 1, b: { c: 2 } };
console.log("obj1 === obj2 :", obj1 === obj2);

/* Giải thích obj1 === obj2 trả về false:
  Mặc dù obj1 và obj2 có nội dung giống hệt nhau, nhưng chúng là 2 object độc lập 
  và được cấp phát 2 vùng nhớ khác nhau. Phép === (Strict Equality) khi dùng cho object 
  chỉ đi so sánh tham chiếu (địa chỉ bộ nhớ) chứ không so sánh giá trị bên trong.
*/

function deepEqual(objA, objB) {
  if (objA === objB) return true;

  // Nếu một trong hai không phải là object, hoặc là null -> false
  if (typeof objA !== "object" || objA === null ||
      typeof objB !== "object" || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  // Đệ quy so sánh từng giá trị bên trong
  for (let key of keysA) {
    if (!keysB.includes(key)) return false;
    if (!deepEqual(objA[key], objB[key])) return false;
  }

  return true;
}

console.log("deepEqual(obj1, obj2):", deepEqual(obj1, obj2));

// Bài 4: Shallow Copy vs Deep Copy
const original = {
  name: "Alice",
  address: {
    city: "Hanoi",
    zip: "10000"
  }
};

// Shallow Copy
const shallowCopy = { ...original };
shallowCopy.address.city = "HCMC";
console.log("Sau khi Shallow Copy đổi thành HCMC:");
console.log("Original city (Shallow):", original.address.city); 

// Deep Copy
original.address.city = "Hanoi";

const deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.address.city = "Da Nang";
console.log("Sau khi Deep Copy đổi thành Da Nang:");
console.log("Original city (Deep):", original.address.city);

/* Giải thích sự khác biệt:
- Shallow Copy (copy nông): Chỉ copy được các giá trị nguyên thủy ở cấp độ ngoài cùng. Đối với nested object (như object `address`),
  nó chỉ copy lại địa chỉ vùng nhớ. Vì vậy `shallowCopy.address` và `original.address` cùng trỏ về 1 nơi -> Sửa bản sao sẽ làm thay đổi bản gốc.
- Deep Copy (copy sâu): Sao chép toàn bộ mọi giá trị sang một vùng nhớ hoàn toàn mới (cắt đứt mọi liên kết bộ nhớ cũ). 
  Do đó 2 object hoàn toàn độc lập, sửa bản sao không ảnh hưởng bản gốc.
*/

// Bài 5: Destructuring
const user = {
  id: 1,
  name: "Bình",
  contact: {
    email: "binh@example.com",
    phone: "0909123456"
  },
  hobbies: ["reading", "coding", "gaming"]
};

// Lấy name, email, phone trong 1 dòng
const { name, contact: { email, phone } } = user;
console.log("Name:", name, "- Email:", email, "- Phone:", phone);

// Lấy age với giá trị mặc định là 18
const { age = 18 } = user;
console.log("Age (default):", age);

// Lấy 2 hobby đầu tiên và các hobby còn lại
const [hobby1, hobby2, ...restHobbies] = user.hobbies;
console.log("Hobby 1:", hobby1);
console.log("Hobby 2:", hobby2);
console.log("Rest Hobbies:", restHobbies);
