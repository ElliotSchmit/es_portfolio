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
    this.width = document.querySelector('body').clientWidth;

    this.init();
  }

  init() {
    this.setup();
    this.text();
  }

  setup() {
    this.center = 'center';
    if (this.width <= 1024) {
      this.center = '10%';
    }
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
        start: this.center + ' center',
        end: '+=' + (this.slides.length - 1) * 50 + '%',
        pin: true,
        scrub: true,
      },
    });

    document.querySelector('.js-step').style.height =
      this.slides[0].offsetHeight + 'px';

    gsap.set(this.slides, {
      translateY: (i) => (i ? this.slides[0].offsetHeight : 0),
      transformOrigin: 'center center -150px',
    });

    this.slides.forEach((slide, i) => {
      const nextSlide = this.slides[i + 1];

      if (!nextSlide) return;

      tl.to(
        slide,
        {
          translateY: -this.slides[0].offsetHeight,
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
        image.style.translate = '55% -160%';
        image.style.rotate = '15deg';
      } else {
        image.style.translate = '0px 0px';
        image.style.rotate = 'none';
      }
    }
  }
}
