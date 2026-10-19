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

    this.init();
  }

  init() {
    this.text();
    this.images();
  }

  text() {
    if (this.element.querySelector('.js-step')) {
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
          markers: true,
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
            onComplete: () => gsap.set(slide, { translateY: 422 }),
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
  }

  images() {
    if (this.element.querySelector('.js-imgs')) {
      const images = gsap.utils.toArray('.js-img');
      const delay = 0.5;
      const tl = gsap.timeline({
        defaults: {
          ease: 'power1.inOut',
          transformOrigin: 'center center -150px',
        },
        scrollTrigger: {
          trigger: '.js-imgs',
          start: 'top top',
          end: '+=' + (this.slides.length - 1) * 50 + '%',
          pin: true,
          scrub: true,
          markers: true,
        },
      });

      gsap.set(images, {
        translateY: (i) => (i ? 0 : 0),
        transformOrigin: 'center center -150px',
      });

      images.forEach((image, i) => {
        const nextImage = images[i + 1];
        if (!nextImage) return;
        tl.to(
          image,
          {
            translateY: 0,
            onComplete: () => gsap.set(image, { translateY: -500 }),
          },

          '+=' + delay,
        ).to(
          nextImage,
          {
            translateY: 0,
          },
          '<',
        );
      });
      // Keep final slide on the screen
      tl.to({}, { duration: delay });
    }
  }
}
