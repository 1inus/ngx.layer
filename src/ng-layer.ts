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

export class TranAnimation {
	in:{
		name:"",
		selector:"",
		duration:""
	};
	
	out:{
		name:"",
		selector:"",
		duration:""
	};
}

export class UiDialogRef {
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
export class UiDialog {
	/**
	 * 弹窗构造方法
	 */
	constructor(private compiler: Compiler, private appRef: ApplicationRef) {
		console.log();
	}
	
	/**
	 * 打开弹窗
	 */
	open(parent:ViewContainerRef, componetType) {
		let dialogId = "dialog_"+new Date().getTime()
		return this.createComponent_(parent, dialogId, componetType);
	}
	
	/**
	 * 
	 */
	alert(msg:string, okString:string){
		let temp = '<div class="iconing_ui_dialog_body iconing_ui_alert_body">'+
				'<div class="iconing_ui_content">{{msg}}</div>'+
				'<div class="iconing_ui_alert_btn">'+
					'<button class="iconing_ui_btn_cancel" (click)="ok()">{{okTxt}}</button>'+
				'</div>'+
			'</div>';
		
		return this.confirmOralert_(temp, msg, okString);
	}
	
	/**
	 * 
	 */
	confirm(msg:string, confirm:string, cancel:string){
		let temp = '<div class="iconing_ui_dialog_body iconing_ui_alert_body">'+
				'<div class="iconing_ui_content">{{msg}}</div>'+
				'<div class="iconing_ui_alert_btn">'+
					'<button class="iconing_ui_btn_cancel" (click)="cancel()">{{cancelTxt}}</button>'+
					'<button class="iconing_ui_btn_certain" (click)="ok()">{{okTxt}}</button>'+
				'</div>'+
			'</div>';
		
		return this.confirmOralert_(temp, msg, confirm, cancel);
	}
	
	confirmOralert_(temp:string, msg:string, okString:string, cancelString:string){
		let dialogId = "dialog_"+new Date().getTime(),
			div = document.createElement("div");
		
		div.classList.add("iconing_ui_dialog_backdrop");
		div.classList.add(dialogId);
		document.body.appendChild(div);
		
		@Component({
			selector:".iconing_ui_dialog_backdrop."+dialogId,
			template:temp,
			providers:[UiDialogRef],
			animations: []
		})
		class DialogWraper {
			thizRef:ComponentRef;
			dialogRef:UiDialogRef;
			cancelTxt:string = cancelString;
			okTxt:string = okString;			
			msg:string = msg;
			
			constructor(private dialogRef:UiDialogRef){
				dialogRef.dialogComponent = this;
				this.dialogRef = dialogRef;
			}
			
			/**
			 * 
			 */
			close(){
				if(!this.onClose || this.onClose()) this.thizRef.destroy();
			}	
			
			cancel(){
				if(!this.onCancel || this.onCancel()) this.thizRef.destroy();
			}
			
			ok(){
				if(!this.onOk || this.onOk()) this.thizRef.destroy();
			}
		}
		
		@NgModule({declarations: [DialogWraper]})
		class DM {}
		
		/**
		 * create dialog
		 */
		let moduleWithComponentFactories  = this.compiler.compileModuleAndAllComponentsSync(DM),
			factory = moduleWithComponentFactories.componentFactories[0],
			dialogWraper = this.appRef.bootstrap(factory);
			
			dialogWraper.instance.thizRef = dialogWraper;
			document.body.appendChild(dialogWraper.location.nativeElement);
		
		return dialogWraper.instance.dialogRef;
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
	private createComponent_(parent:ViewContainerRef, dialogId:string, userComponent:class) {
		userComponent = this.modifySelector_(userComponent, "iconing_ui_dialog_content");
		
		@Component({
			selector:".iconing_ui_dialog_backdrop",
			template:'<div class="iconing_ui_dialog_body">'+
				'<div class="iconing_ui_dialog_header">'+
					'<div class="iconing_ui_dialog_title">{{title}}</div>'+
					'<button (click)="close();" class="iconing_ui_dialog_close_btn"></button>'+
				'</div>'+
				'<div #iconing_ui_dialog_content></div>'+
			'</div>',
			providers:[UiDialogRef],
			animations: [
				/*trigger('descriptionState', [])*/
			]
		})
		class DialogWraper {
			thizRef:ComponentRef;
			dialogRef:UiDialogRef;
			title:string;
			
			@ViewChild('iconing_ui_dialog_content', {read: ViewContainerRef})
			dialogView:ViewContainerRef;
			
			constructor(private dialogRef:UiDialogRef, private compiler: Compiler){
				dialogRef.dialogComponent = this;
				this.dialogRef = dialogRef;
			}
			
			
			/**
			 * load dialog content
			 */
			ngOnInit() {
				@NgModule({declarations: [userComponent]})
				class TempModule {}
				
				let moduleWithComponentFactories  = this.compiler.compileModuleAndAllComponentsAsync(TempModule);
				
				moduleWithComponentFactories.then((mvcf: ModuleWithComponentFactories <any>)=>{
					let injector = ReflectiveInjector.fromResolvedProviders([], this.dialogView.injector);
					this.dialogView.createComponent(mvcf.componentFactories[0], null, injector, []);
				});
			}
			
			/**
			 * 
			 */
			close(){
				if(!this.onClose || this.onClose()){
					this.thizRef.destroy();
				}
			}
			
			/**
			 * 
			 */
			onClose(){return true;}
		}
		
		@NgModule({declarations: [DialogWraper]})
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