class Lives {
  x: number;
  y: number;
  color: string;
  font: string;
  value: number;
  lives: number;
  constructor(x: number, y: number, color = '#fcfcfc', font = '16px Arial') {
    this.x = x;
    this.y = y;
    this.color = color;
    this.font = font;
    this.value = 3;
  }

  loseLife(dead = 1) {
    this.value -= dead;
  }

  reset() {
    this.value = 3;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Lives: ${this.value}`, this.x, this.y);
  }
}

export default Lives;
