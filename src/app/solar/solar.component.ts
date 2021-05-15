import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-solar',
  templateUrl: './solar.component.html',
  styleUrls: ['./solar.component.css'],
})
export class SolarComponent implements OnInit, AfterViewInit {
  @ViewChild('c') DivElement: any;
  constructor() {}

  ngOnInit(): void {
    //  this.main();
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

    //  var scene = new THREE.Scene();
    //var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);

    const fov = 75;
    const aspect = 2; // the canvas default
    const near = 0.1;
    const far = 5;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z = 2;

    const scene = new THREE.Scene();

    const boxWidth = 1;
    const boxHeight = 0;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    const cubes = []; // just an array we can use to rotate the cubes
    const loader = new THREE.TextureLoader();

    const material = new THREE.MeshBasicMaterial({
      map: loader.load('assets/solar-panel/textures/p.png'),
    });
    const cube = new THREE.Mesh(geometry, material);
    cube.rotateZ(45);
    scene.add(cube);

    // cubes.push(cube);  // add to our list of cubes to rotate

    var width = 2,
      height = 2,
      widthSegments = 1,
      heightSegments = 1;
    var plane = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height, widthSegments, heightSegments),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
      })
    );
    plane.rotation.set(-Math.PI / 2, 0, 0);
    scene.add(plane);
    renderer.render(scene, camera);
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

    function render(time) {
      time *= 0.001;

      if (resizeRendererToDisplaySize(renderer)) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      cubes.forEach((cube, ndx) => {
        const speed = 0.2 + ndx * 0.1;
        const rot = time * speed;
        //  cube.rotation.x = rot;
        // cube.rotation.y = rot;
      });
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enablePan = true;
      controls.update();

      renderer.render(scene, camera);

      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);
  }
}
