// eslint-disable-next-line import/extensions, quotes
import Sprite from "./Sprite";

class Paddle extends Sprite {
  // eslint-disable-next-line no-useless-constructor
  constructor(x: number, y: number, width: number, height: number, color: string) {
    super(x, y, width, height, color);
  }
}

export default Paddle;
