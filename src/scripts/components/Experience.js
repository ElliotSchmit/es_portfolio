import * as THREE from 'three';
import gsap from 'gsap';
import * as dat from 'lil-gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
//import { TextureLoader } from 'three';
//import { MeshBasicMaterial } from 'three';

export default class Experience {
  constructor(element) {
    this.element = element;
    this.canvas = document.querySelector('.webgl');
    this.size = document.querySelector('.hero__media');
    this.width = this.size.clientWidth;
    this.height = this.size.clientHeight;

    this.gltfLoader = new GLTFLoader();
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();

    this.init();
  }

  init() {
    const observes = new IntersectionObserver(this.watch.bind(this), {
      rootMargin: '0px 0px 0px 0px',
    });
    observes.observe(this.element);

    window.addEventListener('resize', this.resize.bind(this));
    const observer = new IntersectionObserver(this.observe.bind(this), {
      rootMargin: '-45% 0px',
    });
    this.createCamera();
    this.createLights();
    this.createObjects();
    this.createRenderer();
    this.animate();

    const experiences = document.querySelectorAll('.js-experience');
    for (let i = 0; i < experiences.length; i++) {
      const element = experiences[i];
      observer.observe(element);
    }
  }

  watch(entries) {
    if (entries[0].isIntersecting) {
      document
        .querySelector('.js-mouse')
        .addEventListener('mousemove', this.mousePosition.bind(this));
    } else {
      document
        .querySelector('.js-mouse')
        .removeEventListener('mousemove', this.mousePosition.bind(this));
    }
  }

  mousePosition(event) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;

    if (this.model.rotation) {
      this.model.rotation.y = 1.15 + this.mouseX / 10000;
      this.model.rotation.z = 0.05 + this.mouseY / 10000;
    }

    window.requestAnimationFrame(this.animate.bind(this));
  }

  createLights() {
    const ambientLight = new THREE.AmbientLight('#ffffff', 1.5);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight('#6e86ff', 2);
    directionalLight.position.set(2.13, -3.03, 4.35);

    directionalLight.castShadow = true;
    directionalLight.shadow.camera.far = 10;
    directionalLight.shadow.normalBias = 0.027;
    directionalLight.shadow.bias = -0.004;
    this.scene.add(directionalLight);
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(
      45,

      this.width / this.height,
    );
    this.camera.position.x = 2.13;
    this.camera.position.y = 0.66;
    this.camera.position.z = 5.91;

    this.scene.add(this.camera);
  }

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
    });

    this.renderer.setSize(this.width, this.height, false);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;

    this.renderer.render(this.scene, this.camera);
  }

  createObjects() {
    const geometry = new THREE.BoxGeometry(2, 2, 2, 2);
    const material = new THREE.MeshBasicMaterial({
      color: '#ff0000',
    });
    this.cube = new THREE.Mesh(geometry, material);

    this.gltfLoader.load('assets/models/camera/polaroid.gltf', (gltf) => {
      this.model = gltf.scene;
      this.model.scale.set(4, 4, 4);
      this.model.position.x = 1.83;
      this.model.position.y = 0.85;
      if (this.model.rotation) {
        this.model.rotation.x = 0.17;
        this.model.rotation.y = 1.15;
        this.model.rotation.z = 0.05;
      }

      this.model.traverse((child) => {
        if (child.isMesh && child.material.isMeshStandardMaterial) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      this.scene.add(this.model);
    });
  }

  resize() {
    this.canvas = this.renderer.domElement;

    this.width = this.size.clientWidth;
    this.height = this.size.clientHeight;

    this.renderer.setSize(this.width, this.height, false);
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();

    // Update renderer
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    const elapsedTime = this.clock.getElapsedTime();
    this.renderer.render(this.scene, this.camera);

    window.requestAnimationFrame(this.animate.bind(this));
  }

  observe(entries) {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const target = entry.target;

      if (entry.isIntersecting && this.model) {
      }
    }
  }
}
