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

        initScroll();



    }

    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
              {dom: '.banner-title',x:0, y:-50,duration:500,delay:200}


        ])
    };



    function Price(els,opts) {
        this.$els = $(els);
        this.$add = this.$els.find(opts.add);
        this.$reduce = this.$els.find(opts.reduce);
        this.num=0;
        this.max=50;
        this.oldPrice =0;
        this.totalOldprice =0;
        this.totalPrice =0;
        this._init();
    }

    Price.prototype={
        add:function (ele) {
            var self = this;
            self.num = ele.parents(".price").find('.num').val();
            if(self.num<self.max){
                self.num++;
            }
            ele.siblings().find('.num').val(self.num);
            ele.siblings().find('.num-span').html(self.num);
            self.numCounts(ele);
        },
        reduce:function (ele) {
            var self = this;
            self.num = ele.parents(".price").find('.num').val();
            if(self.num>1){
                self.num--;
            }
            ele.siblings().find('.num').val(self.num);
            ele.siblings().find('.num-span').html(self.num);
            self.numCounts(ele);
        },
        numCounts:function (ele) {
            var self = this;
            var cur = ele.parents(".price").find('.price_p li.cur');
            self.oldPrice = cur.data('oldprice');
            self.num = ele.parents(".price").find('.num').val();
            var ix = parseInt(self.num / 2);
            self.totalOldprice =self.oldPrice * self.num;
            self.totalPrice =(self.oldPrice * self.num) - (self.oldPrice/2 * ix);
            ele.parents(".price").find('.old-price').html(self.totalOldprice);
            ele.parents(".price").find('.now-price').html(self.totalPrice);
        },
        counts:function (ele) {
            var self = this;
            self.oldPrice = ele.data('oldprice');
            self.num = ele.parents(".price").find('.num').val();
            var ix = parseInt(self.num / 2);
            self.totalOldprice =self.oldPrice * self.num;
            self.totalPrice =(self.oldPrice * self.num) - (self.oldPrice/2 * ix);
            ele.parents(".price").find('.old-price').html(self.totalOldprice);
            ele.parents(".price").find('.now-price').html(self.totalPrice);
        },
        /*初始化*/
        numInit:function () {
            var self = this;
            var Oldprice =0;
            $(".num").val(1);
            this.$els.each(function () {

                Oldprice = $(this).find('.price_p li.cur').data('oldprice');
                var totalNum = $(this).find(".num").val();
                var totalOldprice = Oldprice * totalNum;
                var ix = parseInt(totalNum / 2);
                var totalPrice =(Oldprice * totalNum) - (Oldprice/2 * ix);
                $(this).find('.old-price').html(totalOldprice);
                $(this).find('.now-price').html(totalPrice);

            });

        },
        /*磅数选择*/
        bsSelect:function (ele) {
            var self = this;
            ele.click(function () {
                ele.addClass('cur').siblings().removeClass('cur');
                self.counts($(this));
            });
        },
        _init:function () {
            var self = this;

            this.numInit();

            this.$els.find('.price_p li').each(function () {
                self.bsSelect($(this));
            });

            this.$add.hover(function () {
                $(this).addClass("on");
            },function () {
                $(this).removeClass("on");
            });
            this.$reduce.hover(function () {
                $(this).addClass("on");
            },function () {
                $(this).removeClass("on");
            });

            this.$add.click(function () {
                self.add($(this));
            });
            this.$reduce.click(function () {
                self.reduce($(this));
            });
        }
    }




})();