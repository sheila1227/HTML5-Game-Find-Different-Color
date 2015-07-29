define(["jquery", "rectangle", "dialog"], function ($, Rectangle, dialog) {
    var _config = {
        containerSelector: '', //最外层容器
        gameAreaSelector: '.game-area',   //绘图区
        pauseBtnSelector: '.btn-pause',//暂停按钮
        timerSelector: '.timer',//时间显示区
        scoreSelector: '.score',//得分显示区
        levs: [2, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9], //每个关卡每行列有多少个方块
        gap: 5 //小方块间间距
    }
    var $self;//容器
    var $gameArea; //绘图区
    var stage;
    var gameView;
    var $timerView;//时间显示
    var $scoreView;//得分显示
    var self = this;
    //初始化,入口
    function _init(config) {
        _config = $.extend(_config, config);
        $self = $(_config.containerSelector);
        $self.show();
        _initParameters();
        _bindEvent();
        game.start();
    }

    function _initParameters() {
        $timerView = $(_config.timerSelector, $self);
        $scoreView = $(_config.scoreSelector, $self);
        $gameArea = $(_config.gameAreaSelector, $self);
        $gameArea.height($gameArea.width());//绘图区应为正方形
        var canvas = $gameArea[0];
        stage = new createjs.Stage(canvas);
        stage.enableMouseOver(10);//调用此方法,shape上的cursor属性设置才会生效
        createjs.Touch.enable(stage);
        stage.canvas.width = $gameArea.width();
        stage.canvas.height = $gameArea.height();//一定要加上这句,否则会先在stage上画好,state再拉伸到$gameArea尺寸,就会产生变形
        createjs.Ticker.setFPS(30);
        createjs.Ticker.addEventListener("tick", stage);
        gameView = new createjs.Container();
        stage.addChild(gameView);

    }

    function _bindEvent() {
        var _game = game;
        //var eventType=navigator.userAgent.match(/iphone|android|phone|mobile|wap|netfront|x11|java|opera mobi|opera mini|ucweb|windows ce|symbian|symbianos|series|webos|sony|blackberry|dopod|nokia|samsung|palmsource|xda|pieplus|meizu|midp|cldc|motorola|foma|docomo|up.browser|up.link|blazer|helio|hosin|huawei|novarra|coolpad|webos|techfaith|palmsource|alcatel|amoi|ktouch|nexian|ericsson|philips|sagem|wellcom|bunjalloo|maui|smartphone|iemobile|spice|bird|zte-|longcos|pantech|gionee|portalmmm|jig browser|hiptop|benq|haier|^lct|320x320|240x320|176x220/i)!= null?'touchstart':'click';
           var eventType='click';
            $(_config.pauseBtnSelector).on(eventType, function () {
                _game.pause();
                $self.hide();
                dialog.init({containerSelector: '.page-dialog', type: dialog.TYPE_RESUME});
            });


    }


    var game = {

        reset: function () {
            this.levs = _config.levs;//所有关卡,数组
            this.curLev = -1;//当前关卡
            this.curScore = -1;//当前得分
            this.ticker = null;//计时器,倒计时用
            this.leftTime = 60;//剩余时间
            this.isPaused = false;
            $timerView.text('');
            $scoreView.text('');
        },
        start: function () {
            $self.show();
            this.reset();
            this.nextLevel();
            this.ticker && clearInterval(this.ticker);
            var me = this;
            this.ticker = setInterval(function () {
                if (!me.isPaused) {
                    --me.leftTime;
                    $timerView.text(me.leftTime + '');
                    if (me.leftTime === 0) {
                        me.gameover();


                    }
                }
            }, 1000);
        },
        gameover: function () { //游戏结束
            this.ticker && clearInterval(this.ticker);
            var me = this;
            $self.fadeOut(1000, function () {
                dialog.init({containerSelector: '.page-dialog', type: dialog.TYPE_OVER, score: me.curScore});
            });
        },
        pause: function () { //暂停游戏
            this.isPaused = true;
        },
        resume: function () { //继续游戏
            this.isPaused = false;
            $self.show();
        },
        nextLevel: function () {
            this.curLev = this.curLev === this.levs.length - 1 ? this.curLev : this.curLev + 1;//控制不超出数组边界
            this.curScore += 1;
            $scoreView.text('得分: ' + this.curScore);
            this.drawRects();
        },
        drawRects: function () {
            gameView.removeAllChildren();
            var num = this.levs[this.curLev];//当前关卡每行列应有的方块数
            var width = (stage.canvas.width - _config.gap * (num - 1)) / num;
            var height = (stage.canvas.height - _config.gap * (num - 1)) / num;
            var color = randomColor();
            var pickedX = _randomPick(0, num - 1);
            var pickedY = _randomPick(0, num - 1);
            var gap = _config.gap;
            var lightenRatio = this.getLightenRatio();
            for (var i = 0; i < num; i++) {
                for (var j = 0; j < num; j++) {
                    var rec;
                    if (i === pickedX && j === pickedY) {
                        rec = new Rectangle(width, height, color, lightenRatio, Rectangle.TYPE_PICKED);//创建特殊方块
                        (function (me) {
                            rec.addEventListener('mousedown', function () {
                                me.nextLevel();
                            })
                        })(this);//注意闭包


                    } else {
                        rec = new Rectangle(width, height, color, lightenRatio, Rectangle.TYPE_NORMAL);//创建普通方块
                    }

                    gameView.addChild(rec);
                    rec.x = (width + gap) * i;//偏移,不重复排列
                    rec.y = (height + gap) * j;
                }

            }
        },
        getLightenRatio: function () {  //由当前关卡数获取亮度增加比例
            var minValue = 0.2, maxValue = 0.6;
            return maxValue - (maxValue - minValue) / (this.levs.length - 1) * this.curLev

        }


    }

    //随机标记目标位置
    function _randomPick(minValue, maxValue) {
        return Math.ceil(Math.random() * (maxValue - minValue + 1)) - 1;
    }

    function randomColor() {    //获取随机颜色值
        var str = Math.ceil((Math.random() * 16777215)).toString(16); //把数字转换成16进制
        if (str.length < 6) {
            str = "0" + str;
        }
        return "#" + str;
    }

    return {
        init: _init,
        game: game
    };
});