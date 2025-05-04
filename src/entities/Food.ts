import { CELL_SIZE, GRID_SIZE, SPRITE_SIZE, SPRITES } from '@/constants';

interface Position {
  x: number;
  y: number;
}

export class Food {
  private _position: Position;

  constructor() {
    this._position = this.getRandomPosition();
  }

  public get position(): Position {
    return this._position;
  }

  public getRandomPosition(): Position {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    return { x, y };
  }

  public respawn(): void {
    this._position = this.getRandomPosition();
  }

  public draw(
    ctx: CanvasRenderingContext2D,
    spriteSheet: HTMLImageElement,
  ): void {
    const appleCoords = SPRITES.apple;
    ctx.drawImage(
      spriteSheet,
      appleCoords.x,
      appleCoords.y,
      SPRITE_SIZE,
      SPRITE_SIZE,
      this.position.x * CELL_SIZE,
      this.position.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE,
    );
  }
}
