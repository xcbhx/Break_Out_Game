// eslint-disable-next-line import/extensions, quotes
import Sprite from "./Sprite.js";

class Paddle extends Sprite {
  // eslint-disable-next-line no-useless-constructor
  constructor(x, y, width, height, color) {
    super(x, y, width, height, color);
  }
}

export default Paddle;
