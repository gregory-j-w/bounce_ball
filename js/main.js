var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

//create canvas with height and width
//adjust to screen size but height = width, then the other elements adjust accordingly
var canvasSize = {
  width: 400,
  height: 400
};
var drawCanvas = function() {
  canvas.setAttribute('height', canvasSize.height);
  canvas.setAttribute('width', canvasSize.width);
};
drawCanvas();

//create ball object with start position, trajectory
var ball = {
  location: {},
  initBall: function() {
    this.location = {x: 200, y: 370}
  },
  direction: {tx: 2, ty: -2},
//create function to draw the ball w/10 radius
  drawBall: function() {
    ctx.beginPath();
    ctx.arc(ball.location.x, ball.location.y, 10, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = "green";
    ctx.fill();
  },
  ballMove: function() {
    //loop to check if ball is inside the canvas -10 size(ball radius)
    if (ball.location.y >= canvasSize.width - 10){
      //change direction of movement
      //ball.direction.tx = ball.direction.tx; -- add back later once bounce angles are figured out
      ball.direction.ty = ball.direction.ty - 2;
      //update ball location, direction
      ball.location = {x: ball.location.x + ball.direction.tx, y: ball.location.y + ball.direction.ty};
    } else if (ball.location.x >= canvasSize.height -10){
      ball.direction.tx = ball.direction.tx - 2;
      //ball.direction.ty = ball.direction.ty;  -- add back later once bounce angles are figured out
      ball.location = {x: ball.location.x + ball.direction.tx, y: ball.location.y + ball.direction.ty};
      //delete this once up and running as the ball will clear the screen if the paddle misses it
    } else if (ball.location.y <= 10){
      //ball.direction.tx = ball.direction.tx; -- add back later once bounce angles are figured out
      ball.direction.ty = ball.direction.ty + 2;
      ball.location = {x: ball.location.x + ball.direction.tx, y: ball.location.y + ball.direction.ty};
    }else if (ball.location.x <= 10){
      ball.direction.tx = ball.direction.tx + 2;
      //ball.direction.ty = ball.direction.ty;  -- add back later once bounce angles are figured out
      ball.location = {x: ball.location.x + ball.direction.tx, y: ball.location.y + ball.direction.ty};
    } else {
      ball.location = {x: ball.location.x + ball.direction.tx, y: ball.location.y + ball.direction.ty};
    }
  }
}

//create and add the paddle to the screen
var paddle = {
  location:{},
  direction: "",
  initPaddle: function(){
    this.location = {x: 175, y: 380}
  },
  drawPaddle: function(){
    ctx.beginPath();
    ctx.rect((paddle.location.x), (paddle.location.y), 50, 10)
    ctx.fillStyle = "blue";
    ctx.fill();
  },
  //paddle controls left or right
  paddleMove: function(){
    if(paddle.direction === "right") {
      paddle.location = {x: paddle.location.x + 10, y: 380}; 
    }else if(paddle.direction === "left") {
      paddle.location = {x: paddle.location.x - 10, y: 380}  
    }else {
    }
  }
}

//padde controls
document.addEventListener('keydown', function(event){
  var key = event.which;
  if(key === 39){
    paddle.direction = "right";
  }else if(key === 37){
    paddle.direction = "left";
  } else {                            //empy else so any button doesn't move left
  }
  console.log(paddle.direction);
});

//add the ball, paddle to the screen
ball.initBall();
ball.drawBall();
paddle.initPaddle();
paddle.drawPaddle();

//animate the canvas
var animateCanvas = function() {
  ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  ball.ballMove();
  ball.drawBall();
  paddle.paddleMove();
  paddle.drawPaddle();
  window.requestAnimationFrame(animateCanvas);
}

//add eventlister to start the process, calling the functions
canvas.addEventListener('click', function() {
  animateCanvas();
});

//testing reset button to restart the ball at the original location. 
var reset = document.getElementById('reset').addEventListener('click', function(){
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

