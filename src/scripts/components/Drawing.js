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
    this.element.addEventListener('ontouchstart', this.position.bind(this));
    this.element.addEventListener('ontouchmove', this.draw.bind(this));

    /* this.context.beginPath();

    this.context.lineWidth = 10;
    this.context.lineCap = 'round';
    this.context.strokeStyle = '#6E86FF';

    this.context.beginPath();
    this.context.arc(1033, 281, 40, 0, 2 * Math.PI);
    this.context.stroke();

    this.context.beginPath();
    this.context.moveTo(1049, 326);
    this.context.quadraticCurveTo(1099, 425, 1088, 542);
    this.context.stroke();

    this.context.beginPath();
    this.context.moveTo(1045, 325);
    this.context.bezierCurveTo(1060, 420, 900, 365, 995, 305);
    this.context.stroke();

    this.context.beginPath();
    this.context.moveTo(995, 305);
    this.context.bezierCurveTo(912, 321, 926, 191, 1002, 249);
    this.context.stroke(); */
  }

  position(event) {
    this.positionX = event.layerX;
    this.positionY = event.layerY;
  }

  draw(event) {
    console.log(event);
    if (event.buttons !== 1) return;

    this.context.lineWidth = 10;
    this.context.lineCap = 'round';
    this.context.strokeStyle = '#6E86FF';

    this.context.beginPath();

    this.context.moveTo(this.positionX, this.positionY);
    console.log(this.positionX, this.positionY);
    this.position(event);
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
