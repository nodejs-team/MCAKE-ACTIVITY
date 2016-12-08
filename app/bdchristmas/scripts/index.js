;(function(){
    function initNum(){
        var $input = $('.pro-num input');
        var cc = '磅';
        $input.each(function(ix, input){
            var $el = $(this);
            var min = $el.attr('data-min') || 0;
            var max = $el.attr('data-max') || 10;
            var $minu = $el.siblings('.minus');
            var $plus = $el.siblings('.plus');
            $el.on('blur', function(){
                var val = parseInt(this.value);
                if(!val){
                    this.value = min+cc;
                } else if(val>max){
                    this.value = max+cc;
                } else {
                    this.value = val+cc;
                }
            });
            $minu.on('click', function(){
                var val = parseInt($el.val());
                if(val>min){
                    $el.val((--val)+cc);
                }
            });
            $plus.on('click', function(){
                var val = parseInt($el.val());
                if(val<max){
                    $el.val((++val)+cc);
                }
            })
        })
    }

    function BDSlider(el, options){
        this.$wrapper = $(el);
        this.$items = this.$wrapper.children();
        this.percentage = 0.8;
        this.$next = $(options.next);
        this.$prev = $(options.prev);
        this.wrapWidth = this.$wrapper.width();
        this.wrapHeight = this.$wrapper.height();
        this.itemWidth = this.$items.width();
        this.itemHeight = this.$items.height();
        this.isSliding = false;
        // console.log(this.wrapHeight,this.itemHeight)
        this.position = {
            center: {
                top:0,
                left:(this.wrapWidth-this.itemWidth)/2,
                width: this.itemWidth,
                height: this.itemHeight
            },
            left: {
                top: (this.wrapHeight - this.itemHeight*this.percentage) / 2,
                left: 0,
                width: this.itemWidth * this.percentage,
                height: this.itemHeight * this.percentage
            },
            right: {
                top: (this.wrapHeight - this.itemHeight*this.percentage) / 2,
                left: this.wrapWidth - this.itemWidth * this.percentage,
                width: this.itemWidth * this.percentage,
                height: this.itemHeight * this.percentage
            }
        };
        this.current = 0;
        this.total = this.$items.length;
        this.init();
    }
    BDSlider.prototype = {
        constructor: BDSlider,
        next: function(){

            this.current--;
            if(this.current<0){
                this.current = this.total-1;
            }
            this.sliding('right');
        },
        prev: function(){
            this.current++;
            if(this.current>=this.total){
                this.current = 0;
            }
            this.sliding('left');
        },
        sliding: function(direction){
            if(this.isSliding) return;
            this.isSliding = true;
            var self = this;
            this.$items.each(function(ix, el){
                if(ix == self.current){
                    $(el).css('z-index',3).animate(self.position.center,500, function(){
                        self.isSliding = false;
                    }).removeClass('slideRight slideLeft').addClass('slideCenter').find('span').animate({
                        bottom: '33px',
                        'font-size': '14px'
                    });
                }
                if(ix == (self.current+1)%3){
                    $(el).css('z-index',direction==='right'? 2 : 1).animate(self.position.right,500)
                        .removeClass('slideCenter slideLeft').addClass('slideRight').find('span').animate({
                        bottom: '25px',
                        'font-size': '12px'
                    });
                }
                if(ix == (self.current-1+3)%3){
                    $(el).css('z-index',direction==='left'? 2 : 1).animate(self.position.left, 500)
                        .removeClass('slideCenter slideRight').addClass('slideLeft').find('span').animate({
                        bottom: '25px',
                        'font-size': '12px'
                    });
                }
            })
        },
        init: function(){
            var self = this;
            this.sliding();
            this.$next.on('click', function(){
                self.next();
            })
            this.$prev.on('click', function(){
                self.prev();
            })
        }
    }

    function startLoading(){
        var loader = new Loader('images/'), domLoad = document.getElementById('evt_loading');
        loader.addGroup('preload', resData);
        loader.on('progress', function(groupName, ix, len){
            domLoad.innerHTML = parseInt(ix/len*100) + '%';
        })
        loader.on('complete', function(groupName){
            domLoad.style.display = 'none';
            document.getElementById('evt_container').style.display = 'block';
            initNum();
            new BDSlider('#bdSlider', {
                prev: '.slidePrev',
                next: '.slideNext'
            })
        });
        loader.loadGroup('preload');
    }
    startLoading();
})()