import Brick from "./Brick";

// eslint-disable-next-line no-undef
export const canvas = document.getElementById('myCanvas') as HTMLCanvasElement;
export const ctx = canvas.getContext('2d');

export const ballRadius = 10;
export const paddleHeight = 10;
export const paddleWidth = 75;
export const brickRowCount = 3;
export const brickColumnCount = 5;
export const brickWidth = 75;
export const brickHeight = 20;
export const brickPadding = 10;
export const brickOffsetTop = 30;
export const brickOffsetLeft = 30;
export const bricks: Brick[][] = [];
export const paddleStartX = (canvas.width - paddleWidth) / 2;
export const PI2 = Math.PI * 2;
