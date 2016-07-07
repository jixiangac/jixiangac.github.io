/****
Dream's JS
@jixaingac
***/
function addLoadEvent(func){
    var oldload=window.onload;
	if(typeof window.onload!='function')
	 {window.load=func();}
	 else
	 window.onload=function(){
	   oldload();
	   func();
	 }
}

function box(){
   var showbox=document.getElementById('showbox');
   infobox=document.getElementById('info');
   var close=document.getElementById('close');
   var rolevalue=document.getElementById('rolevalue');
   var role=document.getElementById('role');
   var closerole=document.getElementById('closerole');
   var clred=document.getElementById('clred');
   showbox.onclick=function(){
    infobox.style.display='block';
	topLayer(infobox);
   }
   close.onclick=function(){
    infobox.style.display='none';
   }
   infobox.onclick=function(){
    topLayer(infobox);
   }
   rolevalue.onclick=function(){
    role.style.display='block';
	topLayer(role);
   }
     role.onclick=function(){
    topLayer(role);
   }
    closerole.onclick=function(){
    role.style.display='none';
   }
   clred.onclick=function(){
      topLayer(red);
   }
   

}

var max=1;
			
function maxOfzidnex(){
    
    var mdiv=document.getElementById('wrap');
	var divs=mdiv.getElementsByTagName('div');
	for(var i=0;i<divs.length;i++)
	 {
	    if(divs[i].style.zIndex){
	      if(parseInt(divs[i].style.zIndex)>max)max=parseInt(divs[i].style.zIndex);
		  }
	
      }
	  	
	  }
	  
function allZindexValue(){
	  red=document.getElementById('red');
      var redsb=document.getElementById('redsb');
	  var zbox=document.getElementById('zbox');
	   var status=document.getElementById('status');
   redsb.onclick=function(){
    alert(parseInt(red.style.zIndex));
	      
     }
    zbox.onclick=function(){
    alert(parseInt(infobox.style.zIndex));
	      
     }
	 status.onclick=function(){
    alert(parseInt(role.style.zIndex));
	      
     }

}

function topLayer(layer){ 
      layer.style.zIndex = ++max; 
	  } 
	  
	  
addLoadEvent(box);
addLoadEvent(maxOfzidnex);
addLoadEvent(allZindexValue);
