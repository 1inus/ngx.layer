System.register(["@angular/core"], function (exports_1, context_1) {
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
    var core_1, LayerConfig, NgLayerRef, NgLayer;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            LayerConfig = (function () {
                function LayerConfig() {
                }
                return LayerConfig;
            }());
            exports_1("LayerConfig", LayerConfig);
            NgLayerRef = (function () {
                function NgLayerRef() {
                }
                NgLayerRef.prototype.close = function () {
                    this.layerComponent.close();
                };
                ;
                NgLayerRef.prototype.showCloseBtn = function (show) {
                    this.layerComponent.config.closeAble = show;
                    return this;
                };
                NgLayerRef.prototype.setTitle = function (title) {
                    this.layerComponent.config.title = title;
                    return this;
                };
                NgLayerRef.prototype.setMessage = function (message) {
                    this.layerComponent.config.message = message;
                    return this;
                };
                NgLayerRef.prototype.setOnClose = function (callBack) {
                    this.layerComponent.onClose = callBack;
                    return this;
                };
                NgLayerRef.prototype.setOkText = function (ok) {
                    this.layerComponent.config.okTxt = ok;
                    return this;
                };
                NgLayerRef.prototype.setCancelText = function (cancel) {
                    this.layerComponent.config.cancelTxt = cancel;
                    return this;
                };
                NgLayerRef.prototype.ok = function (okCallback) {
                    this.layerComponent.onOk = okCallback;
                    return this;
                };
                NgLayerRef.prototype.cancel = function (cancelCallback) {
                    this.layerComponent.onCancel = cancelCallback;
                    return this;
                };
                return NgLayerRef;
            }());
            exports_1("NgLayerRef", NgLayerRef);
            NgLayer = (function () {
                function NgLayer(compiler, appRef) {
                    this.compiler = compiler;
                    this.appRef = appRef;
                    this.tempCache = {};
                }
                NgLayer.prototype.dialog = function (config) {
                    var layerId = "layer_" + new Date().getTime();
                    return this.createComponent_(config, layerId);
                };
                NgLayer.prototype.alert = function (config) {
                    return this.confirmOralert_(config, false);
                };
                NgLayer.prototype.confirm = function (config) {
                    return this.confirmOralert_(config, true);
                };
                NgLayer.prototype.tip = function (config) {
                    return this.tipOrLoading_(config, true);
                };
                NgLayer.prototype.loading = function (config) {
                    return this.tipOrLoading_(config, false);
                };
                NgLayer.prototype.tipOrLoading_ = function (config, isTip) {
                    if (!config.outSelector) {
                        config.outSelector = "boingOut";
                    }
                    config = this.default_(config);
                    var temp = '<div class="iconing_tip_body iconing_type_{{layerType}}">{{config.message}}</div>', layerId = "layer_" + new Date().getTime(), div = document.createElement("div"), claz = div.classList, modalStr;
                    claz.add("iconing_tip_backdrop");
                    claz.add(layerId);
                    if (!config.align || ["center", "bottom", "top"].indexOf(config.align) < 0) {
                        config.align = "top";
                    }
                    if (config.isModal) {
                        claz.add("iconing_loading_modal");
                        modalStr = ".iconing_loading_modal";
                    }
                    else {
                        modalStr = "";
                    }
                    claz.add("iconing_align_" + config.align);
                    document.body.appendChild(div);
                    var LayerWraper = (function () {
                        function LayerWraper(layerRef, self) {
                            this.layerRef = layerRef;
                            this.self = self;
                            this.layerType = isTip ? "tip" : "loading";
                            this.config = config;
                            layerRef.layerComponent = this;
                            this.layerRef = layerRef;
                        }
                        LayerWraper.prototype.ngAfterViewInit = function () {
                            var _this = this;
                            this.layerEle = this.self.element.nativeElement.querySelector(".iconing_tip_body");
                            if (this.config.inSelector) {
                                this.layerEle.classList.add(this.config.inSelector);
                            }
                            if (isTip)
                                setTimeout(function () { return _this.close(); }, config.tipDuration + this.calCss_());
                        };
                        LayerWraper.prototype.close = function () {
                            var _this = this;
                            if (this.config.outSelector) {
                                var classList = this.layerEle.classList;
                                classList.remove(this.config.inSelector);
                                classList.add(this.config.outSelector);
                                setTimeout(function () { _this.thizRef.destroy(); }, this.calCss_());
                            }
                            else {
                                this.thizRef.destroy();
                            }
                        };
                        LayerWraper.prototype.calCss_ = function () {
                            var anima = getComputedStyle(this.layerEle).animationDuration, trans = getComputedStyle(this.layerEle).animationDuration, n1 = parseFloat(anima), n2 = parseFloat(trans);
                            if (n1) {
                                var unit = anima.replace(n1.toString(), "").toLowerCase();
                                n1 = unit == "ms" ? n1 : unit == "s" ? n1 * 1000 : 0;
                            }
                            if (n2) {
                                var unit = anima.replace(n2.toString(), "").toLowerCase();
                                n2 = unit == "ms" ? n2 : unit == "s" ? n2 * 1000 : 0;
                            }
                            return Math.max(n1, n2) - 5;
                        };
                        return LayerWraper;
                    }());
                    LayerWraper = __decorate([
                        core_1.Component({
                            selector: ".iconing_tip_backdrop." + layerId + ".iconing_align_" + config.align + modalStr,
                            template: temp,
                            providers: [NgLayerRef]
                        }),
                        __metadata("design:paramtypes", [NgLayerRef, core_1.ViewContainerRef])
                    ], LayerWraper);
                    var DM = (function () {
                        function DM() {
                        }
                        return DM;
                    }());
                    DM = __decorate([
                        core_1.NgModule({ declarations: [LayerWraper] }),
                        __metadata("design:paramtypes", [])
                    ], DM);
                    var moduleWithComponentFactories = this.compiler.compileModuleAndAllComponentsSync(DM), factory = moduleWithComponentFactories.componentFactories[0], layerWraper = this.appRef.bootstrap(factory);
                    layerWraper.instance.thizRef = layerWraper;
                    return layerWraper.instance.layerRef;
                };
                NgLayer.prototype.confirmOralert_ = function (config, isConfirm) {
                    var layerId = "layer_" + new Date().getTime(), div = document.createElement("div");
                    div.classList.add("iconing_layer_backdrop");
                    div.classList.add(layerId);
                    document.body.appendChild(div);
                    var temp = '<div class="iconing_layer_body iconing_alert_body">' +
                        '<div class="iconing_content">{{config.message}}</div>' +
                        '<div class="iconing_alert_btn">CANCELBUTTON' +
                        '<button class="iconing_btn_ok" (click)="ok()">{{config.okText}}</button>' +
                        '</div>' +
                        '</div>';
                    temp = isConfirm ? temp.replace("CANCELBUTTON", '<button class="iconing_btn_cancel" (click)="cancel()">{{config.cancelText}}</button>') : temp.replace("CANCELBUTTON", "");
                    var layerWraperType = this.createComponentClass_(config, temp, layerId, this, false);
                    var DM = (function () {
                        function DM() {
                        }
                        return DM;
                    }());
                    DM = __decorate([
                        core_1.NgModule({ declarations: [layerWraperType] }),
                        __metadata("design:paramtypes", [])
                    ], DM);
                    var moduleWithComponentFactories = this.compiler.compileModuleAndAllComponentsSync(DM), factory = moduleWithComponentFactories.componentFactories[0], layerWraper = this.appRef.bootstrap(factory);
                    layerWraper.instance.thizRef = layerWraper;
                    document.body.appendChild(layerWraper.location.nativeElement);
                    return layerWraper.instance.layerRef;
                };
                NgLayer.prototype.createComponentClass_ = function (config, temp, layerId, layerFact, isDialog) {
                    config = this.default_(config);
                    var layerWraper = (function () {
                        function layerWraper(layerRef, compiler, self) {
                            this.layerRef = layerRef;
                            this.compiler = compiler;
                            this.self = self;
                            this.layerFactory = layerFact;
                            this.config = config;
                            layerRef.layerComponent = this;
                        }
                        layerWraper.prototype.ngAfterViewInit = function () {
                            var t = this, cfg = t.config;
                            if (cfg.inSelector && !isDialog) {
                                t.layerEle = t.self.element.nativeElement.querySelector(".iconing_layer_body");
                                t.layerEle.classList.add(cfg.inSelector);
                                t.backdropStyle.background = "rgba(95, 95, 95, 0.5)";
                                t.backdropStyle.transition = "background " + t.calCss_(t.layerEle) + "ms";
                            }
                        };
                        layerWraper.prototype.ngOnInit = function () {
                            var _this = this;
                            this.backdropStyle = this.self.element.nativeElement.style;
                            if (isDialog) {
                                var promise = this.layerFactory.modifySelector_(config.dialogComponent, "iconing_layer_content");
                                promise.then(function (a) {
                                    var TempModule = (function () {
                                        function TempModule() {
                                        }
                                        return TempModule;
                                    }());
                                    TempModule = __decorate([
                                        core_1.NgModule({ declarations: [config.dialogComponent] }),
                                        __metadata("design:paramtypes", [])
                                    ], TempModule);
                                    var t = _this;
                                    var mwcf = t.compiler.compileModuleAndAllComponentsSync(TempModule), injector = core_1.ReflectiveInjector.fromResolvedProviders([], t.layerView.injector);
                                    t.layerView.createComponent(mwcf.componentFactories[0], null, injector, []);
                                    t.layerEle = t.self.element.nativeElement.querySelector(".iconing_layer_body");
                                    t.layerEle.style.display = "inline-block";
                                    t.layerEle.classList.add(t.config.inSelector);
                                    t.backdropStyle.background = "rgba(95, 95, 95, 0.5)";
                                    t.backdropStyle.transition = "background " + t.calCss_(t.layerEle) + "ms";
                                });
                            }
                        };
                        layerWraper.prototype.close = function () {
                            var _this = this;
                            var cfg = this.config;
                            if (!this.onClose || this.onClose()) {
                                if (cfg.outSelector) {
                                    var classList = this.layerEle.classList;
                                    classList.remove(cfg.inSelector);
                                    classList.add(cfg.outSelector);
                                    var duration = this.calCss_(this.layerEle);
                                    this.backdropStyle.background = "rgba(138, 138, 138, 0.5)";
                                    this.backdropStyle.transition = "background " + duration + "ms";
                                    setTimeout(function () { _this.thizRef.destroy(); }, duration);
                                }
                                else {
                                    this.thizRef.destroy();
                                }
                            }
                        };
                        layerWraper.prototype.cancel = function () {
                            if (!this.onCancel || this.onCancel())
                                this.close();
                        };
                        layerWraper.prototype.onClose = function () { return true; };
                        layerWraper.prototype.onCancel = function () { return true; };
                        layerWraper.prototype.onOk = function () { return true; };
                        layerWraper.prototype.ok = function () {
                            if (!this.onOk || this.onOk())
                                this.close();
                        };
                        layerWraper.prototype.calCss_ = function (ele) {
                            var anima = getComputedStyle(ele).animationDuration, trans = getComputedStyle(ele).animationDuration, n1 = parseFloat(anima), n2 = parseFloat(trans);
                            if (n1) {
                                var unit = anima.replace(n1.toString(), "").toLowerCase();
                                n1 = unit == "ms" ? n1 : unit == "s" ? n1 * 1000 : 0;
                            }
                            if (n2) {
                                var unit = anima.replace(n2.toString(), "").toLowerCase();
                                n2 = unit == "ms" ? n2 : unit == "s" ? n2 * 1000 : 0;
                            }
                            return Math.max(n1, n2);
                        };
                        return layerWraper;
                    }());
                    __decorate([
                        core_1.ViewChild('iconing_layer_content', { read: core_1.ViewContainerRef }),
                        __metadata("design:type", core_1.ViewContainerRef)
                    ], layerWraper.prototype, "layerView", void 0);
                    layerWraper = __decorate([
                        core_1.Component({
                            selector: ".iconing_layer_backdrop." + layerId,
                            template: temp,
                            providers: [NgLayerRef]
                        }),
                        __metadata("design:paramtypes", [NgLayerRef, core_1.Compiler, core_1.ViewContainerRef])
                    ], layerWraper);
                    return layerWraper;
                };
                NgLayer.prototype.modifySelector_ = function (clazz, contentSelector) {
                    var _this = this;
                    if (!(Reflect && Reflect.getOwnMetadata)) {
                        throw 'reflect-metadata shim is required when using class decorators';
                    }
                    var mateData = Reflect.getOwnMetadata("annotations", new clazz().constructor);
                    var mateData = mateData.find(function (annotation) {
                        if (annotation.toString() === "@Component")
                            return annotation;
                    });
                    if (!mateData) {
                        throw 'component type required a @Component decorator';
                    }
                    mateData.selector = '.' + contentSelector;
                    if (mateData.templateUrl) {
                        if (!this.tempCache[mateData.templateUrl]) {
                            return new Promise(function (resolve, reject) {
                                var http = new XMLHttpRequest();
                                http.onreadystatechange = function (xhr) {
                                    if (http.readyState === XMLHttpRequest.DONE) {
                                        if (http.status === 200) {
                                            _this.tempCache[mateData.templateUrl] = http.responseText;
                                            mateData.template = http.responseText;
                                            delete mateData.templateUrl;
                                            resolve(core_1.Component(mateData)(clazz));
                                        }
                                        else {
                                            console.error("canot load template: " + mateData.templateUrl);
                                            reject();
                                        }
                                    }
                                };
                                http.open('GET', mateData.templateUrl, true);
                                http.send();
                            });
                        }
                        else {
                            return new Promise(function (resolve, reject) {
                                mateData.template = _this.tempCache[mateData.templateUrl];
                                delete mateData.templateUrl;
                                resolve(core_1.Component(mateData)(clazz));
                            });
                        }
                    }
                    else {
                        return new Promise(function (resolve, reject) {
                            resolve(core_1.Component(mateData)(clazz));
                        });
                    }
                };
                NgLayer.prototype.createComponent_ = function (config, layerId) {
                    var temp = '<div class="iconing_layer_body" style="display:none;">' +
                        '<div class="iconing_layer_header">' +
                        '<div class="iconing_layer_title">{{config.title}}</div>' +
                        '<button (click)="close();" class="iconing_layer_close_btn {{config.closeAble?\'iconing_layer_close_able\':\'\'}}"></button>' +
                        '</div>' +
                        '<div #iconing_layer_content></div>' +
                        '</div>';
                    var layerWraperType = this.createComponentClass_(config, temp, layerId, this, true);
                    var DM = (function () {
                        function DM() {
                        }
                        return DM;
                    }());
                    DM = __decorate([
                        core_1.NgModule({ declarations: [layerWraperType] }),
                        __metadata("design:paramtypes", [])
                    ], DM);
                    var moduleWithComponentFactories = this.compiler.compileModuleAndAllComponentsSync(DM), factory = moduleWithComponentFactories.componentFactories[0], layerWraper = null;
                    if (!parent) {
                        layerWraper = this.appRef.bootstrap(factory);
                        document.body.appendChild(layerWraper.location.nativeElement);
                    }
                    else {
                        var injector = core_1.ReflectiveInjector.fromResolvedProviders([], config.parent.injector);
                        layerWraper = config.parent.createComponent(factory, null, injector, []);
                        layerWraper.instance.thizRef = layerWraper;
                        document.body.appendChild(layerWraper.location.nativeElement);
                    }
                    return layerWraper.instance.layerRef;
                };
                NgLayer.prototype.default_ = function (config) {
                    var dfs = {
                        title: "",
                        align: "center",
                        closeAble: true,
                        cancelText: "cancel",
                        okText: "ok",
                        outSelector: "fadeOutDown",
                        inSelector: "dropDown",
                        parent: null,
                        dialogComponent: null,
                        isModal: false,
                        tipDuration: 2500,
                        message: ""
                    };
                    var keys = Object.keys(dfs), key;
                    for (var i in keys) {
                        key = keys[i];
                        if (config[key] == undefined) {
                            config[key] = dfs[key];
                        }
                    }
                    return config;
                };
                return NgLayer;
            }());
            NgLayer = __decorate([
                core_1.Injectable(),
                __metadata("design:paramtypes", [core_1.Compiler, core_1.ApplicationRef])
            ], NgLayer);
            exports_1("NgLayer", NgLayer);
        }
    };
});
