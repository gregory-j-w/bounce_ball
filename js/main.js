var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

//create canvas with height and width
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
  ballLoc: {},
  initBall: function() {
    this.ballLoc = {x: 200, y: 380}
  },
  ballDirection: {tx: 2, ty: -2},
//create function to draw the ball w/10 radius
  drawBall: function() {
    ctx.beginPath();
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
    ctx.arc(ball.ballLoc.x, ball.ballLoc.y, 10, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = "green";
    ctx.fill();
  },
  ballMove: function() {
    //loop to check if ball is inside the canvas -10 size(ball radius)
    if (ball.ballLoc.y >= canvasSize.width - 10){
      //change direction of movement
      //ball.ballDirection.tx = ball.ballDirection.tx; -- add back later once bounce angles are figured out
      ball.ballDirection.ty = ball.ballDirection.ty - 2;
      //update ball location, direction
      ball.ballLoc = {x: ball.ballLoc.x + ball.ballDirection.tx, y: ball.ballLoc.y + ball.ballDirection.ty};
    } else if (ball.ballLoc.x >= canvasSize.height -10){
      ball.ballDirection.tx = ball.ballDirection.tx - 2;
      //ball.ballDirection.ty = ball.ballDirection.ty;  -- add back later once bounce angles are figured out
      ball.ballLoc = {x: ball.ballLoc.x + ball.ballDirection.tx, y: ball.ballLoc.y + ball.ballDirection.ty};
      //delete this once up and running as the ball will clear the screen if the paddle misses it
    } else if (ball.ballLoc.y <= 10){
      //ball.ballDirection.tx = ball.ballDirection.tx; -- add back later once bounce angles are figured out
      ball.ballDirection.ty = ball.ballDirection.ty + 2;
      ball.ballLoc = {x: ball.ballLoc.x + ball.ballDirection.tx, y: ball.ballLoc.y + ball.ballDirection.ty};
    }else if (ball.ballLoc.x <= 10){
      ball.ballDirection.tx = ball.ballDirection.tx + 2;
      //ball.ballDirection.ty = ball.ballDirection.ty;  -- add back later once bounce angles are figured out
      ball.ballLoc = {x: ball.ballLoc.x + ball.ballDirection.tx, y: ball.ballLoc.y + ball.ballDirection.ty};
    } else {
      ball.ballLoc = {x: ball.ballLoc.x + ball.ballDirection.tx, y: ball.ballLoc.y + ball.ballDirection.ty};
  }
}
}

//add the ball, paddle to the screen
ball.initBall();
ball.drawBall();

//animate the canvas
var animateCanvas = function() {
    ball.ballMove();
    ball.drawBall();
    window.requestAnimationFrame(animateCanvas);
}

//add eventlister to start the process, calling the functions
document.addEventListener('click', function() {
  animateCanvas();
});

//testing reset button to restart the ball at the original location. 
var reset = document.getElementById('reset').addEventListener('click', function(){
});

//stop button
var stop = document.getElementById('stop').addEventListener('click', function(){
  ball.ballDirection.tx = 0;
  ball.ballDirection.ty = 0;
  ball.ballLoc.x = ball.ballLoc.x + ball.ballDirection.tx; 
  ball.ballLoc.y = ball.ballLoc.y + ball.ballDirection.ty; 
});

