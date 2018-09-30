// 1、点击其他任何地方，搜索列表隐藏
// 2、绑定搜索接口，每键入一个值就从服务器获取数据
// 3、展示搜索列表
// 4、给每个搜索关键字加上链接
//使用jQuery 

$('#search-input').bind('keyup',function(){
	var key = $('#search-input').val();
	$.get("https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd="+key,window.baidu.sug,'jsonp');
});

 //定义回调函数                
 window.baidu = {                    
 	sug: function(data) { 
	 		var results = data.s;
	 		if(results.length == 0){
	 			$('#search-results').hide();
	 		}else{
	 			var html = "";
				for(var i= 0;i<results.length;i++){
					html+="<li>"+results[i]+"</li>";
				}
				$('#search-results ul').html(html);
				$('#search-results').css({
					left:$('#search-form').offset().left,
					top:$('#search-form').offset().top+$('#search-form').height()+10
				}).show();     
	 		}
			                      
 		}
};

$(document).bind('click',function(){
	$('#search-results ul').html("");
	$('#search-results').hide();    
});
/*
	事件代理，一般用于为js动态生成的多个同类元素添加事件
*/
$(document).delegate('li','click', function(){
	var keyword = $(this).text();
	location.href = "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=25017023_10_pg&wd="+keyword+"&oq=%25E4%25BD%25A0%25E5%25A5%25BD&rsv_pq=9ec1a62a0001027a&rsv_t=4664T41fswButqvfw6Mc6AbEekGn41Zzz5t%2BzeyhctPdm0DfycU18wvzEStlfgrGBOdgOZo&rqlang=cn&rsv_enter=0&inputT=7590&rsv_sug3=12&rsv_sug1=7&rsv_sug7=100&rsv_sug4=8271";
});


