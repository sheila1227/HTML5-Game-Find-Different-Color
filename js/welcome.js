define(["jquery"], function($) {
    var _config={
        titleContent:'看你有多色',
        titleSelector:'.title',
        hintText:'找出所有色块里颜色不同的一个',
        hintSelector:'.hint',
        playBtnSelector:'.btn-play',
        playBtnText:'开始游戏'
    }
    var $self;//容器

    //初始化,入口
    var _init=function(containerSelector,config){
        $self=$(containerSelector).show();
        _config= $.extend(_config,config);
        _render();
        _attachEvent();
    }

    //渲染界面
    function _render(){
        $(_config.titleSelector,$self).text(_config.titleContent);
        $(_config.hintSelector,$self).text(_config.hintText);
        $(_config.playBtnSelector,$self).text(_config.playBtnText);
    }

    function _attachEvent(){
        $(_config.playBtnSelector,$self).on('click',function(){
            requirejs(['play'],function(play){
                $self.hide();
                play.init({containerSelector:'.page-play'});
            })
        })
    }

    return{
        init:_init
    };
});