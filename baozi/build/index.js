var addTip=function(){$(".item").each(function(e,a){var t=$(a);$(a).tooltip("show");var i=t.parent().find(".tooltip").clone(true);t.parent().append(i);$(a).tooltip("hide")})};var player=new _mu.Player({mode:"list",baseDir:"./build/dist"}),$pl=$("#playlist-demo"),reset=function(){$pl.find(".item a").removeClass("playing pause").find(".time").remove()},findCurrItem=function(){var e=player.getCur();e=decodeURIComponent(e);return $pl.find('[data-link="'+e+'"]')},$time=$('<span class="time"></span>');$pl.on("click tap",".item a",function(){var e=$(this),a;if(e.hasClass("playing")){player.pause()}else if(e.hasClass("pause")){player.play()}else{e.addClass("playing");a=e.parent().find(".item a").map(function(){return $(this).data("link")}).get();player.reset().add(a).setCur(e.data("link")).play()}});player.on("playing pause",function(){reset();var e=findCurrItem();var a=player.getState();e.addClass(a)}).on("ended",reset).on("timeupdate",function(){});$('[data-toggle="tooltip"]').tooltip();addTip();