export function hidden() {
   const searchid = document.getElementById('search');
   searchid.style.display = 'none';
   const sortBtn = document.querySelector('.sort-buttons');
   sortBtn.style.display = 'none';
}
export function hiddenOff() {
   const searchid = document.getElementById('search');
   searchid.style.display = 'block';
   const sortBtn = document.querySelector('.sort-buttons');
   sortBtn.style.display = 'block';
}

export function weather() {
   const apiUrl = 'https://api.weatherapi.com/v1/current.json';
   const apiKey = 'aa793a3e706a43f39c7102437230806';
   const query = 'Seoul';

   const requestUrl = `${apiUrl}?key=${apiKey}&q=${encodeURIComponent(query)}`;

   fetch(requestUrl)
      .then((response) => response.json())
      .then((data) => {
         const weatherData = data.current;

         let temp_html = `<p>Temperature: ${weatherData.temp_c}°C</p>
                <p>Condition: ${weatherData.condition.text}</p>
                <img src="${weatherData.condition.icon}" alt="Weather Icon">`;

         const weatherPath = document.createElement('div');
         weatherPath.id = 'weather';
         const mainpage = document.getElementById('main-page');
         mainpage.appendChild(weatherPath);
         const weatherElement = document.getElementById('weather');
         weatherElement.insertAdjacentHTML('beforeend', temp_html);
         console.log(weatherElement);
      })
      .catch((error) => {
         console.error('Error:', error);
      });
}
