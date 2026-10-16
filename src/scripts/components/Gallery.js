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
    const delay = 0.3;
    const gallery = this.element.querySelector('.js-inverted');
    const tl = gsap.timeline({
      defaults: {
        ease: 'power1.inOut',
        //$transformOrigin: 'bottom bottom',
      },
      scrollTrigger: {
        trigger: '.js-inverted',
        start: 'bottom bottom',
        end: '200%',
        pin: true,
        scrub: true,
        markers: true,
      },
    });

    tl.to(gallery, {
      translateY: '0%',
    }).to(gallery, {
      translateY: '60%',
    });
    /* gsap.set(slides, {
      translateY: (i) => (i ? 2798 : 0),
      transformOrigin: 'center center -150px',
    });

    slides.forEach((slide, i) => {
      const nextSlide = slides[i + 1];
      if (!nextSlide) return;
      tl.to(
        slide,
        {
          translateY: 2798,
          onComplete: () => gsap.set(slide, { translateY: -2798 }),
        },

        '+=' + delay,
      ).to(
        nextSlide,
        {
          translateY: 0,
        },
        '<',
      );
    });
    // Keep final slide on the screen
    tl.to({}, { duration: delay });*/
  }
}
