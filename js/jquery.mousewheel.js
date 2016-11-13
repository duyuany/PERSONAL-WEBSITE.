jQuery.fn.extend({
	mousewheel:function(up,down){
		this.each(function(i,obj){
			if (obj.attachEvent) {
				obj.attachEvent("onmousewheel",scrollFn);
			}else if (obj.addEventListener) {
				obj.addEventListener("mousewheel",scrollFn,false);
				obj.addEventListener("DOMMouseScroll",scrollFn,false);
			}
			function scrollFn(e){
				e=e||window.event;
				var f=e.detail||e.wheelDelta;
				if (f==-3||f==120) {
					if (up) {
						up.call(this);
					};
				};
				if (f==3||f==-120) {
					if (down) {
						down.call(this);
					};
				}
			}
		})
	}
})