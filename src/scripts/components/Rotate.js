import gsap from 'gsap';

export default class Rotate {
  constructor(element) {
    this.element = element;
    this.width = this.element.offsetWidth;
    this.height = this.element.offsetHeight;

    this.init();
  }

  init() {
    window.addEventListener('resize', this.resize.bind(this));
    this.element.addEventListener('mousemove', this.rotate.bind(this));
    this.element.addEventListener('mouseout', this.endRotate.bind(this));
  }

  rotate(event) {
    const x = event.offsetX / this.width - 0.5;
    const y = event.offsetY / this.height - 0.5;

    gsap.to(this.element, {
      rotate: 0,
      rotateY: x * 5,
      rotateX: -y * 5,
      duration: 0.3,
      transformPerspective: 600,
    });
  }

  endRotate() {
    gsap.to(this.element, {
      style: 'none',
    });
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }
}
