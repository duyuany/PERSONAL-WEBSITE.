function shape(canvas,copy,cobj){
    this.canvas=canvas;
    this.copy=copy;
    this.cobj=cobj;
    this.width=this.canvas.width;
    this.height=this.canvas.height;
    this.historys=[];
    this.type="line";
    this.style="stroke";
    this.border="#000";
    this.fill="#000";
    this.linew=1;
    this.bianNum=5;
    this.jiaoNum=5;
    this.isback=true;
    this.xpsize=10;
    this.xpHidden=false;
}
shape.prototype={
    init:function(){
        this.cobj.strokeStyle=this.border;
        this.cobj.fillStyle=this.fill;
        this.cobj.lineWidth=this.linew;
    },
    draw:function(){
        var that=this;
        this.copy.onmousedown=function(e){
            var startx= e.offsetX;
            var starty= e.offsetY;
            that.copy.onmousemove=function(e){
                that.isback=true;
                that.init();
                var endx= e.offsetX;
                var endy= e.offsetY;
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.historys.length>0){
                    that.cobj.putImageData(that.historys[that.historys.length-1],0,0);
                }
                that[that.type](startx,starty,endx,endy);

            }

            that.copy.onmouseup=function(){
                that.copy.onmouseup=null;
                that.copy.onmousemove=null;
                that.historys.push(that.cobj.getImageData(0,0,that.width,that.height));
            }
        }
    },
    line:function(x,y,x1,y1){
        var that=this;
        that.cobj.beginPath();
        that.cobj.moveTo(x,y);
        that.cobj.lineTo(x1,y1);
        that.cobj.stroke();
    },
    rect:function(x,y,x1,y1){
        var that=this;
        that.cobj.beginPath();
        that.cobj.rect(x,y,x1-x,y1-y)
        that.cobj[that.style]();
    },
    arc:function(x,y,x1,y1){
        this.cobj.beginPath();
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        this.cobj.arc(x,y,r,0,2*Math.PI);
        this.cobj[this.style]();
    },
    bian:function(x,y,x1,y1){
        var angle=360/this.bianNum*Math.PI/180;
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        this.cobj.beginPath();
        for(var i=0;i<this.bianNum;i++){
            this.cobj.lineTo(Math.cos(angle*i)*r+x,Math.sin(angle*i)*r+y);
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    jiao:function(x,y,x1,y1){
        var angle=360/(this.jiaoNum*2)*Math.PI/180;
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
        var r1=r/3;
        this.cobj.beginPath();
        for(var i=0;i<this.jiaoNum*2;i++){
            if(i%2==0) {
                this.cobj.lineTo(Math.cos(angle * i) * r + x, Math.sin(angle * i) * r + y);
            }else{
                this.cobj.lineTo(Math.cos(angle * i) * r1 + x, Math.sin(angle * i) * r1 + y);
            }
        }
        this.cobj.closePath();
        this.cobj[this.style]();
    },
    pen:function(){
        var that=this;
        this.copy.onmousedown=function(e){
            var startx= e.offsetX;
            var starty= e.offsetY;
            that.cobj.beginPath();
            that.cobj.moveTo(startx,starty);
            that.copy.onmousemove=function(e){
                that.init();
                var endx= e.offsetX;
                var endy= e.offsetY;
                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.historys.length>0){
                    that.cobj.putImageData(that.historys[that.historys.length-1],0,0);
                }
                that.cobj.lineTo(endx,endy);
                that.cobj.stroke();

            }

            that.copy.onmouseup=function(){
                that.copy.onmouseup=null;
                that.copy.onmousemove=null;
                that.historys.push(that.cobj.getImageData(0,0,that.width,that.height));
            }
        }
    },
    eraser:function(xpObj){
        var that=this;
        this.copy.onmousemove=function(e){
            e.preventDefault();
            if(that.xpHidden){
                return false;
            }
            var movex= e.offsetX;
            var movey= e.offsetY;
            var lefts=movex-that.xpsize/2;
            var tops=movey-that.xpsize/2;
            if(lefts<0){
                lefts=0;
            }
            if (tops<0){
                tops=0;
            }
            if(lefts>that.width-that.xpsize){
                lefts=that.width-that.xpsize
            }
            if(tops>that.height-that.xpsize){
                tops=that.height-that.xpsize
            }
            xpObj.css({
                "display":"block",
                "left":lefts,
                "top":tops
            })
        }
        this.copy.onmousedown=function(e){
            var startx= e.offsetX;
            var starty= e.offsetY;
            that.copy.onmousemove=function(e){
                if(that.xpHidden){
                    return false;
                }
                var movex= e.offsetX;
                var movey= e.offsetY;
                var lefts=movex-that.xpsize/2;
                var tops=movey-that.xpsize/2;
                if(lefts<0){
                    lefts=0;
                }
                if (tops<0){
                    tops=0;
                }
                if(lefts>that.width-that.xpsize){
                    lefts=that.width-that.xpsize
                }
                if(tops>that.height-that.xpsize){
                    tops=that.height-that.xpsize
                }
                xpObj.css({
                    "display":"block",
                    "left":lefts,
                    "top":tops
                })

                that.cobj.clearRect(movex,movey,that.xpsize,that.xpsize)
            }
            that.copy.onmouseup=function(){
                that.copy.onmouseup=null;
                that.copy.onmousemove=null;
                that.eraser(xpObj);
                that.historys.push(that.cobj.getImageData(0,0,that.width,that.height));
            }
        }
    },
    fx:function(dataObj,x,y){
        var that=this;
        for(var i=0;i<dataObj.width*dataObj.height;i++){
            dataObj.data[i*4+0]=255-dataObj.data[i*4+0];
                dataObj.data[i*4+1]=255-dataObj.data[i*4+1];
                dataObj.data[i*4+2]=255-dataObj.data[i*4+2];
                dataObj.data[i*4+3]=255
            }
            that.cobj.putImageData(dataObj,x,y);
    },
    msk:function(dataObj,num,x,y){
        var that=this;
        var width=dataObj.width, height = dataObj.height;
        var num=num;
        var w=width/num;
        var h=height/num;
        for(var i=0;i<num;i++){
            for (var j=0;j<num;j++){
                var dataObj=that.cobj.getImageData(j*w,i*h,w,h);
                var r= 0,g= 0,b=0;
                for(var k=0;k<dataObj.width*dataObj.height;k++){
                    r+=dataObj.data[k*4+0];
                    g+=dataObj.data[k*4+1];
                    b+=dataObj.data[k*4+2];
                }

                r=parseInt(r/(dataObj.width*dataObj.height))
                g=parseInt(g/(dataObj.width*dataObj.height))
                b=parseInt(b/(dataObj.width*dataObj.height))
                for(var k=0;k<dataObj.width*dataObj.height;k++){
                    dataObj.data[k*4+0]=r;
                    dataObj.data[k*4+1]=g;
                    dataObj.data[k*4+2]=b;
                }
                that.cobj.putImageData(dataObj,j*w+x,i*h+y)
            }
        }
    },
    blur:function(dataobj,num,x,y){
        var arr=[];
        var widths=dataobj.width;
        var heights=dataobj.height;
        for(var i=0;i< heights;i++){
            for(var j=0;j<widths;j++){
                var y1=i+num>heights?i-num:i;
                var x1=j+num>heights?j-num:j;
                var dataObj=this.cobj.getImageData(x1,y1,num,num);
                var r=0;var g=0;var b=0;
                for(var k=0;k<dataObj.width*dataObj.height;k++){
                    r+=dataObj.data[k*4+0];
                    g+=dataObj.data[k*4+1];
                    b+=dataObj.data[k*4+2];
                }
                r=parseInt(r/(dataObj.width*dataObj.height));
                g=parseInt(g/(dataObj.width*dataObj.height));
                b=parseInt(b/(dataObj.width*dataObj.height));
                arr.push(r,g,b,255);
            }
        }
        for(var i=0;i<dataobj.data.length;i++){
            dataobj.data[i]=arr[i];
        }
        this.cobj.putImageData(dataobj,x,y);

    }
}