// eslint-disable-next-line import/extensions
import { ballRadius, PI2 } from './constants';
// eslint-disable-next-line import/extensions
import Sprite from './Sprite';

class Ball extends Sprite {
  dx: number;
  dy: number;
  constructor(x: number, y: number, width = ballRadius, height = ballRadius, color = '#b02bc2') {
    super(x, y, width, height, color);
    this.dx = 2;
    this.dy = -2;
  }

  move() {
    this.x += this.dx;
    this.y += this.dy;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, ballRadius, 0, PI2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Ball;
