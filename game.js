class SlotGame extends Phaser.Scene {
  constructor() {
    super('SlotGame');
  }

  preload() {
    // no assets; using text symbols
  }

  create() {
    this.reelSymbols = ['🍒', '🍋', '🔔', '7', '⭐'];
    this.reels = [];
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;
    const spacing = 100;

    for (let i = 0; i < 3; i++) {
      const text = this.add.text(centerX + (i - 1) * spacing, centerY, '', { fontSize: '64px', color: '#fff' }).setOrigin(0.5);
      this.reels.push(text);
    }

    this.spinButton = this.add.text(centerX, centerY + 150, 'SPIN', {
      fontSize: '32px',
      backgroundColor: '#000',
      color: '#fff',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setInteractive();

    this.spinButton.on('pointerdown', () => this.spin());
    this.updateReels();
  }

  spin() {
    this.updateReels();
    if (this.checkWin()) {
      this.showMessage('You Win!');
    } else {
      this.showMessage('Try Again');
    }
  }

  updateReels() {
    this.reels.forEach(reel => {
      const symbol = Phaser.Utils.Array.GetRandom(this.reelSymbols);
      reel.setText(symbol);
    });
  }

  checkWin() {
    const first = this.reels[0].text;
    return this.reels.every(reel => reel.text === first);
  }

  showMessage(msg) {
    if (this.messageText) {
      this.messageText.destroy();
    }
    this.messageText = this.add.text(this.cameras.main.width / 2, 50, msg, {
      fontSize: '32px',
      color: '#fff'
    }).setOrigin(0.5);
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: '#125555',
  parent: 'gameContainer',
  scene: SlotGame
};

new Phaser.Game(config);
