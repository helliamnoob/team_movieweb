document.addEventListener('DOMContentLoaded', function () {
  listing(); //필수 DOM제어하기 api 사용하여 DOM로드되었을 때 영화 리스트함수 실행시킴
});

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
async function listing() {
  const data = await getMovieInfo();
  const rows = data.results;
  rows.forEach((a) => {
    let title = a.title;
    let overview = a.overview;
    let vote_average = a.vote_average;
    let poster_path = a.poster_path;
    let movieId = a.id;
    const titlepath = document.getElementById('card-list');

    let temp_html = `<div class="movie-card" id="${movieId}" onclick="showMovieId(this.id)">
                        <img src="https://image.tmdb.org/t/p/w500${poster_path}">
                        <h5 class="card-title" id="title">${title}</h5>
                        <p class="card-text" id="overview">${overview}</p>
                        <p class="vote" id="vote">${vote_average}</p>
                    </div>`;

    titlepath.insertAdjacentHTML('beforeend', temp_html);
  });
}

function searchMovies() {
  const searchTerm = document.getElementById('search-input').value.trim().toLowerCase();
  const cards = document.getElementsByClassName('movie-card');

  for (let i = 0; i < cards.length; i++) {
      const titleElement = cards[i].querySelector('.card-title');
      const title = titleElement.textContent.trim().toLowerCase();

      // if 조건문을 사용해 검색어와 일치하는 영화 카드만 표시하고 나머지는 숨깁니다.
      if (title.includes(searchTerm)) {
          cards[i].style.display = "";
      } else {
          cards[i].style.display = 'none';
      }
  }
}

const form = document.querySelector("#search");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  searchMovies();
});

function showMovieId(id) {
  alert(`Movie ID: ${id}`);
}