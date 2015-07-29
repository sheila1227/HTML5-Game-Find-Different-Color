define(["jquery"], function($) {
    var TYPE_RESUME=0;//继续游戏界面
    var TYPE_OVER=1;//游戏结束界面

    var _config={
        containerSelector: '', //最外层容器
        titleSelector:'.title',
        btnSelector:'.btn',
        type:TYPE_RESUME
    }
    var $self;//容器
    var $title;//标题
    var $btn;//按钮
    var title=["瞎子", "色盲", "色郎", "色狼", "色鬼", "色魔", "超级色魔", "变态色魔", "孤独求色"];
    //初始化,入口
    var _init=function(config){

        _config= $.extend(_config,config);
        $self=$(_config.containerSelector).show();
        $title=$(_config.titleSelector,$self);
        $btn=$(_config.btnSelector,$self);
        render();
        bindEvent();
    }

    function render(){
        if(_config.type===TYPE_RESUME){
            $title.text('游戏暂停');
            $btn.text('继续游戏');
        }else if(_config.type===TYPE_OVER){
            _config.score!==undefined?$title.html("<span style='color:#000;font-size:1.5rem'>经鉴定,您是\n</span><br/>"+getTitle(_config.score)):$title.html('');
            $btn.text('再来一次');
        }
    }

    //由得分获取级别
    function getTitle(score){
        if(title.length>0){
            if(score<=15){ //15或15以下都是瞎子级别
                return title[0]+'lv'+score;
            }else{
                var n=Math.ceil((score-15)/5);
                var result;
                title[n]?result=title[n]+'lv'+score:title[title.length-1]+score;
                return result;
            }
        }else{
            return '';
        }
    }



    function bindEvent(){
        $btn.off('click');//移除所有事件绑定
        requirejs(['play'],function(play){
            var u = navigator.userAgent, app = navigator.appVersion;
            var isMobile =!!u.match(/AppleWebKit.*Mobile.*/)|| !!u.match(/AppleWebKit/);//是否为移动终端

            //var eventType=navigator.userAgent.match(/iphone|android|phone|mobile|wap|netfront|x11|java|opera mobi|opera mini|ucweb|windows ce|symbian|symbianos|series|webos|sony|blackberry|dopod|nokia|samsung|palmsource|xda|pieplus|meizu|midp|cldc|motorola|foma|docomo|up.browser|up.link|blazer|helio|hosin|huawei|novarra|coolpad|webos|techfaith|palmsource|alcatel|amoi|ktouch|nexian|ericsson|philips|sagem|wellcom|bunjalloo|maui|smartphone|iemobile|spice|bird|zte-|longcos|pantech|gionee|portalmmm|jig browser|hiptop|benq|haier|^lct|320x320|240x320|176x220/i)!= null?'touchstart':'click';
            var eventType='click';
            if(_config.type===TYPE_RESUME){
                $btn.on(eventType,function (){
                    $self.hide();
                    play.game.resume();
                        });
            }else if(_config.type===TYPE_OVER){
                $btn.on(eventType,function (){
                    $self.hide();
                    play.game.start();
                });
            }
        })
    }


    return{
        init:_init,
        TYPE_RESUME:TYPE_RESUME,
        TYPE_OVER:TYPE_OVER
    };
});