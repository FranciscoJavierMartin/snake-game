import { CELL_SIZE, SPRITE_SIZE, SpriteKey, SPRITES } from '@/constants';

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

  public draw(
    ctx: CanvasRenderingContext2D,
    spriteSheet: HTMLImageElement,
  ): void {
    ctx.fillStyle = '#4caf50';

    this.body.forEach((segment, index) => {
      const spriteType = this.getSegmentSprite(index);
      const spriteCoords = SPRITES[spriteType];

      ctx.drawImage(
        spriteSheet,
        spriteCoords.x,
        spriteCoords.y,
        SPRITE_SIZE,
        SPRITE_SIZE,
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE,
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

  private getSegmentSprite(index: number): SpriteKey {
    const prev = this.body[index - 1];
    const current = this.body[index];
    const next = this.body[index + 1];
    let segmentSprite: SpriteKey;

    if (index === 0) {
      if (this.direction.x === 1) {
        segmentSprite = 'head_right';
      } else if (this.direction.x === -1) {
        segmentSprite = 'head_left';
      } else if (this.direction.y === 1) {
        segmentSprite = 'head_down';
      } else {
        segmentSprite = 'head_up';
      }
    } else if (index === this.body.length - 1) {
      if (prev.x > current.x) {
        segmentSprite = 'tail_left';
      } else if (prev.x < current.x) {
        segmentSprite = 'tail_right';
      } else if (prev.y > current.y) {
        segmentSprite = 'tail_up';
      } else {
        segmentSprite = 'tail_down';
      }
    } else if (prev.x === next.x) {
      segmentSprite = 'body_vertical';
    } else if (prev.y === next.y) {
      segmentSprite = 'body_horizontal';
    } else if (prev.x < current.x && next.y < current.y) {
      segmentSprite = 'body_topleft';
    } else if (prev.y < current.y && next.x < current.x) {
      segmentSprite = 'body_topleft';
    } else if (prev.y > current.x && next.y < current.y) {
      segmentSprite = 'body_topright';
    } else if (prev.y < current.y && next.x > current.x) {
      segmentSprite = 'body_topright';
    } else if (prev.x > current.x && next.y > current.y) {
      segmentSprite = 'body_bottomright';
    } else if (prev.y > current.y && next.x > current.x) {
      segmentSprite = 'body_bottomright';
    } else if (prev.x < current.x && next.y > current.y) {
      segmentSprite = 'body_bottomleft';
    } else if (prev.y > current.y && next.x < current.x) {
      segmentSprite = 'body_bottomleft';
    } else {
      segmentSprite = 'body_horizontal';
    }

    return segmentSprite;
  }
}
