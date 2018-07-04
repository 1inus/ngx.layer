"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("zone.js");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var Forms_1 = require("@angular/Forms");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var ngx_layer_1 = require("../../ngx.layer");
var AppComponent = (function () {
    function AppComponent(ly) {
        this.ly = ly;
        this.config = {
            inSelector: "fallDown",
            outSelector: "rollOut",
            title: "angular2 layer",
            align: "center",
            parent: this,
            isModal: true,
            dialogComponent: DialogComponent,
            closeAble: false
        };
    }
    AppComponent.prototype.dialog = function () {
        this.ly.dialog(this.config);
    };
    AppComponent.prototype.alert = function () {
        this.ly.alert(this.config);
    };
    AppComponent.prototype.confirm = function () {
        this.ly.confirm(this.config);
    };
    AppComponent.prototype.loading = function () {
        var tip = this.ly.loading(this.config);
        setTimeout(function () { tip.close(); }, 12000);
    };
    AppComponent.prototype.tip = function () {
        this.ly.tip(this.config);
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: '.app',
            template: "\n<table>\n\t<tr>\n\t\t<td>closeAble</td>\n\t\t<td><input type=\"checkbox\" [(ngModel)]=\"config.closeAble\"></td>\n\t\t<td rowspan=\"6\" width=\"300\" align=\"center\">\n\t\t\t<button (click)=\"dialog();\">dialog</button>\n\t\t\t<button (click)=\"confirm();\">confirm</button>\n\t\t\t<button (click)=\"alert();\">alert</button>\n\t\t\t<button (click)=\"loading();\">loading</button>\n\t\t\t<button (click)=\"tip();\">tip</button>\n\t\t</td>\n\t</tr>\n\t<tr>\n\t\t<td>isModal</td>\n\t\t<td><input type=\"checkbox\" [(ngModel)]=\"config.isModal\"/></td>\n\t</tr>\n\t<tr>\n\t\t<td>inSelector</td>\n\t\t<td>\n\t\t\t<select name=\"inselector\" [(ngModel)]=\"config.inSelector\">\n\t\t\t\t<option value=\"rollIn\">rollIn</option>\n\t\t\t\t<option value=\"fallDown\">fallDown</option>\n\t\t\t\t<option value=\"fadeInDown\">fadeInDown</option>\n\t\t\t\t<option value=\"runIn\">runIn</option>\n\t\t\t\t<option value=\"bounceIn\">bounceIn</option>\n\t\t\t\t<option value=\"splatIn\">splatIn</option>\n\t\t\t\t<option value=\"dropDown\">dropDown</option>\n\t\t\t\t<option value=\"vanishIn\">vanishIn</option>\n\t\t\t\t<option value=\"spaceIn\">spaceIn</option>\n\t\t\t\t<option value=\"jelly\">jelly</option>\n\t\t\t\t<option value=\"fadeInUp\">fadeInUp</option>\n\t\t\t</select>\n\t\t</td>\n\t</tr>\n\t<tr>\n\t\t<td>outSelector</td>\n\t\t<td>\n\t\t\t<select name=\"outselector\" [(ngModel)]=\"config.outSelector\">\n\t\t\t\t<option value=\"rollOut\">rollOut</option>\n\t\t\t\t<option value=\"fadeOutDown\">fadeOutDown</option>\n\t\t\t\t<option value=\"vanishOut\">vanishOut</option>\n\t\t\t\t<option value=\"spaceOut\">spaceOut</option>\n\t\t\t\t<option value=\"boingOut\">boingOut</option>\n\t\t\t\t<option value=\"fadeOutDown\">fadeOutDown</option>\n\t\t\t</select>\n\t\t</td>\n\t</tr>\n\t<tr>\n\t\t<td>title</td>\n\t\t<td><input type=\"text\" name=\"title\" [(ngModel)]=\"config.title\"></td>\n\t</tr>\n\t<tr>\n\t\t<td>align</td>\n\t\t<td>\n\t\t\t<select name=\"align\" [(ngModel)]=\"config.align\">\n\t\t\t\t<option value=\"center\">center</option>\n\t\t\t\t<option value=\"top\">top</option>\n\t\t\t\t<option value=\"bottom\">bottom</option>\n\t\t\t</select>\n\t\t</td>\n\t</tr>\n</table>\n\t",
            providers: [ngx_layer_1.NgxLayer]
        }),
        __metadata("design:paramtypes", [ngx_layer_1.NgxLayer])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
var DialogComponent = (function () {
    function DialogComponent(ly, l) {
        this.ly = ly;
        this.l = l;
        this.data = "angular2 layer";
    }
    DialogComponent.prototype.setTitle = function () { this.ly.setTitle("Ngx Layer Title"); };
    DialogComponent.prototype.close = function () { this.ly.close(); };
    DialogComponent.prototype.showCloseBtn = function () { this.ly.showCloseBtn(true); };
    ;
    DialogComponent.prototype.showData = function () { alert(this.data); };
    ;
    DialogComponent = __decorate([
        core_1.Component({
            selector: '.dialog',
            template: "\n<div class=\"dialog_body\">\n\t<div class=\"dialog_logo\">\n\t\t<img src=\"image/logo.png\"/>\n\t\t<h1>Ngx  Layer</h1>\n\t\t<p>Angular2 \u5F39\u5C42\u63D2\u4EF6\uFF0C\u7075\u6D3B\uFF0C\u7B80\u5355\uFF0C\u4E30\u5BCC\uFF0C\u4F18\u7F8E</p>\n\t</div>\n\t<button (click)=\"setTitle();\">setTitle</button>\n\t<button (click)=\"showCloseBtn();\" style=\"margin:0 10px;\">showCloseBtn</button>\n\t<button (click)=\"showData();\">showData</button>\n</div>"
        }),
        __metadata("design:paramtypes", [ngx_layer_1.NgxLayerRef, ngx_layer_1.NgxLayer])
    ], DialogComponent);
    return DialogComponent;
}());
exports.DialogComponent = DialogComponent;
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, Forms_1.FormsModule],
            entryComponents: [ngx_layer_1.NgxLayerComponent, DialogComponent],
            declarations: [AppComponent, ngx_layer_1.NgxLayerComponent, DialogComponent],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule, [{ defaultEncapsulation: core_1.ViewEncapsulation.None }]);
