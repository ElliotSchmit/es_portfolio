export default class Drawing {
  constructor(element) {
    this.element = element;
    this.canvas = document.querySelector('.js-canvas');
    this.width = this.element.clientWidth;
    this.height = this.element.clientHeight;
    this.context = this.canvas.getContext('2d');

    this.init();
  }

  init() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    window.addEventListener('resize', this.resize.bind(this));

    this.element.addEventListener('mousemove', this.draw.bind(this));
    this.element.addEventListener('mousedown', this.position.bind(this));
  }

  position(event) {
    console.log(event);
    this.positionX = event.layerX;
    this.positionY = event.layerY;
  }

  draw(event) {
    if (event.buttons !== 1) return;

    this.context.beginPath();

    this.context.lineWidth = 5;
    this.context.lineCap = 'round';
    this.context.strokeStyle = '#6E86FF';

    this.context.moveTo(this.positionX, this.positionY);
    this.position(event);
    console.log(`${this.positionX}, ${this.positionY}`);
    this.context.lineTo(this.positionX, this.positionY);

    this.context.stroke();
  }

  resize() {
    this.width = this.element.clientWidth;
    this.height = this.element.clientHeight;

    this.context.canvas.width = this.width;
    this.context.canvas.height = this.height;
  }
}
