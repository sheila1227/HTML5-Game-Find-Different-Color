requirejs.config({
    "baseUrl": "./js",
    "paths": {
        "app": "app",
        "jquery": "//libs.baidu.com/jquery/2.0.0/jquery.min" //结尾不要加.js扩展名
    }
});

// Load the welcome module to start the app
requirejs(["welcome"], function(welcome) {
    welcome.init('.page-welcome.page',{titleContent:'看你有多色aa'});
});