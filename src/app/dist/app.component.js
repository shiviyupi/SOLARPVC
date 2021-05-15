"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var AppComponent = /** @class */ (function () {
    function AppComponent(objService) {
        this.objService = objService;
        this.title = 'objproject';
        this.isload = false;
        this.loadObject = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadPercentageSub = this.objService.loadPercentage.subscribe(function (val) {
            _this.loadPercentage = val;
            console.log(_this.loadPercentage);
        });
    };
    AppComponent.prototype["new"] = function () {
        var _this = this;
        this.isload = true;
        setTimeout(function () {
            _this.isload = false;
            _this.loadObject = true;
        }, 2000);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
