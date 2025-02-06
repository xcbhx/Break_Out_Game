/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import Brick from './Brick.js';
import Ball from './Ball.js';
import Paddle from './Paddle.js';
import Score from './Score.js';
import Lives from './Lives.js';
import Label from './Label.js';
import Background from './Background.js';
import {
  canvas,
  ctx,
  paddleHeight,
  paddleWidth,
  brickRowCount,
  brickColumnCount,
  brickWidth,
  brickHeight,
  brickPadding,
  brickOffsetTop,
  brickOffsetLeft,
  bricks,
  ballRadius,
  paddleStartX,
  // button,
} from './constants.js';

let rightPressed = false;
let leftPressed = false;

const ballX = canvas.width / 2;
const ballY = canvas.height - 30;

const ball = new Ball(ballX, ballY);
const paddle = new Paddle(paddleStartX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
const score = new Score(8, 20);
const lives = new Lives(400, 20);
const scoreLabel = new Label(240, 40, 'Good job! Game over!');

const backgroundImage = new Image();
backgroundImage.src = 'techbackground.jpg';

let background;

backgroundImage.onload = () => {
  background = new Background(0, 0, canvas.width, canvas.height, null, backgroundImage);
};

let gameOver = false;

// ---------------------------------------------
// Setup Bricks Array
// ---------------------------------------------
for (let c = 0; c < brickColumnCount; c += 1) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r += 1) {
    // Calulate x and y once
    const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
    const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
    // Brick class
    bricks[c][r] = new Brick(brickX, brickY, brickWidth, brickHeight);
  }
}
// ---------------------------------------------
// Functions
// ---------------------------------------------
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const brick = bricks[c][r];
      if (brick.status === 1) {
        if (ball.x > brick.x
          && ball.x < brick.x + brickWidth
          && ball.y > brick.y
          && ball.y < brick.y + brickHeight
        ) {
          ball.dy = -ball.dy;
          brick.status = 0;
          score.increase();
          if (score.score === brickRowCount * brickColumnCount) {
            // eslint-disable-next-line no-alert
            // alert('YOU WIN, CONGRATULATIONS!');
            // document.location.reload();
            scoreLabel.render(ctx);
          }
        }
      }
    }
  }
}

function drawScore() {
  score.render(ctx);
}

function drawLives() {
  lives.render(ctx);
}

function drawBall() {
  ball.render(ctx);
}

function drawPaddle() {
  paddle.render(ctx);
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      // const brick = bricks[c][r];
      if (bricks[c][r].status === 1) {
        bricks[c][r].render(ctx);
      }
    }
  }
}

function resetBallAndPaddle() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height - 30;
  ball.dx = 2;
  ball.dy = -2;
  paddle.x = paddleStartX;
}

function movePaddle() {
  if (rightPressed && paddle.x < canvas.width - paddleWidth) {
    paddle.x += 7;
  } else if (leftPressed && paddle.x > 0) {
    paddle.x -= 7;
  }
}

function collisionWithCanvasAndPaddle() {
  if (ball.x + ball.dx > canvas.width - ballRadius || ball.x + ball.dx < ballRadius) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.dy < ballRadius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ballRadius) {
    if (ball.x > paddle.x && ball.x < paddle.x + paddleWidth) {
      ball.dy = -ball.dy;
    } else {
      lives.loseLife();
      if (!lives.lives) {
        // eslint-disable-next-line no-alert
        // alert('GAME OVER');
        scoreLabel.render(ctx);
        gameOver = true;
        // document.location.reload();
      } else {
        resetBallAndPaddle();
      }
    }
  }
}

// reset the game add a button & clicking the button will do the following:
// set gameOver to false
// set score to 0
// set lives to 3
// Move the ball to the starting position
// set the paddle to starting position
// set the status to 1 by looping over the bricks array

// ---------------------------------------------
// Game Loop
// ---------------------------------------------

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (gameOver) {
    return;
  }
  if (background) background.draw(ctx);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  ball.move();
  movePaddle();
  collisionWithCanvasAndPaddle();

  requestAnimationFrame(draw);
}

// ---------------------------------------------
// Event Handlers
// ---------------------------------------------

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddle.x = relativeX - paddleWidth / 2;
  }
}

function keyDownHandler(e) {
  if (e.code === 'ArrowRight') {
    rightPressed = true;
  } else if (e.code === 'ArrowLeft') {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.code === 'ArrowRight') {
    rightPressed = false;
  } else if (e.code === 'ArrowLeft') {
    leftPressed = false;
  }
}

// ---------------------------------------------
// Register Handlers
// ---------------------------------------------

// eslint-disable-next-line no-use-before-define
document.addEventListener('keydown', keyDownHandler, false);
// eslint-disable-next-line no-use-before-define
document.addEventListener('keyup', keyUpHandler, false);
// eslint-disable-next-line no-use-before-define
document.addEventListener('mousemove', mouseMoveHandler, false);

// ---------------------------------------------
// Starts program entry point
// ---------------------------------------------
draw();
