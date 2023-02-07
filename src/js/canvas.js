import utils from "./utils";
import "../common/styles/global.css";
import { AbstractEnemy } from "../core/objects/abstract-enemy";
import { Clicker } from "../core/objects/clicker";

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

// Implementation
let objects = [];
let clicker = {};
let points = 0;
let gameover = false;
let chanceSpawn = 70


const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const colors = ["#2185C5", "#7ECEFD", "#FFF6E5", "#FF7F66"];

function gameOver() {
  gameover = true;
  document.getElementById('gameover').className = "gameover"
}


// Event Listeners
addEventListener("mousemove", (event) => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  // init()
});

// Objects
class Square extends AbstractEnemy {
  constructor(key, ...props) {
    super(...props);
    this.key = key;
    this.frailtyValue = Math.floor(
      Math.random() * (this.radius * 3 - this.radius)
    );
    this.sizeBodySquad = this.radius * 3;
  }

  draw() {
    this.c.beginPath();
    this.c.rect(
      this.x - this.frailtyValue,
      this.y - this.frailtyValue,
      this.sizeBodySquad,
      this.sizeBodySquad
    );
    this.c.fillStyle = colors[2];
    this.c.fill();
    this.c.closePath();

    this.c.beginPath();
    this.c.rect(this.x, this.y, this.radius, this.radius);
    this.c.fillStyle = this.color;
    this.c.fill();
    this.c.closePath();
  }

  update(onGameOver) {
    super.update();
    if (this.y - this.sizeBodySquad > canvas.height) {
      this.dy = 0;
      onGameOver()
    }
    this.y += this.dy;
  }

  onClick(onDestroy, ...props) {
    const beenClick = super.onClick(...props);
    if (beenClick) {
      onDestroy();
    }
    return;
  }
}

function updatePoints(number) {
  const pointsField = document.getElementById('points')
  points += number
  pointsField.innerText = `Pontos: ${points}`
}

function init() {
  clicker = new Clicker(c, mouse.x, mouse.y);


  setInterval(() => {
    const random = Math.floor(Math.random() * 100)
    const quantity = objects.length

    if (random <= chanceSpawn) {

      objects.push(new Square(quantity, 15, 'orange', c, Math.floor(Math.random() * (canvas.width - 135)), -50))
    }
  }, 1000)

  // objects.push(new Square(0, 15, 'orange', c, Math.floor(Math.random() * (canvas.width - 135)), 0))
}

// Animation Loop
function animate() {
  if (gameover) return;
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  for (const object of objects) {

    object.update(gameOver);
  }

  clicker.update(mouse.x, mouse.y);
}

canvas.addEventListener(
  "click",
  (e) => {
    const xClick = e.clientX;
    const yClick = e.clientY;

    for (const [index, object] of objects.entries()) {

      object.onClick(
        () => {
          objects.splice(index, 1)
          updatePoints(25)
        },
        xClick,
        yClick
      );
    }
  },
  false
);

function restart() {
  objects = {};
  clicker = {};
  points = 0;
  gameover = false;
  chanceSpawn = 30
  init()

}


init();
animate();
