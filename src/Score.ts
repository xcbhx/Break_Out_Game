class Score {
  x: number;
  y: number;
  color: string;
  font: string;
  value: number
  constructor(x: number, y: number, color = '#fcfcfc', font = '16px Arial') {
    this.x = x;
    this.y = y;
    this.color = color;
    this.font = font;
    this.value = 0; // Start with a score of 0.
  }

  increase(points = 1) {
    this.value += points; // Increase score by given points.
  }

  reset() {
    this.value = 0; // Reset score when the game restarts
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(`Score: ${this.value}`, this.x, this.y);
  }
}

export default Score;
