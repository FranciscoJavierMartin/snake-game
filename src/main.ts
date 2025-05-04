import { CANVAS_SIZE, CELL_SIZE, DIRECTIONS, GRID_SIZE } from '@/constants';
import { Food } from '@/entities/Food';
import { Snake } from '@/entities/Snake';
import { ScreenManager } from '@/managers/ScreeenManager';
import '@/style.css';

class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private snake: Snake = new Snake();
  private food: Food = new Food();
  private isPlaying: boolean = false;
  private isGameOver: boolean = false;
  private score: number = 0;
  private screenManager: ScreenManager;

  constructor() {
    this.canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.screenManager = new ScreenManager(this.canvas, this.ctx);

    this.canvas.width = CANVAS_SIZE;
    this.canvas.height = CANVAS_SIZE;

    this.setupControls();
    this.startGameLoop();
  }

  private setupControls(): void {
    document.addEventListener('keydown', (e) => {
      if (!this.isPlaying && (e.code === 'Enter' || e.code === 'Space')) {
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

    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 3;
    this.ctx.font = "20px 'Press Start 2P'";
    this.ctx.fillStyle = 'white';
    this.ctx.textAlign = 'left';
    this.ctx.strokeText(`Score: ${this.score}`, 20, 40);
    this.ctx.fillText(`Score: ${this.score}`, 20, 40);

    if (!this.isPlaying && !this.isGameOver) {
      this.screenManager.drawInitialScreen();
    }

    if (this.isGameOver) {
      this.screenManager.drawGameOverScreen(this.score);
    }
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

    if (this.isPlaying) {
      if (this.snake.checkCollisions(GRID_SIZE)) {
        this.isPlaying = false;
        this.isGameOver = true;
      } else {
        this.snake.move();

        const head = this.snake.head;

        if (
          head.x === this.food.position.x &&
          head.y === this.food.position.y
        ) {
          this.food.respawn();
          this.score++;
        } else {
          this.snake.removeTail();
        }
      }
    }
  }

  private startGameLoop(): void {
    setInterval(() => {
      this.update();
    }, 100);
  }
}

window.onload = () => new Game();
