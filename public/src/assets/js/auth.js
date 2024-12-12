// Import các hàm cần thiết từ Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEYTw6TCZHC0IV3lIAEfkTAte-JHf6cJs",
  authDomain: "webbcn-3b6f6.firebaseapp.com",
  projectId: "webbcn-3b6f6",
  storageBucket: "webbcn-3b6f6.firebasestorage.app",
  messagingSenderId: "727862906440",
  appId: "1:727862906440:web:2a1354ad161d9b2d99527d",
  measurementId: "G-PP830PMJ5K"
};

// Khởi tạo Firebase app
const app = initializeApp(firebaseConfig);

// Khởi tạo auth
const auth = getAuth(app);

// Handle login form submission
document.getElementById("login_button").addEventListener("click", async (event) => {
  event.preventDefault();

  const email = document.getElementById("user").value + "@gmail.com"; // Thêm @gmail.com vào email
  const password = document.getElementById("pass").value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Lấy email và xóa @gmail.com, sau đó thêm .jpg

    // Lưu avatar URL vào localStorage
    localStorage.setItem("userEmail", user.email);
    localStorage.setItem("userUid", user.uid);
    localStorage.setItem("loginTime", new Date().getTime());
    window.location.reload();
  } catch (error) {
    alert(`Lỗi: ${error.message}`);
  }
});
