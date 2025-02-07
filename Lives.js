class Lives {
  constructor(x = 65, y = 20, color = '#fcfcfc', font = '16px Arial') {
    this.x = x;
    this.y = y;
    this.color = color;
    this.font = font;
    this.lives = 3;
  }

  loseLife(dead = 1) {
    this.lives -= dead;
  }

  reset() {
    this.lives = 3;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Lives: ${this.lives}`, this.x, this.y);
  }
}

export default Lives;
