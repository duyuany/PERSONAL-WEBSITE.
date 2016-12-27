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
    var ch=$(window).height();

    $(".btn-wrap").find("li").click(function(){
        var index=$(this).index();
        next=index;
        $(".page-wrap").css({"margin-top":-ch*next,transition: "margin 1s ease"})

    $(".btn-wrap").find("li").removeClass("btn-active").eq(next).addClass("btn-active")
})
    $(".page-wrap").mousewheel(function(){
        if(!flag){
            return;
        }
        next--;
        if(next==-1){
            next=0;
            return;
        }
        $(".page-wrap").css({"margin-top":-ch*next,transition:"margin 1s ease"})
        $(".btn-wrap").find("li").removeClass("btn-active").eq(next).addClass("btn-active")
        flag=false;
    },function(){
        if(!flag){
            return;
        }
        next++;
        if(next==$(".section").length){
            next=$(".section").length-1;
            return;
        }

        $(".page-wrap").css({"margin-top":-ch*next,transition:"margin 1s ease"})
        $(".btn-wrap").find("li").removeClass("btn-active").eq(next).addClass("btn-active")
        flag=false;
    })






    touch.on("body","swipeup",".page-wrap",function(){
        if(!flag){
            return;
        }
        next++;
        if(next==$(".section").length){
            next=$(".section").length-1;
            return;
        }

        $(".page-wrap").css({"margin-top":-ch*next,transition:"margin 1s ease"})
        $(".btn-wrap").find("li").removeClass("btn-active").eq(next).addClass("btn-active")
        flag=false;
    })
    touch.on("body","swipedown",".page-wrap",function(){
        if(!flag){
            return;
        }
        next--;
        if(next==-1){
            next=0;
            return;
        }
        $(".page-wrap").css({"margin-top":-ch*next,transition:"margin 1s ease"})
        $(".btn-wrap").find("li").removeClass("btn-active").eq(next).addClass("btn-active")
        flag=false;
    })
    $(".page-wrap")[0].addEventListener("webkitTransitionEnd",function(){
        flag=true;
        $(".section").each(function(index,obj){
            if(index==0){
                return;
            }
            if(index==next){
                $(".empty").eq(index).css({transform: "rotateZ(360deg)"})
                $(".bb").eq(index).find(".bb").css({transform: "rotateY(360deg)"})
            }else{
                $(".empty").eq(index).css({transform: "rotateZ(0deg)"})
                $(".bb").eq(index).find(".bb").css({transform: "rotateY(0deg)"})
            }
        })

    })
    $(".page-wrap")[0].addEventListener("mozTransitionEnd",function(){
        flag=true;
        $(".section").each(function(index,obj){
            if(index==0){
                return;
            }
            if(index==next){
                $(".empty").eq(index).css({transform: "rotateZ(360deg)"})
                $(".bb").eq(index).find(".bb").css({transform: "rotateY(360deg)"})
            }else{
                $(".empty").eq(index).css({transform: "rotateZ(0deg)"})
                $(".bb").eq(index).find(".bb").css({transform: "rotateY(0deg)"})
            }
        })
    })
})



