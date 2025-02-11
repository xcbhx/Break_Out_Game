// eslint-disable-next-line import/extensions
import Sprite from './Sprite';

class Background extends Sprite {
  image: any;
  constructor(x: number, y: number, width: number, height: number, color: string = null, image: any = null) {
    super(x, y, width, height, color);
    this.image = image;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.image && this.image.complete) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }
}

export default Background;
