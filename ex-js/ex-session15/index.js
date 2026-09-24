// Bài 1: Tìm số lớn thứ 2 trong mảng không dùng sort()
function findSecondLargest(arr) {
  if (!Array.isArray(arr) || arr.length < 2) {
    return null; 
  }

  let max1 = -Infinity;
  let max2 = -Infinity;

  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];

    if (num > max1) {
      // Nếu tìm thấy số lớn hơn max1 hiện tại thì max1 cũ sẽ trở thành max2, và max1 mới là số này
      max2 = max1;
      max1 = num;
    } else if (num > max2 && num < max1) {
      max2 = num;
    }
  }

  return max2 === -Infinity ? null : max2;
}

const arr = [3, 7, 2, 9, 9, 5,];
console.log(findSecondLargest(arr));

// Bài 2: Đếm số lần xuất hiện của từng phần tử
function countOccurrences(arr) {
  const uniqueWords = [];
  const counts = [];

  for (let i = 0; i < arr.length; i++) {
    const word = arr[i];
    const index = uniqueWords.indexOf(word);

    if (index !== -1) {
      // Đã tồn tại -> Tăng số đếm
      counts[index]++;
    } else {
      // Chưa tồn tại -> Thêm vào mảng
      uniqueWords.push(word);
      counts.push(1);
    }
  }

  for (let i = 0; i < uniqueWords.length; i++) {
    console.log(`${uniqueWords[i]}: ${counts[i]}`);
  }
}

const words = ["a", "b", "a", "c", "b", "a"];
countOccurrences(words);

// Bài 3: Tìm độ dài dãy tăng liên tiếp dài nhất
function longestIncreasingSubarray(arr) {
  if (arr.length === 0) return 0;

  let maxLength = 1;
  let currentLength = 1;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) {
      currentLength++;
    } else {
      currentLength = 1;
    }
    
    // Luôn lưu lại giá trị lớn nhất tìm được
    if (currentLength > maxLength) {
      maxLength = currentLength;
    }
  }

  return maxLength;
}

const arr3 = [1, 2, 2, 3, 4, 1, 5, 6, 7];
console.log(longestIncreasingSubarray(arr3));

// Bài 4: Đảo ngược thứ tự các từ trong câu
const sentence = "hôm nay trời đẹp";
const reversedSentence = sentence.split(" ").reverse().join(" ");
console.log(reversedSentence); 

// Bài 5: Kiểm tra chuỗi Palindrome
function isPalindrome(str) {
  const cleanStr = str.replace(/\s/g, "").toLowerCase();
  
  let left = 0;
  let right = cleanStr.length - 1;
  
  while (left < right) {
    if (cleanStr[left] !== cleanStr[right]) {
      return false;
    }
    left++;
    right--;
  }
  
  return true;
}

console.log(isPalindrome("Nam va van"));
console.log(isPalindrome("madam"));     
console.log(isPalindrome("hello"));     

// Bài 6: Two Sum
function twoSum(nums, target) {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        console.log(`Index: ${i} và ${j}`);
        return;
      }
    }
  }
}

const nums = [2, 7, 11, 15];
const target = 9;
twoSum(nums, target);
