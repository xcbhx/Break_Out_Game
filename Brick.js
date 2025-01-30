class Brick {
  constructor(x, y, width, height, color = '#487068') {
    this.x = x;
    this.y = y;
    this.status = 1;
    this.color = color;
    this.width = width;
    this.height = height;
  }

  render(ctx) {
    if (this.status === 1) {
      ctx.beginPath();
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.fillStyle = this.color;
      ctx.fill();
      ctx.closePath();
    }
  }
}

export default Brick;
