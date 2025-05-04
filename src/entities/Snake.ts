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

  public get head(): Position {
    return this.body[0];
  }

  public removeTail(): void {
    this.body.pop();
  }

  public move(): void {
    this.direction = this.nextDirection;
    const newHead: Position = {
      x: this.head.x + this.direction.x,
      y: this.head.y + this.direction.y,
    };
    this.body.unshift(newHead);
  }

  public changeDirection(newDirection: Position): void {
    const isOppositeDirection =
      (newDirection.x !== 0 && this.direction.x === -newDirection.x) ||
      (newDirection.y !== 0 && this.direction.y === -newDirection.y);

    if (!isOppositeDirection) {
      this.nextDirection = newDirection;
    }
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
      x: this.head.x + this.nextDirection.x,
      y: this.head.y + this.nextDirection.y,
    };

    const hitWall =
      nextHead.x >= gridSize ||
      nextHead.x < 0 ||
      nextHead.y < 0 ||
      nextHead.y >= gridSize;

    const hitSelf = this.body.some(
      (segment) => segment.x === nextHead.x && segment.y === nextHead.y,
    );

    return hitWall || hitSelf;
  }
}
