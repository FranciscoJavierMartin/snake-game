import { GRID_SIZE } from '@/constants';

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

  public draw(ctx: CanvasRenderingContext2D, cellSize: number): void {
    ctx.fillStyle = '#e74c3c';

    ctx.fillRect(
      this.position.x * cellSize,
      this.position.y * cellSize,
      cellSize,
      cellSize,
    );
  }
}
