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
	ViewChild
} from '@angular/core'

export class LayerState {
	inSelector:string;
	outSelector:string;
}

export class LayerRef {
	dialogComponent:any;
	
	close(callBack){
		this.dialogComponent.close();
	};
	
	setTitle(title:string){
		this.dialogComponent.title=title;
		return this;
	}
	
	/**
	 * 
	 */
	setOnClose(callBack){
		this.dialogComponent.onClose = callBack;
		return this;
	}
	
	/**
	 * alert dialog or confirm dialog
	 */
	setOkText(ok:string){
		this.dialogComponent.okTxt=ok;
		return this;
	}
	
	/**
	 * confirm dialog only
	 */
	setCancelText(cancel:string){
		this.dialogComponent.cancelTxt=cancel;
		return this;
	}
	
	/**
	 * alert dialog or confirm dialog
	 */
	ok(ok){
		this.dialogComponent.onOk=ok;
		return this;
	}
	
	/**
	 * confirm dialog only
	 */
	cancel(cancel){
		this.dialogComponent.onCancel=cancel;
		return this;
	}
}

@Injectable()
export class NgLayer {
	/**
	 * 弹窗构造方法
	 */
	constructor(private compiler: Compiler, private appRef: ApplicationRef) {
		console.log();
	}
	
	/**
	 * 打开弹窗
	 */
	dialog(parent:ViewContainerRef, componetType, title:string, layerState:LayerState) {
		let dialogId = "dialog_"+new Date().getTime()
		return this.createComponent_(parent, dialogId, componetType, title, layerState);
	}
	
	/**
	 * 
	 */
	alert(msg:string, okString:string, layerState:LayerState){
		let temp = '<div class="iconing_ui_dialog_body iconing_ui_alert_body">'+
				'<div class="iconing_ui_content">{{msg}}</div>'+
				'<div class="iconing_ui_alert_btn">'+
					'<button class="iconing_ui_btn_cancel" (click)="ok()">{{okTxt}}</button>'+
				'</div>'+
			'</div>';
		return this.confirmOralert_(temp, msg, okString, null, layerState);
	}
	
	/**
	 * 
	 */
	confirm(msg:string, confirm:string, cancel:string, layerState:LayerState){
		let temp = '<div class="iconing_ui_dialog_body iconing_ui_alert_body">'+
				'<div class="iconing_ui_content">{{msg}}</div>'+
				'<div class="iconing_ui_alert_btn">'+
					'<button class="iconing_ui_btn_cancel" (click)="cancel()">{{cancelTxt}}</button>'+
					'<button class="iconing_ui_btn_certain" (click)="ok()">{{okTxt}}</button>'+
				'</div>'+
			'</div>';
		
		return this.confirmOralert_(temp, msg, confirm, cancel, layerState);
	}
	
	/**
	 * 弹出提示信息
	 */
	msg(msg:string, duration:number, align:string, msgType:string, layerState:LayerState){
		if(!duration) duration = 2500;
		if(!msgType || ["warn","error","msg"].indexOf(msgType)<0) msgType="msg";
		
		return this.msgOrLoading_(msg, duration, align, msgType, layerState, true);
	}
	
	/**
	 * loading
	 */
	loading(msg:string, align:string, layerState:LayerState){
		return this.msgOrLoading_(msg, null, align, null, layerState);
	}
	
	/**
	 * 
	 */
	msgOrLoading_(msg:string, duration:number, align:string, msgType:string, layerState:LayerState, isMsg:boolean){
		let temp = '<div class="iconing_ui_msg_body iconing_ui_type_{{dialogType}} iconing_ui_type_{{msgType}}">{{msg}}</div>';
		
		let dialogId = "dialog_"+new Date().getTime(),
			div = document.createElement("div");
		
		div.classList.add("iconing_ui_msg_backdrop");
		div.classList.add(dialogId);
		div.classList.add("iconing_ui_align_"+align);
		document.body.appendChild(div);
		
		@Component({
			selector:".iconing_ui_msg_backdrop."+dialogId+".iconing_ui_align_"+align,
			template:temp,
			providers:[LayerRef]
		})
		class DialogWraper {
			thizRef:ComponentRef;
			dialogRef:LayerRef;
			msg:string = msg;
			dialogEle:element;
			msgType:string = msgType;
			dialogType:string = isMsg?"msg":"loading";
			
			
			trans:LayerState = layerState?layerState:{inSelector:"fallDown", outSelector:"vanishOut"};
			
			constructor(private dialogRef:LayerRef, private self:ViewContainerRef) {
				dialogRef.dialogComponent = this;
				this.dialogRef = dialogRef;
			}
			
			ngAfterViewInit(){
				this.dialogEle = this.self.element.nativeElement.querySelector(".iconing_ui_msg_body");
				if(this.trans && this.trans.inSelector){
					this.dialogEle.classList.add(this.trans.inSelector);
				}
				if(isMsg) setTimeout(()=>this.close(), duration+this.calCss_());
			}
			
			/** */
			close(){
				if(this.trans && this.trans.outSelector){
					let classList = this.dialogEle.classList;
					classList.remove(this.trans.inSelector);
					classList.add(this.trans.outSelector);
					
					/**
					 * set a delay for dialog closeing so the animation has time to play
					 */
					setTimeout(()=>{this.thizRef.destroy();}, this.calCss_());
				} else {
					this.thizRef.destroy();
				}
			}	
			
			calCss_(){
				let anima = getComputedStyle(this.dialogEle).animationDuration,
					trans = getComputedStyle(this.dialogEle).animationDuration,
					n1 = parseFloat(anima),
					n2 = parseFloat(trans);
				
				if(n1){
					let unit = anima.replace(n1, "").toLowerCase();
					n1 = unit=="ms"?n1:unit=="s"?n1*1000:0;
				}
				
				if(n2){
					let unit = anima.replace(n2, "").toLowerCase();
					n2 = unit=="ms"?n2:unit=="s"?n2*1000:0;
				}
				
				return Math.max(n1,n2);
			}
		}
		
		@NgModule({declarations: [DialogWraper]})
		class DM {}
		
		/** create dialog */
		let moduleWithComponentFactories  = this.compiler.compileModuleAndAllComponentsSync(DM),
			factory = moduleWithComponentFactories.componentFactories[0],
			dialogWraper = this.appRef.bootstrap(factory);
			
			dialogWraper.instance.thizRef = dialogWraper;
		
		return dialogWraper.instance.dialogRef;
	}
	
	confirmOralert_(temp:string, msg:string, okString:string, cancelString:string, layerState:LayerState){
		let dialogId = "dialog_"+new Date().getTime(),
			div = document.createElement("div");
		
		div.classList.add("iconing_ui_dialog_backdrop");
		div.classList.add(dialogId);
		document.body.appendChild(div);
		
		let dialogWraperType = this.createComponentClass_(temp, dialogId, cancelString, okString, msg, layerState, null);
		
		@NgModule({declarations: [dialogWraperType]})
		class DM {}
		
		/** create dialog */
		let moduleWithComponentFactories  = this.compiler.compileModuleAndAllComponentsSync(DM),
			factory = moduleWithComponentFactories.componentFactories[0],
			dialogWraper = this.appRef.bootstrap(factory);
			
			dialogWraper.instance.thizRef = dialogWraper;
			document.body.appendChild(dialogWraper.location.nativeElement);
		
		return dialogWraper.instance.dialogRef;
	}
	
	/**
	 * 
	 */
	createComponentClass_(
		temp:string,
		dialogId:string,
		cancelString:string,
		okString:string,
		msg:string,
		layerState:LayerState,
		userComponent,
		title:string
	){
		@Component({
			selector:".iconing_ui_dialog_backdrop."+dialogId,
			template:temp,
			providers:[LayerRef]
		})
		class DialogWraper {
			thizRef:ComponentRef;
			dialogRef:LayerRef;
			cancelTxt:string = cancelString;
			okTxt:string = okString;			
			msg:string = msg;
			dialogEle:element;
			backdropStyle:style,
			title:string = title;
			
			trans:LayerState = layerState?layerState:{
				inSelector:"fallDown",
				outSelector:"vanishOut"
			};
			
			@ViewChild('iconing_ui_dialog_content', {read: ViewContainerRef})
			dialogView:ViewContainerRef;
			
			
			/**
			 * 
			 */
			constructor(private dialogRef:LayerRef, private compiler: Compiler, private self:ViewContainerRef) {
				dialogRef.dialogComponent = this;
				this.dialogRef = dialogRef;
			}
			
			/**
			 * add enter state selector to layer body
			 */
			ngAfterViewInit(){
				this.dialogEle = this.self.element.nativeElement.querySelector(".iconing_ui_dialog_body");
				
				if(this.trans && this.trans.inSelector){
					this.dialogEle.classList.add(this.trans.inSelector);
					
					this.backdropStyle.background = "rgba(95, 95, 95, 0.5)";
					this.backdropStyle.transition = "background "+this.calCss_(this.dialogEle)+"ms";
				}
				
			}
			
			/**
			 * 
			 */
			ngOnInit(){
				this.backdropStyle = this.self.element.nativeElement.style;
				
				if(userComponent){
					@NgModule({declarations: [userComponent]})
					class TempModule {}
					
					let moduleWithComponentFactories  = this.compiler.compileModuleAndAllComponentsAsync(TempModule);
					
					moduleWithComponentFactories.then((mvcf: ModuleWithComponentFactories <any>)=>{
						let injector = ReflectiveInjector.fromResolvedProviders([], this.dialogView.injector);
						this.dialogView.createComponent(mvcf.componentFactories[0], null, injector, []);
					});
				}
			}
			
			
			/** */
			close(){
				if(!this.onClose || this.onClose()) {
					if(this.trans && this.trans.outSelector){
						let classList = this.dialogEle.classList;
						classList.remove(this.trans.inSelector);
						classList.add(this.trans.outSelector);
						let duration = this.calCss_(this.dialogEle);
						this.backdropStyle.background = "rgba(95, 95, 95, 0)";
						this.backdropStyle.transition = "background "+duration+"ms";
						
						/**
						 * set a delay for dialog closeing so the animation has time to play
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
			
			/**
			 * alert or confirm dialog
			 */
			ok(){
				if(!this.onOk || this.onOk()) this.close();
			}
			
			/**
			 * 
			 */
			calCss_(ele){
				let anima = getComputedStyle(ele).animationDuration,
					trans = getComputedStyle(ele).animationDuration,
					n1 = parseFloat(anima),
					n2 = parseFloat(trans);
				
				if(n1){
					let unit = anima.replace(n1, "").toLowerCase();
					n1 = unit=="ms"?n1:unit=="s"?n1*1000:0;
				}
				
				if(n2){
					let unit = anima.replace(n2, "").toLowerCase();
					n2 = unit=="ms"?n2:unit=="s"?n2*1000:0;
				}
				
				return Math.max(n1,n2);
			}
		}
		
		return DialogWraper; 
	}
	
	/**
	 * 定制class
	 */
	private modifySelector_(clazz, contentSelector:string) {
		if(!(Reflect && Reflect.getOwnMetadata)){
			throw 'reflect-metadata shim is required when using class decorators';
		}
		let mateData = Reflect.getOwnMetadata("annotations", new clazz().constructor);
		let parentMateData = mateData.find(annotation => {
			if(annotation.toString()==="@Component") return annotation;
		})
		
		if(!parentMateData){
			throw 'component type required a @Component decorator';
		}
		
		let newMataData = {};
		for(let i of Object.keys(parentMateData)){
			newMataData[i]=parentMateData[i];
		}
		newMataData.selector = '.'+contentSelector;
		
		let clazzTarget = Component(newMataData)(clazz);
		
		return clazzTarget;
	}
	
	/**
	 * 生成组件
	 */
	private createComponent_(parent:ViewContainerRef, dialogId:string, userComponent:class, title, layerState:LayerState) {
		userComponent = this.modifySelector_(userComponent, "iconing_ui_dialog_content");
		
		let temp = '<div class="iconing_ui_dialog_body">'+
				'<div class="iconing_ui_dialog_header">'+
					'<div class="iconing_ui_dialog_title">{{title}}</div>'+
					'<button (click)="close();" class="iconing_ui_dialog_close_btn"></button>'+
				'</div>'+
				'<div #iconing_ui_dialog_content></div>'+
			'</div>'
		
		let dialogWraperType = this.createComponentClass_(temp, dialogId, null, null, null, layerState, userComponent, title);
		
		@NgModule({declarations: [dialogWraperType]})
		class DM {}
		
		/**
		 * create dialog
		 */
		let moduleWithComponentFactories  = this.compiler.compileModuleAndAllComponentsSync(DM),
			factory = moduleWithComponentFactories.componentFactories[0],
			dialogWraper = null;
		if(!parent){
			dialogWraper = this.appRef.bootstrap(factory);
			document.body.appendChild(dialogWraper.location.nativeElement);
		} else {
			const injector = ReflectiveInjector.fromResolvedProviders([], parent.injector);
			dialogWraper = parent.createComponent(factory, null, injector, []);
			dialogWraper.instance.thizRef = dialogWraper;
			
			document.body.appendChild(dialogWraper.location.nativeElement);
		}
		
		return dialogWraper.instance.dialogRef;
	}
}