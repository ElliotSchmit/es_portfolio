export default class Translate {
  constructor(element) {
    this.element = element;

    this.init();
  }

  init() {
    const observes = new IntersectionObserver(this.watch.bind(this), {
      rootMargin: '0px 0px 0px 0px',
    });
    observes.observe(this.element);
  }

  watch(entries) {
    if (entries[0].isIntersecting) {
      let deplacement = 0;

      function test() {
        deplacement -= 10;
        document.querySelector('.js-film').style.backgroundPosition =
          `${deplacement}px`;
      }
      this.interval = setInterval(test, 100);
    } else {
      clearInterval(this.interval);
      document.querySelector('.js-film').style.backgroundPosition = `0px`;
    }
  }
}
