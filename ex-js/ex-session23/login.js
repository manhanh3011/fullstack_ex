const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const errorMsg = document.getElementById('error-msg');

// Hiển thị thông báo nếu bị văng từ trang chủ ra
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('auth') === 'required') {
    errorMsg.textContent = 'Vui lòng đăng nhập để truy cập vào trang bài viết!';
    errorMsg.classList.remove('hidden');
}

//Bảo vệ route ngược (Kiểm tra nếu đã login thì về thẳng trang chủ)
const token = localStorage.getItem('token');
if (token) {
    window.location.href = 'index.html';
}

//Đăng nhập API
async function login(username, password) {
  const res = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password,
      expiresInMins: 60
    })
  });

  if (!res.ok) {
    throw new Error('Tài khoản hoặc mật khẩu không hợp lệ');
  }

  const data = await res.json();
  
  // Lưu token và user info
  localStorage.setItem('token', data.accessToken);
  localStorage.setItem('user', JSON.stringify(data));

  return data;
}

// Gắn sự kiện submit form
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMsg.classList.add('hidden');
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (!username || !password) {
        errorMsg.textContent = 'Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!';
        errorMsg.classList.remove('hidden');
        return;
    }
    
    // Tạo trạng thái loading
    const btn = loginForm.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = "Đang xử lý...";
    btn.disabled = true;
    btn.classList.add('opacity-70', 'cursor-not-allowed');

    try {
        await login(username, password);
        window.location.href = 'index.html';
    } catch (error) {
        errorMsg.textContent = error.message;
        errorMsg.classList.remove('hidden');
    } finally {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.classList.remove('opacity-70', 'cursor-not-allowed');
    }
});
