$(function(){
    $(".slide-wrap").find("li").hide().eq(0).show();
    $(".nav-btn").find("span").eq(0).css({"background":"#fff"})
    var num=0;
    var t=setInterval(function move(){
        num++;
        if (num>=$(".slide-wrap").find("li").length){
            num=0;
        }
        $(".slide-wrap").find("li").hide().eq(num).show();
        $(".nav-btn").find("span").css({"background":"#999"}).eq(num).css({"background":"#fff"})
    },3000)
    $("#slide-nav>ul").find(".nav-btn").click(function(){
        var index=$(this).index(".nav-btn");
        $(".slide-wrap").find("li").hide().eq(index).show();
        $(".nav-btn").find("span").css({"background":"#999"}).eq(index).css({"background":"#fff"});
    }).hover(function(){
        var index1=$(this).index(".nav-btn");
        $(".nav-btn").find("span").css({"background":"#999"}).eq(index1).css({"background":"#fff"});
        $(".nav-btn-before").eq(index1).css({display:"block"})
    },function(){
        var index2=$(this).index(".nav-btn");
        $(".nav-btn").find("span").css({"background":"#999"}).eq(index2).css({"background":"#fff"});
        $(".nav-btn-before").eq(index2).css({display:"none"})
    })



    var now=0;
    var next=0;
    var flag=true;
    function move(type){
        if(type=="up"){
            if(!flag){
                return;
            }
            flag=false;
            next++
            if(next>=$(".section").length){
                next=0;
            }
            if(next==2){
                $(".img").css("animation","pro 2s linear forwards")
                $(".sort").css("animation","pro1 2s linear forwards")
            }
            $(".section").eq(now).css("top","0")
            $(".section").eq(next).css("top","100%")
            $(".section").eq(now).finish().animate({"top":"-100%","z-index":now},1000)
            $(".section").eq(next).finish().animate({"top":"0","z-index":next},1000,function(){flag=true})
            $(".btn-wrap").find("li").removeClass("btn-active").eq(next).addClass("btn-active")
            now=next;
        }else if(type=="down"){
            if(!flag){
                return;
            }
            flag=false;
            next--;
            if($(".section").eq(0).css("top")=="0px"){
                next=$(".section").length-1;
            }
            if(next==2){
                $(".img").css("animation","pro 2s linear forwards")
                $(".sort").css("animation","pro1 2s linear forwards")
            }
            $(".section").eq(now).css("top","0")
            $(".section").eq(next).css("top","-100%")
            $(".section").eq(now).finish().animate({"top":"100%","z-index":now},1000)
            $(".section").eq(next).finish().animate({"top":"0","z-index":next},1000,function(){flag=true})
            $(".btn-wrap").find("li").removeClass("btn-active").eq(next).addClass("btn-active")
            now=next;
        }
    }

    $(".btn-wrap").find("li").click(function(){
        var index=$(this).index();
        next=index;
        if (now<next){
            $(".section").eq(now).css("top","0")
            $(".section").eq(next).css("top","100%")
            $(".section").eq(now).finish().animate({"top":"-100%","z-index":now},1000)
            $(".section").eq(next).finish().animate({"top":"0","z-index":next},1000)
            now=next;
        }else if(now>next){
            $(".section").eq(now).css("top","0")
            $(".section").eq(next).css("top","-100%")
            $(".section").eq(now).finish().animate({"top":"100%","z-index":now},1000)
            $(".section").eq(next).finish().animate({"top":"0","z-index":next},1000)
            now=next;
        }
        $(".btn-wrap").find("li").removeClass("btn-active").eq(index).addClass("btn-active")
    })

    $(document).mousewheel(function(){
      move("down");
    },function(){
        move("up");
    })
})



