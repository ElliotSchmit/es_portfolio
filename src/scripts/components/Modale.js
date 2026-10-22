export default class Modale {
  constructor(element) {
    this.element = element;
    this.modale = document.querySelector('.js-modale');

    this.init();
  }

  init() {
    this.element.addEventListener('click', this.onOpenModale.bind(this));
  }

  onOpenModale() {
    let source = this.element.src;
    const image = document.createElement('img');

    image.src = source;
    this.modale.querySelector('.wrapper').appendChild(image);

    document.documentElement.classList.add('modale-is-active');

    this.modale.addEventListener('click', (event) => {
      this.onCloseModale();
    });
  }

  onCloseModale() {
    document.documentElement.classList.remove('modale-is-active');
    this.modale.querySelector('img').remove();
  }
}
