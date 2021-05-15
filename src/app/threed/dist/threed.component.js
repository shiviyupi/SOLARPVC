"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ThreedComponent = void 0;
var OrbitControls_1 = require("three/examples/jsm/controls/OrbitControls");
var core_1 = require("@angular/core");
var THREE = require("three");
var ThreedComponent = /** @class */ (function () {
    function ThreedComponent() {
    }
    ThreedComponent.prototype.ngOnInit = function () { };
    ThreedComponent.prototype.ngAfterViewInit = function () {
        // this.animate();
        this.main();
    };
    ThreedComponent.prototype.addPlane = function (scene) {
        var planeSize = 40;
        var loader = new THREE.TextureLoader();
        var texture = loader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        var repeats = planeSize / 2;
        texture.repeat.set(repeats, repeats);
        var planeGeo = new THREE.PlaneBufferGeometry(planeSize, planeSize);
        var planeMat = new THREE.MeshPhongMaterial({
            map: texture,
            side: THREE.DoubleSide
        });
        var mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.receiveShadow = true;
        mesh.rotation.x = Math.PI * -0.5;
        mesh.position.y = -0.5;
        //mesh.rotateX(45)
        scene.add(mesh);
        this.reRender();
    };
    ThreedComponent.prototype.reRender = function () {
        var event = new Event('resize');
        setTimeout(function () {
            dispatchEvent(event);
        });
    };
    ThreedComponent.prototype.main = function () {
        var _this = this;
        var canvas = document.querySelector('#c');
        var renderer = new THREE.WebGLRenderer({});
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.DivElement.nativeElement.appendChild(renderer.domElement);
        renderer.shadowMap.enabled = true;
        var fov = 75;
        var aspect = 2; // the canvas default
        var near = 0.1;
        var far = 1000;
        var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.z = 2;
        var controls = new OrbitControls_1.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.enablePan = true;
        //camera.zoom = 3;
        camera.updateProjectionMatrix();
        controls.update();
        var scene = new THREE.Scene();
        this.addPlane(scene);
        var light1 = new THREE.DirectionalLight(0xffffff, 0.8);
        light1.position.set(0, 10, 0);
        var light2 = new THREE.DirectionalLight(0xffffff, 1);
        light2.castShadow = true;
        light2.position.set(-5, 4, -5);
        var light3 = new THREE.DirectionalLight(0xffffff, 0.8);
        light3.position.set(10, 4, 10);
        scene.add(light1);
        scene.add(light2);
        scene.add(light3);
        var boxWidth = 1;
        var boxHeight = 0;
        var boxDepth = 1;
        var geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
        function makeCube(geometry, color, x) {
            var material = new THREE.MeshPhongMaterial({ color: color });
            var cube = new THREE.Mesh(geometry, material);
            cube.castShadow = true;
            cube.receiveShadow = true;
            cube.rotateX(75);
            cube.position.x = 1;
            cube.position.y = 0;
            scene.add(cube);
            cube.position.x = x;
            return cube;
        }
        var cubes = [
            makeCube(geometry, 0x808080, 0),
        ];
        var loader = new THREE.TextureLoader();
        var material = new THREE.MeshBasicMaterial({
            map: loader.load('assets/solar-panel/textures/images.jfif')
        });
        var cube = new THREE.Mesh(geometry, material);
        cube.rotateX(75);
        cube.position.x = 0;
        cube.position.y = 0.005;
        cube.position.z = 0;
        scene.add(cube);
        setInterval(function () {
            cubes[1].position.x += 0.2;
            _this.reRender();
        }, 1000);
        var textureLoader = new THREE.TextureLoader();
        var normalMap = textureLoader.load('assets/solar-panel/textures/p.png');
        var aoMap = textureLoader.load('assets/solar-panel/textures/p.png');
        var displacementMap = textureLoader.load('assets/solar-panel/textures/p.png');
        var materialnew = new THREE.MeshStandardMaterial({
            color: 0xaaaaaa,
            roughness: 1,
            metalness: 1,
            normalMap: normalMap,
            normalScale: new THREE.Vector2(1, -1),
            aoMap: aoMap,
            aoMapIntensity: 1,
            displacementBias: -0.428408,
            envMapIntensity: 1
        });
        //stand  one
        var geometry1 = new THREE.BoxGeometry(0.025, 1.31, 0.051);
        geometry1.rotateX(50);
        var material1 = new THREE.MeshBasicMaterial({ color: 0x000000 });
        var cube1 = new THREE.Mesh(geometry1, materialnew);
        cube1.position.x = -0.4;
        cube1.position.y = -0.48;
        cube1.position.z = 0.55;
        cube1.scale.x = 1;
        scene.add(cube1);
        //stand two
        var geometry2 = new THREE.BoxGeometry(0.025, 1.285, 0.051);
        geometry2.rotateX(50);
        var material2 = new THREE.MeshBasicMaterial({ color: 0x000000 });
        var cube2 = new THREE.Mesh(geometry2, materialnew);
        cube2.position.x = 0.4;
        cube2.position.y = -0.48;
        cube2.position.z = 0.5;
        cube2.scale.x = 1;
        scene.add(cube2);
        //stand three
        var geometry3 = new THREE.BoxGeometry(0.0251, 0.6, 0.051);
        var material3 = new THREE.MeshBasicMaterial({ color: 0x000000 });
        var cube3 = new THREE.Mesh(geometry3, materialnew);
        cube3.position.x = -0.4;
        cube3.position.y = -0.48;
        cube3.position.z = -0.4;
        cube3.scale.x = 1;
        scene.add(cube3);
        //stand four
        var geometry4 = new THREE.BoxGeometry(0.0251, 0.6, 0.051);
        var material4 = new THREE.MeshBasicMaterial({ color: 0x000000 });
        var cube4 = new THREE.Mesh(geometry4, materialnew);
        cube4.position.x = 0.4;
        cube4.position.y = -0.48;
        cube4.position.z = -0.4;
        cube4.scale.x = 1;
        scene.add(cube4);
        function resizeRenderer(renderer) {
            var canvas = renderer.domElement;
            var width = canvas.clientWidth;
            var height = canvas.clientHeight;
            var needResize = canvas.width !== width || canvas.height !== height;
            if (needResize) {
                renderer.setSize(width, height, false);
            }
            return needResize;
        }
        var renderRequested = false;
        function render() {
            renderRequested = null;
            if (resizeRenderer(renderer)) {
                var canvas_1 = renderer.domElement;
                camera.aspect = canvas_1.clientWidth / canvas_1.clientHeight;
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
    };
    __decorate([
        core_1.ViewChild('c')
    ], ThreedComponent.prototype, "DivElement");
    ThreedComponent = __decorate([
        core_1.Component({
            selector: 'app-threed',
            templateUrl: './threed.component.html',
            styleUrls: ['./threed.component.css']
        })
    ], ThreedComponent);
    return ThreedComponent;
}());
exports.ThreedComponent = ThreedComponent;
