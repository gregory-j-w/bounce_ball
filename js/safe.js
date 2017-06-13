var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

//create canvas with height and width
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

//create and add the paddle to the screen
var paddle = {
  loc:{},
  width: 100,
  height: 15,
  dir: "",
  speed: 4,

  init: function(){
    this.loc = {x: canvasSize.width/2, y: canvasSize.height - 25}
  },
  draw: function(){
    ctx.beginPath();
    ctx.rect((paddle.loc.x), (paddle.loc.y), paddle.width, paddle.height)
    ctx.fillStyle = "blue";
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
//padde controls
document.addEventListener('keydown', function(event){
  var key = event.which;
  if(key === 39){
    paddle.dir = "right";
  } else if (key === 37){
    paddle.dir = "left";
  }
});

//create ball
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
//create function to draw the ball w/10 radius
  draw: function() {
    ctx.beginPath();
    ctx.arc(ball.loc.x, ball.loc.y, ball.r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = "green";
    ctx.fill();
  },
  move: function() {
    //check for collision with top
    if (ball.loc.y + ball.dir.y - ball.r <= 0) {
      ball.dir.y = -ball.dir.y;
    }
    //check for collision with bottom/game over
    if (ball.loc.y + ball.dir.y + ball.r > canvasSize.height) {
      ball.loc.x = ball.loc.x;
      ball.dir.x = 0;
      ball.loc.y = canvasSize.height-ball.r;
      ball.dir.y = 0;
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
      //and if the ball loc is on the paddle
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
paddle.init();
paddle.draw();
ball.init();
ball.draw();

//animate the canvas
var animateCanvas = function() {
  ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  ball.move();
  ball.draw();
  paddle.move();
  paddle.draw();
  window.requestAnimationFrame(animateCanvas);
}

//add eventlister to start the process, calling the functions
canvas.addEventListener('click', function() {
  animateCanvas();
});

//testing reset button to restart the ball at the original location.
var reset = document.getElementById('reset').addEventListener('click', function(){
  ball.direction.tx = 2;
  ball.direction.ty = -2;
  ball.location.x = "";
  ball.location.y = "";
});

//stop button
var stop = document.getElementById('stop').addEventListener('click', function(){
  ball.direction.tx = 0;
  ball.direction.ty = 0;
  ball.location.x = ball.location.x + ball.direction.tx;
  ball.location.y = ball.location.y + ball.direction.ty;
});


//
//paddle collision
