// 1、点击其他任何地方，搜索列表隐藏
// 2、绑定搜索接口，每键入一个值就从服务器获取数据
// 3、展示搜索列表
// 4、给每个搜索关键字加上链接
//原生js实现但没法实现跨域

var getDOM = function(id) {
	return document.getElementById(id) || document;
}

/*
	解决浏览器兼容封装绑定事件的函数
	用以下属性绑定事件的优势就是可以绑定多个事件，onclick
	则会覆盖之前的绑定事件
*/
var addEvent = function(event,id,callback){
	var element = getDOM(id);
	if(element.addEventListener){ //非IE浏览器
		element.addEventListener(event,callback,false);
	}else if(element.attachEvent){//IE浏览器
		element.attachEvent('on'+event,callback);
	}
};

var getLeft = function(id){
	var el = getDOM(id);
	var selfLeft = el.offsetLeft;
	var oParent = el.offsetParent;
	while(oParent!=null){ //当有多个父级嵌套时
		selfLeft+=oParent.offsetLeft;
		oParent = oParent.offsetParent;
	}

	return selfLeft;
}
var getTop = function(id){
	var el = getDOM(id);
	var selfTop = el.offsetTop;
	var oParent = el.offsetParent;
	while(oParent != null){
		selfTop+=oParent.offsetTop;
		oParent = oParent.offsetParent;
	}

	return selfTop;
}

var ajaxGet = function(url,callback){
	//使用原生js无法实现跨域请求
	// var _xhr = null;
	// if(window.XMLHttpRequest){
	// 	_xhr = new XMLHttpRequest();
	// }else if(window.ActiveXObject){
	// 	_xhr = new ActiveXObject("Msxml2.0XMLHTTP");
	// }
	// _xhr.onreadystatechange = function(){
	// 	if(_xhr.readyState === 4 && _xhr.status === 200){
	// 		var json = JSON.parse(_xhr.resonseText);
	// 		console.log(json);

	// 		callback(json);
	// 	}
	// }

	// _xhr.open("GET",url,true);
	// _xhr.setRequestHeader("Origin", '*');
	// _xhr.send();
	$.get(url,callback,'jsonp');

}

/*
	事件代理
*/
delegateEvent = function(target,event,fn){
	addEvent(event,document,function(e){
		if(e.target.nodeName == target.toUpperCase()){
			fn.call(e.target);
		}
	})
}
window.baidu = {
	sug:function(data){
		var results = data.s;
		var oListP =  getDOM('search-results');
		var oList = oListP.getElementsByTagName("ul")[0];
		if(results.length == 0){
			oListP.style.display = "none";
		}else{
			var html = "";
			for(var i= 0;i<results.length;i++){
				html+="<li>"+results[i]+"</li>";
			}
			var left = getLeft('search-form');
			var top = getTop('search-form');
			oList.innerHTML = html;
			oListP.style.left = left+"px";
			oListP.style.top = top+38+"px";
			oListP.style.display = "block";
		}
	}
}
addEvent('click',document,function(){
	var oResults = getDOM('search-results');
	var oUl = oResults.getElementsByTagName('ul')[0];
	oUl.innerHTML = "";
	oResults.style.display = "none";
});

addEvent('keyup','search-input',function(){
	var keyword = this.value;
	var url = "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+keyword;
	ajaxGet(url,window.baidu.sug);

});

delegateEvent('li','click',function(){
	var keyword = this.innerHTML;
	location.href = "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=25017023_10_pg&wd="+keyword;
});




