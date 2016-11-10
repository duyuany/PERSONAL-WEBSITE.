/**
 * Created by Administrator on 2016/11/7 0007.
 */
$(function(){
    $(".slide-wrap").find("li").hide().eq(0).show();
    $(".nav-btn").find("span").eq(0).css({"background":"#fff"})
    var num=0;
    function move(){
        num++;
        if (num>=$(".slide-wrap").find("li").length){
            num=0;
        }
        $(".slide-wrap").find("li").hide().eq(num).show();
        $(".nav-btn").find("span").css({"background":"#999"}).eq(num).css({"background":"#fff"});
    }
    var t=setInterval(move,3000);
    $(".nav-btn").find("span").mouseover(function(){
        clearInterval(t);
    })
    $(".nav-btn").find("span").mouseout(function(){
        t=setInterval(move,3000);
    })
    $(".nav-btn").click(function(){
        alert($(this).index());
        for(var i=0;i<$(this)){

        }
        //$(".slide-wrap").find("li").hide().eq(num).show();
        //$(".nav-btn").find("span").css({"background":"#999"}).eq(num).css({"background":"#fff"});
    })
})



