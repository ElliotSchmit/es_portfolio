import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { ScrollSmoother } from 'gsap/ScrollSmoother.js';

export default class Scroller {
  constructor(element) {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    this.options = {
      hasSkew: false,
      hasPinItems: false,
    };
    this.element = element;
    this.slides = gsap.utils.toArray('.pinned');
    this.slideNumber = 0;

    this.init();
  }

  init() {
    this.text();
  }

  text() {
    const delay = 0.5;
    const tl = gsap.timeline({
      defaults: {
        ease: 'power1.inOut',
        transformOrigin: 'center center -150px',
      },
      scrollTrigger: {
        trigger: '.js-step',
        start: 'center center',
        end: '+=' + (this.slides.length - 1) * 50 + '%',
        pin: true,
        scrub: true,
      },
    });

    gsap.set(this.slides, {
      translateY: (i) => (i ? 422 : 0),
      transformOrigin: 'center center -150px',
    });

    this.slides.forEach((slide, i) => {
      const nextSlide = this.slides[i + 1];

      if (!nextSlide) return;

      tl.to(
        slide,
        {
          translateY: -422,
          onComplete: this.complete.bind(this),
          onReverseComplete: this.reverseComplete.bind(this),
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
    tl.to({}, { duration: delay });
  }

  complete(slide) {
    this.slideNumber++;
    this.imageUpdate();
  }

  reverseComplete() {
    this.slideNumber--;
    this.imageUpdate();
  }

  imageUpdate() {
    const images = document.querySelectorAll('.js-img');

    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      console.log(`${i}, ${this.slideNumber}`);
      if (i < this.slideNumber) {
        console.log(image);
        image.style.translate = '50% -150%';
        image.style.rotate = '15deg';
      } else {
        image.style.translate = '0px 0px';
        image.style.rotate = 'none';
      }
    }
  }
}
