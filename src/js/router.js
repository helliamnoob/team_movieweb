import { listing } from '../js/main.js';
import { hidden, hiddenOff, weather, getClock } from '../js/about.js';


const route = (id, event) => {
   event = event || window.event;
   const routeid = id;

   if (routeid === 'home') {
      event.preventDefault();
      window.history.pushState({}, '', event.target.href);
      setTimeout(() => listing(), 100);
      handleLocation();

      hiddenOff();
   } else if (routeid === 'about') {
      event.preventDefault();
      window.history.pushState({}, '', event.target.href);
      handleLocation();
      hidden();
      setInterval(getClock,1000);
      setTimeout(() => weather(), 100);
   }
};

const routes = {
   404: 'src/pages/404.html',
   '/index.html': 'src/pages/home.html',
   '/': 'src/pages/home.html',
   '/detail.html': 'src/pages/detail.html',
   '/about': 'src/pages/about.html',
};

const handleLocation = async () => {
   const path = window.location.pathname;
   const route = routes[path] || routes[404];
   const html = await fetch(route).then((data) => data.text());
   document.getElementById('main-page').innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();

