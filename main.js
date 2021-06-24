const MAX_ENEMY = 7;
const music = new Audio('audio.mp3');
const score = document.querySelector('.score'),
  start = document.querySelector('.start'),
  gameArea = document.querySelector('.gameArea'),
  car = document.createElement('div'); 
  car.classList.add('car'); 

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun); 
document.addEventListener('keyup', stopRun);

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false
};

const setting = {
  start: false,
  score: 0,
  speed: 7,
  traffic: 3
};

function getQuantityElements(heightElement) { 
  return document.documentElement.clientHeight / heightElement + 1;
}

const getRandomEnemy = (max) => Math.floor((Math.random() * max) + 1);

function startGame() {
  gameArea.innerHTML = '';
  start.classList.add('hide'); 
  music.play();
  gameArea.style.minHeight = 100 + 'vh';
  for (let i = 0; i < getQuantityElements(100); i++) {
    const line = document.createElement('div'); 
    line.classList.add('line'); 
    line.style.top = (i * 100) + 'px'; 
    line.y = i * 100; 
    gameArea.appendChild(line); 
  }

  for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++ ) {  
    const enemy = document.createElement('div'); 
    enemy.classList.add('enemy'); 
    enemy.y = -100 * setting.traffic * (i + 1); 
    enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) +'px';
    enemy.style.top = enemy.y + 'px';
    enemy.style.background = `
      transparent 
      url(./image/enemy${getRandomEnemy(MAX_ENEMY)}.png) 
      center / cover 
      no-repeat`;
    gameArea.appendChild(enemy); 
  }

  for (let i = 0; i < 1; i++) {
    const green = document.createElement('div');  
    green.classList.add('green'); 
    green.style.top = (i * 500) + 'px'; 
    green.y = i * 100;
    gameArea.appendChild(green); 
  }

  for (let i = 0; i < 1; i++) {
    const green1 = document.createElement('div');  
    green1.classList.add('green1'); 
    green1.style.top = (i * 500) + 'px'; 
    green1.y = i * 100;
    gameArea.appendChild(green1); 
  }

for (let i = 0; i < 1; i++) {
    const green2 = document.createElement('div');  
    green2.classList.add('green2'); 
    green2.style.top = (i * 500) + 'px'; 
    green2.y = i * 100;
    gameArea.appendChild(green2); 
  }

  setting.score = 0;
  setting.start = true; 
  gameArea.appendChild(car);  
  car.style.left = gameArea.offsetWidth/2 - car.offsetWidth/2;
  car.style.top = 'auto'; 
  car.style.bottom = '10px'; 
  setting.x = car.offsetLeft; 
  setting.y = car.offsetTop;
  requestAnimationFrame(playGame); 
}
 
function playGame(){
  if (setting.start) {
    setting.score +=setting.speed;
    score.innerHTML = 'SCORE<br>' + setting.score;
    moveRoad();
    moveEnemy();
    moveGreen();
    moveGreen1();
    moveGreen2();
  if(keys.ArrowLeft && setting.x > 0) {
    setting.x -=setting.speed; 
  }
   if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) { 
     setting.x +=setting.speed;
   }
  if (keys.ArrowUp && setting.y > 0) {
     setting.y -=setting.speed; 
  }
  if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
     setting.y +=setting.speed; 
  }

  car.style.left = setting.x + 'px'; 
  car.style.top = setting.y + 'px'; 
  requestAnimationFrame(playGame);
  }
}

function startRun(event){
  if (keys.hasOwnProperty(event.key)) { 
    event.preventDefault(); 
    keys[event.key] = true; 
  } 
}

function stopRun(event) {
  if (keys.hasOwnProperty(event.key)) {
    event.preventDefault();  
    keys[event.key] = false; 
  }
}

function moveRoad() {
  let lines = document.querySelectorAll('.line'); 
  lines.forEach(function(line){
   line.y +=setting.speed;
   line.style.top = line.y + 'px';
    if(line.y > document.documentElement.clientHeight) { 
    line.y = -100;
  }
});
}

function moveEnemy() {
  let enemy = document.querySelectorAll('.enemy');
  enemy.forEach(function(itemEnemy){ 
  let carRect = car.getBoundingClientRect(); 
  let enemyRect = itemEnemy.getBoundingClientRect(); 
  if (carRect.top <= enemyRect.bottom && 
    carRect.bottom >= enemyRect.top && 
    carRect.right >= enemyRect.left && 
    carRect.left <= enemyRect.right) { 
      setting.start = false;
      console.warn('ДТП');
      start.classList.remove('hide'); 
      score.style.top = start.offsetHeight; 
  }
    itemEnemy.y +=setting.speed / 2;
    itemEnemy.style.top = itemEnemy.y + 'px';
  if (itemEnemy.y > document.documentElement.clientHeight) {
    itemEnemy.y = -100 * (setting.traffic+2); 
    itemEnemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) +'px';
  }
});
}

function moveGreen() {
  let greens = document.querySelectorAll('.green');
  greens.forEach(function(itemGreen){
    itemGreen.y +=setting.speed;
    itemGreen.style.top = itemGreen.y + 'px';
    if(itemGreen.y > document.documentElement.clientHeight) { 
      itemGreen.y = -100;
    }
  });
}

function moveGreen1() {
  let greens1 = document.querySelectorAll('.green1');
  greens1.forEach(function(itemGreen1){
   itemGreen1.y +=setting.speed;
   itemGreen1.style.top = itemGreen1.y + 'px';
    if(itemGreen1.y > document.documentElement.clientHeight) { 
      itemGreen1.y = -100;
    }
  });
}

function moveGreen2() {
  let greens2 = document.querySelectorAll('.green2');
  greens2.forEach(function(itemGreen2){
   itemGreen2.y +=setting.speed;
   itemGreen2.style.top = itemGreen2.y + 'px';
    if(itemGreen2.y > document.documentElement.clientHeight) { 
      itemGreen2.y = -100;
    }
  });
}

