import { displayReviews } from './review.js';

const logoutBtn = document.getElementById('logoutBtn');
const showLoginFormBtn = document.getElementById('showLoginFormBtn');
const showSignupFormBtn = document.getElementById('showSignupFormBtn');
const reviewFormContainer = document.getElementById('reviewForm');
const loginFormContainer = document.getElementById('loginFormContainer');
const signupFormContainer = document.getElementById('signupFormContainer');

//회원가입창 보이게 하는 이벤트 리스너
showSignupFormBtn.addEventListener('click', function () {
   if (signupFormContainer.style.display === 'block') {
      signupFormContainer.style.display = 'none';
   } else {
      signupFormContainer.style.display = 'block';
      loginFormContainer.style.display = 'none';
   }
});

//로그인창 보이게 하는 이벤트 리스너
showLoginFormBtn.addEventListener('click', function () {
   if (loginFormContainer.style.display === 'block') {
      loginFormContainer.style.display = 'none';
   } else {
      loginFormContainer.style.display = 'block';
      signupFormContainer.style.display = 'none';
   }
});

// 사용자 로그인 상태 변수
let isLoggedIn = false;

// 사용자 정보
let currentUser = null;

// 쿠키 설정 함수
function setCookie(name, value, days) {
   const date = new Date();
   date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
   const expires = 'expires=' + date.toUTCString();
   document.cookie = name + '=' + value + ';' + expires + ';path=/';
}

// 쿠키 가져오기 함수
function getCookie(name) {
   const cookieName = name + '=';
   const cookies = document.cookie.split(';');
   for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === ' ') {
         cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
         return cookie.substring(cookieName.length, cookie.length);
      }
   }
   return '';
}

// 초기 로그인 상태 확인 및 UI 설정
checkLoginStatus();

// 페이지 로드 시 쿠키에서 로그인 상태 확인
window.addEventListener('load', function () {
   const isLoggedInCookie = getCookie('isLoggedIn');
   isLoggedIn = isLoggedInCookie === 'true';
   checkLoginStatus();
});

// 사용자 등록
document
   .getElementById('signupForm')
   .addEventListener('submit', function (event) {
      event.preventDefault();

      // 사용자명과 비밀번호 값을 가져옴
      var username = document.getElementById('registerUsername').value;
      var password = document.getElementById('registerPassword').value;

      registerUser(username, password);
      checkLoginStatus();
   });

function registerUser(username, password) {
   let users = localStorage.getItem('users');
   if (users) {
      users = JSON.parse(users);
   } else {
      users = [];
   }

   // 사용자명이 이미 존재하는지 확인
   const existingUser = users.find((user) => user.username === username);
   if (existingUser) {
      alert('이미 존재하는 사용자명입니다. 다른 사용자명을 선택해주세요.');
      return;
   }

   const user = {
      username: username,
      password: password,
   };

   users.push(user);
   localStorage.setItem('users', JSON.stringify(users));
   alert('사용자 등록이 완료되었습니다.');
   document.getElementById('signupForm').reset();
}

// 로그인
document
   .getElementById('loginForm')
   .addEventListener('submit', function (event) {
      event.preventDefault();

      // 사용자명과 비밀번호 값을 가져옴
      var username = document.getElementById('loginUsername').value;
      var password = document.getElementById('loginPassword').value;

      loginUser(username, password);
   });

//로그인중인지 체크하기!
const loginStatus = async (id) => {
   let nowId = id;
   localStorage.setItem('nowId', nowId);
};
const logoutStatus = async () => {
   localStorage.removeItem('nowId');
};

//로그인 확인기능
async function loginUser(username, password) {
   let users = localStorage.getItem('users');
   if (users) {
      users = JSON.parse(users);
      const user = users.find(
         (user) => user.username === username && user.password === password,
      );
      if (user) {
         alert('로그인에 성공했습니다.');
         // 로그인 성공 시 원하는 동작 수행
         loginStatus(username);
         

         isLoggedIn = true; // 로그인 상태 변수 변경
         currentUser = { username: username }; // 현재 사용자 설정

         // 쿠키에 로그인 상태 저장
         setCookie('isLoggedIn', 'true', 7);
         displayReviews();
         checkLoginStatus();
      } else {
         alert('사용자명 또는 비밀번호가 올바르지 않습니다.');
      }
   } else {
      alert('등록된 사용자가 없습니다. 먼저 사용자를 등록해주세요.');
   }
}

logoutBtn.addEventListener('click', function () {
   // 로그아웃 로직 실행
   logoutUser();
});

async function logoutUser() {
   // 로그아웃 로직 실행
   logoutStatus();
   isLoggedIn = false; // 로그인 상태 변수 변경
   currentUser = null; // 현재 사용자 초기화
   // 예시: 로그아웃 후 로직
   alert('로그아웃 되었습니다.');
   displayReviews();
   checkLoginStatus(); // 로그인 상태 확인 및 UI 업데이트

   // 쿠키에서 로그인 상태 제거
   setCookie('isLoggedIn', 'false', 0);
}

// 사용자 로그인 상태 확인 함수
function checkLoginStatus() {
   if (isLoggedIn) {
      // 로그인 상태일 때 수행할 동작
      showLoggedInUI();
   } else {
      // 로그아웃 상태일 때 수행할 동작
      showLoggedOutUI();
   }
}

// 로그인 상태 UI 표시
function showLoggedInUI() {
   logoutBtn.style.display = 'block';
   showLoginFormBtn.style.display = 'none';
   showSignupFormBtn.style.display = 'none';
   reviewFormContainer.style.display = 'block';
   loginFormContainer.style.display = 'none';
   signupFormContainer.style.display = 'none';
}

// 로그아웃 상태 UI 표시
function showLoggedOutUI() {
   logoutBtn.style.display = 'none';
   showLoginFormBtn.style.display = 'block';
   showSignupFormBtn.style.display = 'block';
   reviewFormContainer.style.display = 'block';
   loginFormContainer.style.display = 'block';
   signupFormContainer.style.display = 'none';
}
