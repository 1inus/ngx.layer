import {Component,NgModule,ViewContainerRef,enableProdMode} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {UiDialog, UiDialogRef} from "src/ng-layer.ts";

enableProdMode();

class DataShare {
	
}

@Component({
	selector: '.app',
	templateUrl: 'temp/app.html',
	providers: [UiDialog, DataShare]
})
export class AppComponent {
	constructor(
		private win: UiDialog,
		private vcRef: ViewContainerRef,
		private data : DataShare
	) {
		data.name = "水牛叔叔";
	}

	addButton() {
		/**
		 * dynamic component
		 */
		@Component({templateUrl: "temp/dialog.html"})
		class DialogComponet {
			constructor(private win:UiDialogRef, private data:DataShare){
				
			}
			
			edit(){
				this.data.name = "3232323";
				this.win.setTitle("新的标题");
			}
			
			close(){
				this.win.close();
			}
		}
		
		let dialogRef = this.win.open(this.vcRef, DialogComponet);
		
		dialogRef.name = {};
	}
	
	alert(){
		let dialogRef = this.win.alert("你没有达到借钱标准", "明白!")
		.ok(()=>{
			return true;
		});
	}
	
	confirm(){
		let dialogRef = this.win.confirm("删除无法恢复,请考虑清楚", "确定", "取消");
		
		dialogRef.ok(()=>{
			return true;
		})
		.cancel(()=>{
			return true;
		});
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