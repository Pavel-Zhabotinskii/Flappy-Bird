
const imgURL = "https://i.ibb.co/Q9yv5Jk/flappy-bird-set.png";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// переменная счета
let score = 0;

const img = new Image();
img.src = imgURL;

const SPEED = 3.1;

// ширина и высота птицы
const SIZE = [51, 36];

let index = 0;
let indexHeight = 0;

// изображение фона, которое копируем из изображения-источника
const bgSource = {
  x: 0,
  y: 0,
  width: canvas.width,
  height: canvas.height,
};
// устанавливаем координаты и размеры фона в canvas и добавляем метод его отрисовки 
const bgPartOneResult = {
  x: '',
  y: 0,
  width: canvas.width,
  height: canvas.height,
  draw(){
    ctx.drawImage(img, bgSource.x, bgSource.y, bgSource.width, bgSource.height, this.x, this.y, this.width, this.height);
  }
};

const bgPartTwoResult = {
  x: '',
  y: 0,
  width: canvas.width,
  height: canvas.height,
  draw(){
    ctx.drawImage(img, bgSource.x, bgSource.y, bgSource.width, bgSource.height, this.x, this.y, this.width, this.height);
  }
};
// добаляем отрисовку счета игры
const drawScore = () => {
  ctx.fillStyle = 'white'
  ctx.font ='40px serif'
  ctx.fillText(score , canvas.width/2, 40)
}

// изображение птицы, которое копируем из изображения-источника
const birdSource = {
  x: 432,
  y: '',
  width: SIZE[0],
  height: SIZE[1],
};

// координаты, по которым птица будет расположена на Canvas и метод отрисовки
 const birdResult = {
  x: 150,
  y: 250,
  width: SIZE[0],
  height: SIZE[1],
  gravity: 0,
  draw(){
    ctx.drawImage(img, birdSource.x, birdSource.y, birdSource.width, birdSource.height, this.x, this.y, this.width, this.height);
  },
  fly(){
    this.gravity = -5.5
  }
};

// изображение первой части трубы, которое копируем из изображения-источника
const tubeOne = {
  x:  432,
  y: 590,
  width: 78,
  height: -480,
}

// изображение второй части трубы, которое копируем из изображения-источника
const tubeTwo = {
  x: 510,
  y: 110,
  width: 80,
  height: 480,
}

// координаты, по которым трубы будут расположены на Canvas и метод отрисовки
class tubeCanvas {
  constructor(x) {
    this.x = x;
    this.y = 0;
    this.width = 100;
    this.height = 350;
    this.distance = 150;
    this.speedTube = 2;
    this.drawTubeOne = () => {
      ctx.drawImage(img, tubeOne.x, tubeOne.y, tubeOne.width, tubeOne.height, this.x, this.y, this.width, this.height);
    };
    this.drawTubeTwo = () => {
      ctx.drawImage(img, tubeTwo.x, tubeTwo.y, tubeTwo.width, tubeTwo.height, this.x, this.height + this.distance, this.width, canvas.height);
    };
  }
}
// создаем массив с трубами
const tubesCanvas = [new tubeCanvas(canvas.width), new tubeCanvas(canvas.width + 260)]
// созжаем полет птицы при нажатии на клавиши
window.onkeydown = () => birdResult.fly()
// отрисовка игры на canvas
const render = () => {
  let anim = requestAnimationFrame(render);
  let closeAnimation = () => window.cancelAnimationFrame(anim)
  index += 0.3;
  backgroudX = -((index * SPEED) % canvas.width);
  bgPartOneResult.x = backgroudX + canvas.width
  bgPartTwoResult.x = backgroudX

  bgPartOneResult.draw()
  bgPartTwoResult.draw()

  birdSource.y = Math.floor((index % 9) / 3) * SIZE[1]
  birdResult.draw()

  tubesCanvas.forEach(tube => {
    tube.drawTubeOne()
    tube.drawTubeTwo()
    tube.x = tube.x - tube.speedTube
   
    const isTubeOutOfScreen = tube.x + tube.width < 0
    if (isTubeOutOfScreen){
      tube.x = canvas.width
      tube.height = Math.random() * 250 + 50
      score = score + 1
    }

    const isTubeBirdX = tube.x - birdResult.width  <= birdResult.x && (tube.x + tube.width > birdResult.x)
    if (isTubeBirdX){
      const isTubeBirdY = (tube.height + tube.distance - birdResult.height < birdResult.y) || (tube.height > birdResult.y) 
      if (isTubeBirdY){
        const modal = $.modal(score)
        const resetBtn = document.querySelector('.modal-reset')

        modal.open()
        closeAnimation()
        resetBtn.addEventListener('click',() => {window.location.reload()})
      }
    }
  })
  
  drawScore()

  birdResult.y = birdResult.y + birdResult.gravity
  birdResult.gravity = birdResult.gravity + .3
};

img.onload = render;