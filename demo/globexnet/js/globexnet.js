/**
*	------------------------------------
*
*		杭州网寰科技有限公司		
*		http://www.globexnet.com/
*		
*	------------------------------------
*/
$(function(){
	$('#wrapper').html('<div id="loading"></div>');
	$('#wrapper').load('indexhome.html');
	//低版本浏览器提示
	// if($.browser.msie&&!$.support.style)
		// {
		// var tips="Unbelievable!!!您还在使用有互联网杀手之称的IE6,7,8浏览器？连微软自己都对它们咬牙切齿，我们强烈推荐您使用<a href='http://www.google.com/chrome/index.html?hl=zh_cn&brand=CHMA&utm_campaign=zh_cn&utm_source=zh_cn-ha-apac-zh_cn-bk&utm_medium=ha' target='_blank'>Chrome</a>或<a href='http://firefox.com.cn/' target='_blank'>Firefox</a>,您将享受飞一般的感觉.";
		// var box='<div id="browser">'+tips+'</div>';
		// $('body').append(box);
		// $('#browser').animate({'top':'20px'});
		// }
	lavaLamp();
	//切换页面
	$('.menu ul li').click(function(){
		$('#wrapper').html('<div id="loading"></div>');
		var a=$(this).children('a');
		var url=a.attr('href');
		a.addClass('current').parent().siblings().children('a').removeClass('current');
		$('#wrapper').load(url).hide().fadeIn();
		lavaLamp();
		return false;
	});
	
	
});

function lavaLamp(){
	//lavalamp
	var menu=$('.menu ul');
	var curLi=menu.find('.current');
	var curLiLeft=curLi.position().left;
	var curLiWidth=curLi.width();
	menu.append('<li class="lavalamp" style="left:'+curLiLeft+'px;width:'+curLiWidth+'px"></li>');
	var lava=menu.find('.lavalamp');
	menu.children('li').hover(function(){
		var _left=$(this).children('a').position().left,
			_width=$(this).children('a').width();
		lava.animate({left:_left,width:_width},{queue:false,duration:300});	
	},function(){
		lava.animate({left:curLiLeft,width:curLiWidth},{queue:false,duration:300});	
	});

}
