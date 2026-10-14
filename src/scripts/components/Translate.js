export default class Translate {
  constructor(element) {
    this.element = element;

    this.init();
  }

  init() {
    let deplacement = 0;

    window.onload = function () {
      function test() {
        deplacement -= 10;
        document.querySelector('.js-film').style.backgroundPosition =
          `${deplacement}px`;
      }
      setInterval(test, 100);
    };
  }
}
