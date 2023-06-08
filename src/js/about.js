
export function hidden(){
    const searchid = document.getElementById("search");
    searchid.style.display='none';
}

function clock(){
    let timetext = document.querySelector('h2'); /* h2 태그 갖고오기 */
    let today = new Date(); /* 날짜와 시간 */
    let H = today.getHours();
    let M = today.getMinutes();
    let S = today.getSeconds();

    timetext.innerHTML = H + ":" + M + ":" + S; /* html에 출력 */

}
clock();
setInterval(clock,1000); /* 1초마다 clock함수 실행 */