import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { Mesh } from 'three';

import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
@Component({
  selector: 'app-threed',
  templateUrl: './threed.component.html',
  styleUrls: ['./threed.component.css'],
})
export class ThreedComponent implements OnInit, AfterViewInit {
  @ViewChild('c') DivElement: any;
  constructor() {}
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // this.animate();
    this.main();
  }

  addPlane(scene) {
    const planeSize = 40;

    const loader = new THREE.TextureLoader();
    const texture = loader.load(
      'https://threejsfundamentals.org/threejs/resources/images/checker.png'
    );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.magFilter = THREE.NearestFilter;
    const repeats = planeSize / 2;

    texture.repeat.set(repeats, repeats);
    const planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const mesh = new THREE.Mesh(planeGeo, planeMat);
    mesh.receiveShadow = true;
    mesh.rotation.x = Math.PI * -0.5;
    mesh.position.y = -0.5;
    //mesh.rotateX(45)

    scene.add(mesh);
    this.reRender();
  }

  reRender() {
    const event = new Event('resize');
    setTimeout(() => {
      dispatchEvent(event);
    });
  }

  main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({});
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.DivElement.nativeElement.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;

    const fov = 75;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = true;
    //camera.zoom = 3;
  camera.updateProjectionMatrix();
    controls.update();
    const scene = new THREE.Scene();
    this.addPlane(scene);

    const light1 = new THREE.DirectionalLight(0xffffff, 0.8);
    light1.position.set(0, 10, 0);
    const light2 = new THREE.DirectionalLight(0xffffff, 1);
    light2.castShadow = true;
    light2.position.set(-5, 4, -5);
    const light3 = new THREE.DirectionalLight(0xffffff, 0.8);
    light3.position.set(10, 4, 10);
    scene.add(light1);
    scene.add(light2);
    scene.add(light3);

    const boxWidth = 1;
    const boxHeight = 0;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    function makeCube(geometry, color, x) {
      const material = new THREE.MeshPhongMaterial({ color });
      const cube = new THREE.Mesh(geometry, material);
      cube.castShadow = true;
      cube.receiveShadow = true;
      cube.rotateX(75);
      cube.position.x = 1;
      cube.position.y = 0;
      scene.add(cube);
      cube.position.x = x;
      return cube;
    }
    const cubes = [
      makeCube(geometry, 0x808080, 0),
      // makeCube(geometry, 'red', 3),
    ];

    const loader = new THREE.TextureLoader();
    const material = new THREE.MeshBasicMaterial({
      map: loader.load('assets/solar-panel/textures/images.jfif'),
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.rotateX(75);
    cube.position.x = 0;
    cube.position.y = 0.005;
    cube.position.z = 0;
    scene.add(cube);

    setInterval(() => {
      cubes[1].position.x += 0.2;
      this.reRender();
    }, 1000);

    const textureLoader = new THREE.TextureLoader();
    const normalMap = textureLoader.load('assets/solar-panel/textures/p.png');
    const aoMap = textureLoader.load('assets/solar-panel/textures/p.png');
    const displacementMap = textureLoader.load(
      'assets/solar-panel/textures/p.png'
    );

    const materialnew = new THREE.MeshStandardMaterial({
      color: 0xaaaaaa,
      roughness: 1,
      metalness: 1,
      normalMap: normalMap,
      normalScale: new THREE.Vector2(1, -1), // why does the normal map require negation in this case?
      aoMap: aoMap,
      aoMapIntensity: 1,
      displacementBias: -0.428408, // from original model
      envMapIntensity: 1,
    });

    //stand  one
    const geometry1 = new THREE.BoxGeometry(0.025, 1.31, 0.051);
    geometry1.rotateX(50);
    const material1 = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const cube1 = new THREE.Mesh(geometry1, materialnew);
    cube1.position.x = -0.4;
    cube1.position.y = -0.48;
    cube1.position.z = 0.55;
    cube1.scale.x = 1;
    scene.add(cube1);

    //stand two
    const geometry2 = new THREE.BoxGeometry(0.025, 1.285, 0.051);
    geometry2.rotateX(50);
    const material2 = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const cube2 = new THREE.Mesh(geometry2, materialnew);
    cube2.position.x = 0.4;
    cube2.position.y = -0.48;
    cube2.position.z = 0.5;
    cube2.scale.x = 1;
    scene.add(cube2);

    //stand three
    const geometry3 = new THREE.BoxGeometry(0.0251, 0.6, 0.051);
    const material3 = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const cube3 = new THREE.Mesh(geometry3, materialnew);
    cube3.position.x = -0.4;
    cube3.position.y = -0.48;
    cube3.position.z = -0.4;
    cube3.scale.x = 1;
    scene.add(cube3);

    //stand four
    const geometry4 = new THREE.BoxGeometry(0.0251, 0.6, 0.051);
    const material4 = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const cube4 = new THREE.Mesh(geometry4, materialnew);
    cube4.position.x = 0.4;
    cube4.position.y = -0.48;
    cube4.position.z = -0.4;
    cube4.scale.x = 1;
    scene.add(cube4);

    function resizeRenderer(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    let renderRequested = false;
    function render() {
      renderRequested = null;
      if (resizeRenderer(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }
      controls.update();
      renderer.render(scene, camera);
    }
    render();
    function requestRenderIfNotRequested() {
      if (!renderRequested) {
        renderRequested = true;
        requestAnimationFrame(render);
      }
    }
    controls.addEventListener('change', requestRenderIfNotRequested);
    window.addEventListener('resize', requestRenderIfNotRequested);
  }
}
