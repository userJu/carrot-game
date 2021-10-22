const startBtn = document.querySelector('.game__startBtn');
const play = `<i class="fas fa-play"></i>`
const stop = `<i class="fas fa-stop"></i>`
const gameTime = document.querySelector('.game__time')


// 1. 시작 버튼
startBtn.addEventListener('click', ()=>{
    changeShape();
})
let timeLeft = 10

// - 버튼을 누르면 버튼의 모양이 바뀐다 < toggle 이용하기 
function changeShape(){
    if(startBtn.innerHTML === play){
        startBtn.innerHTML = `${stop}`
        interval()
    }else if (startBtn.innerHTML === stop){
        startBtn.innerHTML = `${play}`
    }
}
changeShape();
// - 버튼을 누르면 시간이 줄어든다
function setGameTime(){
    gameTime.innerHTML=`0:${timeLeft}`
    timeLeft--
        
}
function interval(){
    const intervalTime = setInterval(setGameTime, 1000)
    intervalTime
}



// - 버튼을 누르면 벌레와 당근이 무작위로 10개씩 생성된다



// 2. 벌레와 당근  
// - 벌레를 누르면 실패했다는 알람이 뜬다
// - 당근을 누르면 당근의 개수가 줄어드는 것이 표시된다
// - 제한 시간 내에 당근을 다 누르면 성공했다는 알람이 뜬다



// 3. 제한시간
// - 제한시간이 지나면 실패했다는 알람이 뜬다