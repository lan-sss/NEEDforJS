//нам нужно получить 3 элемента: score, start и gameArea, берем из html классы
const score = document.querySelector('.score'),//document это объект с элментами страницы
  start = document.querySelector('.start'),
  gameArea = document.querySelector('.gameArea'),
  car = document.createElement('div'); //элмент добавлен в функцию startGame

car.classList.add('car'); //добавили класс через метод add, добавили стилей в css

/* 
метод устарел, см. ниже, используй addEventListener
start.onclick = function() {
  start.classList.add('hide');
};
*/

start.addEventListener('click', startGame);
document.addEventListener('keydown', startRun); 
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

// объект, содержащий свойства: кол-во очков, скорость игры, статуса (запущена или нет), трафик (сложность)
const setting = {
  start: false,
  score: 0,
  speed: 5,
  traffic: 3
};

function getQuantityElements(heightElement) { 
  //эта функция вычислит ск-ко элементов поместится на странице с этой высотой
  //вычисляем высоту страницы, и с помощью return будет возвращаться конкретное значение
  return document.documentElement.clientHeight / heightElement + 1;
  

}



function startGame() {
  start.classList.add('hide'); //start.classList.add('hide') связано с css, см. класс hide в css
  // напишем цикл для линий, см ниже
  for (let i = 0; i < getQuantityElements(100); i++) {
    const line = document.createElement('div'); // создаем линию, каждый цикл будет создаваться 1 линия
    line.classList.add('line'); //добавили класс, у которого сили прописаны в css
    line.style.top = (i * 100) + 'px'; //75 это расстояние между линиями
    line.y = i * 100; // чтобы линии начали двигаться, продолжение в playGame = > moveRoad
    gameArea.appendChild(line); //расположили линии на экране
  }

  //создаем автомобили соперники
  for (let i = 0; i < getQuantityElements(100 * setting.traffic); i++ ) {  
    // * setting.traffic это расстояние между автомобилями
    const enemy = document.createElement('div'); //создаем автомобиль
    enemy.classList.add('enemy'); //добавили класс
    enemy.y = -100 * setting.traffic * (i + 1); 
    //100 это высота автомобиля, см. в css, минус, чтобы авто были выше дороги (сверху)
    //setting.traffic это число которе влияет на плотность, 
    //i чтобы авто располагались на каком-то расстоянии друг от друга, но i первое это 0, тогда все равно 0, поэтому +1
    enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) +'px';
    // где по горизонтали будут располагаться авто, Math.random()случайное чсило, Math.floor - округление
    enemy.style.top = enemy.y + 'px'; // расстояние от верха игрового пространства, мы его вычисляли с помощью у
    enemy.style.background = 'transparent url(./image/enemy_1_bugatti.png) center / cover no-repeat';
    gameArea.appendChild(enemy); //расположили авто на игровой арене


  }


  setting.start = true; // изменяем объект setting и его свойство start
  gameArea.appendChild(car);  //appendChild вставить ребенка, т.е. объект автомобиля
  setting.x = car.offsetLeft; 
  //добавили свойство х в объект setting для движения влево-вправо, offsetLeft-свойство left в css у car
  setting.y = car.offsetTop;
  //добавили свойство y в объект setting для движения вверх-вниз
  requestAnimationFrame(playGame); //анимируем функцию playGame
}
 

/* это как было, потом изменили, см. ниже
function startRun(start) {
  console.log('start');
}
function stopRun(stop) {
  console.log('stop');
}*/

//анимация
function playGame(){
  if (setting.start) {
    moveRoad();
    moveEnemy();
    if(keys.ArrowLeft && setting.x > 0) { //&& setting.x > 0 чтобы машина не выходила за пределы поля 
      setting.x -=setting.speed;  //движение в лево по оси х с учетом скорости, если зажата клавиша ArrowLeft
    }
    if (keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) { 
      //&& setting.x < (gameArea.offsetWidth - 50) значит выполняется при условии => ширина поля минус ширина машины
      setting.x +=setting.speed;  //движение вправо по оси х с учетом скорости, если зажата клавиша ArrowRight
    }
    if (keys.ArrowUp && setting.y > 0) {
      setting.y -=setting.speed; //движение вверх по оси у с учетом скорости, если зажата клавиша ArrowUp
    }
    if (keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)) {
      setting.y +=setting.speed; //движение вниз по оси у с учетом скорости, если зажата клавиша ArrowDown
    }

    car.style.left = setting.x + 'px'; 
    //чтобы сработало действие нажатий клавиш (см. выше), передаем стиль left на страницу и меняем на setting.x
    car.style.top = setting.y + 'px'; 

    requestAnimationFrame(playGame);
  }
}
/*requestAnimationFrame(playGame) чтобы игра не останавливалась,
 и чтобы это было плавно, это рекурсия, когда функция запускает сама себя?
 и это прописано в условии пока игра запущена, т.е. start true. изменили 
 if (setting.start === true), т.к. нам не нужно чтобы всегда соответсоввало true*/

//нажатие клавиш

function startRun(event){
  event.preventDefault(); 
  keys[event.key] = true; 
}

function stopRun(event) {
  event.preventDefault();  
  keys[event.key] = false; 
}

/*
добавив event в скобки вместо 'start' мы выводим событие в консоль со многими параметрами
event.preventDefault() так мы отменим стандартные настройки браузера, 
уберем скроллинг у стрелок на клавиатуре, вообще мы полностью убрали стандартное поведение для клавиш
добавив .key в выражение console.log(event.key) мы видим какую клавишу нажали, но при этом больше не видим события event
удалили   console.log(event.key)
keys[event.key] = true обратились к объекту keys и свойству объекта event.key , 
чтобы при нажатии стрелок название нажатой клавиши передалось в функцию startRun 
и мы мгди присвоить новое значение true, таким образом наш скрипт будет видеть, 
что ArrowRight и т.д. true и будет двигать автомобиль в нужную сторону, 
в тот момент когда отпускаем клавишу, мы возвращаем значение false в функции stopRun
*/

function moveRoad() {
  let lines = document.querySelectorAll('.line'); //получили все линии с классом line и сохранили в переменную lines
  lines.forEach(function(line){
    // нужно перебрать все элменты, эта функция будет запускатьс ястолько аз сколько у нас элментов, 
    //line это элмент, который перебирается
    //i это индекс элмента в нашем случае от 0 до 19, см цикл for, но он нас не нужен. 
   line.y +=setting.speed;
   line.style.top = line.y + 'px';
  
    if(line.y > document.documentElement.clientHeight) { 
    line.y = -100;
    //мы получили высоту страницы и когда линия будет уезжать вниз, мы будем поднимать ее вверх

  }

});
}

function moveEnemy() {
  let enemy = document.querySelectorAll('.enemy');
  enemy.forEach(function(item){ //здесь записали item, а не enemy, чтобы не попасть на переменные
    item.y +=setting.speed / 2;
    item.style.top = item.y + 'px';
//чтобы авто enemy после того как уехала вниз возвращалась обратно наверх пропишем условие
if (item.y > document.documentElement.clientHeight) {
  item.y = -100 * (setting.traffic + 2); 
  item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) +'px';
}
});
}