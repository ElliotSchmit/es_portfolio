import * as THREE from 'three';
import gsap from 'gsap';
import * as dat from 'lil-gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { texture, posterize, pass } from 'three/tsl';
import { TextureLoader } from 'three';
import { MeshBasicMaterial } from 'three';
import { RenderPipeline } from 'three/webgpu';

export default class Experience {
  constructor(element) {
    this.element = element;
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    this.canvas = document.querySelector('.webgl');
    this.gltfLoader = new GLTFLoader();
    this.scene = new THREE.Scene();
    this.clock = new THREE.Clock();

    this.init();
  }

  init() {
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

    document
      .querySelector('.js-mouse')
      .addEventListener('mousemove', this.mousePosition.bind(this));
  }

  mousePosition(event) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;

    this.model.rotation.y = 0.8 + this.mouseX / 10000;
    this.model.rotation.z = 0.1 + this.mouseY / 10000;

    window.requestAnimationFrame(this.animate.bind(this));
  }

  createLights() {
    const ambientLight = new THREE.AmbientLight('#ffffff', 1.5);
    this.scene.add(ambientLight);

    /* this.gui = new dat.GUI(); */

    const directionalLight = new THREE.DirectionalLight('#6e86ff', 2);
    directionalLight.position.set(2.13, -3.03, 4.35);

    /* this.gui.add(directionalLight.position, 'x', -10, 10, 0.01);
    this.gui.add(directionalLight.position, 'y', -10, 10, 0.01);
    this.gui.add(directionalLight.position, 'z', -10, 10, 0.01); */

    directionalLight.castShadow = true;
    directionalLight.shadow.camera.far = 10;
    directionalLight.shadow.normalBias = 0.027;
    directionalLight.shadow.bias = -0.004;
    this.scene.add(directionalLight);
  }

  createCamera() {
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.sizes.width / this.sizes.height,
    );
    this.camera.position.z = 8;
    this.scene.add(this.camera);
  }

  createRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
    });

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;

    /* this.renderPipeline = new RenderPipeline(this.renderer);
    this.defaultPass = pass(this.scene, this.camera);
    this.renderPipeline.outputNode = posterize(this.defaultPass, 4.0);
    this.renderPipeline.outputColorTransform = true;
    this.renderPipeline.needsUpdate = true; */

    this.renderer.render(this.scene, this.camera);
  }

  createObjects() {
    const geometry = new THREE.BoxGeometry(2, 2, 2, 2);
    const material = new THREE.MeshBasicMaterial({
      color: '#ff0000',
    });
    this.cube = new THREE.Mesh(geometry, material); // on applique la forme et le materiel pour faire un mesh
    //this.scene.add(this.cube);

    /* const texturePath = 'assets/models/camera/textures/Bake.png';
    const texture = new TextureLoader().load(texturePath); */

    this.gltfLoader.load('assets/models/camera/polaroid.gltf', (gltf) => {
      this.model = gltf.scene;
      this.model.scale.set(4, 4, 4);
      this.model.position.x = 1.83;
      this.model.position.y = 0.85;
      if (this.model.rotation) {
        this.model.rotation.x = 0.17;
        this.model.rotation.y = 0.9;
        this.model.rotation.z = 0.17;
      }

      /* this.gui.add(this.model.rotation, 'x', -10, 10, 0.01);
      this.gui.add(this.model.rotation, 'y', -10, 10, 0.01);
      this.gui.add(this.model.rotation, 'z', -10, 10, 0.01);
 */
      this.model.traverse((child) => {
        if (child.isMesh && child.material.isMeshStandardMaterial) {
          child.castShadow = true;
          child.receiveShadow = true;
          /* child.material = new THREE.MeshBasicMaterial({
            map: texture,
          }); */
        }
      });

      this.scene.add(this.model);
    });

    /*
    renderPipeline.outputNode = posterize( defaultPass, 4.0 );*/
  }

  resize() {
    // Update sizes
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;

    // Update camera
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();

    // Update renderer
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.renderer.render(this.scene, this.camera);

    //this.renderPipeline.render();
  }

  animate() {
    const elapsedTime = this.clock.getElapsedTime();
    this.renderer.render(this.scene, this.camera);

    //this.model.rotation.y = 0.9;

    this.cube.rotation.y = 0.5 * elapsedTime;

    window.requestAnimationFrame(this.animate.bind(this));
  }

  observe(entries) {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const target = entry.target;

      if (entry.isIntersecting && this.model) {
        gsap.to(this.model.position, {
          duration: 1,
          ease: 'Power2.inOut',
          x: target.dataset.p,
        });

        gsap.to(this.model.rotation, {
          duration: 1,
          ease: 'Power2.inOut',
          x: target.dataset.rX,
          y: target.dataset.rY,
          z: target.dataset.rZ,
        });

        const cameraZ = 'cZ' in target.dataset ? target.dataset.cZ : 8;
        gsap.to(this.camera.position, {
          duration: 1,
          ease: 'Power2.inOut',
          z: cameraZ,
        });
      }
    }
  }
}
