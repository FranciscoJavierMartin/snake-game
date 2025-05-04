export class AudioManager {
  private eatSound: HTMLAudioElement;
  private gameOverSound: HTMLAudioElement;
  private backgroundMusic: HTMLAudioElement;

  constructor() {
    this.eatSound = new Audio('/sounds/eat.mp3');
    this.gameOverSound = new Audio('/sounds/hit.mp3');
    this.backgroundMusic = new Audio('/sounds/music.mp3');

    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = 0.5;
  }

  public playMusic(): void {
    this.backgroundMusic.currentTime = 0;
    this.backgroundMusic.play();
  }

  public stopMusic(): void {
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;
  }

  public playEat(): void {
    this.eatSound.currentTime = 0;
    this.eatSound.play();
  }

  public playGameOver(): void {
    this.gameOverSound.currentTime = 0;
    this.gameOverSound.play();
    this.stopMusic();
  }
}
