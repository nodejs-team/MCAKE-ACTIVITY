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



   /*推荐列表选择磅数*/
    function  Select() {
        var discount = 0.85;
        var price = 0;
        var postid = 0;
        var totalPrice = 0;
        $(".product .pro-li").each(function(){
            var self = $(this);

            $(this).find(".selects-l").on("change",function(){
                price= self.find("option:selected",this).data("price");
                postid = self.find("option:selected",this).data("postid");
                console.log(price);
                totalPrice = price*discount;
                totalPrice = parseFloat(totalPrice.toFixed(2));
                self.find(".pro-price").text(totalPrice);
                self.find(".old-price").text(price);
                self.find(".postid").data("postid",postid);
            });

            /*初始化*/
            price=  $(this).find("option:selected",this).data("price");
            postid =  $(this).find("option:selected",this).data("postid");
            $(this).find(".pro-price").html(price*discount);
            $(this).find(".old-price").html(price);

        });
        //$(".selects-l").val("200克");

    }


    /*主页磅数选择*/
    /*蛋糕
     * 1磅减40元，
     * 2磅减60元，
     * 3磅减80元，
     * 5磅减140元
     * */
    function Price(els,opts,disArr) {
        this.$els = $(els);
        this.$add = this.$els.find(opts.add);
        this.$reduce = this.$els.find(opts.reduce);
        this.num=0;
        this.max=50;
        this.oldPrice =0;
        this.totalOldprice =0;
        this.totalPrice =0;
        this.dis = 0;
        this.disArr=disArr;
        this.disCount = 0;
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
            self.numCounts(ele);
        },
        reduce:function (ele) {
            var self = this;
            self.num = ele.parents(".price").find('.num').val();
            if(self.num>1){
                self.num--;
            }
            ele.siblings().find('.num').val(self.num);
            self.numCounts(ele);
        },
        /*数量加减后计算价格*/
        numCounts:function (ele) {
            var self = this;
            var cur = ele.parents(".price").find('.price_p li.cur');
            self.oldPrice = cur.data('oldprice');
            self.num = ele.parents(".price").find('.num').val();
            var ix = parseInt(self.num / 2);

            self.bs = cur.data('bs');
            self.disCount = self.disFun(self.bs,self.disArr); /*计算折扣*/

            self.totalOldprice =self.oldPrice * self.num;
            self.totalPrice =(self.oldPrice - self.disCount) * self.num;
            ele.parents(".price").find('.old-price').html(self.totalOldprice);
            ele.parents(".price").find('.now-price').html(self.totalPrice);
        },
        /*磅数选择后计算价格*/
        counts:function (ele) {
            var self = this;
            self.oldPrice = ele.data('oldprice');
            self.num = ele.parents(".price").find('.num').val();
            var ix = parseInt(self.num / 2);

            self.bs = ele.data('bs');
            self.disCount = self.disFun(self.bs,self.disArr); /*计算折扣*/

            self.totalOldprice =self.oldPrice * self.num;
            self.totalPrice =(self.oldPrice - self.disCount) * self.num;
            ele.parents(".price").find('.old-price').html(self.totalOldprice);
            ele.parents(".price").find('.now-price').html(self.totalPrice);
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
                var totalNum = $(this).find(".num").val();
                var totalOldprice = Oldprice * totalNum;
                var ix = parseInt(totalNum / 2);

                self.bs = $(this).find('.price_p li.cur').data('bs');
                self.disCount = self.disFun(self.bs,self.disArr); /*计算折扣*/
                var totalPrice =(Oldprice-self.disCount) * totalNum;

                $(this).find('.old-price').html(totalOldprice);
                $(this).find('.now-price').html(totalPrice);

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
                var index = $(this).index();
                ele.addClass('cur').siblings().removeClass('cur');
                ele.parents(".price").find(".icons").eq(index).addClass("on").siblings(".icons").removeClass("on"); /*icons切换*/
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
      // Select();
        new Price('.js_price',{
            add:'.add',
            reduce:'.reduce'
        },[20,30,0,0]);

        $(".xs_num .reduce").hover(function () {
            $(this).addClass("on");
        },function () {
            $(this).removeClass("on");
        });
        $(".xs_num .add").hover(function () {
            $(this).addClass("on");
        },function () {
            $(this).removeClass("on");
        });


        $(".product li").each(function () {
            var number = 1;
            var self = $(this);
            $(this).find(".reduce").click(function () {
                number--;
                if(number<=1){
                    number=1;
                }
                self.find(".num").text(number);
            });
            $(this).find(".add").click(function () {
                number++;
                if(number>=50){
                    number=50;
                }
                self.find(".num").text(number);
            });
        });

        initScroll();
    }
    var initScroll = function (){
        window.scrollAnimate('#evt_container', [
            {dom: '.banner-1',x:-50, y:-50,duration:500,delay:400}
            ,{dom: '.banner-2',x:50, y:-50,duration:500,delay:400}
            ,{dom: '.banner-3',x:-50, y:50,duration:500,delay:600}
            ,{dom: '.banner-4',x:50, y:50,duration:500,delay:600}
            ,{dom: '.banner-t',x:0, y:100,duration:500,delay:200}
            ,{dom: '.banner-btn',x:0, y:100,duration:500,delay:600}

             ,{dom: '.row1 .cake',x:-100, y:50,duration:500,delay:400}
             ,{dom: '.row1 .price',x:0, y:50,duration:500,delay:400}

            ,{dom: '.row2 .cake',x:100, y:50,duration:500,delay:400}
            ,{dom: '.row2 .price',x:0, y:50,duration:500,delay:400}

            ,{dom: '.code',x:0, y:50,duration:500,delay:400}

        ])
    };


})();