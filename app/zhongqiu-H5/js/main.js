var src='http://%65%64%6D%2E%6D%63%61%6B%65%2E%63%6F%6D/fangli/2018-wap/zhongqiu-H5/video4.mp4';
var select_type1 = null;
var select_type2 = null;
var select_type3 = null;
var select_type4 = null;
var select_type5 = null;
var select_type6 = null;

var time1_end = 10.5;
var time1_start = 7.5;
var time1_show = 7.5;   //选择按钮出现

var time2_end = 20;
var time2_start = 18;
var time2_show = 18;

var time3_end = 28;
var time3_start = 25;
var time3_show = 25;

var time4_end = 36;
var time4_start = 33;
var time4_show = 33;

var time5_end = 46.8;
var time5_start = 45;
var time5_show = 45;

var time6_end = 60;
var time6_start = 56;
var time6_show = 56;

var videoPlayer = null;
var video =document.getElementById("video");

var btn1 =document.getElementById("btn1");
var btn2 =document.getElementById("btn2");
var btn3 =document.getElementById("btn3");
var btn4 =document.getElementById("btn4");
var btn5 =document.getElementById("btn5");
var btn6 =document.getElementById("btn6");
var btns =document.getElementById("btns");
var sharemask =document.getElementById("sharemask");
var music =document.getElementById("music");

var lastimg =document.getElementById("lastimg");
var replaybtn =document.getElementById("replaybtn");


function createPlayer() {
    videoPlayer=new MMD.VideoPlayer(
        {
            videoElement:document.getElementById('video'),//[必填],video元素;
            src:src,//[必填],video src;
            loop:false,//[可选],是否循环,默认false,true为循环;
            muted:false,//[可选],是否静音,默认false,IOS下只有IOS10生效,安卓生效;
            poster:'',//[可选],video默认图片;
            tryMultipleVideoPlayAtTheSameTime:false,//[可选],尝试同时播放多个视频,默认false;
            timesParam:[
                {name:'time1_end',time:time1_end},
                {name:'time1_show',time:time1_show},

                {name:'time2_end',time:time2_end},
                {name:'time2_show',time:time2_show},

                {name:'time3_end',time:time3_end},
                {name:'time3_show',time:time3_show},

                {name:'time4_end',time:time4_end},
                {name:'time4_show',time:time4_show},

                {name:'time5_end',time:time5_end},
                {name:'time5_show',time:time5_show},

                {name:'time6_end',time:time6_end},
                {name:'time6_show',time:time6_show},

            ],//[可选],video currenttime时间点;
            onTimes:function(name){
                /*console.log(select_type1,name);*/
                if(!select_type1&&name==='time1_show'){
                    // video.volume = 0;
                    btn1.style.display = "block";

                }
                if(!select_type1&&name==='time1_end'){
                    btn1.style.display = "block";
                    videoPlayer.currentTimeAndPlay = time1_start;
                    /*console.log("循环1:"+select_type1);*/

                }

                if(!select_type2&&name==='time2_show'){
                    // video.volume = 0;
                    btn2.style.display = "block";
                }
                if(!select_type2&&name==='time2_end'){
                    btn2.style.display = "block";
                    /*console.log("循环2");*/
                    videoPlayer.currentTimeAndPlay = time2_start;
                }

                if(!select_type3&&name==='time3_show'){
                    // video.volume = 0;
                    btn3.style.display = "block";

                }
                if(!select_type3&&name==='time3_end'){
                    btn3.style.display = "block";
                    /*console.log("循环3");*/
                    videoPlayer.currentTimeAndPlay = time3_start;
                }

                if(!select_type4&&name==='time4_show'){
                    // video.volume = 0;
                    btn4.style.display = "block";


                }
                if(!select_type4&&name==='time4_end'){
                    btn4.style.display = "block";
                    /*console.log("循环4");*/
                    videoPlayer.currentTimeAndPlay = time4_start;
                }

                if(!select_type5&&name==='time5_show'){
                    // video.volume = 0;
                    btn5.style.display = "block";

                }
                if(!select_type5&&name==='time5_end'){

                    btn5.style.display = "block";
                    /*console.log("循环5");*/
                    videoPlayer.currentTimeAndPlay = time5_start;
                }

                if(!select_type6&&name==='time6_show'){
                    // video.volume = 0;
                    btn6.style.display = "block";
                }
                if(!select_type6&&name==='time6_end'){
                    btn6.style.display = "block";
                    /*console.log("循环6");*/
                    videoPlayer.currentTimeAndPlay = time6_start;

                }

                switch (name)
                {
                    case 'firstPoint':
                        break;
                }
            },//[可选],video currenttime回调;
            onStart:function(){

            },//[可选],video第一个画面出现回调;
            onEnd:function(){
                /*console.log('video end');*/
            }//[可选],video播放完成回调;
        }
    );

}


var games={
    loading:function () {
        /*百分比计算*/
        var per = 0;
        var inter = setInterval(function () {
            per++;

            if(per<100){
                document.getElementById("percent").innerHTML = per+"%";
            }
            else{
                clearInterval(inter);

                document.getElementById("percent").innerHTML = "100%";
                document.getElementById("startbtn").style.display = "block";

              //首页加载完成之后，自动播放
              setTimeout(function () {
                  /*视频开始播放*/
                  videoPlayer.play();
                  document.getElementById('splash').style.display = 'none';
                  document.getElementById("startbtn").style.display = "none";
              },5000);


                // //false时,则需要通过用户点击才能播放视频;
                // if(videoPlayer.isVideoCanAutoPlay)
                // {
                //     document.getElementById('splash').style.display = 'none';
                //     document.getElementById('startbtn').style.display = 'none';
                //     videoPlayer.play();
                // }

            }

        },100);
        /*loading动画结束，视频开始*/
        startbtn.addEventListener(
            "click",
            function(event){
                document.getElementById('splash').style.display = 'none';
                document.getElementById('startbtn').style.display = 'none';
                audio.play();
                videoPlayer.play();
            }
        )

    },

    gamePlay:function () {
        var self = this;
        /*点击按钮开始播放*/
        video = document.getElementById("video");
        btn1.addEventListener("touchstart",function () {
            videoPlayer.currentTimeAndPlay=time1_end;
            select_type1 = 1;

            btn1.style.display = "none";
            answer.push(select_type1);
            //video.onclick = null;
        })
        btn2.addEventListener("touchstart",function () {
            videoPlayer.currentTimeAndPlay=time2_end;
            select_type2 = 2;
            btn2.style.display = "none";
            answer.push(select_type2);

            //video.onclick = null;
        })
        btn3.addEventListener("touchstart",function () {
            videoPlayer.currentTimeAndPlay=time3_end;
            select_type3 =3;
            btn3.style.display = "none";
            answer.push(select_type3);
            //video.onclick = null;
        })
        btn4.addEventListener("touchstart",function () {
            videoPlayer.currentTimeAndPlay=time4_end;
            select_type4 = 4;
            btn4.style.display = "none";
            answer.push(select_type4);
            //video.onclick = null;
        })
        btn5.addEventListener("touchstart",function () {
            videoPlayer.currentTimeAndPlay=time5_end;
            select_type5 = 5;
            btn5.style.display = "none";
            answer.push(select_type5);
            //video.onclick = null;
        })
        btn6.addEventListener("touchstart",function () {
            videoPlayer.currentTimeAndPlay=time6_end;
            select_type6 = 6;
            btn6.style.display = "none";
            answer.push(select_type6);

            $(".cards-edit,.card-tips").fadeIn(0);
            self.gameEnd();
            //video.onclick = null;
        })

        this.gameEnd();
    },

    gameEnd:function () {
        video.onended = function(){
            video.style.display = "none";
            //back.style.display = "block";
            $(".cards-edit,.card-tips").fadeIn(0);
            /*console.log("视频结束啦。。。end");*/
            makeCards.init();
        };
    },
    share:function () {
        
    },
    events:function () {
        var self = this;
        var audio = $("#audio")[0];
        /**/
        var musicon = true;
        music.addEventListener(
            "touchstart",
            function(event){
                if(musicon){
                    video.muted = true;
                    audio.pause();
                    musicon= false;
                    music.style.background = "url('http://edm.mcake.com/fangli/2018-wap/zhongqiu-H5/imgs/music_off.png') no-repeat center";
                    music.style.backgroundSize = "100%";

                }else{
                    video.muted = false;
                    audio.play();
                    musicon= true;
                    music.style.background = "url('http://edm.mcake.com/fangli/2018-wap/zhongqiu-H5/imgs/music_on.png') no-repeat center";
                    music.style.backgroundSize = "100%";
                }

            }
        );

        /*重新播放*/

        $(".btn-fyue").click(function () {

            answer.slice(0,answer.length);
            select_type1 = null;
            select_type2 = null;
            select_type3 = null;
            select_type4 = null;
            select_type5 = null;
            select_type6 = null;

            var videobox =document.getElementById("videobox").cloneNode(true);
            document.body.removeChild(document.getElementById("videobox"));
            document.body.appendChild(videobox);
            createPlayer();


            document.getElementById("video").style.display = "block";
            videoPlayer.play();

            $(".words .text").fadeIn(500);
            $(".words textarea,.words samp").fadeOut(0);
            $(".words textarea").val("");

            $(".cards-edit,.cards-end,.card-tips").fadeOut(0);

        });

        document.addEventListener(
            'touchmove',
            function(event){
                event.preventDefault();
            },
            { passive: false }
        );
    },
    init:function () {

        createPlayer();  /*边加载视频*/
        this.loading(); /*加载倒计时*/
        this.gamePlay(); /*点击继续播放*/
        this.events();

    }
}




function isIphoneX(){
    return /iphone/gi.test(navigator.userAgent) && (screen.height == 812 && screen.width == 375)
}
function isIphone(){
    return /iphone/gi.test(navigator.userAgent)
}
var is_weixin = (function(){return navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1})
if(is_weixin){
    document.getElementById("video").setAttribute("x5-video-player-type","h5")
    document.getElementById("video").setAttribute("x5-video-player-fullscreen","true")
}
function hengshuping(){
    if(window.orientation==180||window.orientation==0){
        // alert("竖屏状态！")
        var tipmask =document.getElementById("tipmask");
        tipmask.style.display = "none";
    }
    if(window.orientation==90||window.orientation==-90){
        // alert("横屏状态！")
        var tipmask =document.getElementById("tipmask");
        tipmask.style.display = "block";
        document.getElementById("video").style.width = "100%"
    }
}
hengshuping();
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);


if(isIphoneX()){
    var path = "imgs/";
}else{
    var path = "imgs/andr/";
}

var random = (Math.floor(Math.random()*6));
var answer = [];


// var jumpbtn =document.getElementById("jumpbtn");
if(isIphoneX()){
    lastimg.style.width = "95%";
    lastimg.style.margin = "1% auto";
    btns.style.backgroundSize = "69%";
    document.getElementById("percent").style.left = "-80%";
}


window.onload=function () {
    var docW = $(document).width();
    var docH = $(document).height();
    $(".cards.cards-complete .item").height(docW*1.1);
    $(".cards,#splash,.card-tips,.share").height(docH);

};

