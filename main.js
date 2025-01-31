/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import Brick from './Brick.js';
import Ball from './Ball.js';
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
} from './constants.js';

// ---------------------------------------------
// Variables
// ---------------------------------------------
let paddleX = paddleStartX;

let rightPressed = false;
let leftPressed = false;
let score = 0;
let lives = 3;

const ballX = canvas.width / 2;
const ballY = canvas.height - 30;

const ball = new Ball(ballX, ballY);

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
          score += 1;
          if (score === brickRowCount * brickColumnCount) {
            // eslint-disable-next-line no-alert
            alert('YOU WIN, CONGRATULATIONS!');
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawScore() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#487068';
  ctx.fillText(`Score: ${score}`, 8, 20);
}

function drawLives() {
  ctx.font = '16px Arial';
  ctx.fillStyle = '#487068';
  ctx.fillText(`Lives: ${lives}`, canvas.width - 65, 20);
}

function drawBall() {
  ball.render(ctx);
}

function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;
}

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = '#1f3030';
  ctx.fill();
  ctx.closePath();
}

function drawBricks() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      // const brick = bricks[c][r];
      if (bricks[c][r].status === 1) {
        bricks[c][r].render(ctx);
        // ctx.beginPath();
        // ctx.rect(bricks[c][r].x, bricks[c][r].y, brickWidth, brickHeight);
        // ctx.fillStyle = '#487068';
        // ctx.fill();
        // ctx.closePath();
      }
    }
  }
}

function resetBallAndPaddle() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height - 30;
  ball.dx = 2;
  ball.dy = -2;
  paddleX = paddleStartX;
}

// ---------------------------------------------
// Game Loop
// ---------------------------------------------

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  moveBall();

  if (ball.x + ball.dx > canvas.width - ballRadius || ball.x + ball.dx < ballRadius) {
    ball.dx = -ball.dx;
  }
  if (ball.y + ball.dy < ballRadius) {
    ball.dy = -ball.dy;
  } else if (ball.y + ball.dy > canvas.height - ballRadius) {
    if (ball.x > paddleX && ball.x < paddleX + paddleWidth) {
      ball.dy = -ball.dy;
    } else {
      lives -= 1;
      if (!lives) {
        // eslint-disable-next-line no-alert
        alert('GAME OVER');
        document.location.reload();
      } else {
        resetBallAndPaddle();
      }
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  ball.x += ball.dx;
  ball.y += ball.dy;
  requestAnimationFrame(draw);
}

// ---------------------------------------------
// Event Handlers
// ---------------------------------------------

function mouseMoveHandler(e) {
  const relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
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
