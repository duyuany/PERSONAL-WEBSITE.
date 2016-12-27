window.onload=function(){
    var scene=document.querySelector(".scene");
    var room=document.querySelector(".room");
    var ceil=document.querySelector(".panel:first-child");
    var floor=document.querySelector(".panel:nth-child(2)");
    var face=document.querySelector(".panel:nth-child(6)");
    //var panels=document.querySelectorAll(".panel");
    var cw=document.documentElement.clientWidth;
    var ch=document.documentElement.clientHeight;
    room.style.transformOrigin="center center "+cw/2+"px";
    room.style.transition="none";
    room.style.transform="rotateY(180deg)";
//天花板、地板
    ceil.style.width=floor.style.width=cw+"px";
    ceil.style.height=floor.style.height=cw+"px";
    floor.style.top=-(cw-ch)+"px";

    face.style.transform="translateZ("+cw+"px) rotateY(180deg)";
    face.onclick=function() {
        room.style.transition = "transform 3s ease";
        room.style.transform = "rotateY(360deg) translateZ(" + -600 + "px)";

        var angle1 = 0, angle = 0;
        var flag1 = true;
        document.onmousedown = function (e) {
            var startx = e.clientX;
            var starty = e.clientY;
            document.onmousemove = function (e) {
                flag1 = true;
                room.style.transition = "none";
                var movex = e.clientX;
                var movey = e.clientY;
                e.preventDefault();
                angle = Math.abs(movex - startx) > Math.abs(movey - starty) ? movex - startx : movey - starty;
                room.style.transform = "translate3d(0,0,-500px) rotate3d(0,1,0," + (angle1 + angle) + "deg)";
            }
            document.onmouseup = function () {
                if (flag1) {
                    angle1 += angle;
                }
                flag1 = false;
                document.onmousemove = null;
                document.onmouseup = null;
            };
            e.preventDefault();
        };
        var panels = document.querySelectorAll(".panel");
        var flag = true;
        for (var i = 0; i < panels.length; i++) {

            /*
             *   按下  抬起  ->click
             * */
            if (i < panels.length - 1) {
                panels[i].ondblclick = function () {
                    room.style.transition = "transform 2s ease";
                    if (flag) {
                        room.style.transform = "translate3d(0,0,200px) rotate3d(0,1,0," + (angle1) + "deg)";
                        flag = false;
                    } else {
                        room.style.transform = "translate3d(0,0,-500px) rotate3d(0,1,0," + (angle1) + "deg)";

                        flag = true;
                    }
                }
            }
        }
    }

}