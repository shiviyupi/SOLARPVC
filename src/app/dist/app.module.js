"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/common/http");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var obj_component_1 = require("./obj/obj.component");
var animations_1 = require("@angular/platform-browser/animations");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var spinner_component_1 = require("./spinner/spinner.component");
var threed_component_1 = require("./threed/threed.component");
var gltf_component_1 = require("./gltf/gltf.component");
var threemakegeomtery_component_1 = require("./threemakegeomtery/threemakegeomtery.component");
var solar_component_1 = require("./solar/solar.component");
var heli_component_1 = require("./heli/heli.component");
var osm_component_1 = require("./osm/osm.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                obj_component_1.ObjComponent,
                spinner_component_1.SpinnerComponent,
                threed_component_1.ThreedComponent,
                gltf_component_1.GltfComponent,
                threemakegeomtery_component_1.ThreemakegeomteryComponent,
                solar_component_1.SolarComponent,
                heli_component_1.HeliComponent,
                osm_component_1.OsmComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                animations_1.BrowserAnimationsModule,
                progress_spinner_1.MatProgressSpinnerModule,
                http_1.HttpClientModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
