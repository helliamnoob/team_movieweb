export function hidden() {
    const searchid = document.getElementById("search");
    searchid.style.display = 'none';
}

//최창근 수정본
export function getClock() {

    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");  
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
     //number 타입으로 나오는 숫자들을 string으로 감싸주고 2글자가 아닐때 앞에 0을 붙여주게하는 코드

    let clockPath = document.getElementById('clock');
    clockPath.innerText = `${hours}:${minutes}:${seconds}`;
}

export function weather() {
    
    const apiUrl = 'https://api.weatherapi.com/v1/current.json';
    const apiKey = 'aa793a3e706a43f39c7102437230806';
    const query = 'Seoul';

    const requestUrl = `${apiUrl}?key=${apiKey}&q=${encodeURIComponent(query)}`;

    fetch(requestUrl)
        .then(response => response.json())
        .then(data => {
            const weatherData = data.current;
            const weatherElement = document.getElementById('weather');
            weatherElement.innerHTML =
                `<p>Temperature: ${weatherData.temp_c}°C</p>
                <p>Condition: ${weatherData.condition.text}</p>
                <img src="${weatherData.condition.icon}" alt="Weather Icon">`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

document.addEventListener('DOMContentLoaded', weather);