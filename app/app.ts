import {Component,NgModule,ViewContainerRef,enableProdMode} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgLayer, LayerRef} from "src/ng-layer.ts";

enableProdMode();

class DataShare {}

@Component({
	selector: '.app',
	templateUrl: 'temp/app.html',
	providers: [NgLayer, DataShare]
})
export class AppComponent {
	constructor(private win: NgLayer,private vcRef: ViewContainerRef,private data : DataShare) {
		data.name = "水牛叔叔";
	}

	addButton() {
		/**
		 * dynamic component
		 */
		@Component({templateUrl: "temp/dialog.html"})
		class DialogComponet {
			/**
			 * 
			 */
			constructor(private win:LayerRef, private data:DataShare){}
			
			edit(){
				this.win.setTitle("新的标题");
			}
			
			close(){
				this.win.close();
			}
		}
		
		/**
		 * if parent is provided,
		 * the new component will be a child of parent component
		 */
		let dialogRef = this.win.dialog(this.vcRef, DialogComponet, null, {
			inSelector:"fallDown",
			outSelector:"fadeOutDown"
		});
		dialogRef.setTitle("dialog title");
		
		dialogRef.name = {};
	}
	
	alert(){
		let dialogRef = this.win.alert("你没有达到借钱标准", "明白!", {
			inSelector:"splat",
			outSelector:"boingOutDown"
		});
			
		dialogRef.ok(()=>{
			return true;
		});
	}
	
	confirm(){
		let dialogRef = this.win.confirm("删除无法恢复,请考虑清楚", "确定", "取消", {
			inSelector:"dropDown",
			outSelector:"boingOutDown"
		});
		
		dialogRef.ok(()=>{
			return true;
		})
		.cancel(()=>{
			return true;
		});
	}
	
	/**
	 * 
	 */
	loading(){
		let loading = this.win.loading("加载中...", "center", {
			inSelector:"dropDown",
			outSelector:"boingOutDown"
		});
		
		setTimeout(()=>loading.close(), 2000);
		
	}
	
	/**
	 * 
	 */
	msg(){
		let msg = this.win.msg("保存成功", 1000, "top", "warn");
	}
}

@NgModule({
	imports: [BrowserModule],
	declarations: [AppComponent],
	bootstrap: [AppComponent],
	providers:[DataShare]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);