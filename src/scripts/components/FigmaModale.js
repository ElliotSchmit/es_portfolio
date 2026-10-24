export default class FigmaModale {
  constructor(element) {
    this.element = element;
    this.modale = document.querySelector('.js-modale');
    this.button = this.element.querySelector('.js-button');

    this.init();
  }

  init() {
    this.button.addEventListener('click', this.onOpenModale.bind(this));
  }

  onOpenModale() {
    let source = this.element.src;
    const frame = document.createElement('iframe');

    frame.src = this.element.dataset.link;
    this.modale.querySelector('.wrapper').appendChild(frame);
    this.modale.classList.add('figma-modale');

    document.documentElement.classList.add('modale-is-active');

    this.modale.addEventListener('click', (event) => {
      this.onCloseModale();
    });
  }

  onCloseModale() {
    document.documentElement.classList.remove('modale-is-active');
    this.modale.querySelector('iframe').remove();
    this.modale.classList.remove('figma-modale');
  }
}
