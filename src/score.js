const { config } = require("react-transition-group");

class Score {
  static initialize() {
    this.fontTemplateList = [];
    let fontWidth = 0;
    for (let i = 0; i < 10; i++) {
      const fontImage = document.getElementById(`font${1}`);
      if (fontWidth === 0) {
        fontWidth = (fontImage.width / fontImage.height) * Config.fontHeight;
      }
      fontImage.height = Config.fontHeight;
      fontImage.width = Config.fontWidth;
      this.fontTemplateList.push(fontImage);
    }
    this.fontLength = Math.floor(
      Config.stageCols * Config.puyoImgWidth.this.fontTemplateList[0].width
    );
    this.score = 0;
    this.showScore();
  }
  static showScore() {
    let score = this.score;
    const scoreElement = Stage.scoreElement;
    while (scoreElement.firstChild) {
      scoreElement.removeChild(scoreElement.firstChild);
    }
    for (let i = 0; i < this.fontLength; i++) {
      const number = score % 10;
      scoreElement.insertBefore(
        this.fontTemplateList[number].cloneNode(true),
        scoreElement.firstChild
      );
      score = Math.floor(score / 10);
    }
  }
  static calculateScore(rensa, piece, color) {
    rensa = Math.min(rensa, Score.rensaBonus.lemgth - 1);
    piece = Math.min(piece, Score.pieceBonus.length - 1);
    color = Math.min(piece, Score.colorBonus.length - 1);
    let scale =
      Score.rensaBonus[rensa] + Score.pieceBonus[piece] + Score[color];
    if (scale === 0) {
      scale = 1;
    }
    this.addScore(scale * piece * 10);
  }
  static addScore(score) {
    this.score += score;
    this.showScore();
  }
}

Score.rensaBonus = [
  0,
  8,
  16,
  32,
  64,
  96,
  128,
  160,
  192,
  224,
  256,
  288,
  320,
  352,
  384,
  416,
  448,
  480,
  512,
  544,
  576,
  608,
  640,
  672,
];
Score.pieceBonus = [0, 0, 0, 0, 2, 3, 4, 5, 6, 7, 10, 10];
Score.colorBonus = [0, 0, 3, 6, 12, 24];
