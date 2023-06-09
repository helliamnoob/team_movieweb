document.addEventListener('DOMContentLoaded', function () {
   listing(); //필수 DOM제어하기 api 사용하여 DOM로드되었을 때 영화 리스트함수 실행시킴
   const sortButtons = document.querySelectorAll('.sort-buttons button');
   sortButtons[0].addEventListener('click', sortMoviesByTitle); // 제목순 정렬 버튼 클릭 시 영화를 제목순으로 정렬합니다.
   sortButtons[1].addEventListener('click', sortMoviesByRating); // 평점순 정렬 버튼 클릭 시 영화를 평점순으로 정렬합니다.
});

//영화api 가져오기
async function getMovieInfo() {
   const options = {
      method: 'GET',
      headers: {
         accept: 'application/json',
         Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMTkwMzExYjc0MTJjOGU3ODhjMTIyNTJhMmZjMTRjYyIsInN1YiI6IjY0NzIyOTU4OTQwOGVjMDExZjJiODFhYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wfetSlU-tf2XcEn1dKqUydIpBL-n4h_xqrEqgWkfo3Y',
      },
   };
   const response = await fetch(
      'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1',
      options,
   );

   const movieinfo = await response.json();

   return movieinfo;
}

//페이지가 켜졌을 때 영화 리스트 보여주는 함수
export async function listing() {
   try {
      const data = await getMovieInfo();
      const rows = data.results;
      const card = document.createElement('div');
      card.className = 'card-list';
      const moviesContainer = document.getElementById('main-page');
      moviesContainer.appendChild(card);
      const titlepath = document.querySelector('.card-list');
      rows.forEach((a) => {
         const { title, overview, vote_average, poster_path, id } = a;
         let temp_html = `<div class="movie-card" id="${id}" onclick="location.href='src/pages/detail.html?id=${id}'">
                            <img src="https://image.tmdb.org/t/p/w200${poster_path}">
                            <h5 class="card-title" id="title">${title}</h5>
                            <p class="card-text">${overview}</p>
                            <p class="vote">${vote_average}</p>
                        </div>`;
         titlepath.insertAdjacentHTML('beforeend', temp_html);
      });
   } catch (error) {
      console.log(error);
   }
}

//정렬버튼 기능
export function sortMoviesByTitle() {
   const cardList = document.querySelector('.card-list');
   const movieCards = Array.from(cardList.querySelectorAll('.movie-card'));
   movieCards.sort((a, b) => {
      const titleA = a
         .querySelector('.card-title')
         .textContent.trim()
         .toLowerCase();
      const titleB = b
         .querySelector('.card-title')
         .textContent.trim()
         .toLowerCase();
      return titleA.localeCompare(titleB);
   });
   movieCards.forEach((card) => cardList.appendChild(card));
}

//정렬버튼 기능
export function sortMoviesByRating() {
   const cardList = document.querySelector('.card-list');
   const movieCards = Array.from(cardList.querySelectorAll('.movie-card'));
   movieCards.sort((a, b) => {
      const ratingA = parseFloat(a.querySelector('.vote').textContent);
      const ratingB = parseFloat(b.querySelector('.vote').textContent);
      return ratingB - ratingA;
   });
   movieCards.forEach((card) => cardList.appendChild(card));
}

//영화 검색 기능
function searchMovies() {
   const searchTerm = document
      .getElementById('search-input')
      .value.trim()
      .toLowerCase();
   const cards = document.getElementsByClassName('movie-card');

   for (let i = 0; i < cards.length; i++) {
      const titleElement = cards[i].querySelector('.card-title');
      const title = titleElement.textContent.trim().toLowerCase();

      // if 조건문을 사용해 검색어와 일치하는 영화 카드만 표시하고 나머지는 숨깁니다.
      if (title.includes(searchTerm)) {
         cards[i].style.display = '';
      } else {
         cards[i].style.display = 'none';
      }
   }
}

const form = document.querySelector('#search');
form.addEventListener('submit', (event) => {
   event.preventDefault();
   searchMovies();
});
