import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { ScrollSmoother } from 'gsap/ScrollSmoother.js';

export default class Gallery {
  constructor(element) {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    this.element = element;

    this.init();
  }

  init() {
    this.desktop();
    this.mobile();
  }

  desktop() {
    if (this.element.classList.contains('js-gallery')) {
      const gallery = this.element.querySelector('.js-inverted');
      const tl = gsap.timeline({
        defaults: {
          ease: 'power1.inOut',
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
        translateY: '90%',
      });
    }
  }

  mobile() {
    if (this.element.classList.contains('js-gallery-mobile')) {
      const panels = this.element.querySelectorAll('.js-oeuvres');
      const nbPanels = panels.length - 1;
      const buffer = 200;

      gsap.to(panels, {
        xPercent: -100 * nbPanels,
        ease: 'none',
        scrollTrigger: {
          pin: true,
          trigger: this.element,
          scrub: 1,
          snap: 0.5 / nbPanels,
          end: () => '+=' + (this.element.offsetWidth + buffer),
          normalize: true,
        },
      });
    }
  }
}
