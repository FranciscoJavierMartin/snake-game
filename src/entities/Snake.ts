interface Position {
  x: number;
  y: number;
}

export class Snake {
  public body: Position[];

  constructor() {
    this.body = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];
  }

  public draw(ctx: CanvasRenderingContext2D, cellSize: number): void {
    ctx.fillStyle = '#4caf50';

    this.body.forEach((segment) => {
      ctx.fillRect(
        segment.x * cellSize,
        segment.y * cellSize,
        cellSize,
        cellSize,
      );
    });
  }
}
