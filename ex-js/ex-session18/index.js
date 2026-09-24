// Bài 1: Viết một hàm checkAge(age) trả về một Promise
function checkAge(age) {
  return new Promise((resolve, reject) => {
    if (age >= 18) {
      resolve("Đủ tuổi");
    } else {
      reject("Chưa đủ tuổi");
    }
  });
}

checkAge(20)
  .then((msg) => console.log("Tuổi 20:", msg))
  .catch((err) => console.log("Tuổi 20:", err));

checkAge(15)
  .then((msg) => console.log("Tuổi 15:", msg))
  .catch((err) => console.log("Tuổi 15:", err));

// Bài 2: Giả lập gọi API với setTimeout
function fetchUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: id,
        name: "User " + id,
      });
    }, 400);
  });
}

console.log("Đang chờ...");
fetchUser(1).then((user) => {
  console.log("Dữ liệu User lấy được:", user);
});

// Bài 3: Chuỗi Promise (Promise Chaining)
function layDonHang(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: id, sanPham: "Áo thun" }), 500);
  });
}

function tinhTien(donHang) {
  return new Promise((resolve) => {
    const price = donHang.sanPham === "Áo thun" ? 200000 : 0;
    setTimeout(() => resolve(price), 500);
  });
}

function apDungGiamGia(gia) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(gia * 0.9), 500);
  });
}

layDonHang(101)
  .then((donHang) => {
    console.log("Đã lấy đơn hàng:", donHang);
    return tinhTien(donHang);
  })
  .then((gia) => {
    console.log("Giá tiền:", gia);
    return apDungGiamGia(gia);
  })
  .then((giaCuoi) => {
    console.log("Giá sau khi giảm 10%:", giaCuoi);
  });

// Bài 4: Viết 3 hàm giả lập lấy điểm. Mỗi hàm sử dụng setTimeout với thời gian khác nhau
function layDiemToan() {
  return new Promise((resolve) => setTimeout(() => resolve(8), 1000));
}

function layDiemVan() {
  return new Promise((resolve) => setTimeout(() => resolve(7), 2000));
}

function layDiemAnh() {
  return new Promise((resolve) => setTimeout(() => resolve(9), 3000));
}

console.log("Bắt đầu lấy điểm (đợi ~3s)...");
console.time("Thời gian thực thi");

Promise.all([layDiemToan(), layDiemVan(), layDiemAnh()]).then((results) => {
  const [toan, van, anh] = results;
  console.log(`Điểm Toán: ${toan}, Văn: ${van}, Anh: ${anh}`);
  const avg = (toan + van + anh) / 3;
  console.log("Điểm trung bình:", avg.toFixed(2));
  console.timeEnd("Thời gian thực thi");
});

// Bài 5: Xử lý lỗi với Pr omise.all()
function api1() {
  return new Promise((resolve) => setTimeout(() => resolve("API 1 OK"), 1000));
}
function api2() {
  return new Promise((_, reject) =>
    setTimeout(() => reject("API 2 LỖI MẠNG"), 1500),
  );
}
function api3() {
  return new Promise((resolve) => setTimeout(() => resolve("API 3 OK"), 2000));
}

setTimeout(() => {
  Promise.all([api1(), api2(), api3()])
    .then((res) => console.log("All success:", res))
    .catch((err) => console.log("Promise.all bị reject vì:", err));

  setTimeout(() => {
    // Promise.allSettled sẽ đợi tất cả xong hết, không quan tâm lỗi hay thành công
    Promise.allSettled([api1(), api2(), api3()]).then((results) => {
      console.log("Kết quả Promise.allSettled:");
      results.forEach((res, index) => {
        console.log(
          `- API ${index + 1}: Trạng thái: ${res.status} | Giá trị/Lỗi: ${res.status === "fulfilled" ? res.value : res.reason}`,
        );
      });
    });
  }, 2500);
}, 3500);
