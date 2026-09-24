const API_URL = "https://dummyjson.com/products";

// Bài 1: Lấy và hiển thị danh sách
async function getAllProducts() {
  try {
    console.log("danh sách sản phẩm");
    const response = await fetch(`${API_URL}`); 
    const data = await response.json();
    console.table(data.products);
  } catch (error) {
    console.error("Lỗi:", error);
  }
}

// Bài 2: Lấy 1 item theo ID
async function getProductById(id) {
  try {
    console.log(`Đang lấy sản phẩm có ID: ${id}`);
    const response = await fetch(`${API_URL}/${id}`);
    
    // Check mã lỗi 404 (Not Found)
    if (response.status === 404) {
      console.log("Không tìm thấy sản phẩm");
      return;
    }
    
    const product = await response.json();
    console.log("Thông tin sản phẩm:", product);
  } catch (error) {
    console.error("Lỗi:", error);
  }
}

// Bài 3: Xử lý lỗi với try/catch
async function safeFetch(url) {
  try {
    console.log(`Đang fetch ${url}`);
    const response = await fetch(url);
    
    // response.ok = false tương đương với các mã lỗi HTTP (400, 404, 500,...)
    if (!response.ok) {
      throw new Error(`Lỗi HTTP! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Fetch thành công, data length:", data?.products?.length || Object.keys(data).length);
  } catch (error) {
    // Phân biệt lỗi mạng và lỗi HTTP
    if (error instanceof TypeError || error.message.includes("fetch failed")) {
      console.error("Lỗi mạng (hoặc sai URL/CORS):", error.message);
    } else {
      console.error("Lỗi khác (HTTP, Xử lý data):", error.message);
    }
  }
}

// Bài 4: Thêm dữ liệu (POST)
async function addProduct(product) {
  try {
    console.log("thêm sản phẩm mới");
    const response = await fetch(`${API_URL}/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    });
    
    const newProduct = await response.json();
    console.log("Thêm thành công, sản phẩm mới có ID là:", newProduct.id);
    console.log(newProduct);
    return newProduct;
  } catch (error) {
    console.error("Lỗi khi thêm:", error);
  }
}

// Bài 5: Cập nhật dữ liệu (PATCH)
async function updateProduct(id, updatedFields) {
  try {
    console.log(`cập nhật sản phẩm ID: ${id}`);
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedFields)
    });
    
    const updatedProduct = await response.json();
    console.log("Cập nhật thành công! Dữ liệu sau cập nhật:", updatedProduct);
  } catch (error) {
    console.error("Lỗi khi cập nhật:", error);
  }
}

// Bài 6: Xóa dữ liệu (DELETE)
async function deleteProduct(id) {
  try {
    console.log(`xóa sản phẩm ID: ${id}`);
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });
    
    const deletedProduct = await response.json();
    console.log("Xóa thành công, sản phẩm vừa xóa:", deletedProduct);
    
    if (deletedProduct.isDeleted) {
        await getAllProducts();
        console.log("Xác nhận sản phẩm đã được xóa!");
    }
  } catch (error) {
    console.error("Lỗi khi xóa:", error);
  }
}

// Bài 7: Tìm kiếm/lọc qua Query Params
async function searchProducts(keyword, minPrice, maxPrice) {
  try {
    console.log(`Tìm kiếm (keyword=${keyword}, minPrice=${minPrice}, maxPrice=${maxPrice})`);
    
    const url = `${API_URL}/search?q=${keyword}`; 
    const response = await fetch(url);
    const data = await response.json();
    
    let filteredProducts = data.products;
    if (minPrice) filteredProducts = filteredProducts.filter(p => p.price >= minPrice);
    if (maxPrice) filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);

    console.log(`Kết quả lọc (Tìm thấy ${filteredProducts.length} SP):`);
    console.table(filteredProducts.map(p => ({ id: p.id, title: p.title, price: p.price })));
  } catch (error) {
    console.error("Lỗi:", error);
  }
}

// Bài 8: Gọi API tuần tự
async function getUserWithPosts(userId) {
  try {
    console.log(`Lấy User và Posts tuần tự (ID: ${userId})`);
    
    // Gọi API lấy User
    const userRes = await fetch(`https://dummyjson.com/users/${userId}`);
    const user = await userRes.json();
    
    // Gọi API lấy Posts của user đó
    const postsRes = await fetch(`https://dummyjson.com/posts/user/${userId}`);
    const postData = await postsRes.json();
    
    const result = {
      user: { id: user.id, name: user.firstName + " " + user.lastName, email: user.email },
      posts: postData.posts.map(p => ({ id: p.id, title: p.title }))
    };
    
    console.log("Dữ liệu gộp (User + Posts):", result);
  } catch (error) {
    console.error("Lỗi:", error);
  }
}

// Bài 9: Gọi API song song (Promise.all)
async function getDashboardData() {
  try {
    console.log("So sánh gọi Tuần tự vs Song song");
    
    // GỌI TUẦN TỰ
    console.time("Thời gian gọi Tuần tự");
    const pRes = await fetch(`https://dummyjson.com/products`);
    await pRes.json();
    
    const uRes = await fetch(`https://dummyjson.com/users`);
    await uRes.json();
    
    const oRes = await fetch(`https://dummyjson.com/carts`); // Dùng carts thay cho orders
    await oRes.json();
    console.timeEnd("Thời gian gọi Tuần tự");
    
    // GỌI SONG SONG
    console.time("Thời gian gọi Song song");
    const [productsRes, usersRes, ordersRes] = await Promise.all([
      fetch(`https://dummyjson.com/products`),
      fetch(`https://dummyjson.com/users`),
      fetch(`https://dummyjson.com/carts`) // Dùng carts thay cho orders
    ]);
    
    // Đợi parse body (json)
    await Promise.all([productsRes.json(), usersRes.json(), ordersRes.json()]);
    console.timeEnd("Thời gian gọi Song song");
    
    console.log("Nhận xét: Gọi song song (Promise.all) tốn ít thời gian hơn do request được bắn đi đồng thời. Tuần tự phải đợi xong API 1 mới gọi API 2.");
  } catch (error) {
    console.error("Lỗi:", error);
  }
}

// Bài 10: Mini CRUD qua Console
async function main() {
  try {
    const BASE_URL = "http://localhost:3000/products";
    console.log("\n=== MINI CRUD ===");
    
    console.log("\n--- Bước 1: Lấy danh sách sản phẩm ---");
    const getRes = await fetch(BASE_URL);
    const products = await getRes.json();
    console.table(products);
    
    console.log("\n--- Bước 2: Thêm một sản phẩm mới ---");
    const postRes = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Iphone 20", price: 2000, stock: 50 })
    });
    const newProduct = await postRes.json();
    console.log("Thêm thành công! Dữ liệu:", newProduct);
    const newId = newProduct.id; 
    
    console.log("\n--- Bước 3: Sửa giá của sản phẩm vừa thêm ---");
    const patchRes = await fetch(`${BASE_URL}/${newId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ price: 9999 })
    });
    const updatedProduct = await patchRes.json();
    console.log("Cập nhật thành công! Dữ liệu:", updatedProduct);
    
    console.log("\n--- Bước 4: Xóa sản phẩm vừa thêm ---");
    const deleteRes = await fetch(`${BASE_URL}/${newId}`, { method: "DELETE" });
    await deleteRes.json();
    console.log("Xóa thành công ID:", newId);
    
    console.log("\n--- Bước 5: Lấy lại danh sách sản phẩm để xác nhận ---");
    const finalRes = await fetch(BASE_URL);
    const finalProducts = await finalRes.json();
    console.table(finalProducts);
    
    console.log("\n=== HOÀN THÀNH MINI CRUD ===");
  } catch (error) {
    console.error("Lỗi trong quá trình chạy Mini CRUD:", error);
  }
}

// CHẠY TEST (Sử dụng IIFE Async để gọi code tuần tự)
(async () => {
  /*
  await getAllProducts();
  await getProductById(1);
  await getProductById(999); 
  await safeFetch("https://dummyjson.com/invalid-url");
  await safeFetch("https://invalid-domain.local");
  await addProduct({ title: "Iphone 20", price: 2000, stock: 50 });
  await updateProduct(1, { price: 9999 }); 
  await deleteProduct(1);
  await searchProducts("phone", 500, 1000);
  await getUserWithPosts(1);
  await getDashboardData();
  */
  
  await main();
})();
