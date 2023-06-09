// index.html에 있는 검색기능과 정렬버튼 없애기 위함
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

//about 페이지에 시간 기능 시도해봄
export function getClock() {
   const date = new Date();
   const hours = String(date.getHours()).padStart(2, '0');
   const minutes = String(date.getMinutes()).padStart(2, '0');
   const seconds = String(date.getSeconds()).padStart(2, '0');
   //number 타입으로 나오는 숫자들을 string으로 감싸주고 2글자가 아닐때 앞에 0을 붙여주게하는 코드

   let clockPath = document.getElementById('clock');
   clockPath.innerHTML =`<p>${hours}:${minutes}:${seconds}</p>`;
}

//about 페이지에 날씨api 기능 시도해봄
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
