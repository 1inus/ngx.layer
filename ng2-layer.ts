/**
 * @license Apache License Version 2.0, January 2004 http://www.apache.org/licenses/
 * @author cnliangwei@foxmail.com
 */

import {
	Compiler,
	Component,
	NgModule,
	Injectable,
	ViewContainerRef,
	ApplicationRef,
	ReflectiveInjector,
	ModuleWithComponentFactories,
	ComponentRef,
	ViewChild,
	ComponentFactory
} from '@angular/core';

export class LayerConfig {
	
	/**
	 * the new component will be a child of parent, if parent is null,
	 * new component will be a root component of application.
	 * valid only for dialog leyer
	 */
	parent:ViewContainerRef;
	
	/**
	 * a class for creating new component
	 * valid only for dialog leyer
	 */
	dialogComponent:any;
	
	/**
	 * dialog title
	 * valid only for dialog leyer
	 */
	title:string;
	
	/**
	 * show close button or not.
	 * valid only for dialog leyer
	 */
	closeAble:boolean;

	/**
	 * message type of tip layer.
	 * valid for alert, confirm, tip, loading leyer
	 */
	message:string;
	
	/**
	 * text of "ok" button.
	 * valid for alert or confirm leyer
	 */
	okText:string;
	
	/**
	 * text of "cancel" button
	 * valid only for confirm leyer
	 */
	cancelText:string;
	
	/**
	 * position of the layer("top", "center", "bottom"), default to "top"
	 * valid only for loading or tip leyer
	 */
	align:string;
	
	/**
	 * modal window or not
	 * valid only for loading leyer
	 */
	isModal:boolean;

	/**
	 * layer will be automatic closed after duration(ms)
	 * valid only for tip leyer
	 */
	tipDuration:number;

	/**
	 * defined a popup animation by a class selector
	 * valid for all type leyer.
	 * 
	 * existing options:
	 * rollIn, fallDown, fadeInDown, runIn, bounceIn, 
	 * splatIn, dropDown, vanishIn, spaceIn, jelly, fadeInUp,
	 */
	inSelector:string;
	
	/**
	 * defined a closeing animation by a class selector
	 * valid for all type leyer.
	 * 
	 * existing options:
	 * rollOut, fadeOutDown, bounceOut, vanishOut, spaceOut,
	 * boingOut, fadeOutDown
	 */
	outSelector:string;
}

export class NgLayerRef {
	layerComponent:any;
	
	/**
	 * destory the layer.
	 */
	close(){
		this.layerComponent.close();
	};
	
	/**
	 * show close button or not
	 */
	showCloseBtn(show:boolean):NgLayerRef{
		this.layerComponent.config.closeAble=show;
		return this;
	}
	
	/**
	 * update dialog title. for dialog only
	 * 
	 * @return {NgLayerRef}
	 */
	setTitle(title:string):NgLayerRef{
		this.layerComponent.config.title=title;
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
		this.layerComponent.config.message=message;
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
		this.layerComponent.onClose = callBack;
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
		this.layerComponent.config.okTxt=ok;
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
		this.layerComponent.config.cancelTxt=cancel;
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
		this.layerComponent.config.tipType=tipType;
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
		this.layerComponent.onOk=okCallback;
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
		this.layerComponent.onCancel=cancelCallback;
		return this;
	}
}

@Injectable()
export class NgLayer {
	tempCache:any={};
	
	constructor(private compiler: Compiler, private appRef: ApplicationRef) {}
	
	/**
	 * open a dialog window
	 * @return {NgLayerRef}
	 */
	dialog(config:LayerConfig):NgLayerRef {
		let layerId = "layer_"+new Date().getTime()
		return this.createComponent_(config, layerId);
	}
	
	/**
	 * open a alert window
	 * 
	 * @return {NgLayerRef}
	 */
	alert(config:LayerConfig):NgLayerRef{
		return this.confirmOralert_(config, false);
	}
	
	/**
	 * open a confirm window
	 * 
	 * @return {NgLayerRef}
	 */
	confirm(config:LayerConfig):NgLayerRef{
		return this.confirmOralert_(config, true);
	}
	
	/**
	 * open a message layer
	 * 
	 * @return {NgLayerRef}
	 */
	tip(config:LayerConfig):NgLayerRef{
		return this.tipOrLoading_(config, true);
	}
	
	/**
	 * open a loading layer
	 * 
	 * @return {NgLayerRef}
	 */
	loading(config:LayerConfig):NgLayerRef{
		return this.tipOrLoading_(config, false);
	}
	
	/**
	 * 
	 */
	tipOrLoading_(config:LayerConfig, isTip:boolean){
	if(!config.outSelector){
			config.outSelector = "boingOut";
		}

		config = this.default_(config);

		let temp = '<div class="iconing_tip_body iconing_type_{{layerType}}">{{config.message}}</div>',
			layerId = "layer_"+new Date().getTime(),
			div = document.createElement("div"),
			claz = div.classList,
			modalStr;
		
		claz.add("iconing_tip_backdrop");
		claz.add(layerId);

		if(!config.align || ["center", "bottom", "top"].indexOf(config.align)<0){
			config.align = "top";
		}

		if(config.isModal){
			claz.add("iconing_loading_modal");
			modalStr = ".iconing_loading_modal";
		} else {
			modalStr = "";
		}
		claz.add("iconing_align_"+config.align);
		document.body.appendChild(div);
		
		@Component({
			selector:".iconing_tip_backdrop."+layerId+".iconing_align_"+config.align+modalStr,
			template:temp,
			providers:[NgLayerRef]
		})
		class LayerWraper {
			thizRef:ComponentRef<any>;
			layerEle:any;
			layerType:string = isTip?"tip":"loading";
			config:LayerConfig = config;
			
			constructor(private layerRef:NgLayerRef, private self:ViewContainerRef) {
				layerRef.layerComponent = this;
				this.layerRef = layerRef;
			}
			
			ngAfterViewInit(){
				this.layerEle = this.self.element.nativeElement.querySelector(".iconing_tip_body");
				if(this.config.inSelector){
					this.layerEle.classList.add(this.config.inSelector);
				}
				if(isTip) setTimeout(()=>this.close(), config.tipDuration+this.calCss_());
			}
			
			/** */
			close(){
				if(this.config.outSelector){
					let classList = this.layerEle.classList;
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
			
			calCss_(){
				let anima = getComputedStyle(this.layerEle).animationDuration,
					trans = getComputedStyle(this.layerEle).animationDuration,
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
		
		@NgModule({declarations: [LayerWraper]})
		class DM {}
		
		/** create layer */
		let moduleWithComponentFactories  = this.compiler.compileModuleAndAllComponentsSync(DM),
			factory = moduleWithComponentFactories.componentFactories[0],
			layerWraper = this.appRef.bootstrap(factory);
			
			layerWraper.instance.thizRef = layerWraper;
		
		return layerWraper.instance.layerRef;
	}
	
	confirmOralert_(config:LayerConfig, isConfirm:boolean){
		let layerId = "layer_"+new Date().getTime(),
			div = document.createElement("div");
		
		div.classList.add("iconing_layer_backdrop");
		div.classList.add(layerId);
		document.body.appendChild(div);
		
		let temp:string = '<div class="iconing_layer_body iconing_alert_body">'+
				'<div class="iconing_content">{{config.message}}</div>'+
				'<div class="iconing_alert_btn">CANCELBUTTON'+
					'<button class="iconing_btn_ok" (click)="ok()">{{config.okText}}</button>'+
				'</div>'+
			'</div>';

		temp = isConfirm?temp.replace("CANCELBUTTON",'<button class="iconing_btn_cancel" (click)="cancel()">{{config.cancelText}}</button>'):temp.replace("CANCELBUTTON","");

		let layerWraperType = this.createComponentClass_(config, temp, layerId, this, false);
		
		@NgModule({declarations: [layerWraperType]})
		class DM {}
		
		/** create layer */
		let moduleWithComponentFactories  = this.compiler.compileModuleAndAllComponentsSync(DM),
			factory = moduleWithComponentFactories.componentFactories[0],
			layerWraper = this.appRef.bootstrap(factory);
			
			layerWraper.instance.thizRef = layerWraper;
			document.body.appendChild(layerWraper.location.nativeElement);
		
		return layerWraper.instance.layerRef;
	}
	
	/**
	 * for dialog alert or confirm
	 */
	createComponentClass_(
		config:LayerConfig,
		temp:string,
		layerId:string,
		layerFact:NgLayer,
		isDialog:boolean
	){
		config = this.default_(config);
		@Component({
			selector:".iconing_layer_backdrop."+layerId,
			template:temp,
			providers:[NgLayerRef]
		})
		class layerWraper {
			thizRef:ComponentRef<any>;
			layerEle:any;
			backdropStyle:any;
			layerFactory:NgLayer = layerFact;

			config:LayerConfig=config;
			
			@ViewChild('iconing_layer_content', {read: ViewContainerRef})
			layerView:ViewContainerRef;
			
			
			/**
			 * 
			 */
			constructor(private layerRef:NgLayerRef, private compiler: Compiler, private self:ViewContainerRef) {
				layerRef.layerComponent = this;
			}
			
			/**
			 * add enter state selector to layer body
			 */
			ngAfterViewInit(){
				let t=this,
					cfg = t.config;
				
				if(cfg.inSelector && !isDialog){
					t.layerEle = t.self.element.nativeElement.querySelector(".iconing_layer_body");
					t.layerEle.classList.add(cfg.inSelector);
					t.backdropStyle.background = "rgba(95, 95, 95, 0.5)";
					t.backdropStyle.transition = "background "+t.calCss_(t.layerEle)+"ms";
				}
			}
			
			/**
			 * init content Component
			 */
			ngOnInit(){
				this.backdropStyle = this.self.element.nativeElement.style;
				
				if(isDialog){
					let promise = this.layerFactory.modifySelector_(config.dialogComponent, "iconing_layer_content");

					promise.then((a)=>{						
						@NgModule({declarations: [config.dialogComponent]})
						class TempModule {}
						
						let t = this;

						/** create layer */
						let mwcf  = t.compiler.compileModuleAndAllComponentsSync(TempModule),
							injector = ReflectiveInjector.fromResolvedProviders([], t.layerView.injector);
							
						t.layerView.createComponent(mwcf.componentFactories[0], null, injector, []);
						
						t.layerEle = t.self.element.nativeElement.querySelector(".iconing_layer_body");
						t.layerEle.style.display = "inline-block";
						t.layerEle.classList.add(t.config.inSelector);
						t.backdropStyle.background = "rgba(95, 95, 95, 0.5)";
						t.backdropStyle.transition = "background "+t.calCss_(t.layerEle)+"ms";
					});
				}
			}
			
			/** */
			close(){
				let cfg = this.config;
				if(!this.onClose || this.onClose()) {
					if(cfg.outSelector){
						let classList = this.layerEle.classList;
						classList.remove(cfg.inSelector);
						classList.add(cfg.outSelector);
						let duration = this.calCss_(this.layerEle);
						this.backdropStyle.background = "rgba(138, 138, 138, 0.5)";
						this.backdropStyle.transition = "background "+duration+"ms";
						
						/**
						 * set a delay for layer closeing so the animation has time to play
						 */
						setTimeout(()=>{this.thizRef.destroy();}, duration);
					} else {
						this.thizRef.destroy();
					}
				}
			}	
			
			cancel(){
				if(!this.onCancel || this.onCancel()) this.close();
			}
			
			onClose():boolean{return true}

			onCancel():boolean{return true}
			
			onOk():boolean{return true}

			/**
			 * alert or confirm layer
			 */
			ok(){
				if(!this.onOk || this.onOk()) this.close();
			}
			
			/**
			 * 
			 */
			calCss_(ele:any){
				let anima = getComputedStyle(ele).animationDuration,
					trans = getComputedStyle(ele).animationDuration,
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
				
				return Math.max(n1,n2);
			}
		}
		
		return layerWraper; 
	}
	
	/**
	 * preload template and change selector, for dialog only
	 */
	private modifySelector_<T>(clazz:T, contentSelector:string) {
		if(!(Reflect && Reflect.getOwnMetadata)){
			throw 'reflect-metadata shim is required when using class decorators';
		}
		let mateData = Reflect.getOwnMetadata("annotations", new clazz().constructor);
		let mateData = mateData.find(annotation => {
			if(annotation.toString()==="@Component") return annotation;
		})
		
		if(!mateData){
			throw 'component type required a @Component decorator';
		}
		mateData.selector = '.'+contentSelector;

		/*pre load template*/
		if(mateData.templateUrl){
			if(!this.tempCache[mateData.templateUrl]){
				return new Promise((resolve, reject)=>{
					let http = new XMLHttpRequest();
					http.onreadystatechange = (xhr)=>{
						if(http.readyState === XMLHttpRequest.DONE) {
							if(http.status === 200){
								this.tempCache[mateData.templateUrl] = http.responseText;
								mateData.template = http.responseText;
								delete mateData.templateUrl;
								
								resolve(Component(mateData)(clazz));
							} else {
								console.error("canot load template: "+mateData.templateUrl);
								reject();
							}
						}
					}
					http.open('GET', mateData.templateUrl, true);
					http.send();
				});
			} else {
				return new Promise((resolve, reject)=>{
					mateData.template = this.tempCache[mateData.templateUrl];
					delete mateData.templateUrl;
					resolve(Component(mateData)(clazz));
				});
			}
		} else {
			return new Promise((resolve, reject)=>{
				resolve(Component(mateData)(clazz));
			});
		}
	}
	
	/**
	 * for dialog only
	 */
	private createComponent_(config:LayerConfig, layerId:string) {
		let temp = '<div class="iconing_layer_body" style="display:none;">'+
				'<div class="iconing_layer_header">'+
					'<div class="iconing_layer_title">{{config.title}}</div>'+
					'<button (click)="close();" class="iconing_layer_close_btn {{config.closeAble?\'iconing_layer_close_able\':\'\'}}"></button>'+
				'</div>'+
				'<div #iconing_layer_content></div>'+
			'</div>'
		
		let layerWraperType = this.createComponentClass_(config, temp, layerId, this, true);
		
		@NgModule({declarations: [layerWraperType]})
		class DM {}
		
		/**
		 * create layer
		 */
		let moduleWithComponentFactories = this.compiler.compileModuleAndAllComponentsSync(DM),
			factory = moduleWithComponentFactories.componentFactories[0],
			layerWraper = null;
			
		if(!parent){
			layerWraper = this.appRef.bootstrap(factory);
			document.body.appendChild(layerWraper.location.nativeElement);
		} else {
			const injector = ReflectiveInjector.fromResolvedProviders([], config.parent.injector);
			layerWraper = config.parent.createComponent(factory, null, injector, []);
			layerWraper.instance.thizRef = layerWraper;
			
			document.body.appendChild(layerWraper.location.nativeElement);
		}
		
		return layerWraper.instance.layerRef;
	}

	/**
	 * default config
	 */
	default_(config:LayerConfig):LayerConfig {
		let dfs:LayerConfig = {
			title:"",
			align:"center",
			closeAble:true,
			cancelText:"cancel",
			okText:"ok",
			outSelector:"fadeOutDown",
			inSelector:"dropDown",
			parent:null,
			dialogComponent:null,
			isModal:false,
			tipDuration:2500,
			message:""
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