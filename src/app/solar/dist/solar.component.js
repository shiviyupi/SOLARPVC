"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SolarComponent = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var OrbitControls_1 = require("three/examples/jsm/controls/OrbitControls");
var SolarComponent = /** @class */ (function () {
    function SolarComponent() {
    }
    SolarComponent.prototype.ngOnInit = function () {
        //  this.main();
    };
    SolarComponent.prototype.ngAfterViewInit = function () {
        // this.animate();
        this.main();
    };
    SolarComponent.prototype.main = function () {
        var canvas = document.querySelector('#c');
        var renderer = new THREE.WebGLRenderer({});
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.DivElement.nativeElement.appendChild(renderer.domElement);
        //  var scene = new THREE.Scene();
        //var camera = new THREE.PerspectiveCamera(60, 320 / 240, 1, 1000);
        var fov = 75;
        var aspect = 2; // the canvas default
        var near = 0.1;
        var far = 5;
        var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.z = 2;
        var scene = new THREE.Scene();
        var boxWidth = 1;
        var boxHeight = 0;
        var boxDepth = 1;
        var geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
        var cubes = []; // just an array we can use to rotate the cubes
        var loader = new THREE.TextureLoader();
        var material = new THREE.MeshBasicMaterial({
            map: loader.load('assets/solar-panel/textures/p.png')
        });
        var cube = new THREE.Mesh(geometry, material);
        cube.rotateZ(45);
        scene.add(cube);
        // cubes.push(cube);  // add to our list of cubes to rotate
        var width = 2, height = 2, widthSegments = 1, heightSegments = 1;
        var plane = new THREE.Mesh(new THREE.PlaneGeometry(width, height, widthSegments, heightSegments), new THREE.MeshBasicMaterial({
            color: 0xffffff
        }));
        plane.rotation.set(-Math.PI / 2, 0, 0);
        scene.add(plane);
        renderer.render(scene, camera);
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
        function render(time) {
            time *= 0.001;
            if (resizeRendererToDisplaySize(renderer)) {
                var canvas_1 = renderer.domElement;
                camera.aspect = canvas_1.clientWidth / canvas_1.clientHeight;
                camera.updateProjectionMatrix();
            }
            cubes.forEach(function (cube, ndx) {
                var speed = 0.2 + ndx * 0.1;
                var rot = time * speed;
                //  cube.rotation.x = rot;
                // cube.rotation.y = rot;
            });
            var controls = new OrbitControls_1.OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.enablePan = true;
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    };
    __decorate([
        core_1.ViewChild('c')
    ], SolarComponent.prototype, "DivElement");
    SolarComponent = __decorate([
        core_1.Component({
            selector: 'app-solar',
            templateUrl: './solar.component.html',
            styleUrls: ['./solar.component.css']
        })
    ], SolarComponent);
    return SolarComponent;
}());
exports.SolarComponent = SolarComponent;
