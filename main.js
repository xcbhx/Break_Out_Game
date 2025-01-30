/* eslint-disable import/extensions */
/* eslint-disable no-undef */
import Brick from './Brick.js';
import {
  canvas,
  ctx,
  ballRadius,
  paddleHeight,
  paddleWidth,
  brickRowCount,
  brickColumnCount,
  brickWidth,
  brickHeight,
  brickPadding,
  brickOffsetTop,
  brickOffsetLeft,
  // eslint-disable-next-line comma-dangle
  bricks
} from './constants.js';

let paddleX = (canvas.width - paddleWidth) / 2;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 2;
let dy = -2;
let rightPressed = false;
let leftPressed = false;
let score = 0;
let lives = 3;

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

// eslint-disable-next-line no-use-before-define
document.addEventListener('keydown', keyDownHandler, false);
// eslint-disable-next-line no-use-before-define
document.addEventListener('keyup', keyUpHandler, false);
// eslint-disable-next-line no-use-before-define
document.addEventListener('mousemove', mouseMoveHandler, false);

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

function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c += 1) {
    for (let r = 0; r < brickRowCount; r += 1) {
      const b = bricks[c][r];
      if (b.status === 1) {
        if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight
        ) {
          dy = -dy;
          b.status = 0;
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
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = '#487068';
  ctx.fill();
  ctx.closePath();
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

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
    dx = -dx;
  }
  if (y + dy < ballRadius) {
    dy = -dy;
  } else if (y + dy > canvas.height - ballRadius) {
    if (x > paddleX && x < paddleX + paddleWidth) {
      dy = -dy;
    } else {
      lives -= 1;
      if (!lives) {
        // eslint-disable-next-line no-alert
        alert('GAME OVER');
        document.location.reload();
      } else {
        x = canvas.width / 2;
        y = canvas.height - 30;
        dx = 2;
        dy = -2;
        paddleX = (canvas.width - paddleWidth) / 2;
      }
    }
  }

  if (rightPressed && paddleX < canvas.width - paddleWidth) {
    paddleX += 7;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= 7;
  }
  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();
