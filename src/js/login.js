import {displayReviews} from './review.js';

const logoutBtn = document.getElementById('logoutBtn');
const showLoginFormBtn = document.getElementById('showLoginFormBtn');
const showSignupFormBtn = document.getElementById('showSignupFormBtn');
const reviewFormContainer = document.getElementById('reviewForm');
const loginFormContainer = document.getElementById('loginFormContainer');
const signupFormContainer = document.getElementById('signupFormContainer');
const loginForm = document.getElementById('loginForm');



showSignupFormBtn.addEventListener('click', function() {
  if (signupFormContainer.style.display === 'block') {
    signupFormContainer.style.display = 'none';
  } else {
    signupFormContainer.style.display = 'block';
    loginFormContainer.style.display = 'none';
  }
});

showLoginFormBtn.addEventListener('click', function() {
  if (loginFormContainer.style.display === 'block') {
    loginFormContainer.style.display = 'none';
  } else {
    loginFormContainer.style.display = 'block';
    signupFormContainer.style.display = 'none';
  }
});

// 사용자 등록
document.getElementById("signupForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // 사용자명과 비밀번호 값을 가져옴
  var username = document.getElementById("registerUsername").value;
  var password = document.getElementById("registerPassword").value;

  registerUser(username, password);
});

function registerUser(username, password) {
  let users = localStorage.getItem('users');
  if (users) {
    users = JSON.parse(users);
  } else {
    users = [];
  }

  // 사용자명이 이미 존재하는지 확인
  const existingUser = users.find(user => user.username === username);
  if (existingUser) {
    alert('이미 존재하는 사용자명입니다. 다른 사용자명을 선택해주세요.');
    return;
  }

  const user = {
    username: username,
    password: password
  };

  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  alert('사용자 등록이 완료되었습니다.');
  document.getElementById("signupForm").reset();
}

// 로그인
document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault();

  // 사용자명과 비밀번호 값을 가져옴
  var username = document.getElementById("loginUsername").value;
  var password = document.getElementById("loginPassword").value;

  loginUser(username, password);
});


//로그인중인지 체크하기!
const loginStatus = async (id) => {
  let nowId = id;
  localStorage.setItem('nowId', nowId);
}
const logoutStatus = async() =>{
  localStorage.removeItem('nowId');
}

async function loginUser(username, password) {
  let users = localStorage.getItem('users');
  if (users) {
    users = JSON.parse(users);
    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
      alert('로그인에 성공했습니다.');
      // 로그인 성공 시 원하는 동작 수행
      loginStatus(username);
      displayReviews();  
      checkLoginStatus();
    } else {
      alert('사용자명 또는 비밀번호가 올바르지 않습니다.');
    }
  } else {
    alert('등록된 사용자가 없습니다. 먼저 사용자를 등록해주세요.');
  }
}


logoutBtn.addEventListener('click', function() {
  // 로그아웃 로직 실행
  logoutUser();
  
});

async function logoutUser() {
  // 로그아웃 로직 실행
  logoutStatus();
  // 예시: 로그아웃 후 로직
  alert('로그아웃 되었습니다.');
  displayReviews();  
  checkLoginStatus();

  // 로그인 버튼과 회원가입 버튼 보이도록 설정
}


function checkLoginStatus() {
  let reviews = localStorage.getItem('reviews');
  let nowId = localStorage.getItem('nowId');
  if (nowId) {
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

