const { Phaser } = require("../lib/phaser.min");

let config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 5},
      debug : false,
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  }
};

let game = new Phaser.Game(config);

let player;
let alien;
let enter;
let shot;
let xSpeed = 0;
let ySpeed = 0;
let alienXSpeed = 1;
let alienYSpeed = 1;
const ACCEL = 8;
let alienAccel = 4;
let accuracy = 50;
let score = 0;
let scoreText = "";
let timerText = "";
let timer = 0;
let interval;
let gameOver = false;

function preload ()
{
  this.load.image('background', 'assets/space-background.png');
  this.load.image('crosshair', 'assets/crosshair.png');
  this.load.audio('shot', 'assets/laserSmall.ogg');
  this.load.audio('music', 'assets/Foggy_Woods.mp3');
  this.load.image('fish','assets/fish.jpg');
  this.load.spritesheet('explode', 'assets/Explosion.png', {frameWidth: 100, frameHeight: 100})
}


