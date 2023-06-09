import { listing, sortMoviesByRating, sortMoviesByTitle} from '../js/main.js';
import { hidden, hiddenOff, weather, getClock } from '../js/about.js';

//SPA 라우팅을 구현해보고 싶어서 만들었습니다.
//네비게이션바 클릭시 일어나는 함수
const route = (id, event) => {
   event = event || window.event;
   const routeid = id;

   if (routeid === 'home') {
      event.preventDefault();
      window.history.pushState({}, '', event.target.href);
      setTimeout(() => listing(), 100);
      handleLocation();
      hiddenOff();
      setTimeout(() => sortMoviesByRating(), 200);
      setTimeout(() => sortMoviesByTitle(), 200);
      clearInterval();
      

   } else if (routeid === 'about') {
      event.preventDefault();
      window.history.pushState({}, '', event.target.href);
      handleLocation();
      hidden();
      setInterval(getClock, 1000);
      setTimeout(() => weather(), 100);
   }
};

//경로별 html 설정
const routes = {
   404: 'src/pages/404.html',
   '/index.html': 'src/pages/home.html',
   '/': 'src/pages/home.html',
   '/detail.html': 'src/pages/detail.html',
   '/about': 'src/pages/about.html',
};

//index.html 메인페이지의 main-page div안에 불러오는 값을 끼워넣는 함수
const handleLocation = async () => {
   const path = window.location.pathname;
   const route = routes[path] || routes[404];
   const html = await fetch(route).then((data) => data.text());
   document.getElementById('main-page').innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();
