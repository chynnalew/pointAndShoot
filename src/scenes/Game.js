import Phaser from  '../lib/phaser.js'

let player;
let fish;
let space;
let shot;
let cursors;
let xSpeed = 0;
let ySpeed = 0;
let fishXSpeed = 1;
let fishYSpeed = 1;
const ACCEL = 8;
let interval;
let accuracy = 50;
let score = 0;
let scoreText = "";
let timerText = "";
let timer = 0;
let backGroundMusic;
let hitSound;
let gameOver = false;
let gameOverText;

export default class Game extends Phaser.Scene
{
  constructor()
  {
    super('game')
  }

  preload()
  {
    this.load.image('background', 'assets/space-background.png');
    this.load.image('crosshair', 'assets/crosshair.png');
    this.load.audio('shot', 'assets/laserSmall.ogg');
    this.load.audio('music', 'assets/Foggy_Woods.mp3');
    this.load.image('fish','assets/fish.png');
    this.load.spritesheet('explode', 'assets/Explosion.png', {frameWidth: 10, frameHeight: 10})
    this.load.audio('hit','assets/impactMetal_003.ogg');
  }

  create ()
  {
    this.add.image(400, 300, 'background');
    scoreText = this.add.text(16 , 16 , 'score: 0', {fontSize: '32px', fill: '#FFFFFF'});
    timerText = this.add.text(600 , 16 , 'timer: 0', {fontSize: '32px', fill: '#FFFFFF'});

    fish = this.physics.add.sprite(200, 150, 'fish');
    fish.setCollideWorldBounds(true);
    player = this.physics.add.sprite(400, 300, 'crosshair');
    player.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();
    space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    shot = this.sound.add('shot');
    backGroundMusic = this.sound.add('music');
    hitSound = this.sound.add('hit');

    this.anims.create({
      key: 'explodes',
      frames: this.anims.generateFrameNumbers('explode', {start: 0, end: 6}),
      frameRate: 10,
      repeat: 0,
    });

    backGroundMusic.play();

    interval = setInterval(function(){
      timer += 1;
      timerText.setText('timer: ' + timer);
      if(timer >= 61){
        gameOver = true;
      }
    }, 1000);
  }

  update()
  {
    if(gameOver){
      this.endGame();  
    }
    if(fish.x >= 750){
      fish.x = 749;
      fishXSpeed = fishXSpeed * (-1);
      fish.setVelocityX(fishXSpeed);
    } else {
      fish.x = fish.x + fishXSpeed;
    }

    if(fish.x <= 50){
      fish.x = 51;
      fishXSpeed = fishXSpeed * (-1);
      fish.setVelocityX(fishXSpeed);
    } else {
      fish.x = fish.x + fishXSpeed;
    }

    if(fish.y >= 550){
      fish.y = 549;
      fishYSpeed = fishYSpeed * (-1);
      fish.setVelocityY(fishYSpeed);
    } else {
      fish.y = fish.y + fishYSpeed;
    }
    
    if(fish.y <= 50){
      fish.y = 51;
      fishYSpeed = fishYSpeed * (-1);
      fish.setVelocityY(fishYSpeed);
    } else {
      fish.y = fish.y + fishYSpeed;
    }

    if(cursors.left.isDown){
      xSpeed = xSpeed - ACCEL;
      player.setVelocityX(xSpeed);
    }

    if(cursors.right.isDown){
      xSpeed = xSpeed + ACCEL;
      player.setVelocityX(xSpeed);
    }

    if(cursors.up.isDown){
      ySpeed = ySpeed - ACCEL;
      player.setVelocityY(ySpeed);
    }

    if(cursors.down.isDown){
      ySpeed = ySpeed + ACCEL;
      player.setVelocityY(ySpeed);
    }
    
    if(Phaser.Input.Keyboard.JustDown(space)){
      shot.play();
      if(Math.abs(player.x - fish.x) < accuracy && Math.abs(player.y - fish.y) < accuracy) {
        this.hit();
      } else {
        this.miss();
      }
    }
  }

   hit()
  {
    hitSound.play();
    score = score +10;
    scoreText.setText('Score: ' + score);
    
  }

  miss()
  {
    score = score -1;
    scoreText.setText('Score: ' + score);
  }

  endGame()
  {
    fish.destroy();
    player.destroy();
    timerText.destroy();
    gameOverText = this.add.text(250 , 200 , 'Game Over', {fontSize: '50px', fill: '#FFFFFF'});
    backGroundMusic.destroy();
    clearInterval(interval);
  }
}

