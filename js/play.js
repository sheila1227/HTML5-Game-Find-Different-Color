define(["jquery","rectangle"], function($,Rectangle) {
    var _config={
        containerSelector:'', //最外层容器
        gameAreaSelector:'.game-area',   //绘图区
        levs:[2,3,3,4,4,4,5,5,5,6,6,6,6,7,7,7,7,8,8,8,9,9,9,9], //每个关卡每行列有多少个方块
        gap:20 //小方块间间距
    }
    var $self;//容器
    var $gameArea; //绘图区
    var curLev=0;//当前关卡,索引从0开始
    var stage;
    var gameView
    //初始化,入口
    var _init=function(config){
        _config= $.extend(_config,config);
        $self=$(_config.containerSelector);
        $self.show();
        _initParameters();

        //_render();
        _addRecs();
        _attachEvent();
    }

    function _initParameters(){

        $gameArea=$(_config.gameAreaSelector,$self);
        $gameArea.height($gameArea.width());//绘图区应为正方形
        var canvas=$gameArea[0];
        stage = new createjs.Stage(canvas);
        stage.canvas.width=$gameArea.width();
        stage.canvas.height=$gameArea.height();//一定要加上这句,否则会先在stage上画好,state再拉伸到$gameArea尺寸,就会产生变形
        createjs.Ticker.setFPS(30);
        createjs.Ticker.addEventListener("tick", stage);
        gameView = new createjs.Container();
        stage.addChild(gameView);
    }

    //渲染界面
    function _render(){



        var rec=new Rectangle(40,40,0,Rectangle.TYPE_NORMAL);
        gameView.addChild(rec);

    }

    function _addRecs(){
        gameView.removeAllChildren();
        var num=_config.levs[curLev];//当前关卡每行列应有的方块数
        var width=(stage.canvas.width-_config.gap*(num-1))/2;
        var height=(stage.canvas.height-_config.gap*(num-1))/2;
        var color=randomColor();
        var pickedX=_randomPick(0,num-1);
        var pickedY=_randomPick(0,num-1);
        var gap=_config.gap;
        for(var i=0;i<num;i++){
            for(var j=0;j<num;j++){
                var rec;
                if(i===pickedX && j===pickedY){
                    rec==new Rectangle(width,height,color,.5,Rectangle.TYPE_PICKED);
                }else{
                    rec=new Rectangle(width,height,color,.5,Rectangle.TYPE_NORMAL);
                }

                gameView.addChild(rec);
                rec.x=(width+gap)*i;//偏移,不重复排列
                rec.y=(height+gap)*j;
            }

        }
    }

    function _attachEvent(){

    }

    //随机标记目标位置
    function _randomPick(minValue,maxValue){
       return Math.ceil(Math.random()*(maxValue-minValue+1))-1;
    }


    //随机颜色值
    function randomColor()
    {
        var str = Math.ceil((Math.random()*16777215)).toString(16); //把数字转换成16进制
        if(str.length < 6)
        {
            str = "0" + str;
        }
        return "#"+str;
    }

    return{
        init:_init
    };
});