import {listing} from '../js/main.js'
import {hidden} from '../js/about.js'
import { showMovieId } from '../js/main.js';

const route = (id, event) => {
    event = event || window.event;
    const routeid = id
    console.log(routeid);
    if(routeid === 'home')
    {   
        
        window.history.pushState({}, "", event.target.href);
        handleLocation();
        listing();
        showMovieId();
       
    }
    else
    {
        event.preventDefault();
        window.history.pushState({}, "", event.target.href);
        handleLocation();
        hidden();
    }
};

const routes = {
    404: "src/pages/404.html",
    "/index.html" : "src/pages/home.html",
    "/": "src/pages/home.html",
    "/detail.html": "src/pages/detail.html",
    "/detail": "src/pages/detail.html",
    "/about" : "src/pages/about.html",
    "/detail" : "src/pages/detail.html",
    

};

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = await fetch(route).then((data) => data.text());
    document.getElementById("main-page").innerHTML = html;
    console.log(html);
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();

