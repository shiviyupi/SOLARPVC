"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GltfComponent = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var GLTFLoader_js_1 = require("three/examples/jsm/loaders/GLTFLoader.js");
var OrbitControls_1 = require("three/examples/jsm/controls/OrbitControls");
//import {GUI} from 'https://threejsfundamentals.org/threejs/../3rdparty/dat.gui.module.js';
var GltfComponent = /** @class */ (function () {
    function GltfComponent() {
    }
    GltfComponent.prototype.ngOnInit = function () {
        // this.main();
    };
    GltfComponent.prototype.ngAfterViewInit = function () {
        this.main();
    };
    GltfComponent.prototype.main = function () {
        var canvas = document.querySelector('#c');
        //  const renderer = new THREE.WebGLRenderer({ canvas });
        var renderer = new THREE.WebGLRenderer();
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
        function frameArea(sizeToFitOnScreen, boxSize, boxCenter, camera) {
            var halfSizeToFitOnScreen = sizeToFitOnScreen * 0.5;
            var halfFovY = THREE.MathUtils.degToRad(camera.fov * .5);
            var distance = halfSizeToFitOnScreen / Math.tan(halfFovY);
            // compute a unit vector that points in the direction the camera is now
            // in the xz plane from the center of the box
            var direction = (new THREE.Vector3())
                .subVectors(camera.position, boxCenter)
                .multiply(new THREE.Vector3(1, 0, 1))
                .normalize();
            // move the camera to a position distance units way from the center
            // in whatever direction the camera was from the center already
            camera.position.copy(direction.multiplyScalar(distance).add(boxCenter));
            // pick some near and far values for the frustum that
            // will contain the box.
            camera.near = boxSize / 100;
            camera.far = boxSize * 100;
            camera.updateProjectionMatrix();
            // point the camera to look at the center of the box
            camera.lookAt(boxCenter.x, boxCenter.y, boxCenter.z);
        }
        {
            var gltfLoader = new GLTFLoader_js_1.GLTFLoader();
            gltfLoader.load('https://threejsfundamentals.org/threejs/resources/models/cartoon_lowpoly_small_city_free_pack/scene.gltf', function (gltf) {
                var root = gltf.scene;
                scene.add(root);
                // compute the box that contains all the stuff
                // from root and below
                var box = new THREE.Box3().setFromObject(root);
                var boxSize = box.getSize(new THREE.Vector3()).length();
                var boxCenter = box.getCenter(new THREE.Vector3());
                // set the camera to frame the box
                frameArea(boxSize * 0.5, boxSize, boxCenter, camera);
                // update the Trackball controls to handle the new size
                controls.maxDistance = boxSize * 10;
                controls.target.copy(boxCenter);
                controls.update();
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
    ], GltfComponent.prototype, "DivElement");
    GltfComponent = __decorate([
        core_1.Component({
            selector: 'app-gltf',
            templateUrl: './gltf.component.html',
            styleUrls: ['./gltf.component.css']
        })
    ], GltfComponent);
    return GltfComponent;
}());
exports.GltfComponent = GltfComponent;
