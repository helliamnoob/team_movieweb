// export function hidden() {
//     const searchid = document.getElementById("search");
//     searchid.style.display = 'none';
// }

//최창근 수정본

const clock = document.querySelector("h2#clock");

function getClock() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");  
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
     //number 타입으로 나오는 숫자들을 string으로 감싸주고 2글자가 아닐때 앞에 0을 붙여주게하는 코드
    clock.innerText = `${hours}:${minutes}:${seconds}`;
}

getClock()
setInterval(getClock, 1000);

