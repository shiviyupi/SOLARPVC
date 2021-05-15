"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SpinnerComponent = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var OBJLoader_js_1 = require("three/examples/jsm/loaders/OBJLoader.js");
var $;
var SpinnerComponent = /** @class */ (function () {
    function SpinnerComponent() {
    }
    SpinnerComponent.prototype.ngOnInit = function () {
        var container;
        var camera, scene, renderer;
        var mouseX = 0, mouseY = 0;
        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;
        var isLoading = false;
        ;
        var object;
        init();
        animate();
        function init() {
            container = document.createElement('div');
            document.body.appendChild(container);
            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
            camera.position.z = 250;
            // scene
            scene = new THREE.Scene();
            var ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
            scene.add(ambientLight);
            var pointLight = new THREE.PointLight(0xffffff, 0.8);
            camera.add(pointLight);
            scene.add(camera);
            // manager
            function loadModel() {
                object.traverse(function (child) {
                    if (child.isMesh)
                        child.material.map = texture;
                });
                object.position.y = -95;
                scene.add(object);
            }
            var manager = new THREE.LoadingManager(loadModel);
            manager.onProgress = function (item, loaded, total) {
                console.log(item, loaded, total);
            };
            // texture
            var textureLoader = new THREE.TextureLoader(manager);
            var texture = textureLoader.load('https://threejsfundamentals.org/threejs/resources/images/checker.png');
            // model
            function onProgress(xhr) {
                if (xhr.lengthComputable) {
                    var percentComplete = xhr.loaded / xhr.total * 100;
                    console.log('model ' + Math.round(percentComplete) + '% downloaded');
                    this.isLoading = true;
                }
            }
            function onError() { }
            var loader = new OBJLoader_js_1.OBJLoader(manager);
            loader.load('https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.obj', function (obj) {
                object = obj;
            }, onProgress, onError);
            //
            renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);
            document.addEventListener('mousemove', onDocumentMouseMove);
            //
            window.addEventListener('resize', onWindowResize);
        }
        function onWindowResize() {
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
        function onDocumentMouseMove(event) {
            mouseX = (event.clientX - windowHalfX) / 2;
            mouseY = (event.clientY - windowHalfY) / 2;
        }
        //
        function animate() {
            requestAnimationFrame(animate);
            render();
        }
        function render() {
            camera.position.x += (mouseX - camera.position.x) * .05;
            camera.position.y += (-mouseY - camera.position.y) * .05;
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
        }
    };
    SpinnerComponent = __decorate([
        core_1.Component({
            selector: 'app-spinner',
            templateUrl: './spinner.component.html',
            styleUrls: ['./spinner.component.css']
        })
    ], SpinnerComponent);
    return SpinnerComponent;
}());
exports.SpinnerComponent = SpinnerComponent;
