[document](http://ng2-layer.wemakers.net/doc.html)

[live demo](http://ng2-layer.wemakers.net/demo.html)

#NPM
```
npm install angular2-layer
```

#Release notes
* 2017/4/21——rewrite totally by angular 4, it is more convenient to use
* 2017/1/14——modify LayerConfig; update angular to 4.0
* 2017/1/14——add LayerConfig.imports and  LayerConfig.declarations
* 2017/1/12——passing data to the component by LayerConfig.data

# Classes
## NgLayer
可以把NgLayer 看作是一个弹出层的factory。NgLayer能够生成五种类型的弹层，分别对应五个方法(参数具体含义请看代码注释):
* <code class="lang-TypeScript">dialog(config:LayerConfig):NgLayerRef</code>,open a dialog window
* <code class="lang-TypeScript">alert(config:LayerConfig):NgLayerRef</code>,open a alert window
* <code class="lang-TypeScript">confirm(config:LayerConfig):NgLayerRef</code>,open a confirm window
* <code class="lang-TypeScript">tip(config:LayerConfig):NgLayerRef</code>,open a message layer
* <code class="lang-TypeScript">loading(config:LayerConfig):NgLayerRef</code>,open a loading layer

## NgLayerRef
NgLayerRef 是对弹出层的一个引用，通过这个引用，可以对弹出层进行操作或者指定事件的回调函数
包含如下方法(参数具体含义请看代码注释):
* <code class="lang-TypeScript">close():void</code>，destory the layer
* <code class="lang-TypeScript">showCloseBtn(show:boolean)</code>，show close button or not
* <code class="lang-TypeScript">setTitle(title:string):NgLayerRef</code>，update dialog title. for dialog only
* <code class="lang-TypeScript">setMessage(message:string):NgLayerRef</code>，update message of layer
* <code class="lang-TypeScript">setOkText(ok:string):NgLayerRef</code>，update "ok" button text, for alert layer or confirm layer
* <code class="lang-TypeScript">setCancelText(cancel:string):NgLayerRef</code>，update "cancel" button text, for confirm layer only
* <code class="lang-TypeScript">setOnClose(callBack:()=>boolean):NgLayerRef</code>，if the callBack return ture, the layer will be closed
* <code class="lang-TypeScript">ok(okCallback:()=>boolean):NgLayerRef</code>，okCallback called on 'ok' button click. for alert layer or confirm layer
* <code class="lang-TypeScript">cancel(cancelCallback:()=>boolean):NgLayerRef</code>，cancelCallback called on "cancel" button click. for confirm layer only

## LayerConfig
LayerConfig 是弹出层的配置类
* <code class="lang-TypeScript">parent:any</code>，the new component will be a child of parent, if parent is null, new component will be a root component of application. valid only for dialog leyer
* <code class="lang-TypeScript">dialogComponent:any</code>，dialog dialog body Component
* <code class="lang-TypeScript">data:Object</code>，datas pass to dialog component
* <code class="lang-TypeScript">title:string</code>，dialog title valid only for dialog leyer
* <code class="lang-TypeScript">closeAble:boolean</code>，show close button or not. valid only for dialog leyer
* <code class="lang-TypeScript">message:string</code>，message type of tip layer. valid for alert, confirm, tip, loading leyer
* <code class="lang-TypeScript">okText:string</code>，text of "ok" button. valid for alert or confirm leyer
* <code class="lang-TypeScript">cancelText:string</code>，text of "cancel" button.valid only for confirm leyer
* <code class="lang-TypeScript">align:string</code>，position of the layer("top", "center", "bottom"), default to "top" valid only for loading or tip leyer
* <code class="lang-TypeScript">isModal:boolean</code>，modal window or not valid only for loading leyer
* <code class="lang-TypeScript">tipDuration:number</code>，layer will be automatic closed after duration(ms) valid only for tip leyer
* <code class="lang-TypeScript">inSelector:string</code>，defined a popup animation by a class selector valid for all type leyer. existing options: rollIn, fallDown, fadeInDown, runIn, bounceIn, platIn, dropDown, vanishIn, spaceIn, jelly, fadeInUp
* <code class="lang-TypeScript">outSelector:string</code>，defined a closeing animation by a class selector valid for all type leyer. existing options: rollOut, fadeOutDown, bounceOut, vanishOut, spaceOut, boingOut, fadeOutDown

#Usage & demo
talk is cheape, show you my code

##step 1
import css
```html
<link rel="stylesheet" href="node_modules/angular2-layer/css/dialog.css" />
```
##step 2
use it
```TypeScript
import {Component, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {NgLayer, NgLayerRef, NgLayerComponent} from "angular2-layer";

@Component({
	selector: '.app',
	templateUrl: 'temp/app.html',
	providers: [NgLayer]
})
export class AppComponent {
	constructor(private ly:NgLayer) {}
	
	config:any = {
		inSelector:"fallDown",
		outSelector:"rollOut",
		title:"angular2 layer",
		align:"top",
		parent: this,
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
		
		setTimeout(()=>{tip.close();}, 2000)
	}
	
	tip(){
		this.ly.tip(this.config);
	}
}

/*component for dialog*/
@Component({
	selector: '.dialog',
	templateUrl: 'temp/dialog.html'
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
	imports: [BrowserModule],
	entryComponents:[NgLayerComponent, DialogComponent],
	declarations: [AppComponent, NgLayerComponent, DialogComponent],
	bootstrap: [AppComponent]
})
class AppModule {}
platformBrowserDynamic().bootstrapModule(AppModule);
```
##index.html
```html
<!DOCTYPE html>
<html>
<head>
<title>angular2 playground</title>
<link rel="stylesheet" href="../css/dialog.css" />
<link rel="stylesheet" href="css/index.css" />

<script src="../node_modules/core-js/client/shim.min.js"></script>
<script src="../node_modules/zone.js/dist/zone.min.js"></script>
<script src="../node_modules/reflect-metadata/Reflect.js"></script>
<script src="../node_modules/systemjs/dist/system.src.js"></script>

<script src="systemjs.config.js"></script>
<script>
	System.import('app').catch();
</script>
</head>
<body>
	<div class="app">loaing...</div>
</body>

</html>
```
##app.html
template of app Component
```html
<button (click)="dialog();">dialog</button>
<button (click)="confirm();">confirm</button>
<button (click)="alert();">alert</button>
<button (click)="loading();">loading</button>
<button (click)="tip();">tip</button>
```
##dialog.html
template of dialog Component
```html
<style>
<style>
.dialog_body{
	width:350px;
	padding:0 50px;
	text-align:center;
}
.dialog_logo img{
	height:80px;
	width:80px;
	display:block;
	margin:0 auto;
}
.dialog_logo h1{
	font-size:30px;
	line-height:1em;
	color:#000;
	font-weight:200;
	text-shadow: 0 1px 0 #ccc,
	0 2px 0 #c9c9c9,
	0 3px 0 #bbb,
	0 4px 0 #b9b9b9,
	0 5px 0 #aaa,
	0 6px 1px rgba(0,0,0,.1),
	0 0 5px rgba(0,0,0,.1),
	0 1px 3px rgba(0,0,0,.3),
	0 3px 5px rgba(0,0,0,.2),
	0 5px 10px rgba(0,0,0,.25),
	0 10px 10px rgba(0,0,0,.2),
	0 20px 20px rgba(0,0,0,.15);
}
.dialog_logo p{
	margin:20px 0;
	color:#000;
	text-shadow:0 1px 0 rgba(204, 204, 204, 0.4);
}
.dialog_body button{
	font-size:18px;
}
</style>
<div class="dialog_body">
	<div class="dialog_logo">
		<img src="image/logo.png"/>
		<h1>Angular2  Layer</h1>
		<p>Angular2 弹层插件，灵活，简单，丰富，优美</p>
	</div>
	<button (click)="setTitle();">setTitle</button>
	<button (click)="showCloseBtn();" style="margin:0 10px;">showCloseBtn</button>
	<button (click)="showData();">showData</button>
</div>
```
#Live demo
code is cheape, here is the [live demo](http://ng2-layer.wemakers.net/demo.html)
