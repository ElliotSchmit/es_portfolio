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
    //const delay = 0.3;
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
        markers: true,
      },
    });

    tl.to(gallery, {
      translateY: '0%',
    }).to(gallery, {
      translateY: '65%',
    });
  }
}
