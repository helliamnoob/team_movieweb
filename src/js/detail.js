//API 설정
const API_KEY = 'fece76c90411f4d9e1fbf18bdd5303a6'
const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZWNlNzZjOTA0MTFmNGQ5ZTFmYmYxOGJkZDUzMDNhNiIsInN1YiI6IjY0NzZkOWYzODlkOTdmMDBkYjRlMTUxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LIt63r6VI3rvUphHKrkrzNTOPXfGRzsaGKdHej1Xurc'
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TOKEN}`
  }
};
//TMDB API를 통해서 데이터를 받고 제이슨화 해서 movieCard라는 변수안에 createMovieCard를
//담아서 moviesContainer에 자식으로 등록 
let url = location.href;
let idx = url.indexOf("=");
let id;
if(idx >= 0) {
  idx = idx + 1;
  id = url.substring(idx,url.length);
}

console.log(id)
//TMDB API를 통해서 데이터를 받고 제이슨화 해서 movieCard라는 변수안에 createMovieCard를
//담아서 moviesContainer에 자식으로 등록 
fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US&page=1`, options)
  .then(response => response.json())
  .then(movies => {
  
      const movieCard =createMovieCard(movies);
      moviesContainer.appendChild(movieCard);

  })
  .catch(err => console.error(err));



const backbtn = document.getElementById('back');
backbtn.addEventListener('click', function(){history.back();})


const moviesContainer = document.getElementById('movies-container');

//구조분해할당
const createMovieCard = movie => {
  const { title, overview, poster_path, vote_average, id} = movie;
  
  const card = document.createElement('div');
  card.className = 'movie-card';

  const image = document.createElement('img');
  image.className = 'poster-image';
  image.id = id;
  const titleElement = document.createElement('h2');
  titleElement.className = 'title';

  const overviewElement = document.createElement('p');
  overviewElement.className = 'overview';

  const voteAverageElement = document.createElement('p');
  voteAverageElement.className = 'vote-average';
 


  image.src = `https://image.tmdb.org/t/p/w500${poster_path}`;

  titleElement.textContent = title;
  overviewElement.textContent = overview;
  voteAverageElement.textContent = `Vote Average: ${vote_average}`;

  card.appendChild(image);
  card.appendChild(titleElement);
  card.appendChild(overviewElement);
  card.appendChild(voteAverageElement);


  return card;
}


//검색기능 
function search() {
   moviesContainer.innerHTML=""
  let text = document.getElementById("search-input").value;
  fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`, options)
  .then(res => res.json())
  .then(movies => {
    console.log(movies.results) 
    movies.results.forEach(movie => {

     if(movie.title.includes(text)) {
        const movieCard = createMovieCard(movie);
        moviesContainer.appendChild(movieCard);
      }
    })
    //포스터 이미지 클릭 시 포스터에 대한 ID 값 출력
    const img = document.querySelectorAll('.poster-image')
    const imgLength = img.length;
    for(let i = 0; i<imgLength; i++){
    img[i].addEventListener('click', function(){alert(img[i].id)})
  }
  })
  .catch(err => console.error(err));
}

const searchBtn = document.getElementById("searchBtn")

document.getElementById('reviewForm').addEventListener('submit', function (event) {
  event.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

  const author = document.getElementById('author').value;
  const content = document.getElementById('content').value;
  const password = document.getElementById('password').value;
  const rating = document.getElementById('rating').value;

  const review = {
    author: author,
    content: content,
    password: password,
    rating: rating
  };
  saveReview(review);
  displayReviews();
});

// 리뷰를 저장하는 함수
function saveReview(review) {
  let reviews = localStorage.getItem('reviews');
  if (reviews) {
    reviews = JSON.parse(reviews);
  } else {
    reviews = [];
  }
  review.movieId = id;
  reviews.push(review);
  localStorage.setItem('reviews', JSON.stringify(reviews));
}

// 리뷰 목록을 표시하는 함수
function displayReviews() {
  const reviewList = document.getElementById('reviewList');
  reviewList.innerHTML = '';

  let reviews = localStorage.getItem('reviews');
  if (reviews) {
    reviews = JSON.parse(reviews);
    reviews.forEach(function (review) {
      if (review.movieId === id) { // 현재 페이지의 영화에 해당하는 리뷰인지 확인
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review';
        reviewItem.innerHTML = '<p><strong>작성자:</strong> ' + review.author + '</p><p><strong>내용:</strong> ' + review.content + '</p>';

        const ratingElement = document.createElement('p');
        ratingElement.innerHTML = '<strong>평점:</strong> ' + getStarRating(review.rating);
        reviewItem.appendChild(ratingElement);

        const editButton = document.createElement('button');
        editButton.innerHTML = '수정';
        editButton.onclick = function () {
          editReview(review);
        };
        reviewItem.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '삭제';
        deleteButton.onclick = function () {
          deleteReview(review);
        };
        reviewItem.appendChild(deleteButton);

        reviewList.appendChild(reviewItem);
      }
    });
  }
}

// 리뷰 수정
function editReview(review) {
  let reviews = localStorage.getItem('reviews');
  if (reviews) {
    reviews = JSON.parse(reviews);

    // 현재 영화에 해당하는 리뷰를 찾음
    const reviewIndex = reviews.findIndex(item => item.movieId === review.movieId);
    if (reviewIndex !== -1) {
      const existingReview = reviews[reviewIndex];

      const enteredPassword = prompt('비밀번호를 입력하세요.');
      if (enteredPassword === existingReview.password) {
        const newContent = prompt('새로운 리뷰 내용을 입력하세요.', existingReview.content);
        const newRating = parseInt(prompt('새로운 평점을 입력하세요 (1-5)', existingReview.rating));
        if (newRating > 5) {
          alert('평점은 5 이하의 숫자로 입력해주세요.');
        } else {
          existingReview.rating = newRating;
          existingReview.content = newContent;

          localStorage.setItem('reviews', JSON.stringify(reviews));
          displayReviews();
        }
      } else {
        alert('비밀번호가 일치하지 않습니다.');
      }
    }
  }
}

// 리뷰 삭제
function deleteReview(review) {
  let reviews = localStorage.getItem('reviews');
  if (reviews) {
    reviews = JSON.parse(reviews);

    // 현재 영화에 해당하는 리뷰를 찾음
    const reviewIndex = reviews.findIndex(item => item.movieId === review.movieId);
    if (reviewIndex !== -1) {
      const existingReview = reviews[reviewIndex];

      const enteredPassword = prompt('비밀번호를 입력하세요.');
      if (enteredPassword === existingReview.password) {
        reviews.splice(reviewIndex, 1);
        localStorage.setItem('reviews', JSON.stringify(reviews));
        displayReviews();
      } else {
        alert('비밀번호가 일치하지 않습니다.');
      }
    }
  }
}

// 별 아이콘으로 변환하는 함수
function getStarRating(rating) {
  const roundedRating = Math.round(parseFloat(rating));
  const stars = '<span class="stars">&#9733;</span>'.repeat(roundedRating); // 별 아이콘을 반복하여 표시
  return stars;
}

// 리뷰 내용 입력 제한 설정
const contentInput = document.getElementById('content');
const MAX_LENGTH = 100;

contentInput.addEventListener('input', function () {
  const content = contentInput.value;
  const characterCount = content.length;

  // 글자 수 표시 업데이트
  const characterCountElement = document.querySelector('.character-count');
  characterCountElement.textContent = characterCount + ' / ' + MAX_LENGTH;

  if (content.length > MAX_LENGTH) {
    contentInput.value = content.slice(0, MAX_LENGTH);
    alert('리뷰 내용은 최대 ' + MAX_LENGTH + '자까지 입력 가능합니다.');
  }
});

// 페이지 로드 시 저장된 리뷰 표시
displayReviews();
