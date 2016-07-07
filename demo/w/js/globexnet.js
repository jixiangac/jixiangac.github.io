/**
*	------------------------------------
*
*		杭州网寰科技有限公司		
*		http://www.globexnet.com/
*		
*	------------------------------------
*/
$(function(){
	focusBox('banner');//幻灯片
	//招聘职位
	$('.job_list li').click(function(){
		$(this).addClass('current').siblings().removeClass('current');
		var index=$(this).index();
		$('.list> li:eq('+index+')').fadeIn().siblings().hide();
	});
	//关于我们
	index=0;
	 $(".somepic li").eq(0).width(380);
                $(".somepic li img").bind('click',function(){
						index=$(this).parent().index();
                        $(this).parent().animate({
                            width:"380px"
                        },500).siblings().animate({
							width:"50px"
                        },500);
                });
	x = setInterval(somepic,3000);
	
	$('.somepic li img').hover(function(){
		clearInterval(x);
	},function(){
		x = setInterval(somepic,3000);
	});
	//低版本浏览器提示
	if($.browser.msie&&!$.support.style)
		{
		var tips="Unbelievable!!!您还在使用有互联网杀手之称的IE6,7,8浏览器？连微软自己都对它们咬牙切齿，我们强烈推荐您使用<a href='http://www.google.com/chrome/index.html?hl=zh_cn&brand=CHMA&utm_campaign=zh_cn&utm_source=zh_cn-ha-apac-zh_cn-bk&utm_medium=ha' target='_blank'>Chrome</a>或<a href='http://firefox.com.cn/' target='_blank'>Firefox</a>,您将享受飞一般的感觉.";
		var box='<div id="browser">'+tips+'</div>';
		$('body').append(box);
		$('#browser').animate({'top':'20px'});
		}
		
});

//幻灯片
function somepic(){
	if(index==6){
		$(".somepic li").eq(0).animate({width:'380px'},500).
									siblings().animate({width:'50px'},500);
		index=0;
	}else{
		$('.somepic li').eq(index+1).animate({width:'380px'},500).
									siblings().animate({width:'50px'},500);
		index++;
	}
}

function focusBox(o){
	if(!o) return;
	var w=1200, 
		$o=$('#'+o),
		i=0,
		l=0;
		arr= [],
		t= null,
		len= 6,
		$ul=$o.find('.slideshow');
	//add banner_pages element
	arr.push('<ul class="bpages">');
	$ul.children('li').each(function(i){
		if(i==0){
			arr.push('<li class="current">'+ (i+1) +'</li>');
		}else{
			arr.push('<li>'+ (i+1) +'</li>');
		}
	});
	arr.push('</ul>');
	$('.main').append(arr.join(''));
	var $pagesLi = $o.find('.bpages li');
	//
	$ul.append($ul.html()).css({'width':len*w,'left':-len*w/2});
	//mouse
	$pagesLi.hover(function(){
		var p = $pagesLi.index($o.find('.bpages li.current'));
		i = $(this).index();
		if(i==p) return;
		l = parseInt($ul.css('left')) + w*(p-i);
		addCurrent(i,l);
		return false;
	})
	$o.hover(function(){
		$('.left,.right').show();
	},function(){
		$('.left,.right').hide();
	});
	$o.find('div.left').click(function(){
		i = $pagesLi.index($o.find('.bpages li.current'));
		(i==0)? i=(len/2-1):i--;
		l = parseInt($ul.css('left')) + w;
		addCurrent(i,l);
		return false;
	})
	$o.find('div.right').click(function(){
		i = ($pagesLi.index($o.find('.bpages li.current'))+1)%(len/2);
		l = parseInt($ul.css('left')) - w;
		addCurrent(i,l);
		return false;
	})
	//auto focus
	t = setInterval(init,3000);
	$o.hover(function(){
		clearInterval(t);
	}, function(){
		t = setInterval(init,3000);
	});
	function init(){
		$o.children('div.right').trigger('click');
	}
	//add focus
	function addCurrent(i,l){
		if($ul.is(':animated')) return;
		$ul.animate({'left':l},500,function(){
			$pagesLi.not($pagesLi.eq(i).addClass('current')).removeClass('current');
			//$o.attr('class','bg'+i);
			if(l== (1-len)*w){
				$ul.css({'left': (1-len/2)*w});
			}else if(l== 0){
				$ul.css({'left': -len*w/2});
			}
		});
	}
}