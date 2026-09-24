// Bài 1: Đếm nguyên âm
//Viết hàm countVowels(str) nhận vào một chuỗi và đếm số lượng nguyên âm (a, e, i, o, u — không phân biệt hoa thường) xuất hiện trong chuỗi đó.
function countVowels(str) {
  let count = 0;
  const lowerStr = str.toLowerCase();

  for (let i = 0; i < lowerStr.length; i++) {
    const char = lowerStr[i];
    if (char === "a" || char === "e" || char === "i" || char === "o" || char === "u") {
      count++;
    }
  }

  return count;
}

console.log(countVowels("Xin chao cac ban"));

// Bài 2: Kiểm tra chuỗi đối xứng (Palindrome)
// Viết hàm isPalindrome(str) kiểm tra một chuỗi có phải là chuỗi đối xứng hay không, bỏ qua khoảng trắng và không phân biệt hoa thường.
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

console.log(isPalindrome("madam"));
console.log(isPalindrome("Toi yeu Viet Nam"));

// Bài 3: Đảo ngược từng từ trong câu
// Viết hàm reverseEachWord(str) giữ nguyên thứ tự các từ trong câu, nhưng đảo ngược thứ tự ký tự trong từng từ.
function reverseEachWord(str) {
  let result = "";
  let currentWord = "";

  for (let i = 0; i <= str.length; i++) {
    const char = str[i];

    if (char === " " || i === str.length) {
      let reversedWord = "";
      for (let j = currentWord.length - 1; j >= 0; j--) {
        reversedWord += currentWord[j];
      }
      result += reversedWord;

      if (i !== str.length) {
        result += " ";
      }

      currentWord = "";
    } else {
      currentWord += char;
    }
  }

  return result;
}

console.log(reverseEachWord("Hoc lap trinh"));

// Bài 4: Nén chuỗi ký tự lặp lại
// Viết hàm compressString(str) nén các ký tự liên tiếp giống nhau thành dạng ký_tự + số_lần.
function compressString(str) {
  if (str.length === 0) return "";
  let compressed = "";
  let count = 1;

  for (let i = 1; i <= str.length; i++) {
    if (str[i] === str[i - 1]) {
      count++;
    } else {
      compressed += str[i - 1] + count;
      count = 1;
    }
  }

  return compressed.length < str.length ? compressed : str;
}

console.log(compressString("aaabbbccd"));
console.log(compressString("abc"));

// Bài 5: Kiểm tra hai chuỗi có phải là "Anagram" của nhau không
// Viết hàm isAnagram(str1, str2) kiểm tra hai chuỗi có chứa đúng các ký tự giống nhau
function isAnagram(str1, str2) {
  const cleanStr1 = str1.replace(/\s/g, "").toLowerCase();
  const cleanStr2 = str2.replace(/\s/g, "").toLowerCase();

  if (cleanStr1.length !== cleanStr2.length) {
    return false;
  }

  for (let i = 0; i < cleanStr1.length; i++) {
    const char = cleanStr1[i];
    let count1 = 0;
    let count2 = 0;

    for (let j = 0; j < cleanStr1.length; j++) {
      if (cleanStr1[j] === char) count1++;
    }
    
    for (let k = 0; k < cleanStr2.length; k++) {
      if (cleanStr2[k] === char) count2++;
    }

    if (count1 !== count2) {
      return false;
    }
  }

  return true;
}

console.log(isAnagram("nghe si", "sinh nghe")); // true
console.log(isAnagram("hello", "world"));    // false
