// eslint-disable-next-line import/extensions
import Sprite from './Sprite.js';

class Background extends Sprite {
  constructor(x, y, width, height, color = null, image = null) {
    super(x, y, width, height, color);
    this.image = image;
  }

  draw(ctx) {
    if (this.image && this.image.complete) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }
}

export default Background;
