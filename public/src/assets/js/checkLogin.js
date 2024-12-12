// Import các hàm cần thiết từ Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";

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

// Kiểm tra trạng thái đăng nhập
function checkLoginStatus() {
  // Lấy thông tin đăng nhập từ localStorage
  const userEmail = localStorage.getItem("userEmail");
  const userUid = localStorage.getItem("userUid");
  const loginTime = localStorage.getItem("loginTime");

  // Kiểm tra nếu không có thông tin đăng nhập trong localStorage
  if (!userEmail || !userUid || !loginTime) {
    console.log("Chưa đăng nhập");
    return;
  }

  // Kiểm tra nếu thời gian đăng nhập đã quá 15 phút
  const currentTime = new Date().getTime();
  const elapsedTime = currentTime - parseInt(loginTime);
  const fifteenMinutesInMs = 5 * 60 * 1000; // 15 phút tính bằng mili giây

  if (elapsedTime > fifteenMinutesInMs) {
    // Nếu đã quá 15 phút, xóa các mục trong localStorage và thông báo
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userUid");
    localStorage.removeItem("loginTime");
    console.log("Phiên đăng nhập đã hết hạn. Đã xóa dữ liệu.");
    console.log("Chưa đăng nhập");
    return;
  }

  // Tính thời gian còn lại để đăng xuất
  const remainingTime = fifteenMinutesInMs - elapsedTime;
  const minutesLeft = Math.floor(remainingTime / 60000); // Số phút còn lại
  const secondsLeft = Math.floor((remainingTime % 60000) / 1000); // Số giây còn lại

  // In ra thông báo về thời gian còn lại
  console.log(`Sẽ tự động đăng xuất sau: ${minutesLeft} phút ${secondsLeft} giây`);

  // Hiển thị thời gian còn lại trên giao diện (nếu cần)
  const countdownElement = document.getElementById('countdown'); // Giả sử bạn có một phần tử với id 'countdown'
  if (countdownElement) {
    countdownElement.innerText = `Sẽ tự động đăng xuất sau: ${minutesLeft} phút ${secondsLeft} giây`;
  }

  // Kiểm tra trạng thái đăng nhập trên Firebase
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // So sánh thông tin từ Firebase với thông tin lưu trong localStorage
      if (user.email === userEmail && user.uid === userUid) {
        console.log(`Đã đăng nhập thành công`);
        console.log(`Email: ${userEmail}`);
        console.log(`UID: ${userUid}`);


        // Tạo URL của ảnh trên Cloudinary
        const imageName = userEmail.replace("@gmail.com", "");
        const cloudinaryImageName = "A" + imageName + ".jpg"; 
        const imageUrl = `https://res.cloudinary.com/dja3ehblp/image/upload/${cloudinaryImageName}`;

        console.log(`Tên ảnh trên Cloudinary: ${cloudinaryImageName}`);
        console.log(`URL ảnh: ${imageUrl}`);

        const avatarElement = document.querySelector('.avatar');
        avatarElement.onclick = null;
        if (avatarElement) {
          // Xoá tất cả phần tử con của nó
          while (avatarElement.firstChild) {
            avatarElement.removeChild(avatarElement.firstChild);
          }

          // Thay nền của phần tử với ảnh từ Cloudinary
          avatarElement.style.backgroundImage = `url(${imageUrl})`;
          avatarElement.style.backgroundSize = 'cover';
          avatarElement.style.backgroundPosition = 'center';
        } else {
          console.log("Không tìm thấy phần tử avatar.");
        }
      } else {
        // Nếu thông tin không khớp, xóa các mục trong localStorage và thông báo
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userUid");
        localStorage.removeItem("loginTime");
        console.log("Thông tin đăng nhập không hợp lệ. Đã xóa dữ liệu.");
        console.log("Chưa đăng nhập");
      }
    } else {
      // Nếu người dùng không đăng nhập
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userUid");
      localStorage.removeItem("loginTime");
      console.log("Chưa đăng nhập");

    }
  });
}

// Gọi hàm kiểm tra khi trang được tải lại
checkLoginStatus();
