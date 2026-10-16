import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { ScrollSmoother } from 'gsap/ScrollSmoother.js';

export default class Scroller {
  constructor(element) {
    console.clear();
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    this.options = {
      hasSkew: false,
      hasPinItems: false,
    };
    this.element = element;

    this.init();
  }

  init() {
    const slides = gsap.utils.toArray('.pinned');
    /* const images = this.element.querySelector(`.js-imgs`); */
    // Pause between slides
    const delay = 0.5;
    const tl = gsap.timeline({
      defaults: {
        ease: 'power1.inOut',
        transformOrigin: 'center center -150px',
      },
      scrollTrigger: {
        trigger: '.step',
        start: 'center center',
        end: '+=' + (slides.length - 1) * 50 + '%',
        pin: true,
        scrub: true,
        markers: true,
      },
    });

    gsap.set(
      slides,
      {
        translateY: (i) => (i ? 422 : 0),
        transformOrigin: 'center center -150px',
      },
      /* images,
      {
        translateY: (i) => (i ? 500 : 0),
        translateX: (i) => (i ? 500 : 0),
        transformOrigin: 'center center -150px',
      }, */
    );

    slides.forEach((slide, i) => {
      const nextSlide = slides[i + 1];
      /* const nextImage = this.element.querySelector(`.js-img-${i + 2}`);
      const image = this.element.querySelector(`.js-img-${i + 1}`); */
      if (!nextSlide) return;
      tl.to(
        /* image,
        {
          translateX: 0,
          translateY: 0,
          onComplete: () =>
            gsap.set(image, { translateX: 500, translateY: -500 }),
        }, */
        slide,
        {
          translateY: -422,
          onComplete: () => gsap.set(slide, { translateY: 422 }),
        },

        '+=' + delay,
      ).to(
        /* nextImage,
        {
          translateX: 0,
          translateY: 0,
        }, */
        nextSlide,
        {
          translateY: 0,
        },
        '<',
      );
    });
    // Keep final slide on the screen
    tl.to({}, { duration: delay });

    /* const images = gsap.utils.toArray('.js-imgs');
    const im = gsap.timeline({
      defaults: {
        ease: 'power1.inOut',
        transformOrigin: 'center center -150px',
      },
      scrollTrigger: {
        trigger: '.step',
        start: 'center center',
        end: '+=' + (images.length - 1) * 50 + '%',
        pin: true,
        scrub: true,
        markers: true,
      },
    });

    gsap.set(images, {
      translateX: (i) => (i ? 422 : 0),
      transformOrigin: 'center center -150px',
    });

    gsap.set(images, {
      translateX: (i) => (i ? 422 : 0),
      transformOrigin: 'center center -150px',
    });

    images.forEach((img, i) => {
      const nextImages = images[i + 1];
      if (!nextImages) return;
      im.to(
        img,
        {
          translateX: -422,
          onComplete: () => gsap.set(img, { translateX: 422 }),
        },

        '+=' + delay,
      ).to(
        nextImages,
        {
          translateY: 0,
        },
        '<',
      );
    });
    // Keep final slide on the screen
    im.to({}, { duration: delay }); */
  }
}
