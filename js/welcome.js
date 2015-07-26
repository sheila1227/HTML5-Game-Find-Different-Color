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

    var _init=function(containerSelector,config){
        $self=$(containerSelector);
        _config= $.extend(_config,config);
        _render();
    }

    function _render(){
        $(_config.titleSelector,$self).text(_config.titleContent);
        $(_config.hintSelector,$self).text(_config.hintText);
        $(_config.playBtnSelector,$self).text(_config.playBtnText);
    }

    function attachEvent(){

    }

    return{
        init:_init
    };
});