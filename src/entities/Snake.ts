interface Position {
  x: number;
  y: number;
}

export class Snake {
  public body: Position[];
  public direction: Position;
  public nextDirection: Position;

  constructor() {
    this.body = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];

    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
  }

  public move(): void {
    const newHead: Position = {
      x: this.body[0].x + this.direction.x,
      y: this.body[0].y + this.direction.y,
    };
    this.body.unshift(newHead);
    this.body.pop();
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

  public checkCollisions(gridSize: number): boolean {
    const nextHead: Position = {
      x: this.body[0].x + this.nextDirection.x,
      y: this.body[0].y + this.nextDirection.y,
    };

    return (
      nextHead.x >= gridSize ||
      nextHead.x < 0 ||
      nextHead.y < 0 ||
      nextHead.y >= gridSize
    );
  }
}
