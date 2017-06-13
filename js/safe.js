var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

//CANVAS_________
//adjust to screen size but height = width, then the other elements adjust accordingly
var canvasSize = {
  width: 600,
  height: 400
};
var drawCanvas = function() {
  canvas.setAttribute('height', canvasSize.height);
  canvas.setAttribute('width', canvasSize.width);
};
drawCanvas();

//SCOREBOARD_____
var game = {
  lives: 0,
  score: 0,
  init: function() {
    lives = 3;
    score = 0
  }
}
//append to document


//PADDLE_________
var paddle = {
  loc:{},
  width: 100,
  height: 15,
  dir: "",
  speed: 4,
  init: function(){
    this.loc = {x: (canvasSize.width-paddle.width)/2, y: canvasSize.height - 40};
    this.dir = "";
  },
  draw: function(){
    ctx.beginPath();
    ctx.rect((paddle.loc.x), (paddle.loc.y), paddle.width, paddle.height)
    ctx.fillStyle = 'rgb(25,75,130)';
    ctx.fill();
  },
  //paddle controls left or right
  move: function(){
    if(paddle.dir === "right" && paddle.loc.x >= canvasSize.width - paddle.width) {
      paddle.loc.x = paddle.loc.x;
    } else if(paddle.dir === "right" && paddle.loc.x <= canvasSize.width) {
      paddle.loc.x = paddle.loc.x + paddle.speed;
    }else if(paddle.dir === "left" && paddle.loc.x <= 0) {
      paddle.loc.x = paddle.loc.x;
    }else if(paddle.dir === "left" && paddle.loc.x >= 0) {
      paddle.loc.x = paddle.loc.x - paddle.speed;
    }
  }
}
//padde event listener
document.addEventListener('keydown', function(event){
  var key = event.which;
  if(key === 39){
    paddle.dir = "right";
  } else if (key === 37){
    paddle.dir = "left";
  }
});

//BALL___________
var ball = {
  loc: {},
  r: 10,
  dir: {},
  init: function() {
    ball.loc.x = canvasSize.width/2;
    ball.loc.y = canvasSize.height/2;
    ball.dir.x = 2;
    ball.dir.y = 2;
  },
  draw: function() {
    ctx.beginPath();
    ctx.arc(ball.loc.x, ball.loc.y, ball.r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = 'rgb(170,10,10)';
    ctx.fill();
  },
  move: function() {
    //check for collision with top
    if (ball.loc.y + ball.dir.y - ball.r <= 0) {
      ball.dir.y = -ball.dir.y;
    }
    //check for collision with bottom/turn over
    if (ball.loc.y + ball.dir.y + ball.r > canvasSize.height) {
      ball.loc.x = ball.loc.x;
      ball.dir.x = 0;
      ball.loc.y = canvasSize.height - ball.r;
      ball.dir.y = 0;
      turnOver();
    }
    //check for collision with sides
    if (ball.loc.x + ball.dir.x - ball.r < 0){
        ball.dir.x = - ball.dir.x;
    }
    if (ball.loc.x + ball.dir.x + ball.r > canvasSize.width) {
      ball.dir.x = - ball.dir.x;
    }
    //check for collision with paddle
    //if ball location is at least paddle y loc
    if (ball.loc.y + ball.dir.y + ball.r >= paddle.loc.y) {
      //and if the ball x loc is on the paddle
      if (ball.loc.x + ball.dir.x >= paddle.loc.x
        &&
        ball.loc.x + ball.dir.x <= paddle.loc.x + paddle.width) {
          ball.dir.y = - ball.dir.y;
        }
    }
    ball.loc.x = ball.loc.x + ball.dir.x;
    ball.loc.y = ball.loc.y + ball.dir.y;
    }
}

//add the ball, paddle to the screen

game.init();
paddle.init();
paddle.draw();
ball.init();
ball.draw();

function gameStart() {
  if(lives > 0) {
    document.addEventListener('keydown', function(event){
      var key = event.which;
      if (key === 32) {
        animateCanvas();
      }
      else {
      }
    })
  }
  else {
    alert("game over");
  }
};
gameStart();


//animate the canvas
var animateCanvas = function() {
  ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  ball.move();
  ball.draw();
  paddle.move();
  paddle.draw();
  window.requestAnimationFrame(animateCanvas);
}

var turnOver = function() {
  alert("D'oh");
  paddle.init();
  paddle.draw();
  ball.init();
  ball.draw();
  lives --;
  gameStart();
}
//
//paddle collision
