import "zone.js";
import "reflect-metadata";

import {Component, NgModule, ViewEncapsulation} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/Forms';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgLayer, NgLayerRef, NgLayerComponent} from "../../angular2-layer";

@Component({
	selector: '.app',
	template: `
<table>
	<tr>
		<td>closeAble</td>
		<td><input type="checkbox" [(ngModel)]="config.closeAble"></td>
		<td rowspan="6" width="300" align="center">
			<button (click)="dialog();">dialog</button>
			<button (click)="confirm();">confirm</button>
			<button (click)="alert();">alert</button>
			<button (click)="loading();">loading</button>
			<button (click)="tip();">tip</button>
		</td>
	</tr>
	<tr>
		<td>isModal</td>
		<td><input type="checkbox" [(ngModel)]="config.isModal"/></td>
	</tr>
	<tr>
		<td>inSelector</td>
		<td>
			<select name="inselector" [(ngModel)]="config.inSelector">
				<option value="rollIn">rollIn</option>
				<option value="fallDown">fallDown</option>
				<option value="fadeInDown">fadeInDown</option>
				<option value="runIn">runIn</option>
				<option value="bounceIn">bounceIn</option>
				<option value="splatIn">splatIn</option>
				<option value="dropDown">dropDown</option>
				<option value="vanishIn">vanishIn</option>
				<option value="spaceIn">spaceIn</option>
				<option value="jelly">jelly</option>
				<option value="fadeInUp">fadeInUp</option>
			</select>
		</td>
	</tr>
	<tr>
		<td>outSelector</td>
		<td>
			<select name="outselector" [(ngModel)]="config.outSelector">
				<option value="rollOut">rollOut</option>
				<option value="fadeOutDown">fadeOutDown</option>
				<option value="vanishOut">vanishOut</option>
				<option value="spaceOut">spaceOut</option>
				<option value="boingOut">boingOut</option>
				<option value="fadeOutDown">fadeOutDown</option>
			</select>
		</td>
	</tr>
	<tr>
		<td>title</td>
		<td><input type="text" name="title" [(ngModel)]="config.title"></td>
	</tr>
	<tr>
		<td>align</td>
		<td>
			<select name="align" [(ngModel)]="config.align">
				<option value="center">center</option>
				<option value="top">top</option>
				<option value="bottom">bottom</option>
			</select>
		</td>
	</tr>
</table>
	`,
	providers: [NgLayer]
})
export class AppComponent {
	constructor(private ly:NgLayer) {}
	
	config:any = {
		inSelector:"fallDown",
		outSelector:"rollOut",
		title:"angular2 layer",
		align:"center",
		parent: this,
		isModal:true,
		dialogComponent:DialogComponent,
		closeAble: false
	}
	
	dialog(){
		this.ly.dialog(this.config);
	}
	
	alert(){
		this.ly.alert(this.config);
	}
	
	confirm(){
		this.ly.confirm(this.config);
	}
	
	loading(){
		let tip = this.ly.loading(this.config);
		
		setTimeout(()=>{tip.close();}, 12000)
	}
	
	tip(){
		this.ly.tip(this.config);
	}
}

/*component for dialog*/
@Component({
	selector: '.dialog',
	template: `
<div class="dialog_body">
	<div class="dialog_logo">
		<img src="image/logo.png"/>
		<h1>Angular2  Layer</h1>
		<p>Angular2 弹层插件，灵活，简单，丰富，优美</p>
	</div>
	<button (click)="setTitle();">setTitle</button>
	<button (click)="showCloseBtn();" style="margin:0 10px;">showCloseBtn</button>
	<button (click)="showData();">showData</button>
</div>`
})
export class DialogComponent {
	data = "angular2 layer";
	
	constructor(private ly:NgLayerRef, private l:NgLayer) {}
	
	setTitle(){this.ly.setTitle("Angular2 Layer Title");}
	
	close(){this.ly.close();}
	
	showCloseBtn(){this.ly.showCloseBtn(true)};
	
	showData(){alert(this.data)};
}

@NgModule({
	imports: [BrowserModule, FormsModule],
	entryComponents:[NgLayerComponent, DialogComponent],
	declarations: [AppComponent, NgLayerComponent, DialogComponent],
	bootstrap: [AppComponent]
})
class AppModule {}
platformBrowserDynamic().bootstrapModule(AppModule, [{defaultEncapsulation: ViewEncapsulation.None}]);