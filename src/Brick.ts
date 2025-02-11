// eslint-disable-next-line import/extensions
import Sprite from './Sprite';
// eslint-disable-next-line import/extensions
import { brickWidth, brickHeight } from './constants';

class Brick extends Sprite {
  status: number;
  constructor(x: number, y: number, width = brickWidth, height = brickHeight, color = '#afd1de') {
    super(x, y, width, height, color); // Calls constructor of Sprite
    this.status = 1;
  }
}

export default Brick;
