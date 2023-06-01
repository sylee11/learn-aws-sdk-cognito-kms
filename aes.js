import CryptoJS from "crypto-js";
// const CryptoJS = require("crypto-js");

// Hàm mã hóa private key bằng mật khẩu

function encryptPrivateKey(privateKey, password) {
  // const salt = CryptoJS.lib.WordArray.random(128 / 8); // Salt ngẫu nhiên
  const salt = '0d90a77788e173cc01d20df3d492c1b4'; // Salt ngẫu nhiên
  const iterations = 1000; // Số lần lặp lại PBKDF2
  const keySize = 256 / 32; // Độ dài khóa PBKDF2 (bit)
  
  // Phát sinh khóa từ mật khẩu và salt bằng PBKDF2
  const key = CryptoJS.PBKDF2(password, salt, {
    keySize: keySize,
    iterations: iterations,
  });
  console.log('11111111111', key.toString())
  // Mã hóa private key bằng AES với khóa phát sinh từ PBKDF2
  const encryptedPrivateKey = CryptoJS.AES.encrypt(privateKey, key, {
    iv: CryptoJS.enc.Hex.parse("3ad77bb40d7a3660a89ecaf32466ef97"), // Vector khởi tạo (IV) ngẫu nhiên
  });
  
  // Kết quả gồm salt và private key đã được mã hóa
  const result = {
    salt: salt.toString(),
    encryptedPrivateKey: encryptedPrivateKey.toString(),
  };
  
  return result;
}

// Hàm giải mã private key bằng mật khẩu
function decryptPrivateKey(encryptedPrivateKey, password, salt) {
  const iterations = 1000; // Số lần lặp lại PBKDF2
  const keySize = 256 / 32; // Độ dài khóa PBKDF2 (bit)
  
  // Phát sinh khóa từ mật khẩu và salt bằng PBKDF2
  const key = CryptoJS.PBKDF2(password, salt, {
    keySize: keySize,
    iterations: iterations,
  });

  console.log(';;;;;;;;;;;;;;;;', key.toString())
  
  // Giải mã private key bằng AES với khóa phát sinh từ PBKDF2
  const decryptedPrivateKey = CryptoJS.AES.decrypt(encryptedPrivateKey, key, {
    iv: CryptoJS.enc.Hex.parse("3ad77bb40d7a3660a89ecaf32466ef97"), // Vector khởi tạo (IV) ngẫu nhiên
  });
  
  // Kết quả là private key đã được giải mã
  return decryptedPrivateKey.toString(CryptoJS.enc.Utf8);
}

// Thông tin đầu vào
const privateKey = "hello wor "; // Private key cần mã hóa
const password = "mypassword"; // Mật khẩu người dùng

// Mã hóa private key
const encryptedResult = encryptPrivateKey(privateKey, password);
console.log("Salt:", encryptedResult.salt);
console.log("Encrypted Private Key:", encryptedResult.encryptedPrivateKey);

// Giải mã private key
const decryptedResult = decryptPrivateKey(encryptedResult.encryptedPrivateKey, password, encryptedResult.salt);
console.log("Decrypted Private Key:", decryptedResult);