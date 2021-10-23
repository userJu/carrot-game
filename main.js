'use strict'
const startBtn = document.querySelector('.game__startBtn');
const play = `<i class="fas fa-play"></i>`
const stop = `<i class="fas fa-stop"></i>`
const gameTime = document.querySelector('.game__time')
const gameScore = document.querySelector('.game__numOfCarrots')
const ground = document.querySelector('.ground');
const groundRect = ground.getBoundingClientRect();

// 1. 시작 버튼
startBtn.addEventListener('click', ()=>{
    changeShape();
})
let timeLeft = 10


// - 버튼을 누르면 버튼의 모양이 바뀐다 < toggle 이용하기 
function changeShape(){
    if(startBtn.innerHTML === play){
        startBtn.innerHTML = `${stop}`
        randomItem()
    }else if (startBtn.innerHTML === stop){
        startBtn.innerHTML = `${play}`
    }
}
changeShape();
// - 버튼을 누르면 시간이 줄어든다
function setGameTime(){
    gameTime.innerHTML=`0:${timeLeft}`
    timeLeft--
    if(timeLeft === -1 ){
        console.log('게임 끝')
    }
}
function intervalFx (){
        const interval = setInterval(setGameTime, 1000)
        interval
}
console.log(setGameTime)


// - 버튼을 누르면 벌레와 당근이 무작위로 ground에 생성된다

function randomItem(){
    addItem('carrot', 5, 'img/carrot.png', 80)
    addItem('bug', 5, 'img/bug.png', 50)
}

function addItem (className, count, imgPath, size){
    const width = groundRect.width
    const height = groundRect.height;
    for(let i = 0 ; i < count ; i++){
        const item = document.createElement('img');
        item.src=imgPath
        item.setAttribute('class', className)
        ground.appendChild(item)
        const x = Math.floor(Math.random()*(width-size))
        const y = Math.floor(Math.random()*(height-size))
        item.style.left = `${x}px`
        item.style.top = `${y}px`
    }
}



// 2. 벌레와 당근  
// - 당근을 누르면 당근의 개수가 줄어드는 것이 표시된다
// - 제한 시간 내에 당근을 다 누르면 성공했다는 알람이 뜬다



// 3. 제한시간
// - 제한시간이 지나면 알람이 뜬다
