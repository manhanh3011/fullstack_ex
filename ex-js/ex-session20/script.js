// ========== BƯỚC 1: Lấy phần tử ==========
const form = document.getElementById('registerForm');
const resultBox = document.getElementById('result');

const fullnameInput = document.getElementById('fullname');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');
const confirmInput = document.getElementById('confirm');

// ========== BƯỚC 2: Hàm hiển thị lỗi / hết lỗi ==========
function showError(fieldName, message) {
  const field = document.getElementById('field-' + fieldName);
  field.classList.add('error');
  field.classList.remove('success');
  field.querySelector('.error-msg').textContent = message;
}

function showSuccess(fieldName) {
  const field = document.getElementById('field-' + fieldName);
  field.classList.remove('error');
  field.classList.add('success');
  field.querySelector('.error-msg').textContent = '';
}

// ========== BƯỚC 3: Các hàm validate từng ô ==========
function validateFullname() {
  const value = fullnameInput.value.trim();
  if (!value) {
    showError('fullname', 'Họ và tên không được để trống.');
    return false;
  }
  if (value.length < 2) {
    showError('fullname', 'Họ và tên tối thiểu 2 ký tự.');
    return false;
  }
  showSuccess('fullname');
  return true;
}

function validateUsername() {
  const value = usernameInput.value.trim();
  if (!value) {
    showError('username', 'Tên đăng nhập không được để trống.');
    return false;
  }
  if (value.length < 4 || value.length > 16) {
    showError('username', 'Tên đăng nhập phải từ 4 đến 16 ký tự.');
    return false;
  }
  if (!/^[a-zA-Z0-9_]+$/.test(value)) {
    showError('username', 'Chỉ gồm chữ, số và dấu gạch dưới.');
    return false;
  }
  showSuccess('username');
  return true;
}

function validateEmail() {
  const value = emailInput.value.trim();
  if (!value) {
    showError('email', 'Email không được để trống.');
    return false;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    showError('email', 'Vui lòng nhập đúng định dạng email.');
    return false;
  }
  showSuccess('email');
  return true;
}

function validatePhone() {
  const value = phoneInput.value.trim();
  if (!value) {
    showError('phone', 'Số điện thoại không được để trống.');
    return false;
  }
  if (!/^0\d{9}$/.test(value)) {
    showError('phone', 'Phải có đúng 10 chữ số và bắt đầu bằng số 0.');
    return false;
  }
  showSuccess('phone');
  return true;
}

function validatePassword() {
  const value = passwordInput.value;
  if (!value) {
    showError('password', 'Mật khẩu không được để trống.');
    return false;
  }
  if (value.length < 8) {
    showError('password', 'Mật khẩu tối thiểu 8 ký tự.');
    return false;
  }
  if (!/[a-zA-Z]/.test(value) || !/[0-9]/.test(value)) {
    showError('password', 'Phải có ít nhất 1 chữ cái và 1 chữ số.');
    return false;
  }
  showSuccess('password');
  return true;
}

function validateConfirm() {
  const password = passwordInput.value;
  const confirm = confirmInput.value;
  if (!confirm) {
    showError('confirm', 'Xác nhận mật khẩu không được để trống.');
    return false;
  }
  if (confirm !== password) {
    showError('confirm', 'Mật khẩu xác nhận không khớp.');
    return false;
  }
  showSuccess('confirm');
  return true;
}

// ========== BƯỚC 4: Gắn sự kiện blur ==========
fullnameInput.addEventListener('blur', validateFullname);
usernameInput.addEventListener('blur', validateUsername);
emailInput.addEventListener('blur', validateEmail);
phoneInput.addEventListener('blur', validatePhone);
passwordInput.addEventListener('blur', validatePassword);
confirmInput.addEventListener('blur', validateConfirm);

// ========== BƯỚC 5: Gắn sự kiện submit ==========
form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const checks = [
    validateFullname(),
    validateUsername(),
    validateEmail(),
    validatePhone(),
    validatePassword(),
    validateConfirm()
  ];
  
  const isValid = checks.every(Boolean);
  
  resultBox.className = ''; // Xoá các class cũ (nếu có)
  
  if (isValid) {
    resultBox.classList.add('show', 'ok');
    resultBox.textContent = '✔ Hợp lệ! Dữ liệu sẵn sàng để gửi lên server.';
  } else {
    resultBox.classList.add('show', 'fail');
    resultBox.textContent = '✘ Vui lòng sửa các lỗi được đánh dấu đỏ ở trên';
  }
});