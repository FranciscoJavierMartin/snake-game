import { GRID_SIZE } from '@/constants';

interface Position {
  x: number;
  y: number;
}

export class Food {
  public position: Position;

  constructor() {
    this.position = this.getRandomPosition();
  }

  public getRandomPosition(): Position {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    return { x, y };
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
