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
  lives: 3,
  score: 0,
  init: function() {
    lives = 3;
    score = 0;
  }
}

//display lives on the screen
function lifeDisplay() {
  if (game.lives === 2) {
    document.getElementById('life3').setAttribute("src", "img/death/jpg");
  } else if (game.lives === 1) {
    document.getElementById('life3').setAttribute("src", "img/life/jpg");
    document.getElementById('life2').setAttribute("src", "img/death/jpg");
  } else if (game.lives === 0) {
    document.getElementById('life1').setAttribute("src", "img/deaht/jpg");
    document.getElementById('life2').setAttribute("src", "img/death/jpg");
    document.getElementById('life3').setAttribute("src", "img/death/jpg");
  }
  console.log('lifeDislay');
};

//push score to screen
document.getElementById('score').textContent = "Score: " + game.score;


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
  stop: function() {
    ball.dir.x = 0;
    ball.dir.y = 0;
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
    if (ball.loc.y + ball.dir.y - ball.r <= 0){
      ball.dir.y = -ball.dir.y;
    }
    //check for collision with bottom/turn over
    if (ball.loc.y + ball.dir.y + ball.r > canvasSize.height) {
      ball.loc.x = ball.loc.x;
      ball.loc.y = canvasSize.height - ball.r;
      turnOver();
    }
    //check for collision with sides
    if (ball.loc.x + ball.dir.x - ball.r < 0 ||
      ball.loc.x + ball.dir.x + ball.r > canvasSize.width) {
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
    //check for collision with bricks
    for (i = 0; i < brick.loc.length; i++) {
      //if ball.loc x is greater than brick x location
      if (ball.loc.x + ball.dir.x + ball.r >= brick.loc[i][0] &&
        //and ball.loc x is less than brick x location + brick.width
        ball.loc.x + ball.dir.x - ball.r <= brick.loc[i][0] + brick.width &&
        //and ball.loc y is less than brick y loc
        ball.loc.y + ball.dir.y + ball.r >= brick.loc[i][1] &&
        //and ball.loc y is greater than brick y loc + brick.height
        ball.loc.y + ball.dir.y - ball.r <= brick.loc[i][1] + brick.height) {
          //check if ball hit brick - dir.x
          if (ball.loc.x + ball.r < brick.loc[i][0] ||
            ball.loc.x - ball.r > brick.loc[i][0] + brick.width &&
            //and if ball loc was inside y sides
            ball.loc.y + ball.r <= brick.loc[i][1] &&
            ball.loc.y - ball.r >= brick.loc[i][1] + brick.height) {
              //flip dir.x
              ball.dir.x = - ball.dir.x;
              //return hit - delete brick, add to score
              brick.destroyed.push(brick.loc[i]);
              brick.hit();

          }
          else if (ball.loc.y + ball.r < brick.loc[i][1] ||
            ball.loc.y - ball.r > brick.loc[i][1] + brick.height &&
            ball.loc.x + ball.r >= brick.loc[i][0] &&
            ball.loc.x - ball.r <= brick.loc[i][0] + brick.width) {
              ball.dir.y = -ball.dir.y;
              brick.destroyed.push(brick.loc[i]);
              brick.hit();
              // brick.destroyed.push(brick.loc[i][1]);
            }
        }
    }
    ball.loc.x = ball.loc.x + ball.dir.x;
    ball.loc.y = ball.loc.y + ball.dir.y;
  } //end ball move
} //end ball object

//BRICKS_________
var brick = {
  width: 53,
  height: 25,
  loc: [
    [10, 10], [68, 10], [126, 10], [184, 10], [242, 10], [300, 10], [358, 10], [416, 10], [474, 10], [532, 10],
    [10, 50], [68, 50], [126, 50], [184, 50], [242, 50], [300, 50], [358, 50], [416, 50], [474, 50], [532, 50],
    [10, 90], [68, 90], [126, 90], [184, 90], [242, 90], [300, 90], [358, 90], [416, 90], [474, 90], [532, 90],
    [10, 130], [68, 130], [126, 130], [184, 130], [242, 130], [300, 130], [358, 130], [416, 130], [474, 130], [532, 130]
  ],
  //array of bricks that have been hit
  destroyed: [],
  init: function() {
    this.loc = [
      [10, 10], [68, 10], [126, 10], [184, 10], [242, 10], [300, 10], [358, 10], [416, 10], [474, 10], [532, 10],
      [10, 50], [68, 50], [126, 50], [184, 50], [242, 50], [300, 50], [358, 50], [416, 50], [474, 50], [532, 50],
      [10, 90], [68, 90], [126, 90], [184, 90], [242, 90], [300, 90], [358, 90], [416, 90], [474, 90], [532, 90],
      [10, 130], [68, 130], [126, 130], [184, 130], [242, 130], [300, 130], [358, 130], [416, 130], [474, 130], [532, 130]
    ]
  },
  draw: function() {
      for (i = 0; i < brick.loc.length; i++) {
        ctx.beginPath();
        ctx.rect(brick.loc[i][0], brick.loc[i][1], brick.width, brick.height);
        ctx.closePath();
        ctx.fillStyle = 'orange';
        ctx.fill();
      };
  },
  hit: function (){
    score++;
    for (i = 0; i < brick.destroyed.length; i++) {
      ctx.clearRect(brick.destroyed[i][0], brick.destroyed[i][1], brick.width, brick.height);
    }
    // for loop to filter brick.loc and remove arrays in bricks.destroyed
  }
} //end brick






//add the ball, paddle to the screen
game.init();
paddle.init();
paddle.draw();
ball.init();
ball.draw();
brick.draw();
brick.init();
gameStart();

function gameStart() {
  if(lives > 0) {
    document.addEventListener('keydown', function(event){
      var key = event.which;
      if (key === 32) {
        animateCanvas();
        lifeDisplay();
        game();
      }
      else {
      }
    })
  }
  else {
    //alert("game over");
  }
};

//animate the canvas
var animateCanvas = function() {
  ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
  ball.move();
  ball.draw();
  paddle.move();
  paddle.draw();
  brick.draw();
  brick.hit();
  window.requestAnimationFrame(animateCanvas);
}

var turnOver = function() {
  ball.stop;
  //alert("D'oh");
  paddle.init();
  paddle.draw();
  ball.init();
  ball.draw();
  lives --;
  gameStart();
}
//
//paddle collision
