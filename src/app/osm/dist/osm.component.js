"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OsmComponent = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
//import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/build/three.module.js';
//import {OrbitControls} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/controls/OrbitControls.js';
//import {OBJLoader} from 'https://threejsfundamentals.org/threejs/resources/threejs/r127/examples/jsm/loaders/OBJLoader.js';
//import { OrbitControls } from '@/node_modules/three/examples/jsm/controls/OrbitControls'
var OBJLoader_js_1 = require("three/examples/jsm/loaders/OBJLoader.js");
var OrbitControls_1 = require("three/examples/jsm/controls/OrbitControls");
var MTLLoader_js_1 = require("three/examples/jsm/loaders/MTLLoader.js");
var OsmComponent = /** @class */ (function () {
    function OsmComponent(objService) {
        this.objService = objService;
    }
    OsmComponent.prototype.ngOnInit = function () {
    };
    OsmComponent.prototype.ngAfterViewInit = function () {
        this.main();
    };
    OsmComponent.prototype.main = function () {
        var canvas = document.querySelector('#c');
        var renderer = new THREE.WebGLRenderer({});
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.DivElement.nativeElement.appendChild(renderer.domElement);
        var fov = 45;
        var aspect = 2; // the canvas default
        var near = 0.1;
        var far = 100;
        var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(0, 10, 20);
        var controls = new OrbitControls_1.OrbitControls(camera, renderer.domElement);
        controls.target.set(0, 5, 0);
        controls.update();
        var scene = new THREE.Scene();
        scene.background = new THREE.Color('black');
        {
            var planeSize = 40;
            var loader = new THREE.TextureLoader();
            var texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.magFilter = THREE.NearestFilter;
            var repeats = planeSize / 2;
            texture.repeat.set(repeats, repeats);
            var planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
            var planeMat = new THREE.MeshPhongMaterial({
                map: texture,
                side: THREE.DoubleSide
            });
            var mesh = new THREE.Mesh(planeGeo, planeMat);
            mesh.rotation.x = Math.PI * -.5;
            scene.add(mesh);
        }
        {
            var skyColor = 0xB1E1FF; // light blue
            var groundColor = 0xB97A20; // brownish orange
            var intensity = 1;
            var light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
            scene.add(light);
        }
        {
            var color = 0xFFFFFF;
            var intensity = 1;
            var light = new THREE.DirectionalLight(color, intensity);
            light.position.set(5, 10, 2);
            scene.add(light);
            scene.add(light.target);
        }
        {
            var mtlLoader = new MTLLoader_js_1.MTLLoader();
            mtlLoader.load('https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.mtl', function (mtl) {
                mtl.preload();
                var objLoader = new OBJLoader_js_1.OBJLoader();
                objLoader.setMaterials(mtl);
                objLoader.load('https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.obj', function (root) {
                    scene.add(root);
                });
            });
        }
        function resizeRendererToDisplaySize(renderer) {
            var canvas = renderer.domElement;
            var width = canvas.clientWidth;
            var height = canvas.clientHeight;
            var needResize = canvas.width !== width || canvas.height !== height;
            if (needResize) {
                renderer.setSize(width, height, false);
            }
            return needResize;
        }
        function render() {
            if (resizeRendererToDisplaySize(renderer)) {
                var canvas_1 = renderer.domElement;
                camera.aspect = canvas_1.clientWidth / canvas_1.clientHeight;
                camera.updateProjectionMatrix();
            }
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    };
    __decorate([
        core_1.ViewChild('c')
    ], OsmComponent.prototype, "DivElement");
    OsmComponent = __decorate([
        core_1.Component({
            selector: 'app-osm',
            templateUrl: './osm.component.html',
            styleUrls: ['./osm.component.css']
        })
    ], OsmComponent);
    return OsmComponent;
}());
exports.OsmComponent = OsmComponent;
