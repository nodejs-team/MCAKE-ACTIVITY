(function () {
  function Slider(container, opts,callBack){
        this.$outer = $(container);

        this.$inner = this.$outer.children();
        this.$prev = $(opts.prev);
        this.$next = $(opts.next);
        this.$els = this.$inner.children();
        this.total = this.$els.length;
        this.w = this.$els.outerWidth(true);
        this.timer = null;
        this.isSliding = false;
        this.autoplay = opts.autoplay || false;
        this.init();
        callBack && callBack();
    }
    var proto = Slider.prototype;
    proto.init = function(){
        var self = this;
        var $last = this.$els.eq(this.total-1);
        if(this.total<6){
            $last = this.$els.clone().appendTo(this.$inner).eq(this.total-1);
            this.total *= 2;
        }

        this.$outer.find("ul").width(this.$els.width()*(this.total+1));
        $last.prependTo(this.$inner);

        this.$inner.css('marginLeft', -this.w);

        this.$prev.on('click', function(){
            self.prev();
        })
        this.$next.on('click', function(){
            self.next();
        })
        this.$outer.on('mouseenter', function(){
            clearTimeout(self.timer);
        })
        this.$outer.on('mouseleave', function(){
            self.auto();
        })
        this.auto();
    }
    proto.prev = function(){
        if(this.isSliding) return;
        this.isSliding = true;
        var self = this;
        this.$inner.animate({
            marginLeft: 0
        }, 500, function(){
            self.$inner.children().eq(self.total-1).prependTo(self.$inner);
            self.$inner.css('marginLeft', -self.w);
            self.isSliding = false;
        })
    }
    proto.next = function(){

        if(this.isSliding) return;
        this.isSliding = true;
        var self = this;
        this.$inner.animate({
            marginLeft: -this.w*2
        }, 500, function(){
            self.$inner.children().eq(0).appendTo(self.$inner);
            self.$inner.css('marginLeft', -self.w);
            self.isSliding = false;
        })
    }
    proto.auto = function(){
        if(!this.autoplay) return;
        var self = this;
        function delay(){
            self.timer = setTimeout(function(){
                self.next();
                delay();
            }, 5000)
        }
        delay();
    }


    //初始化折扣价
    /*function initDisprice(discount) {
        $('.products1 li').each(function () {
            var val= $(this).find('.price').val();
            $(this).find(".dis-price").html(val-discount);
        })
    }*/

    function initNum(ele,discount) {
        var items = [];
        $(ele).each(function(i,el){
            var ponds = $(el).attr('data-pond');
            var ids = $(el).attr('data-price');
            var postId = $(el).attr('data-postid');

            if(ponds){
                items.push({
                    ponds: ponds.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")}),
                    ix: 0,
                    ids: ids.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")}),
                    postId: postId.split(',').map(function(str){ return str.replace(/(^\s*)|(\s*$)/g, "")})
                })
            }

            var index = i;
            var currentItem = items[index];

            var num = 1;
            var totalPrice = 0;

            /*判断是否满减*/
            /*function isDiscount(total,mix,discount) {
                if(total>=mix){
                    total = total - discount;
                    return total;
                }
                return total;
            }*/
            /*折扣*/
            function isDiscount(total,n,discount) {   /*满min见discount元*/
                total = total * discount;
                return total.toFixed(2);
            }

            /*
             *蛋糕磅数加
             */
            $(this).find(".plus").on('click', function(){

                var ix = ++currentItem.ix;
                if(ix>=currentItem.ponds.length-1){
                    ix =currentItem.ix = currentItem.ponds.length-1;
                }

                /*是否有折扣*/
                totalPrice = currentItem.ids[ix]*num; /*总价格*/
                totalPrice = isDiscount(totalPrice,198,discount); /*满足条件折扣*/


                $(this).parents("li").find(".bang").html(currentItem.ponds[ix]+' / ￥'+currentItem.ids[ix]);

                $(this).parents("li").find(".postid").data("postid", currentItem.postId[ix]);
                $(this).parents("li").find(".price").html(currentItem.ids[ix]*num);
                $(this).parents("li").find(".dis-price").html(totalPrice);


            });
            /*
             *蛋糕磅数减少
             */
            $(this).find(".minus").on('click', function(){
                var ix = --currentItem.ix;
                if(ix<=0){
                    ix=currentItem.ix = 0;
                }

                /*是否有折扣*/
                totalPrice = currentItem.ids[ix]*num; /*总价格*/
                totalPrice = isDiscount(totalPrice,198,discount); /*满足条件折扣*/

                $(this).parents("li").find(".bang").html(currentItem.ponds[ix]+' / ￥'+currentItem.ids[ix]);
                $(this).parents("li").find(".postid").data("postid", currentItem.postId[ix]);
                $(this).parents("li").find(".price").html(currentItem.ids[ix]*num);
                $(this).parents("li").find(".dis-price").html(totalPrice);
            });


            /*数量加*/
            $(this).find(".add").on('click', function(){
                num++;
                var ix = currentItem.ix;

                if(num>=50){
                    num=50;
                }

                /*是否有折扣*/
                totalPrice = currentItem.ids[ix]*num; /*总价格*/
                totalPrice = isDiscount(totalPrice,198,discount); /*满足条件折扣*/

                $(this).parents("li").find(".num").html(num);
                $(this).parents("li").find(".postid").data("postid", currentItem.postId[ix]);
                $(this).parents("li").find(".price").html(currentItem.ids[ix]*num);
                $(this).parents("li").find(".dis-price").html(totalPrice);



            });

            /*数量减*/
            $(this).find(".jian").on('click', function(){
                num--;
                if(num<=1){
                    num = 1;
                }
                var ix = currentItem.ix;

                /*是否有折扣*/
                totalPrice = currentItem.ids[ix]*num; /*总价格*/
                totalPrice = isDiscount(totalPrice,198,discount); /*满足条件折扣*/

                $(this).parents("li").find(".num").html(num);
                $(this).parents("li").find(".postid").data("postid", currentItem.postId[ix]);
                $(this).parents("li").find(".price").html(currentItem.ids[ix]*num);
                $(this).parents("li").find(".dis-price").html(totalPrice);
                console.log($(this).parents("li").find(".postid").data("postid"));

            });


            /*初始化*/

            /*是否有折扣*/
            totalPrice = currentItem.ids[0]; /*总价格*/
            totalPrice = isDiscount(totalPrice,198,discount); /*满足条件折扣*/
            $(this).find(".bang").html(currentItem.ponds[0]+' / ￥'+currentItem.ids[0]);
            $(this).find(".dis-price").html(totalPrice);
            $(this).find(".price").html(currentItem.ids[0]*num);
            $(this).find(".postid").data("postid", currentItem.postId[0]);

            var self = $(this);

            $(this).find(".buybtn").click(function () {
                var postId = self.find(".postid").data("postid");
                var totalPrice = self.find(".dis-price").text();
                goBuy(postId,totalPrice);

                //alert(postId)
            });


        });
    };

    new Slider('.slideOuter1',{
            prev: '.prev',
            next: '.next',
            autoplay: true
        },function () {
        initNum(".products1 li",0.8);
    });

    new Slider('.slideOuter2',{
        prev: '.prev',
        next: '.next',
        autoplay: true
    },function () {
        initNum(".products2 li",0.85);
    });


        initNum();
  

})();