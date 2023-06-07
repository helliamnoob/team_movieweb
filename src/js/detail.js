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
let idx = url.indexOf("?");
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

