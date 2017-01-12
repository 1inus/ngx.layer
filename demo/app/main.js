System.register(["@angular/core", "@angular/platform-browser", "@angular/platform-browser-dynamic", "../../ng2-layer.js"], function (exports_1, context_1) {
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
    var __moduleName = context_1 && context_1.id;
    var core_1, platform_browser_1, platform_browser_dynamic_1, ng2_layer_js_1, DataShare, AppComponent, AppModule;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (platform_browser_1_1) {
                platform_browser_1 = platform_browser_1_1;
            },
            function (platform_browser_dynamic_1_1) {
                platform_browser_dynamic_1 = platform_browser_dynamic_1_1;
            },
            function (ng2_layer_js_1_1) {
                ng2_layer_js_1 = ng2_layer_js_1_1;
            }
        ],
        execute: function () {
            core_1.enableProdMode();
            DataShare = (function () {
                function DataShare() {
                }
                return DataShare;
            }());
            AppComponent = (function () {
                function AppComponent(ly, vcRef, data) {
                    this.ly = ly;
                    this.vcRef = vcRef;
                    this.data = data;
                    data.somedata = "水牛叔叔";
                }
                AppComponent.prototype.dialog = function () {
                    var DialogComponet = (function () {
                        function DialogComponet(ly, data) {
                            this.ly = ly;
                            this.data = data;
                        }
                        DialogComponet.prototype.setTitle = function () { this.ly.setTitle("Angular2 Layer Title"); };
                        DialogComponet.prototype.close = function () { this.ly.close(); };
                        DialogComponet.prototype.showCloseBtn = function () { this.ly.showCloseBtn(true); };
                        ;
                        DialogComponet.prototype.showData = function () { alert(this.name); };
                        ;
                        return DialogComponet;
                    }());
                    DialogComponet = __decorate([
                        core_1.Component({ templateUrl: "temp/dialog.html" }),
                        __metadata("design:paramtypes", [ng2_layer_js_1.NgLayerRef, DataShare])
                    ], DialogComponet);
                    var dialog = this.ly.dialog({
                        parent: this.vcRef,
                        dialogComponent: DialogComponet,
                        closeAble: false,
                        data: { name: "Angular2 Layer" }
                    });
                };
                AppComponent.prototype.alert = function () {
                    var alert = this.ly.alert({
                        message: "所有工作已经完成",
                    });
                    alert.ok(function () { return true; });
                };
                AppComponent.prototype.confirm = function () {
                    var confirm = this.ly.confirm({
                        message: "删除后无法恢复,确定删除吗?"
                    });
                    confirm
                        .ok(function () { return true; })
                        .cancel(function () { return true; });
                };
                AppComponent.prototype.loading = function () {
                    var loading = this.ly.loading({ message: "loading...", isModal: true });
                    setTimeout(function () { return loading.setMessage("再等一会..."); }, 2000);
                    setTimeout(function () { return loading.close(); }, 4000);
                };
                AppComponent.prototype.tip = function () {
                    var tip = this.ly.tip({
                        message: "saving...",
                        align: "top"
                    });
                    setTimeout(function () {
                        tip.setMessage("successfully saved");
                    }, 1000);
                };
                return AppComponent;
            }());
            AppComponent = __decorate([
                core_1.Component({
                    selector: '.app',
                    templateUrl: 'temp/app.html',
                    providers: [ng2_layer_js_1.NgLayer, DataShare]
                }),
                __metadata("design:paramtypes", [ng2_layer_js_1.NgLayer, core_1.ViewContainerRef, DataShare])
            ], AppComponent);
            exports_1("AppComponent", AppComponent);
            AppModule = (function () {
                function AppModule() {
                }
                return AppModule;
            }());
            AppModule = __decorate([
                core_1.NgModule({
                    imports: [platform_browser_1.BrowserModule],
                    declarations: [AppComponent],
                    bootstrap: [AppComponent],
                    providers: [DataShare]
                }),
                __metadata("design:paramtypes", [])
            ], AppModule);
            platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(AppModule);
        }
    };
});
