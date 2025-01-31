// eslint-disable-next-line import/extensions
import { ballRadius, PI2 } from './constants.js';
// eslint-disable-next-line import/extensions
import Sprite from './Sprite.js';

class Ball extends Sprite {
  constructor(x, y, width = ballRadius, height = ballRadius, color = '#b35d0c') {
    super(x, y, width, height, color);
    this.dx = 2;
    this.dy = -2;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  render(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, ballRadius, 0, PI2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Ball;
