define([], function() {
    function Rectangle(width,height,color,lightenRatio,type){
        createjs.Shape.call(this);
        var width=width;
        var height=height;
        var type=type;
        var actualColor;
        if(type===Rectangle.TYPE_NORMAL){
            actualColor=color;
        }else{
            actualColor=ColorLuminance(color,lightenRatio);
        }
        this.graphics.beginFill(actualColor);
        this.graphics.drawRoundRect(0,0,width,height,6);//圆角矩形
        this.graphics.endFill();
        this.cursor="pointer";
    }
    Rectangle.prototype=new createjs.Shape(); //继承自Shape类

    Rectangle.TYPE_NORMAL=0;//普通色块
    Rectangle.TYPE_PICKED=1;//不同的色块



    //改变颜色亮度
    //hex — a hex color value such as “#abc” or “#123456″ (the hash is optional)
    //lum — the luminosity factor, i.e. -0.1 is 10% darker, 0.2 is 20% lighter, etc.
    function ColorLuminance(hex, lum) {

        // validate hex string
        hex = String(hex).replace(/[^0-9a-f]/gi, '');
        if (hex.length < 6) {
            hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        }
        lum = lum || 0;

        // convert to decimal and change luminosity
        var rgb = "#", c, i;
        for (i = 0; i < 3; i++) {
            c = parseInt(hex.substr(i*2,2), 16);
            c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
            rgb += ("00"+c).substr(c.length);
        }

        return rgb;
    }
    return Rectangle;
});