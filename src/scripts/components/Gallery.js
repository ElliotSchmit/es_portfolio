import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { ScrollSmoother } from 'gsap/ScrollSmoother.js';

export default class Gallery {
  constructor(element) {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    this.element = element;
    this.width = document.querySelector('body').clientWidth;
    this.translate = '90%';

    this.init();
  }

  init() {
    window.addEventListener('resize', this.resize.bind(this));
    if (this.width <= 1024) {
      this.translate = '70%';
    }
    this.desktop();
    this.mobile();
  }

  resize() {
    this.translate = '90%';

    if (this.width <= 1024) {
      this.translate = '70%';
    }
  }

  desktop() {
    if (this.element.classList.contains('js-gallery')) {
      const gallery = this.element.querySelector('.js-inverted');
      const tl = gsap.timeline({
        defaults: {
          ease: 'none',
        },
        scrollTrigger: {
          trigger: '.js-inverted',
          start: 'bottom bottom',
          end: '215%',
          pin: true,
          scrub: true,
          normalize: true,
        },
      });

      tl.to(gallery, {
        translateY: '0%',
      }).to(gallery, {
        translateY: this.translate,
      });
    }
  }

  mobile() {
    if (this.element.classList.contains('js-gallery-mobile')) {
      const panels = this.element.querySelectorAll('.js-oeuvres');
      const nbPanels = panels.length - 1;
      const buffer = 200;

      const tl = gsap.timeline({
        defaults: {
          ease: 'none',
          delay: 'none',
        },
        scrollTrigger: {
          trigger: this.element,
          start: 'top top',
          end: () => '+=' + (this.element.offsetWidth + buffer),
          pin: true,
          scrub: 1,
          normalizeScroll: true,
        },
      });

      tl.to(panels, {
        translateX: '0%',
      }).to(panels, {
        translateX: `${-100 * nbPanels}%`,
      });

      /* gsap.to(panels, {
        xPercent: -100 * nbPanels,
        ease: 'none',
        scrollTrigger: {
          trigger: this.element,
          start: 'top top',
          end: () => '+=' + (this.element.offsetWidth + buffer),
          pin: true,
          scrub: 1,
          normalizeScroll: true,
        },
      }); */
    }
  }
}
