class Lives {
  constructor(x = 65, y = 20, color = '#fcfcfc', font = '16px Arial') {
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

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Lives: ${this.lives}`, this.x, this.y);
  }
}

export default Lives;
