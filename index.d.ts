declare module 'angular2-layer/ng2-layer' {
	import { ApplicationRef, Compiler, ComponentFactoryResolver, ViewContainerRef } from "@angular/core";
	export class LayerConfig {
	    parent?: ViewContainerRef;
	    dialogComponent?: any;
	    declarations?: Array<any>;
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
	export class NgLayerRef {
	    layerComponent: any;
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
	export class NgLayer {
	    private compiler;
	    private appRef;
	    private res;
	    private tempCache;
	    constructor(compiler: Compiler, appRef: ApplicationRef, res: ComponentFactoryResolver);
	    dialog(config: LayerConfig): NgLayerRef;
	    alert(config: LayerConfig): NgLayerRef;
	    confirm(config: LayerConfig): NgLayerRef;
	    tip(config: LayerConfig): NgLayerRef;
	    loading(config: LayerConfig): NgLayerRef;
	    private tipOrLoading_(config, isTip);
	    private confirmOralert_(config, isConfirm);
	    private createComponentClass_(config, temp, layerId, layerFact, isDialog);
	    private modifySelector_<T>(clazz, contentSelector);
	    private createComponent_(config, layerId);
	    private default_(config);
	}

}
