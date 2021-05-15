"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var obj_component_1 = require("./obj/obj.component");
var threed_component_1 = require("./threed/threed.component");
var gltf_component_1 = require("./gltf/gltf.component");
var solar_component_1 = require("./solar/solar.component");
var heli_component_1 = require("./heli/heli.component");
var osm_component_1 = require("./osm/osm.component");
//import {OsmComponent } from './osm/osm.component';
var routes = [
    {
        path: 'objfile',
        component: obj_component_1.ObjComponent
    },
    {
        path: 'osm',
        component: osm_component_1.OsmComponent
    },
    {
        path: 'gltf',
        component: gltf_component_1.GltfComponent
    },
    {
        path: 'threed',
        component: threed_component_1.ThreedComponent
    },
    {
        path: 'solarpanel',
        component: solar_component_1.SolarComponent
    },
    {
        path: 'heli',
        component: heli_component_1.HeliComponent
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
