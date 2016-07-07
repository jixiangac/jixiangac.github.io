/*
*
*	@Description gezi.js
*	@Author jixiangac
*
*/
	var a=document.getElementsByTagName('a');
	for(var i=0;i<a.length;i++){
		a[i].onclick=function(){
			x=this.getElementsByTagName('span');
			x[0].setAttribute('class','zhuan');
			x[1].setAttribute('class','zhuan2');
		}
	
	}
