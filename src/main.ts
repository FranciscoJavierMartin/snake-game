import { CANVAS_SIZE, CELL_SIZE, DIRECTIONS, GRID_SIZE } from '@/constants';
import { Food } from '@/entities/Food';
import { Snake } from '@/entities/Snake';
import '@/style.css';

class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private snake: Snake = new Snake();
  private food: Food = new Food();
  private isPlaying: boolean = false;

  constructor() {
    this.canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;

    this.canvas.width = CANVAS_SIZE;
    this.canvas.height = CANVAS_SIZE;

    this.setupControls();
    this.startGameLoop();
  }

  private setupControls(): void {
    document.addEventListener('keydown', (e) => {
      if (!this.isPlaying && e.code === 'Enter') {
        this.isPlaying = true;
      } else if (this.isPlaying) {
        const newDirection = {
          ArrowUp: DIRECTIONS.UP,
          ArrowDown: DIRECTIONS.DOWN,
          ArrowLeft: DIRECTIONS.LEFT,
          ArrowRight: DIRECTIONS.RIGHT,
        }[e.code];

        if (newDirection) {
          this.snake.changeDirection(newDirection);
        }
      }
    });
  }

  private draw(): void {
    this.drawGrid();
    this.food.draw(this.ctx, CELL_SIZE);
    this.snake.draw(this.ctx, CELL_SIZE);
  }

  private drawGrid(): void {
    this.ctx.fillStyle = '#2c3e50';
    this.ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    this.ctx.strokeStyle = '#ffffff33';
    this.ctx.lineWidth = 1;

    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0, CANVAS_SIZE);
    this.ctx.stroke();

    for (let i = 0; i < GRID_SIZE; i++) {
      // Vertical lines
      this.ctx.beginPath();
      this.ctx.moveTo(CELL_SIZE * i, 0);
      this.ctx.lineTo(CELL_SIZE * i, CANVAS_SIZE);
      this.ctx.stroke();

      // Horizontal lines
      this.ctx.beginPath();
      this.ctx.moveTo(0, CELL_SIZE * i);
      this.ctx.lineTo(CANVAS_SIZE, CELL_SIZE * i);
      this.ctx.stroke();
    }
  }

  private update(): void {
    this.draw();

    if (this.isPlaying && !this.snake.checkCollisions(GRID_SIZE)) {
      this.snake.move();

      const head = this.snake.head;

      if (head.x === this.food.position.x && head.y === this.food.position.y) {
        this.food.respawn();
      } else {
        this.snake.removeTail();
      }
    } else {
      this.isPlaying = false;
    }
  }

  private startGameLoop(): void {
    setInterval(() => {
      this.update();
    }, 100);
  }
}

window.onload = () => new Game();
