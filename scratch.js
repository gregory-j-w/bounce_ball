//create a loop to place the bricks in a pattern
//maybe have 5 or 6 loops - one per row of bricks, to lay out where they go




var brickTop = {
  //create loop to place bricks on hightest row
    brickTopLoc: {};
    initBrickTop: fucntion() {
      this.brickTopLoc = {x: 0, y: 0};
    },
    drawBrickTop: function() {
      ctx.beginPath();
      ctx.rect((bricks.brickLoc.x), (bricks.brickLoc.y), 20, 10);
      ctx.fillStyle = "red";
      ctx.fill();
    }
  }








  brickLoc:{},
  paddleDirection: "",
  initPaddle: function(){
    this.paddleLoc = {x: 175, y: 380}
  },
  drawPaddle: function(){
    ctx.beginPath();
    ctx.rect((paddle.paddleLoc.x), (paddle.paddleLoc.y), 50, 10)
    ctx.fillStyle = "blue";
    ctx.fill();
  },