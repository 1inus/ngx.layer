[document](http://ng2-layer.wemakers.net/doc.html)

[live demo](http://ng2-layer.wemakers.net/demo.html)

#NPM
```
npm install angular2-layer
```

#Release notes
* 2017/1/14——add LayerConfig.imports and  LayerConfig.declarations
* 2017/1/12——passing data to the component by LayerConfig.data

# Classes
## NgLayer
可以把NgLayer 看作是一个弹出层的factory。NgLayer能够生成五种类型的弹层，分别对应五个方法(参数具体含义请看代码注释):
* <code class="lang-TypeScript">dialog(config:LayerConfig):NgLayerRef</code>，可以用自定义的ComponentClass定义对话框的内容
* <code class="lang-TypeScript">alert(config:LayerConfig):NgLayerRef</code>，创建alert弹窗，解决原生弹窗不好看或者和网站风格不搭
* <code class="lang-TypeScript">confirm(config:LayerConfig):NgLayerRef</code>，创建confirm弹窗,解决原生弹窗不好看或者和网站风格不搭
* <code class="lang-TypeScript">tip(config:LayerConfig):NgLayerRef</code>，生成一个消息提示弹层
* <code class="lang-TypeScript">loading(config:LayerConfig):NgLayerRef</code>，生成一个提示加载中（等待）的弹层
```TypeScript
export class NgLayer {
	/**
	 * open a dialog window
	 * @return {NgLayerRef}
	 */
	dialog(config:LayerConfig):NgLayerRef
	
	/**
	 * open a alert window
	 * 
	 * @return {NgLayerRef}
	 */
	alert(config:LayerConfig):NgLayerRef
	
	/**
	 * open a confirm window
	 * 
	 * @return {NgLayerRef}
	 */
	confirm(config:LayerConfig):NgLayerRef
	
	/**
	 * open a message layer
	 * 
	 * @return {NgLayerRef}
	 */
	tip(config:LayerConfig):NgLayerRef
	
	/**
	 * open a loading layer
	 * 
	 * @return {NgLayerRef}
	 */
	loading(config:LayerConfig):NgLayerRef
}
```
## NgLayerRef
NgLayerRef 是对弹出层的一个引用，通过这个引用，可以对弹出层进行操作或者指定事件的回调函数
包含如下方法(参数具体含义请看代码注释):
* <code class="lang-TypeScript">close():void</code>，关闭弹层，对所有类型的弹出层有效
* <code class="lang-TypeScript">showCloseBtn(show:boolean)</code>，是否显示关闭按钮，只对dialog有效
* <code class="lang-TypeScript">setTitle(title:string):NgLayerRef</code>，设置弹窗的标题，只适用于dialog
* <code class="lang-TypeScript">setMessage(message:string):NgLayerRef</code>，提示消息，对除了dialog之外的弹层有效
* <code class="lang-TypeScript">setOkText(ok:string):NgLayerRef</code>，更改“确定”按钮的文本，对alert、confirm有效
* <code class="lang-TypeScript">setCancelText(cancel:string):NgLayerRef</code>，更改“取消”按钮的文本，对confirm有效
* <code class="lang-TypeScript">setOnClose(callBack:()=>boolean):NgLayerRef</code>，设置弹层被关闭时候的回调函数，所有类型的弹层有效
* <code class="lang-TypeScript">ok(okCallback:()=>boolean):NgLayerRef</code>，设置弹层“确定”按钮被点击时的回调函数，对alert、confirm有效
* <code class="lang-TypeScript">cancel(cancelCallback:()=>boolean):NgLayerRef</code>，设置弹层“取消”按钮被点击时的回调函数，对confirm有效
```TypeScript
class NgLayerRef{
	/**
	 * destory the layer.
	 */
	close();
	
	/**
	 * show close button or not
	 */
	showCloseBtn(show:boolean):NgLayerRef
	
	/**
	 * update dialog title. for dialog only
	 * 
	 * @return {NgLayerRef}
	 */
	setTitle(title:string):NgLayerRef
	
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
	setMessage(message:string):NgLayerRef
	
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
	setOnClose(callBack:()=>boolean):NgLayerRef
	
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
	setOkText(ok:string):NgLayerRef
	
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
	setCancelText(cancel:string):NgLayerRef
	
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
	ok(okCallback:()=>boolean):NgLayerRef
	
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
	cancel(cancelCallback:()=>boolean):NgLayerRef
}
```
## LayerConfig
LayerConfig 是弹出层的配置类
* <code class="lang-TypeScript">parent:ViewContainerRef</code>，dialog的父组件，如果定义了parent，dialog内部的组件将成为parent的子组件，否则成为根组件
* <code class="lang-TypeScript">dialogComponent:any</code>，dialog 内容部分的Component 类
* <code class="lang-TypeScript">declarations:Array<any></code>，dialogComponent用到的指令需要额外声明
* <code class="lang-TypeScript">imports:Array<any></code>，dialogComponent用到的指令需要额外import(如果定义在Module里)
* <code class="lang-TypeScript">data:Object</code>，需要传递到dialogComponent内的参数可以在此声明，传递进来的数据要在Component完全初始化完毕之后才生效
* <code class="lang-TypeScript">title:string</code>，dialog的标题
* <code class="lang-TypeScript">closeAble:boolean</code>，dialog是否显示关闭按钮
* <code class="lang-TypeScript">message:string</code>，tip,loading,alert,confirm弹层的提示文字
* <code class="lang-TypeScript">okText:string</code>，确定按钮的文本
* <code class="lang-TypeScript">cancelText:string</code>，取消按钮的文本
* <code class="lang-TypeScript">align:string</code>，定义 loding和tip弹层的位置，可选值有：top, center, bottom
* <code class="lang-TypeScript">isModal:boolean</code>，是否模态，只适用于loading 弹层
* <code class="lang-TypeScript">tipDuration:number</code>，tip 弹层的持续时间， 经过指定的时间之后，弹层会自动关闭，单位：毫秒(ms)
* <code class="lang-TypeScript">inSelector:string</code>，配置弹层弹出时候的转场效果，实际上是为弹层指定一个class选择器，默认提供可选的值有：rollIn, fallDown, fadeInDown, runIn, bounceIn, splatIn, dropDown, vanishIn, spaceIn, jelly, fadeInUp,
* <code class="lang-TypeScript">outSelector:string</code>，配置弹层关闭时候的转场效果，实际上是为弹层指定一个class选择器，以便运用动画。默认提供可选的值有：rollOut, fadeOutDown, bounceOut, vanishOut, spaceOut, boingOut, fadeOutDown
```TypeScript
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
	 * if you want to use some custom directive in your dynamic component,
	 * don't forget to declare
	 */
	declarations:Array<any>;
	
	/**
	 * if you want to use some custom directive in your dynamic component,
	 * don't forget to import
	 */
	imports:Array<any>;

	/**
	 * datas pass to dialog component
	 */
	data:Object;
	
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
```
#Usage
##step 1
config systemjs.config.js
```JavaScript
(function(global) {
	System.config({
		paths: {'npm:': 'node_modules/'},
		map: {
			...
			"ng2Layer":"npm:angular2-layer/ng2-layer.min.js"
		}
	});
})(this);
```
##step 2
import css
```html
...
<link rel="stylesheet" href="node_modules/angular2-layer/css/dialog.css" />
...
```
##step 3
use it
```TypeScript
···
import {NgLayer, NgLayerRef} from "ng2Layer";
@Component(···)
export class AppComponent {
	constructor(private ly:NgLayer, private vcRef:ViewContainerRef) {
		let dialog = ly.dialog(···);
		let alert = ly.alert(···);
		let confirm = ly.confirm(···);
		let loading = ly.loading(···);
		let tip = ly.tip(···);
	}
}
```
#Demo code
talk is cheape, show you my code
##app.ts
```TypeScript
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
			tip.setMessage("successfully saved").setTipType("success");
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
<button (click)="alert();">alert</button>
<button (click)="confirm();">confirm</button>
<button (click)="loading();">loading</button>
<button (click)="tip();">tip</button>
```
##dialog.html
template of dialog Component
```html
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
	<button (click)="setTitle();" style="margin-right:20px;">setTitle</button>
	<button (click)="showCloseBtn();">showCloseBtn</button>
</div>
```
#Live demo
code is cheape, here is the [live demo](http://ng2-layer.wemakers.net/demo.html)
