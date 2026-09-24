//Bài 1: Khai báo biến và tính tổng
let a = 10;
let b = 3;
let sum = a + b;
let difference = a - b;
let product = a * b;
let quotient = a / b;
console.log("Tổng", sum);
console.log("Hiệu", difference);
console.log("Tích", product);
console.log("Thương", quotient);

//Bài 2: Tính diện tích và chu vi hình chữ nhật
let length = 15;
let width = 10;
let area = length * width;
let perimeter = (length + width) * 2;
console.log("Diện tích hình chữ nhật là:", area);
console.log("Chu vi hình chữ nhật là:", perimeter);

//Bài 3: Toán tử chia lấy dư (%)
let n = 11;
const remainder = n % 2;
console.log(`${n} chia cho 2 dư`, remainder);

//Bài 4: Đổi độ C sang độ F và toán tử gán rút gọn
let celsius = 30;
let fahrenheit = (celsius * 9) / 5 + 32;
console.log(`${celsius} độ C = ${fahrenheit} độ F`);

celsius += 5;
fahrenheit = (celsius * 9) / 5 + 32;
console.log(`${celsius} độ C = ${fahrenheit} độ F`);

celsius *= 2;
fahrenheit = (celsius * 9) / 5 + 32;
console.log(`${celsius} độ C = ${fahrenheit} độ F`);

//Bài 5: Bài toán tổng hợp - Tính tiền điện
let soKwh = 150;
const firstTierPrice = 1500;
const secondTierPrice = 2000;

let first100Kwh = 100 * firstTierPrice;
let extraKwh = (soKwh - 100) * secondTierPrice;
let totalBill = first100Kwh + extraKwh;
console.log("Tổng tiền điện của tháng là:", totalBill);

