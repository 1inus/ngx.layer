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
var core_1 = require("@angular/core");
require("reflect-metadata");
var NgLayerRef = (function () {
    function NgLayerRef() {
    }
    NgLayerRef.prototype.close = function () {
        this.layer.close();
    };
    ;
    NgLayerRef.prototype.showCloseBtn = function (show) {
        this.layer.config.closeAble = show;
        return this;
    };
    NgLayerRef.prototype.setTitle = function (title) {
        this.layer.config.title = title;
        return this;
    };
    NgLayerRef.prototype.setMessage = function (message) {
        this.layer.config.message = message;
        return this;
    };
    NgLayerRef.prototype.setOnClose = function (callBack) {
        this.layer.onClose = callBack;
        return this;
    };
    NgLayerRef.prototype.setOkText = function (ok) {
        this.layer.config.okTxt = ok;
        return this;
    };
    NgLayerRef.prototype.setCancelText = function (cancel) {
        this.layer.config.cancelTxt = cancel;
        return this;
    };
    NgLayerRef.prototype.ok = function (okCallback) {
        this.layer.onOk = okCallback;
        return this;
    };
    NgLayerRef.prototype.cancel = function (cancelCallback) {
        this.layer.onCancel = cancelCallback;
        return this;
    };
    return NgLayerRef;
}());
exports.NgLayerRef = NgLayerRef;
var NgLayer = (function () {
    function NgLayer(resolver, app) {
        this.resolver = resolver;
        this.app = app;
        this.container = null;
    }
    NgLayer.prototype.dialog = function (config) {
        return this.initLayerWraper(config, "dialog");
    };
    NgLayer.prototype.alert = function (config) {
        return this.initLayerWraper(config, "alert");
    };
    NgLayer.prototype.confirm = function (config) {
        return this.initLayerWraper(config, "confirm");
    };
    NgLayer.prototype.tip = function (config) {
        return this.initLayerWraper(config, "tip");
    };
    NgLayer.prototype.loading = function (config) {
        return this.initLayerWraper(config, "loading");
    };
    NgLayer.prototype.initLayerWraper = function (config, type) {
        config = this.default_(config);
        if (!this.container) {
            this.createContainer();
        }
        var parent = null;
        if (config.parent) {
            this.app.components.some(function (c, i) {
                if (c.instance == config.parent) {
                    parent = c;
                    return true;
                }
            });
        }
        var confac = this.resolver.resolveComponentFactory(NgLayerComponent);
        var wraper = this.container.createComponent(confac, null, parent ? parent.injector : null);
        var instance = wraper.instance;
        instance.layerType = type;
        instance.config = config;
        instance.thizRef = wraper;
        return instance.lyRef;
    };
    NgLayer.prototype.createContainer = function () {
        var confac = this.resolver.resolveComponentFactory(NgLayerComponent);
        var div = document.createElement("div");
        div.classList.add("iconing_layer_backdrop");
        document.body.appendChild(div);
        var wraper = this.app.bootstrap(confac);
        var instance = wraper.instance;
        div.className = "layer_placeholder";
        div.style.display = "none";
        this.container = instance.vcRef;
    };
    NgLayer.prototype.default_ = function (config) {
        var dfs = {
            title: "",
            align: "top",
            closeAble: true,
            cancelText: "cancel",
            okText: "ok",
            outSelector: "fadeOutDown",
            inSelector: "dropDown",
            parent: null,
            dialogComponent: null,
            isModal: false,
            tipDuration: 2500,
            message: "angular2 layer"
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
    __metadata("design:paramtypes", [core_1.ComponentFactoryResolver,
        core_1.ApplicationRef])
], NgLayer);
exports.NgLayer = NgLayer;
var NgLayerComponent = (function () {
    function NgLayerComponent(vcRef, lyRef, resolver) {
        this.resolver = resolver;
        this.config = {};
        this.isDialog = false;
        this.isAlert = false;
        this.isTip = false;
        this.lyRef = lyRef;
        this.lyRef.layer = this;
        this.vcRef = vcRef;
    }
    NgLayerComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.layerEle = this.vcRef.element.nativeElement;
        this.bodyEle = this.layerEle.querySelector(".iconing_layer_body,.iconing_tip_body");
        var classList = this.bodyEle.classList;
        if (this.isTip) {
            classList.add("iconing_body_align_" + this.config.align);
            var bdCls = this.layerEle.classList;
            bdCls.add("iconing_tip_backdrop");
            bdCls.remove("iconing_layer_backdrop");
            if (this.config.isModal) {
                bdCls.add("iconing_loading_modal");
            }
            else {
                bdCls.add("iconing_backdrop_align_" + this.config.align);
            }
        }
        classList.add("iconing_layer_backdrop_" + this.layerType);
        if (this.config.inSelector) {
            classList.add(this.config.inSelector);
        }
        if (this.config.isModal) {
            classList.add("iconing_layer_modal");
        }
        this.layerEle.style.background = "rgba(95, 95, 95, 0.5)";
        this.layerEle.transition = "background " + this.calCss_() + "ms";
        if (this.layerType == "tip") {
            setTimeout(function () {
                _this.close();
            }, this.config.tipDuration + this.calCss_());
        }
        if (this.layerType == "dialog") {
            var dialogComponent = this.config.dialogComponent;
            if (!dialogComponent)
                return;
            var confac = this.resolver.resolveComponentFactory(dialogComponent);
            this.bodyRef = this.vcRef.createComponent(confac, null, this.vcRef.injector);
            this.layerView.insert(this.bodyRef.hostView);
            if (this.config.data && this.config.data instanceof Object) {
                Object.assign(this.bodyRef.instance, this.config.data);
            }
        }
    };
    NgLayerComponent.prototype.ngOnInit = function () {
        if (this.layerType == "dialog") {
            this.isDialog = true;
        }
        else if (this.layerType == "alert" || this.layerType == "confirm") {
            this.isAlert = true;
        }
        else {
            this.isTip = true;
        }
    };
    NgLayerComponent.prototype.onOk = function () {
        return true;
    };
    NgLayerComponent.prototype.onClose = function () {
        return true;
    };
    NgLayerComponent.prototype.onCancel = function () {
        return true;
    };
    NgLayerComponent.prototype.ok = function () {
        if (!this.onOk || this.onOk())
            this.close();
    };
    NgLayerComponent.prototype.cancel = function () {
        if (!this.onCancel || this.onCancel())
            this.close();
    };
    NgLayerComponent.prototype.close = function () {
        var _this = this;
        if (!this.onClose || this.onClose()) {
            if (this.config.outSelector) {
                var classList = this.bodyEle.classList;
                classList.remove(this.config.inSelector);
                classList.add(this.config.outSelector);
                setTimeout(function () { _this.thizRef.destroy(); }, this.calCss_());
            }
            else {
                this.thizRef.destroy();
            }
        }
    };
    NgLayerComponent.prototype.calCss_ = function () {
        var anima = getComputedStyle(this.bodyEle).animationDuration, trans = getComputedStyle(this.bodyEle).animationDuration, n1 = parseFloat(anima), n2 = parseFloat(trans);
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
    return NgLayerComponent;
}());
__decorate([
    core_1.ViewChild('iconing_layer_content', { read: core_1.ViewContainerRef }),
    __metadata("design:type", core_1.ViewContainerRef)
], NgLayerComponent.prototype, "layerView", void 0);
NgLayerComponent = __decorate([
    core_1.Component({
        selector: '.iconing_layer_backdrop',
        template: '<div *ngIf="!isTip" class="iconing_layer_body layer_{{layerType}}">' +
            '<div class="iconing_layer_header">' +
            '<div class="iconing_layer_title">{{config.title}}</div>' +
            '<button (click)="close();" class="iconing_layer_close_btn {{config.closeAble?\'iconing_layer_close_able\':\'\'}}">X</button>' +
            '</div>' +
            '<div class="iconing_layer_content" >' +
            '<div *ngIf="isAlert" class="iconing_alert_body">' +
            '<div class="iconing_content">{{config.message}}</div>' +
            '<div class="iconing_alert_btn">' +
            '<button *ngIf="layerType==\'confirm\'" class="iconing_btn_cancel" (click)="cancel()">{{config.cancelText}}</button>' +
            '<button class="iconing_btn_ok" (click)="ok()">{{config.okText}}</button>' +
            '</div>' +
            '</div>' +
            '<div #iconing_layer_content style="display:none;"></div>' +
            '</div>' +
            '</div>' +
            '<div *ngIf="isTip" class="iconing_tip_body iconing_type_{{layerType}}">{{config.message}}</div>',
        providers: [NgLayerRef]
    }),
    __metadata("design:paramtypes", [core_1.ViewContainerRef, NgLayerRef, core_1.ComponentFactoryResolver])
], NgLayerComponent);
exports.NgLayerComponent = NgLayerComponent;
var LayerConfig = (function () {
    function LayerConfig() {
    }
    return LayerConfig;
}());
exports.LayerConfig = LayerConfig;
