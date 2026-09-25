// Khởi tạo state
let token = localStorage.getItem("token");
let userString = localStorage.getItem("user");
let currentUser = userString ? JSON.parse(userString) : null;
let allPosts = [];
let limit = 10;
let skip = 0;

// Bảo vệ route: Nếu chưa đăng nhập thì quay ra login
function requireAuth() {
  if (!token) {
    window.location.href = "login.html?auth=required";
  }
}
requireAuth();

// LẤY DOM ELEMENTS
const userGreeting = document.getElementById("user-greeting");
const navLoginBtn = document.getElementById("nav-login-btn");
const navLogoutBtn = document.getElementById("nav-logout-btn");
const addPostForm = document.getElementById("add-post-form");
const titleInput = document.getElementById("post-title");
const bodyInput = document.getElementById("post-body");
const postsContainer = document.getElementById("posts-container");
const emptyState = document.getElementById("empty-state");
const pagination = document.getElementById("pagination");
const prevPageBtn = document.getElementById("prev-page");
const nextPageBtn = document.getElementById("next-page");
const pageInfo = document.getElementById("page-info");

// Modal Elements
const modal = document.getElementById("post-modal");
const modalTitle = document.getElementById("modal-title");
const closeModalBtn = document.getElementById("close-modal");
const modalView = document.getElementById("modal-view");
const viewTitle = document.getElementById("view-title");
const viewBody = document.getElementById("view-body");
const commentsCount = document.getElementById("comments-count");
const commentsList = document.getElementById("comments-list");
const editForm = document.getElementById("edit-form");
const editId = document.getElementById("edit-id");
const editTitle = document.getElementById("edit-title");
const editBody = document.getElementById("edit-body");
const cancelEditBtn = document.getElementById("cancel-edit");

// SETUP HEADER & LOGOUT
if (currentUser) {
  userGreeting.textContent = `Xin chào, ${currentUser.firstName || currentUser.username}!`;
  userGreeting.classList.remove("hidden");
  navLoginBtn.classList.add("hidden");
  navLogoutBtn.classList.remove("hidden");
}

// Đăng xuất
navLogoutBtn.addEventListener("click", () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
});

// Lấy toàn bộ danh sách bài viết và phân trang
async function fetchPosts() {
  try {
    const res = await fetch(`https://dummyjson.com/posts?limit=0`);
    const data = await res.json();
    allPosts = data.posts || [];

    // SẮP XẾP: Đưa tất cả bài của user đang đăng nhập lên đầu
    allPosts.sort((a, b) => {
      const isA = a.userId === currentUser.id;
      const isB = b.userId === currentUser.id;
      return isB - isA;
    });

    renderPosts();
  } catch (err) {
    console.error("Lỗi lấy bài viết:", err);
  }
}

// Thêm bài viết
async function addPost(title, body) {
  try {
    const res = await fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        body,
        userId: currentUser.id,
      }),
    });
    const newPost = await res.json();

    if (allPosts.some((p) => p.id === newPost.id)) {
      newPost.id = Date.now();
    }

    allPosts.unshift(newPost);

    skip = 0;
    renderPosts();
  } catch (err) {
    alert("Thêm bài viết thất bại!");
  }
}

// Sửa bài viết
async function updatePost(id, title, body) {
  try {
    await fetch(`https://dummyjson.com/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    });

    // Sửa lại local
    const post = allPosts.find((post) => post.id === id);
    if (post) {
      post.title = title;
      post.body = body;
    }
    renderPosts();
    closeModal();
  } catch (err) {
    alert("Sửa bài viết thất bại!");
  }
}

// Xoá bài viết
async function deletePost(id) {
  try {
    await fetch(`https://dummyjson.com/posts/${id}`, {
      method: "DELETE",
    });

    // Xoá local
    allPosts = allPosts.filter((post) => post.id !== id);

    // Cân chỉnh lại skip nếu lỡ xoá hết bài ở trang cuối cùng
    if (skip >= allPosts.length && skip > 0) {
      skip -= limit;
    }
    renderPosts();
  } catch (err) {
    alert("Xoá bài viết thất bại!");
  }
}

// Xem chi tiết bài viết (kèm comment)
async function fetchPostDetailAndComments(id) {
  try {
    const [postRes, commentsRes] = await Promise.all([
      fetch(`https://dummyjson.com/posts/${id}`),
      fetch(`https://dummyjson.com/posts/${id}/comments`),
    ]);

    let postData;
    if (!postRes.ok) {
      postData = allPosts.find((p) => p.id === id);
    } else {
      postData = await postRes.json();
    }

    let commentsData = { comments: [] };
    if (commentsRes.ok) {
      commentsData = await commentsRes.json();
    }

    renderPostDetail(postData, commentsData.comments);
  } catch (err) {
    console.error("Lỗi lấy chi tiết:", err);
  }
}

// RENDER HTML & SỰ KIỆN DOM
function renderPosts() {
  postsContainer.innerHTML = "";

  if (allPosts.length === 0) {
    postsContainer.classList.add("hidden");
    emptyState.classList.remove("hidden");
    pagination.classList.add("hidden");
    return;
  }

  postsContainer.classList.remove("hidden");
  emptyState.classList.add("hidden");

  // Cắt mảng để lấy data cho trang hiện tại
  const paginatedPosts = allPosts.slice(skip, skip + limit);

  paginatedPosts.forEach((post) => {
    const article = document.createElement("article");
    article.className =
      "bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow group relative";

    // Đánh dấu huy hiệu "Bài của bạn" để dễ nhận biết
    const isOwner = post.userId === currentUser.id;
    let badge = "";
    if (isOwner) {
      badge = `<span class="absolute top-4 right-4 bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-1 rounded tracking-wide uppercase">Bài của bạn</span>`;
    }

    const actionButtons = isOwner
      ? `
            <button class="btn-edit text-blue-500 text-sm font-medium hover:underline" data-id="${post.id}">Sửa</button>
            <button class="btn-delete text-red-500 text-sm font-medium hover:underline" data-id="${post.id}">Xoá</button>
        `
      : "";

    article.innerHTML = `
            ${badge}
            <div>
                <h3 class="text-xl font-bold text-gray-900 mb-2 line-clamp-1 pr-24">${post.title}</h3>
                <p class="text-gray-600 text-sm line-clamp-3">${post.body}</p>
            </div>
            <div class="mt-6 pt-4 border-t border-gray-50 flex justify-between items-center">
                <button class="btn-detail text-indigo-600 text-sm font-semibold hover:text-indigo-800 transition-colors" data-id="${post.id}">Đọc tiếp &rarr;</button>
                <div class="space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    ${actionButtons}
                </div>
            </div>
        `;
    postsContainer.appendChild(article);
  });

  updatePagination();
}

function updatePagination() {
  if (allPosts.length === 0) {
    pagination.classList.add("hidden");
    return;
  }

  pagination.classList.remove("hidden");
  const currentPage = Math.floor(skip / limit) + 1;
  const totalPages = Math.ceil(allPosts.length / limit);

  pageInfo.textContent = `Trang ${currentPage} / ${totalPages}`;

  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = currentPage >= totalPages;
}

prevPageBtn.addEventListener("click", () => {
  if (skip >= limit) {
    skip -= limit;
    renderPosts();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

nextPageBtn.addEventListener("click", () => {
  if (skip + limit < allPosts.length) {
    skip += limit;
    renderPosts();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

// Thêm bài viết mới
addPostForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();
  if (!title || !body) return;

  const btn = addPostForm.querySelector('button[type="submit"]');
  const originalText = btn.textContent;
  btn.innerHTML = `<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Đang đăng...`;
  btn.disabled = true;

  await addPost(title, body);

  titleInput.value = "";
  bodyInput.value = "";
  btn.textContent = originalText;
  btn.disabled = false;
});

postsContainer.addEventListener("click", (e) => {
  const id = Number(e.target.dataset.id);
  if (!id) return;

  if (e.target.classList.contains("btn-delete")) {
    if (confirm("Bạn có chắc chắn muốn xoá bài viết này không?")) {
      deletePost(id);
    }
  } else if (e.target.classList.contains("btn-edit")) {
    openEditModal(id);
  } else if (e.target.classList.contains("btn-detail")) {
    openDetailModal(id);
  }
});

// MODAL CONTROLLER
function openModal() {
  modal.classList.remove("hidden");
  setTimeout(() => {
    modal.classList.remove("opacity-0");
    document.getElementById("modal-content").classList.remove("scale-95");
  }, 10);
}

function closeModal() {
  modal.classList.add("opacity-0");
  document.getElementById("modal-content").classList.add("scale-95");
  setTimeout(() => {
    modal.classList.add("hidden");
  }, 300);
}

closeModalBtn.addEventListener("click", closeModal);
cancelEditBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

function openEditModal(id) {
  const post = allPosts.find((p) => p.id === id);
  if (!post) return;

  modalTitle.textContent = "Sửa bài viết";
  modalView.classList.add("hidden");
  editForm.classList.remove("hidden");

  editId.value = post.id;
  editTitle.value = post.title;
  editBody.value = post.body;

  openModal();
}

editForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = Number(editId.value);
  const title = editTitle.value.trim();
  const body = editBody.value.trim();

  if (!title || !body) return;

  const btn = editForm.querySelector('button[type="submit"]');
  btn.textContent = "Đang lưu...";
  btn.disabled = true;

  await updatePost(id, title, body);

  btn.textContent = "Lưu thay đổi";
  btn.disabled = false;
});

function openDetailModal(id) {
  modalTitle.textContent = "Chi tiết bài viết";
  modalView.classList.remove("hidden");
  editForm.classList.add("hidden");

  viewTitle.innerHTML =
    '<span class="animate-pulse bg-gray-200 h-6 w-1/2 block rounded"></span>';
  viewBody.innerHTML =
    '<span class="animate-pulse bg-gray-200 h-4 w-full block rounded mb-2"></span><span class="animate-pulse bg-gray-200 h-4 w-3/4 block rounded"></span>';
  commentsCount.textContent = "0";
  commentsList.innerHTML =
    '<p class="animate-pulse bg-gray-200 h-4 w-1/3 rounded"></p>';

  openModal();
  fetchPostDetailAndComments(id);
}

function renderPostDetail(post, comments) {
  if (!post) {
    viewTitle.textContent = "Bài viết không tồn tại";
    return;
  }
  viewTitle.textContent = post.title;
  viewBody.textContent = post.body;

  commentsCount.textContent = comments.length;
  commentsList.innerHTML = "";

  if (comments.length === 0) {
    commentsList.innerHTML =
      '<p class="italic text-gray-400">Chưa có bình luận nào.</p>';
  } else {
    comments.forEach((comment) => {
      const div = document.createElement("div");
      div.className = "bg-gray-50 p-4 rounded-xl border border-gray-100";
      div.innerHTML = `
                <div class="font-bold text-gray-900 mb-1 flex items-center gap-2">
                    <div class="w-6 h-6 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-xs">
                        ${comment.user.username.charAt(0).toUpperCase()}
                    </div>
                    ${comment.user.username}
                </div>
                <div class="text-gray-700 pl-8">${comment.body}</div>
            `;
      commentsList.appendChild(div);
    });
  }
}

fetchPosts();
