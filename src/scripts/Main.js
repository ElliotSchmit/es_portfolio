import ComponentFactory from './ComponentFactory.js';
import Icons from './utils/Icons.js';

class Main {
  constructor() {
    this.init();
  }

  init() {
    document.documentElement.classList.add('has-js');

    window.transitionToPage = function (href) {
      document.querySelector('body').style.overflow = 'hidden';
      document.querySelector('.transition').style.transform = 'translateY(0)';
      setTimeout(function () {
        window.location.href = href;
      }, 1000);
    };

    document.addEventListener('DOMContentLoaded', function (event) {
      document.querySelector('body').style.overflow = 'unset';
      document.querySelector('.transition').style.transform =
        'translateY(-100%)';
    });

    new ComponentFactory();

    Icons.load();
  }
}
new Main();
