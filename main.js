const score = document.querySelector('.score'),
  start = document.querySelector('.start'),
  gameArea = document.querySelector('gameArea'),
  car = document.createElement('div'); //элмент добавлен в функцию startGame

car.classList.add('car'); //добавили класс через метод add, добавили стилей в css

/* 
метод устарел, см. ниже, используй addEventListener
start.onclick = function() {
  start.classList.add('hide');
};
*/

start.addEventListener('click', startGame)
document.addEventListener('keydown', startRun) 
document.addEventListener('keyup', stopRun);

//click срабатывает, когда нажимаем левую кнопку мыши, запускается функция startGame, см. ее ниже
//keydown срабатывает, когда нажата ЛЮБАЯ клавиша, запускается функция startRun, см. ее ниже
//keyup срабатывает, когда отпускаем РАНЕЕ НАЖАТУЮ клавишу, запускается функция stopRun, см. ее ниже


//создадим объект при нажатии клавиш стрелок на клавиатуре
const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false
};

// объект, содержащий колво очков, скорость игры, статуса (запущена или нет)
const setting = {
  start: false,
  score: 0,
  speed: 3
};


function startGame(){
  start.classList.add('hide'); //start.classList.add('hide') связано с css, см. класс hide в css
  setting.start = true; // изменяем объект setting и его свойство start
  gameArea.appendChild(car);  //appendChild вставить ребенка, т.е. объект автомобиля
  requestAnimationFrame(playGame); //анимируем функцию playGame
};
 

/* это как было, потом изменили, см. ниже
function startRun(start) {
  console.log('start');
}

function stopRun(stop) {
  console.log('stop');
}
*/

//анимация
function playGame(){
  console.log('Play Game!'); //при запуске игры будет высвечиваться это фраза
  if (setting.start){
    requestAnimationFrame(playGame);
  }
};
//requestAnimationFrame(playGame) чтобы игра не останавливалась и чтобы это было плавно, это рекурсия, когда функция запускает сама себя? и это прописано в условии пока игра запущена, т.е. start true. изменили if (setting.start === true), т.к. нам не нужно чтобы всегда соответсоввало true

//нажатие клавиш

function startRun(event){
  event.preventDefault(); 
  keys[event.key] = true; 
};

function stopRun(event) {
  event.preventDefault();  
  keys[event.key] = false; 
};

//добавив event в скобки вместо 'start' мы выводим событие в консоль со многими параметрами
//event.preventDefault() так мы отменим стандартные настройки браузера, уберем скроллинг у стрелок на клавиатуре, вообще мы полностью убрали стандартное поведение для клавиш
// добавив .key в выражение console.log(event.key) мы видим какую клавишу нажали, но при этом больше не видим события event
// удалили   console.log(event.key)
//keys[event.key] = true обратились к объекту keys и свойству объекта event.key , чтобы при нажатии стрелок название нажатой клавиши передалось в функцию startRun и мы мгди присвоить новое значение true, таким образом наш скрипт будет видеть, что ArrowRight и т.д. true и будет двигать автомобиль в нужную сторону, в тот момент когда отпускаем клавишу, мы возвращаем значение false в функции stopRun








