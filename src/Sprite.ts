// Sprite draws a rectangle of color at x, y, with the width and height
class Sprite {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  constructor(x = 0, y = 0, width = 100, height = 100, color = '#63bbf2') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}

export default Sprite;
