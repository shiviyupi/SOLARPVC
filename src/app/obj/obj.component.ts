import { Component,  ViewChild,AfterViewInit,OnInit } from '@angular/core';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import { ObjService } from '../obj.service';

import {MTLLoader} from 'three/examples/jsm/loaders/MTLLoader.js';
import { ShadowMapType } from 'three';

@Component({
  selector: 'app-obj',
  templateUrl: './obj.component.html',
  styleUrls: ['./obj.component.css'],
})
export class ObjComponent implements OnInit, AfterViewInit {
  @ViewChild('c') DivElement: any
    object;
  constructor(
    private objService: ObjService
  ) {
  }
  ngOnInit(): void {
    // this.main();
  }

  ngAfterViewInit(): void {
    // this.animate();
    this.main();

  }
  main() {
    const canvas = document.querySelector('#c');
    const renderer = new THREE.WebGLRenderer({});
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.DivElement.nativeElement.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    const fov = 45;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 10, 20);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 5, 0);
    controls.update();
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('black');
          const planeSize = 40;
          const loader = new THREE.TextureLoader();
          const texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
          texture.wrapS = THREE.RepeatWrapping;
          texture.wrapT = THREE.RepeatWrapping;
          texture.magFilter = THREE.NearestFilter;
          const repeats = planeSize / 2;
          texture.repeat.set(repeats, repeats);
          const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
          const planeMat = new THREE.MeshPhongMaterial({
            map: texture,
            side: THREE.DoubleSide,
          });
          const mesh = new THREE.Mesh(planeGeo, planeMat);
      mesh.rotation.x = Math.PI * -.5;
           mesh.receiveShadow = true;
          scene.add(mesh);

    // scene.aconst light = new THREE.DirectionalLight( 0xffffff, 1, 100 );
    const light = new THREE.DirectionalLight( 0xffffff, 1 );
light.position.set( 400, 200, 0 ); //default; light shining from top
light.castShadow = true; // default false
scene.add( light );

//Set up shadow properties for the light
light.shadow.mapSize.width = 512; // default
light.shadow.mapSize.height = 512; // default
light.shadow.camera.near = 0.5; // default
    light.shadow.camera.far = 500; // default
    const helper = new THREE.DirectionalLightHelper(light);
    scene.add(helper);
    {
      const mtlLoader = new MTLLoader();
      mtlLoader.load
        ('https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.mtl', (mtl) => {
        mtl.preload();
        const objLoader = new OBJLoader();
        objLoader.setMaterials(mtl);
        objLoader.load('https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.obj',
          (root) => {
            this.object = root;
            this.object.traverse(o => {
              if (o.type == 'Mesh') {
                o.castShadow = true;
                o.reciveShadow = true;
              }
            });
            scene.add(this.object);
          }, (xhr) => {
            if (xhr.lengthComputable) {
              const percentComplete = xhr.loaded / xhr.total * 100;
              console.log('model ' + Math.round(percentComplete) + '% downloaded');
              this.objService.loadPercentage.next(percentComplete);
            }
          });
      });
    }
    function resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
      }
      return needResize;
    }

    function render() {

      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }
}
