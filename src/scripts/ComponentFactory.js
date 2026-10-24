import Experience from './components/Experience.js';
import FigmaModale from './components/FigmaModale.js';
import Form from './components/Form.js';
import Gallery from './components/Gallery.js';
import Header from './components/Header.js';
import Modale from './components/Modale.js';
import Rotate from './components/Rotate.js';
import Scroller from './components/Scroller.js';
import Translate from './components/Translate.js';
import YouTube from './components/YouTube.js';
import YoutubeModale from './components/YoutubeModale.js';

export default class ComponentFactory {
  constructor() {
    this.componentInstances = [];
    this.componentList = {
      Experience,
      FigmaModale,
      Form,
      Gallery,
      Header,
      Modale,
      Rotate,
      Scroller,
      Translate,
      YouTube,
      YoutubeModale,
    };
    this.init();
  }
  init() {
    const components = document.querySelectorAll('[data-component]');

    for (let i = 0; i < components.length; i++) {
      const element = components[i];
      const componentName = element.dataset.component;

      if (this.componentList[componentName]) {
        const instance = new this.componentList[componentName](element);
        this.componentInstances.push(instance);
      } else {
        console.log(`La composante ${componentName} n'existe pas`);
      }
    }
  }
}
