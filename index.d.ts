declare module 'ngx.layer' {
	import { ApplicationRef, ComponentFactoryResolver, ComponentRef, ViewContainerRef } from "@angular/core";
	import "reflect-metadata";
	export class NgxLayerRef {
	    layer: any;
	    close(): void;
	    showCloseBtn(show: boolean): NgxLayerRef;
	    setTitle(title: string): NgxLayerRef;
	    setMessage(message: string): NgxLayerRef;
	    setOnClose(callBack: () => boolean): NgxLayerRef;
	    setOkText(ok: string): NgxLayerRef;
	    setCancelText(cancel: string): NgxLayerRef;
	    ok(okCallback: () => boolean): NgxLayerRef;
	    cancel(cancelCallback: () => boolean): NgxLayerRef;
	}
	export class NgxLayer {
	    private resolver;
	    private app;
	    container: ViewContainerRef;
	    constructor(resolver: ComponentFactoryResolver, app: ApplicationRef);
	    dialog(config: LayerConfig): NgxLayerRef;
	    alert(config: LayerConfig): NgxLayerRef;
	    confirm(config: LayerConfig): NgxLayerRef;
	    tip(config: LayerConfig): NgxLayerRef;
	    loading(config: LayerConfig): NgxLayerRef;
	    private initLayerWraper;
	    private createContainer;
	    private default_;
	}
	export class NgxLayerComponent {
	    private resolver;
	    thizRef: ComponentRef<any>;
	    bodyRef: ComponentRef<any>;
	    vcRef: ViewContainerRef;
	    layerEle: any;
	    bodyEle: any;
	    config: any;
	    layerType: string;
	    lyRef: NgxLayerRef;
	    isDialog: boolean;
	    isAlert: boolean;
	    isTip: boolean;
	    layerView: ViewContainerRef;
	    layerHeader: ViewContainerRef;
	    constructor(vcRef: ViewContainerRef, lyRef: NgxLayerRef, resolver: ComponentFactoryResolver);
	    ngOnInit(): void;
	    ngAfterViewInit(): void;
	    onOk(): boolean;
	    onClose(): boolean;
	    onCancel(): boolean;
	    ok(): void;
	    cancel(): void;
	    close(): void;
	    private calCss_;
	}
	export class LayerConfig {
	    [key: string]: any;
	    parent?: any;
	    imports?: Array<any>;
	    data?: any;
	    title?: string;
	    closeAble?: boolean;
	    message?: string;
	    okText?: string;
	    cancelText?: string;
	    align?: string;
	    isModal?: boolean;
	    tipDuration?: number;
	    inSelector?: string;
	    outSelector?: string;
	}

}
