import {Component,NgModule,ViewContainerRef,enableProdMode} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgLayer, NgLayerRef} from "../../ng2-layer.js";

enableProdMode();

class DataShare {
	somedata:any;
}

@Component({
	selector: '.app',
	templateUrl: 'temp/app.html',
	providers: [NgLayer, DataShare]
})
export class AppComponent {
	constructor(private ly:NgLayer, private vcRef:ViewContainerRef, private data:DataShare) {
		data.somedata = "水牛叔叔";
	}

	dialog() {
		//dynamic component class
		@Component({templateUrl: "temp/dialog.html"})
		class DialogComponet {
			constructor(private ly:NgLayerRef, private data:DataShare){}
			
			setTitle(){this.ly.setTitle("Angular2 Layer Title");}
			
			close(){this.ly.close();}
			
			showCloseBtn(){this.ly.showCloseBtn(true)};
		}
		
		/**
		 * if parent is provided,
		 * the new component will be a child of parent component
		 */
		let dialog = this.ly.dialog({
			parent:this.vcRef,
			dialogComponent:DialogComponet,
			closeAble:false
		});
	}
	
	alert(){
		let alert = this.ly.alert({
			message:"所有工作已经完成",
		});
		alert.ok(()=> {return true;});
	}
	
	confirm(){
		let confirm = this.ly.confirm({
			message:"删除后无法恢复,确定删除吗?"
		});
		confirm
			.ok(()=> {return true;})
			.cancel(()=> {return true;});
	}
	
	loading(){
		let loading = this.ly.loading({message:"loading...",isModal:true});
		setTimeout(()=>loading.setMessage("再等一会..."), 2000);
		setTimeout(()=>loading.close(), 4000);
	}
	
	tip(){
		let tip = this.ly.tip({
			message:"saving...",
			align:"top"
		});
		setTimeout(()=>{
			tip.setMessage("successfully saved");
		}, 1000)
	}
}

@NgModule({
	imports: [BrowserModule],
	declarations: [AppComponent],
	bootstrap: [AppComponent],
	providers:[DataShare]
})
class AppModule {}
platformBrowserDynamic().bootstrapModule(AppModule);