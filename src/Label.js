// extend Sprite
// new property 'text' or 'label' or 'message'
// Override the render method and the new method draws text
// eslint-disable-next-line import/extensions
import Sprite from './Sprite.js';

class Label extends Sprite {
  constructor(x, y, scoreLabel, color = '#d18bf0', font = '16px Arial') {
    super(x, y, 0, 0, color);
    this.font = font;
    this.scoreLabel = scoreLabel;
  }

  render(ctx) {
    ctx.font = this.font;
    ctx.fillStyle = this.color;
    ctx.fillText(this.scoreLabel, this.x, this.y);
  }
}

export default Label;
