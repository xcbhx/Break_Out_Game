// eslint-disable-next-line import/extensions
import Sprite from './Sprite.js';
// eslint-disable-next-line import/extensions
import { brickWidth, brickHeight } from './constants.js';

class Brick extends Sprite {
  constructor(x, y, width = brickWidth, height = brickHeight, color = '#487068') {
    super(x, y, width, height, color); // Calls constructor of Sprite
    this.status = 1;
  }
}

export default Brick;
