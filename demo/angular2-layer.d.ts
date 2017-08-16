import { ApplicationRef, ComponentFactoryResolver, ComponentRef, ViewContainerRef } from "@angular/core";
import "reflect-metadata";
export declare class NgLayerRef {
    layer: any;
    close(): void;
    showCloseBtn(show: boolean): NgLayerRef;
    setTitle(title: string): NgLayerRef;
    setMessage(message: string): NgLayerRef;
    setOnClose(callBack: () => boolean): NgLayerRef;
    setOkText(ok: string): NgLayerRef;
    setCancelText(cancel: string): NgLayerRef;
    ok(okCallback: () => boolean): NgLayerRef;
    cancel(cancelCallback: () => boolean): NgLayerRef;
}
export declare class NgLayer {
    private resolver;
    private app;
    container: ViewContainerRef;
    constructor(resolver: ComponentFactoryResolver, app: ApplicationRef);
    dialog(config: LayerConfig): NgLayerRef;
    alert(config: LayerConfig): NgLayerRef;
    confirm(config: LayerConfig): NgLayerRef;
    tip(config: LayerConfig): NgLayerRef;
    loading(config: LayerConfig): NgLayerRef;
    private initLayerWraper(config, type);
    private createContainer();
    private default_(config);
}
export declare class NgLayerComponent {
    private resolver;
    thizRef: ComponentRef<any>;
    bodyRef: ComponentRef<any>;
    vcRef: ViewContainerRef;
    layerEle: any;
    bodyEle: any;
    config: any;
    layerType: string;
    lyRef: NgLayerRef;
    isDialog: boolean;
    isAlert: boolean;
    isTip: boolean;
    layerView: ViewContainerRef;
    constructor(vcRef: ViewContainerRef, lyRef: NgLayerRef, resolver: ComponentFactoryResolver);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    onOk(): boolean;
    onClose(): boolean;
    onCancel(): boolean;
    ok(): void;
    cancel(): void;
    close(): void;
    private calCss_();
}
export declare class LayerConfig {
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
