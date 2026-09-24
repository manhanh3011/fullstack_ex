/*
  BÀI TẬP: VALIDATE FORM ĐĂNG KÝ
  ---------------------------------
  Xem đầy đủ yêu cầu trong file de-bai.md.
  chỉ cần code trong file này. KHÔNG cần sửa index.html / style.css.

  Các id có sẵn trong HTML mà em sẽ cần dùng tới:
    - Input:        fullname, username, email, phone, password, confirm
    - Field (cha):   field-fullname, field-username, field-email,
                      field-phone, field-password, field-confirm
    - Form:          registerForm
    - Kết quả:       result
*/

// ========== BƯỚC 1: Lấy phần tử ==========
// TODO: Lấy thẻ <form id="registerForm"> và thẻ <div id="result">
// const form = ...
// const resultBox = ...

// ========== BƯỚC 2: Hàm hiển thị lỗi / hết lỗi ==========

// TODO: Viết hàm showError(fieldName, message)
// - Tìm div cha có id = "field-" + fieldName
// - Thêm class "error" vào div đó, xoá class "success" (nếu có)
// - Set nội dung text cho phần tử ".error-msg" bên trong div đó = message
function showError(fieldName, message) {
  // code ở đây
}

// TODO: Viết hàm showSuccess(fieldName)
// - Tìm div cha có id = "field-" + fieldName
// - Xoá class "error", thêm class "success"
function showSuccess(fieldName) {
  // code ở đây
}

// ========== BƯỚC 3: Các hàm validate từng ô ==========
// Mỗi hàm: đọc giá trị input tương ứng, kiểm tra theo quy tắc trong de-bai.md,
// gọi showError() hoặc showSuccess() phù hợp, và PHẢI return true / false.

function validateFullname() {
  // TODO
  // Gợi ý: const value = document.getElementById('fullname').value.trim();
  return true; // sửa lại cho đúng
}

function validateUsername() {
  // TODO
  return true; // sửa lại cho đúng
}

function validateEmail() {
  // TODO
  return true; // sửa lại cho đúng
}

function validatePhone() {
  // TODO
  return true; // sửa lại cho đúng
}

function validatePassword() {
  // TODO
  return true; // sửa lại cho đúng
}

function validateConfirm() {
  // TODO
  // Lưu ý: cần lấy giá trị của CẢ 2 ô "password" và "confirm" để so sánh
  return true; // sửa lại cho đúng
}

// ========== BƯỚC 4: Gắn sự kiện blur ==========
// TODO: Với mỗi input, lắng nghe sự kiện "blur" (mất focus)
// và gọi hàm validate tương ứng.
//
// Gợi ý:
// document.getElementById('fullname').addEventListener('blur', validateFullname);
// (làm tương tự cho 5 ô còn lại)

// ========== BƯỚC 5: Gắn sự kiện submit ==========
// TODO:
// 1. Lắng nghe sự kiện "submit" trên form
// 2. Gọi event.preventDefault() để chặn hành vi mặc định
// 3. Gọi TẤT CẢ 6 hàm validate (không dùng && liên tiếp — xem lý do trong de-bai.md)
// 4. Nếu tất cả đều true -> hiện #result với class "show ok" và nội dung phù hợp
// 5. Nếu có ít nhất 1 false -> hiện #result với class "show fail" và nội dung phù hợp
//
// Gợi ý cấu trúc:
// form.addEventListener('submit', function (e) {
//   e.preventDefault();
//   const checks = [ validateFullname(), validateUsername(), ... ];
//   const isValid = checks.every(Boolean);
//   ...
// });