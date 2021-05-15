"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ObjComponent = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var OBJLoader_js_1 = require("three/examples/jsm/loaders/OBJLoader.js");
var OrbitControls_1 = require("three/examples/jsm/controls/OrbitControls");
var MTLLoader_js_1 = require("three/examples/jsm/loaders/MTLLoader.js");
var ObjComponent = /** @class */ (function () {
    function ObjComponent(objService) {
        this.objService = objService;
    }
    ObjComponent.prototype.ngOnInit = function () {
        // this.main();
    };
    ObjComponent.prototype.ngAfterViewInit = function () {
        // this.animate();
        this.main();
    };
    ObjComponent.prototype.main = function () {
        var _this = this;
        var canvas = document.querySelector('#c');
        var renderer = new THREE.WebGLRenderer({});
        renderer.setSize(window.innerWidth, window.innerHeight);
        this.DivElement.nativeElement.appendChild(renderer.domElement);
        renderer.shadowMap.enabled = true;
        var fov = 45;
        var aspect = 2; // the canvas default
        var near = 0.1;
        var far = 1000;
        var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(0, 10, 20);
        var controls = new OrbitControls_1.OrbitControls(camera, renderer.domElement);
        controls.target.set(0, 5, 0);
        controls.update();
        var scene = new THREE.Scene();
        scene.background = new THREE.Color('black');
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
        mesh.receiveShadow = true;
        scene.add(mesh);
        // scene.aconst light = new THREE.DirectionalLight( 0xffffff, 1, 100 );
        var light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(400, 200, 0); //default; light shining from top
        light.castShadow = true; // default false
        scene.add(light);
        //Set up shadow properties for the light
        light.shadow.mapSize.width = 512; // default
        light.shadow.mapSize.height = 512; // default
        light.shadow.camera.near = 0.5; // default
        light.shadow.camera.far = 500; // default
        var helper = new THREE.DirectionalLightHelper(light);
        scene.add(helper);
        {
            var mtlLoader = new MTLLoader_js_1.MTLLoader();
            mtlLoader.load('https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.mtl', function (mtl) {
                mtl.preload();
                var objLoader = new OBJLoader_js_1.OBJLoader();
                objLoader.setMaterials(mtl);
                objLoader.load('https://threejsfundamentals.org/threejs/resources/models/windmill/windmill.obj', function (root) {
                    _this.object = root;
                    _this.object.traverse(function (o) {
                        if (o.type == 'Mesh') {
                            o.castShadow = true;
                            o.reciveShadow = true;
                        }
                    });
                    scene.add(_this.object);
                }, function (xhr) {
                    if (xhr.lengthComputable) {
                        var percentComplete = xhr.loaded / xhr.total * 100;
                        console.log('model ' + Math.round(percentComplete) + '% downloaded');
                        _this.objService.loadPercentage.next(percentComplete);
                    }
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
    ], ObjComponent.prototype, "DivElement");
    ObjComponent = __decorate([
        core_1.Component({
            selector: 'app-obj',
            templateUrl: './obj.component.html',
            styleUrls: ['./obj.component.css']
        })
    ], ObjComponent);
    return ObjComponent;
}());
exports.ObjComponent = ObjComponent;
