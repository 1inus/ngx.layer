/**
 * @license Apache License Version 2.0, January 2004 http://www.apache.org/licenses/
 * @author cnliangwei@foxmail.com
 */

import {
	ApplicationRef,
	Compiler,
	Component,
	ComponentFactoryResolver,
	ComponentRef,
	Injectable,
	NgModule,
	ViewChild,
	ReflectiveInjector,
	ViewContainerRef,
	TemplateRef
} from "@angular/core";
import "reflect-metadata";

export class NgLayerRef {
	layer:any;
	
	/**
	 * destory the layer.
	 */
	close(){
		this.layer.close();
	};
	
	/**
	 * show close button or not
	 */
	showCloseBtn(show:boolean):NgLayerRef{
		this.layer.config.closeAble=show;
		return this;
	}
	
	/**
	 * update dialog title. for dialog only
	 *
	 * @return {NgLayerRef}
	 */
	setTitle(title:string):NgLayerRef{
		this.layer.config.title=title;
		return this;
	}
	
	/**
	 * update message of layer
	 *
	 * e.g.
	 *
	 * ```typescript
	 * let tip = this.ly.tip("保存成功", 1000, "top", "warn");
	 * setTimeout(()=>{
	 * 	lyRef.setMessage("successfully saved").setTipType("success");
	 * 	lyRef.close();
	 * }, 2000);
	 *
	 * ```
	 * @return {NgLayerRef}
	 */
	setMessage(message:string):NgLayerRef{
		this.layer.config.message=message;
		return this;
	}
	
	/**
	 * if the callBack return ture, the layer will be closed
	 *
	 * e.g.
	 *
	 * ```typescript
	 * let lyRef = this.ly.confirm("are you sure?", "yes", "no");
	 * lyRef.setOnClose(()=>{
	 * 	if(...) return true;
	 * });
	 * ```
	 * @return {NgLayerRef}
	 */
	setOnClose(callBack:()=>boolean):NgLayerRef{
		this.layer.onClose = callBack;
		return this;
	}
	
	/**
	 * update "ok" button text, for alert layer or confirm layer
	 *
	 * e.g.
	 *
	 * ```typescript
	 *let lyRef = this.ly.confirm("are you sure?", "yes", "no");
	 *lyRef.setOkText("sure");
	 * ```
	 * @return {NgLayerRef}
	 */
	setOkText(ok:string):NgLayerRef{
		this.layer.config.okTxt=ok;
		return this;
	}
	
	/**
	 * update "cancel" button text, for confirm layer only
	 *
	 * e.g.
	 *
	 * ```typescript
	 *let lyRef = this.ly.confirm("are you sure?", "yes", "no");
	 *lyRef.setCancelText("not sure");
	 * ```
	 * @return {NgLayerRef}
	 */
	setCancelText(cancel:string):NgLayerRef{
		this.layer.config.cancelTxt=cancel;
		return this;
	}
	
	
	/**
	 * message type of tip layer
	 *
	 * e.g.
	 *
	 * ```typescript
	 *let lyRef = this.ly.tip("saving...", "yes", "no");
	 *lyRef.setTipType("error");
	 * ```
	 * @return {NgLayerRef}
	 */
	/*setTipType(tipType:string){
	 this.layer.config.tipType=tipType;
	 return this;
	 }*/
	
	/**
	 * okCallback called on 'ok' button click. for alert layer or confirm layer
	 *
	 * e.g.
	 *
	 * ```typescript
	 *let lyRef = this.ly.confirm("are you sure?", "yes", "no");
	 *lyRef.ok(()=>{
	 * 	...do something...
	 * });
	 * ```
	 * @return {NgLayerRef}
	 */
	ok(okCallback:()=>boolean):NgLayerRef{
		this.layer.onOk=okCallback;
		return this;
	}
	
	/**
	 * cancelCallback called on "cancel" button click. for confirm layer only
	 *
	 * e.g.
	 *
	 * ```typescript
	 *let lyRef = this.ly.confirm("are you sure?", "yes", "no");
	 *lyRef.ok(()=>{
	 * 	...do something...
	 * });
	 * ```
	 *
	 * @return {NgLayerRef}
	 */
	cancel(cancelCallback:()=>boolean):NgLayerRef{
		this.layer.onCancel=cancelCallback;
		return this;
	}
}

@Injectable()
export class NgLayer {
	container:ViewContainerRef=null;
	
	constructor(
		private resolver:ComponentFactoryResolver,
		private app:ApplicationRef){
	}
	
	/**
	 * open a dialog window
	 * @return {NgLayerRef}
	 */
	public dialog(config:LayerConfig):NgLayerRef{
		return this.initLayerWraper(config, "dialog");
	}
	
	/**
	 * open a alert window
	 *
	 * @return {NgLayerRef}
	 */
	public alert(config:LayerConfig):NgLayerRef{
		return this.initLayerWraper(config, "alert");
	}
	
	/**
	 * open a confirm window
	 *
	 * @return {NgLayerRef}
	 */
	public confirm(config:LayerConfig):NgLayerRef{
		return this.initLayerWraper(config, "confirm");
	}
	
	/**
	 * open a message layer
	 *
	 * @return {NgLayerRef}
	 */
	public tip(config:LayerConfig):NgLayerRef{
		return this.initLayerWraper(config, "tip");
	}
	
	/**
	 * open a loading layer
	 *
	 * @return {NgLayerRef}
	 */
	public loading(config:LayerConfig):NgLayerRef{
		return this.initLayerWraper(config, "loading");
	}
	
	/**
	 * create layer wraper
	 * @param config
	 * @param type
	 * @returns {NgLayerRef}
	 */
	private initLayerWraper(config:LayerConfig, type:string):NgLayerRef{
		config = this.default_(config);
		
		if(!this.container){
			this.createContainer();
		}
		
		let parent:ComponentRef<any> = null;
		if(config.parent){
			this.app.components.some((c:any, i:any) => {
				if(c.instance==config.parent){
					parent = c;
					return true;
				}
			});
		}
		
		let confac = this.resolver.resolveComponentFactory(NgLayerComponent);
		let wraper = this.container.createComponent(confac, null, parent?parent.injector:null);
		let instance = wraper.instance;
		
		instance.layerType = type;
		instance.config = config;
		instance.thizRef = wraper;
		
		return instance.lyRef;
	}
	
	/*创建窗体容器*/
	private createContainer(){
		let confac = this.resolver.resolveComponentFactory(NgLayerComponent);
		
		let div = document.createElement("div");
		div.classList.add("iconing_layer_backdrop");
		document.body.appendChild(div);
		
		let wraper = this.app.bootstrap(confac);
		let instance = wraper.instance;
		
		div.className = "layer_placeholder";
		div.style.display = "none";
		
		this.container = instance.vcRef;
	}
	
	/**
	 * default setting
	 * @param config
	 * @returns {LayerConfig}
	 * @private
	 */
	private default_(config:LayerConfig):LayerConfig {
		let dfs:LayerConfig = {
			title:"",
			align:"top",
			closeAble:true,
			cancelText:"cancel",
			okText:"ok",
			outSelector:"fadeOutDown",
			inSelector:"dropDown",
			parent:null,
			dialogComponent:null,
			isModal:false,
			tipDuration:2500,
			message:"angular2 layer"
		};
		let keys = Object.keys(dfs), key:string;
		
		for(let i in keys){
			key = keys[i];
			if(config[key]==undefined){
				config[key] = dfs[key];
			}
		}
		
		return config;
	}
}


/**
 * layer wraper component
 */
@Component({
	selector: '.iconing_layer_backdrop',
	template:
			'<div *ngIf="!isTip" class="iconing_layer_body layer_{{layerType}}">'+
				'<div class="iconing_layer_header">'+
					'<div class="iconing_layer_title">{{config.title}}</div>'+
					'<button (click)="close();" class="iconing_layer_close_btn {{config.closeAble?\'iconing_layer_close_able\':\'\'}}">X</button>'+
				'</div>'+
				'<div class="iconing_layer_content" >'+
					/*alert or confirm*/
					'<div *ngIf="isAlert" class="iconing_alert_body">'+
						'<div class="iconing_content">{{config.message}}</div>'+
						'<div class="iconing_alert_btn">'+
							'<button *ngIf="layerType==\'confirm\'" class="iconing_btn_cancel" (click)="cancel()">{{config.cancelText}}</button>'+
							'<button class="iconing_btn_ok" (click)="ok()">{{config.okText}}</button>'+
						'</div>'+
					'</div>' +
		
					/*dialog*/
					'<div #iconing_layer_content style="display:none;"></div>'+
				'</div>'+
			'</div>'+
		
			/*tip or loading*/
			'<div *ngIf="isTip" class="iconing_tip_body iconing_type_{{layerType}}">{{config.message}}</div>',
	
	providers:[NgLayerRef]
})
export class NgLayerComponent{
	thizRef:ComponentRef<any>;
	bodyRef:ComponentRef<any>;
	vcRef:ViewContainerRef;
	layerEle:any;
	bodyEle:any;
	backdropStyle:any;
	config:any = {};
	layerType:string;
	lyRef:NgLayerRef;
	
	public isDialog:boolean = false;
	public isAlert:boolean = false;
	public isTip:boolean = false;
	
	@ViewChild('iconing_layer_content', {read: ViewContainerRef})
	layerView:ViewContainerRef;
	
	/**
	 *
	 */
	constructor(vcRef:ViewContainerRef, lyRef:NgLayerRef, private resolver:ComponentFactoryResolver) {
		this.lyRef = lyRef;
		this.lyRef.layer = this;
		this.vcRef = vcRef;
	}
	
	/**
	 *
	 */
	ngAfterViewInit() {
		this.layerEle = this.vcRef.element.nativeElement;
		this.bodyEle = this.layerEle.querySelector(".iconing_layer_body,.iconing_tip_body");
		
		let classList = this.bodyEle.classList;
		
		if(this.isTip){
			classList.add("iconing_body_align_"+this.config.align);
			
			let bdCls = this.layerEle.classList;
			bdCls.add("iconing_tip_backdrop");
			bdCls.remove("iconing_layer_backdrop");
			
			if(this.config.isModal){
				bdCls.add("iconing_loading_modal");
			} else {
				bdCls.add("iconing_backdrop_align_"+this.config.align)
			}
			
		}
		classList.add("iconing_layer_backdrop_"+this.layerType);
		
		if(this.config.inSelector){
			classList.add(this.config.inSelector);
		}
		
		if(this.config.isModal){
			classList.add("iconing_layer_modal");
		}
		
		this.layerEle.style.background = "rgba(95, 95, 95, 0.5)";
		this.layerEle.transition = "background "+this.calCss_()+"ms";
		
		
		//auto close tip
		if(this.layerType=="tip"){
			setTimeout(()=>{
				this.close();
			}, this.config.tipDuration+this.calCss_());
		}
		
		/*初始化弹窗组件*/
		if(this.layerType=="dialog"){
			let dialogComponent = this.config.dialogComponent;
			
			if(!dialogComponent) return;
			
			let confac = this.resolver.resolveComponentFactory(dialogComponent);
			this.bodyRef = this.vcRef.createComponent(confac, null, this.vcRef.injector);
			this.layerView.insert(this.bodyRef.hostView);
			
			if(this.config.data && this.config.data instanceof Object){
				Object.assign(this.bodyRef.instance, this.config.data);
			}
		}
	}
	
	/**
	 * init content Component
	 */
	ngOnInit() {
		if(this.layerType=="dialog"){
			this.isDialog=true;
		} else if(this.layerType=="alert" || this.layerType=="confirm"){
			this.isAlert=true;
		} else {
			this.isTip = true;
		}
	}
	
	public onOk(){
		return true;
	}
	
	public onClose(){
		return true;
	}
	
	public onCancel(){
		return true;
	}
	
	/**
	 * alert or confirm layer
	 */
	ok(){
		if(!this.onOk || this.onOk()) this.close();
	}
	
	/**
	 * alert or confirm layer
	 */
	cancel(){
		if(!this.onCancel || this.onCancel()) this.close();
	}
	
	/** */
	close(){
		if(!this.onClose || this.onClose()) {
			if(this.config.outSelector){
				let classList = this.bodyEle.classList;
				classList.remove(this.config.inSelector);
				classList.add(this.config.outSelector);
				
				/**
				 * set a delay for layer closeing so the animation has time to play
				 */
				setTimeout(()=>{this.thizRef.destroy();}, this.calCss_());
			} else {
				this.thizRef.destroy();
			}
		}
	}
	
	private calCss_(){
		let anima = getComputedStyle(this.bodyEle).animationDuration,
			trans = getComputedStyle(this.bodyEle).animationDuration,
			n1 = parseFloat(anima),
			n2 = parseFloat(trans);
		
		if(n1){
			let unit = anima.replace(n1.toString(), "").toLowerCase();
			n1 = unit=="ms"?n1:unit=="s"?n1*1000:0;
		}
		
		if(n2){
			let unit = anima.replace(n2.toString(), "").toLowerCase();
			n2 = unit=="ms"?n2:unit=="s"?n2*1000:0;
		}
		
		return Math.max(n1,n2)-5;
	}
}

export class LayerConfig {
	[key:string]: any;
	/**
	 * the new component will be a child of parent, if parent is null,
	 * new component will be a root component of application.
	 * valid only for dialog leyer
	 */
	parent?:any;
	
	/**
	 * if you want to use some custom directive in your dynamic component,
	 * don't forget to import
	 */
	imports?:Array<any>;
	
	/**
	 * datas pass to dialog component
	 */
	data?:any;
	
	/**
	 * dialog title
	 * valid only for dialog leyer
	 */
	title?:string;
	
	/**
	 * show close button or not.
	 * valid only for dialog leyer
	 */
	closeAble?:boolean;
	
	/**
	 * message type of tip layer.
	 * valid for alert, confirm, tip, loading leyer
	 */
	message?:string;
	
	/**
	 * text of "ok" button.
	 * valid for alert or confirm leyer
	 */
	okText?:string;
	
	/**
	 * text of "cancel" button
	 * valid only for confirm leyer
	 */
	cancelText?:string;
	
	/**
	 * position of the layer("top", "center", "bottom"), default to "top"
	 * valid only for loading or tip leyer
	 */
	align?:string;
	
	/**
	 * modal window or not
	 * valid only for loading leyer
	 */
	isModal?:boolean;
	
	/**
	 * layer will be automatic closed after duration(ms)
	 * valid only for tip leyer
	 */
	tipDuration?:number;
	
	/**
	 * defined a popup animation by a class selector
	 * valid for all type leyer.
	 *
	 * existing options:
	 * rollIn, fallDown, fadeInDown, runIn, bounceIn,
	 * splatIn, dropDown, vanishIn, spaceIn, jelly, fadeInUp,
	 */
	inSelector?:string;
	
	/**
	 * defined a closeing animation by a class selector
	 * valid for all type leyer.
	 *
	 * existing options:
	 * rollOut, fadeOutDown, bounceOut, vanishOut, spaceOut,
	 * boingOut, fadeOutDown
	 */
	outSelector?:string;
}