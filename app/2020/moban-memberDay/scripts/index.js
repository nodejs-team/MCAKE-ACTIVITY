;(function(){
    function fixImageSrc(res){
        var imgs = document.getElementsByTagName('img');
        for(var i=0,len=imgs.length; i<len; i++){
            var img = imgs[i];
            var dataSrc = img.getAttribute('src-fix');
            var data = res[dataSrc];
            if(dataSrc && data){
                img.setAttribute('src', data.url);
            }
        }
    }

    function px2rem(d) {
        var val = parseFloat(d) * 10 / 750;
        if (typeof d === 'string' && d.match(/px$/)) {
          val += 'rem';
        }
        return val;
    }

    function rem2px(d) {
        var val = parseFloat(d) * 750 / 10;
        if (typeof d === 'string' && d.match(/rem$/)) {
          val += 'px';
        }
        return val;
    }

    function formatResData(objConfig) {
        if( !( typeof objConfig === 'object') ) return [];
        if( objConfig instanceof Array) return objConfig;
        var frames = [];
        for( var i in objConfig ){
          objConfig[i].key = i;
          frames.push(objConfig[i]);
        }
        return frames.sort(function (a, b) {
          return parseInt(a.key.replace(/^[^\d]+/, "")) - parseInt(b.key.replace(/^[^\d]+/, ""));
        });
    }

    var loader;



    function startLoading(){
        loader = new Loader('images/');
        var domLoad = document.getElementById('evt_loading');
        domLoad.style.display = 'block';
        loader.addGroup('preload', resData);
        loader.on('progress', function(groupName, ix, len){
            domLoad.innerHTML = parseInt(ix/len*100) + '%';
        });
        loader.on('complete', function(groupName){
            fixImageSrc(loader.getAll());
            domLoad.style.display = 'none';
            document.getElementById('evt_content').style.display = 'block';
             loadComplete();
        });
        loader.loadGroup('preload');
    }
    startLoading();

    var loadComplete = function () {
        /*日期判断，更换日历*/
        var vDate = new Date();
        var myDate = vDate.getFullYear() + '-' + (vDate.getMonth() + 1) + '-' + vDate.getDate(); /*解决安卓浏览器时间显示问题*/
        var myDay = vDate.getDate();
        switch (myDay){
            case 3:
                $(".calendar img").attr("src","https://act.mcake.com/fangli/2020/wap/memberDay-2yue/images/calendar-1.png");
                break;
            case 10:
                $(".calendar img").attr("src","https://act.mcake.com/fangli/2020/wap/memberDay-2yue/images/calendar-2.png");
                break;
            case 17:
                $(".calendar img").attr("src","https://act.mcake.com/fangli/2020/wap/memberDay-2yue/images/calendar-3.png");
                break;
            case 24:
                $(".calendar img").attr("src","https://act.mcake.com/fangli/2020/wap/memberDay-2yue/images/calendar-4.png");
                break;
            case 31:
                $(".calendar img").attr("src","https://act.mcake.com/fangli/2020/wap/memberDay-2yue/images/calendar-5.png");
                break;
        }


        /*initScroll();  新版wap端跳转新页面再返回来之后，页面无法滑动了*/
    };

})();



