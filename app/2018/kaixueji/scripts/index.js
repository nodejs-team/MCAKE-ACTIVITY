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


    /*主页磅数选择*/
    /*蛋糕
     * 1磅减40元，
     * 2磅减60元，
     * 3磅减80元，
     * 5磅减140元
     *  disArr 每磅立减金额
     * percent  折扣
     * double 第二件半价
     * */

    function Price(els,opts,disArr,percent,double) {
        this.$els = $(els);
        this.$add = this.$els.find(opts.add);
        this.$reduce = this.$els.find(opts.reduce);
        this.num=0;
        this.max=50;
        this.oldPrice =0;
        this.totalOldprice =0;
        this.bs = 0;
        this.totalPrice =0;
        this.dis = 0;
        this.disCount = 0;
        this.disArr = disArr; /*每磅立减金额*/
        this.percent = percent;  /*折扣*/
        this.double = double || 0;  /*第二件是否立减 1立减  0不立减*/

        this._init();
    }

    Price.prototype={
        add:function (ele) {
            var self = this;
            self.num = ele.parents(".price").find('.num').text()-0;
            if(self.num<self.max){
                self.num++;
            }
            ele.siblings().find('.num').text(self.num);
            self.numCounts(ele);
        },
        reduce:function (ele) {
            var self = this;
            self.num = ele.parents(".price").find('.num').text()-0;
            if(self.num>1){
                self.num--;
            }
            ele.siblings().find('.num').text(self.num);
            self.numCounts(ele);
        },
        /*数量加减后计算价格*/
        numCounts:function (ele) {
            var self = this;
            var cur = ele.parents(".price").find('.price_p li.cur');
            self.oldPrice = cur.data('oldprice');
            self.num = ele.parents(".price").find('.num').text()-0;
            var ix = parseInt(self.num / 2);

            self.bs = cur.data('bs');

            self.disCount = self.disFun(self.bs,self.disArr); /*计算折扣*/

            self.totalOldprice =self.oldPrice * self.num;

            if(this.double){ /*第二件半价*/
                var ix = parseInt(self.num / 2);  /*向下取整*/
                self.totalPrice =self.totalOldprice - self.oldPrice/2 * ix;
            }else{
                self.totalPrice =(self.oldPrice-self.disCount) * this.percent * self.num;
            }

            ele.parents(".price").find('.old-price').html(self.totalOldprice.toFixed(2));
            ele.parents(".price").find('.now-price').html(self.totalPrice.toFixed(2));
        },
        /*磅数选择后计算价格*/
        counts:function (ele) {
            var self = this;
            self.oldPrice = ele.data('oldprice');
            self.num = ele.parents(".price").find('.num').text()-0;
            var ix = parseInt(self.num / 2);

            self.bs = ele.data('bs');
            self.disCount = self.disFun(self.bs,self.disArr); /*计算折扣*/

            self.totalOldprice =self.oldPrice * self.num;

            if(this.double){ /*第二件半价*/
                var ix = parseInt(self.num / 2);  /*向下取整*/
                self.totalPrice =self.totalOldprice - self.oldPrice/2 * ix;
            }else{
                self.totalPrice =(self.oldPrice-self.disCount) * this.percent * self.num;
            }
            ele.parents(".price").find('.old-price').html(self.totalOldprice.toFixed(2));
            ele.parents(".price").find('.now-price').html(self.totalPrice.toFixed(2));
        },
        /*折扣：通过判断磅数决定减多少*/
        disFun:function (bs,discount) {
            switch (bs){
                case 1:
                    this.dis = discount[0];
                    break;
                case 2:
                    this.dis = discount[1];
                    break;
                case 3:
                    this.dis = discount[2];
                    break;
                case 5:
                    this.dis = discount[3];
                    break;
            }
            return this.dis;
        },
        /*初始化*/
        numInit:function () {
            var self = this;
            var Oldprice = 0;

            this.$els.each(function () {
                Oldprice = $(this).find('.price_p li.cur').data('oldprice');
                var totalNum = $(this).find(".num").text()-0;
                var totalOldprice = Oldprice * totalNum;
                var ix = parseInt(totalNum / 2);

                self.bs = $(this).find('.price_p li.cur').data('bs');
                self.disCount = self.disFun(self.bs,self.disArr); /*计算折扣*/
                var totalPrice =(Oldprice - self.disCount) * self.percent * totalNum;

                $(this).find('.old-price').html(totalOldprice.toFixed(2));
                $(this).find('.now-price').html(totalPrice.toFixed(2));

            });

        },
        /*磅数选择*/
        bsSelect:function (ele) {
            var self = this;
            ele.hover(function () {
                ele.addClass('hover').siblings().removeClass('hover');
            },function () {
                ele.removeClass('hover');
            });
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

            /*换购*/
            this.$els.find('.huangou').each(function () {
                var a = false;
                $(this).click(function () {
                    if(a){
                        $(this).find(".icon").addClass("on");
                        a = false;
                    }else{
                        $(this).find(".icon").removeClass("on");
                        a = true;
                    }
                });
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
    };


    var loadComplete = function () {
        $(".floater").fadeIn(100);
        new Price('.js_price1',{
            add:'.add',
            reduce:'.reduce'
        },[0,40,0,0],1);

        new Price('.js_price2',{
            add:'.add',
            reduce:'.reduce'
        },[0,0,0,0],1,1);



        initScroll();
    }
    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
             {dom: '.sec-top',x:0, y:-50,duration:500,delay:200}

             ,{dom: '.sec-2 .hongbao',x:0, y:50,duration:500,delay:200}
             ,{dom: '.sec-2 .khaoli',x:0, y:50,duration:500,delay:200}
             ,{dom: '.sec-main .se-title',x:0, y:50,duration:500,delay:200}

             ,{dom: '.sec-1 .se-title',x:0, y:50,duration:500,delay:200}
             ,{dom: '.sec-1 .cake-0',x:0, y:50,duration:500,delay:200}
             ,{dom: '.sec-1 .price',x:0, y:50,duration:500,delay:200}


             ,{dom: '.row1 .cake',x:100, y:0,duration:500,delay:200}
             ,{dom: '.row1 .price',x:-100, y:0,duration:500,delay:200}

            ,{dom: '.row2 .cake',x:-100, y:0,duration:500,delay:200}
            ,{dom: '.row2 .price',x:100, y:0,duration:500,delay:200}


            ,{dom: '.row3 .cake',x:100, y:0,duration:500,delay:200}
            ,{dom: '.row3 .price',x:-100, y:0,duration:500,delay:200}


            ,{dom: '.row4 .cake',x:-100, y:0,duration:500,delay:200}
            ,{dom: '.row4 .price',x:100, y:0,duration:500,delay:200}

            ,{dom: '.sec-zuhe .se-title',x:0, y:50,duration:500,delay:200}
            ,{dom: '.sec-zuhe .zuhe',x:0, y:50,duration:500,delay:200}
            ,{dom: '.sec-zuhe .kaixueli',x:0, y:50,duration:500,delay:200}


        ])
    };


})();

/*移动端通用
 *判断手机横竖屏状态
 * 翻转屏幕自动刷新页面
 */
function hengshuping() {
    if (window.orientation == 180 || window.orientation == 0) {
        window.location.reload();/*竖屏状态*/
    }
    if (window.orientation == 90 || window.orientation == -90) {
        window.location.reload(); /*横屏状态*/
    }
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);