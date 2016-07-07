/**
 * @module  楔子
 * @author  jixiangac
 * @description  开场动画
 */
KISSY.add(function (S, Node, Event, Audio) {
    'use script';
    var BIRTH = [
       '1756年:奥地利作曲家莫扎特诞辰。',
       '1823年:法国作曲家拉洛（Edouard Lalo）出生。',
       '1832年:英国作家、数学家路易斯·卡罗出生',
       '1842年:德国图书馆学家、古典语文学家齐亚茨科出生。',
       '1859年:德国末代皇帝威廉二世诞辰。',
       '1878年:光复会成员陶成章出生。',
       '1893年:中华人民共和国的缔造者之一宋庆龄诞辰。',
       '1957年:美国漫画家、编剧、导演弗兰克·米勒出生。',
       '1964年:美国著名女星布里吉特·芳达出生。',
       '1971年:新加坡著名演员，歌手，主持人范文芳出生。',
       '1975年:yasu，日本男歌手，Janne Da Arc主唱',
       '1976年:中国台北著名演员，歌手林心如出生。',
       '1983年:申东靖，台湾男演员。',
       '1986年:郭芯其，香港女歌手。',
       '1988年:艾丽丝·班迪奥，澳洲的超级名模。',
       '1990年:著名网络作家黄现出生。',
       '1991年:傅骁晴(花七)出生！。'
    ];

    function Flower7(cfg) {
        this.init(cfg);
    }
    S.augment(Flower7, {
        /**
         * 初始化
         */
        init: function (cfg) {
           var cfg = cfg || {};
           var init = "今天是2014年01月27日，1月27日是阳历年的第27天，离一年的结束还有338天（闰年是339天）。此日在一年四季中属冬季，还没立春。";
           this.isplay = false;
           this.initAudio();
           this.initEvent();
           if (!!S.UA.webkit) {
             Node.one('#tips').html('祝花七生日快乐！天天开心！越来越女神！');
           }
           if (!!S.UA.ipad) {
             Node.one('#tips').html('妈蛋，PAD上有BUG，请到PC上看，说好的MOBILE FIRST呢！哭！');
           }
           Node.one('#tips').show();
        },
        initEvent: function () {
           var self = this;
           Node.one('#play').on('click', function() {
             self.play();
           });
           Node.one('#C-audio').on('click', function(e) {
              var $control = Node.one(this);
              if (!self.MelodyObj || !self.isplay) {
                 return;
              }
              if ( $control.hasClass('stop') ) {
                 $control.removeClass('stop');
                 self.MelodyObj.play();
              } else {
                 $control.addClass('stop');
                 self.MelodyObj.pause();
              }
           });
           self.initShare();
        },
        initShare: function() {
            var link = encodeURIComponent(document.location);
            // var title = encodeURIComponent(document.title.substring(0,76));
            var title = encodeURIComponent('#花七生日快乐#祝花七生日快乐@花七sama');
            var source = encodeURIComponent('花七生日快乐！'); // 网站名称
            var windowName = 'share'; //
            var site = 'http://huaqi.jixiangac.com/';
            function getParamsOfShareWindow(width, height) {
              return ['toolbar=0,status=0,resizable=1,width=' + width + ',height=' + height + ',left=',(screen.width-width)/2,',top=',(screen.height-height)/2].join('');
            }
            Node.one('#C-share').on('click', function() {
              var url = 'http://v.t.sina.com.cn/share/share.php?url=' + link + '&title=' + title;
              var params = getParamsOfShareWindow(607, 523);
              window.open(url, windowName, params);
            });
        },
        play: function () {
           var self = this;
           self.isplay = true;
           self.MelodyObj && self.MelodyObj.play();
           var timeEvent = "11.29,11.30,12.05,01.01,01.03,01.22,01.27".split(',');
           // if (S.get('#tips').style.display == 'block') {
               Node.one('#tips') && Node.one('#tips').addClass('animated flipOutX');            
           // }
           //卡片的显示
           var showCard = function (selector, duration, complete) {
              Node.one(selector).animate({
                 top: 0
              },duration, 'swing', complete);
           }
           var slidecount = 0;
           var tail = Node.one('.start', '#play');
           var card, duration = 800;
           //翻页
            var slide = function () {
              if (slidecount > 35) {
                card = Node.one('<div class="card">'+ timeEvent[timeEvent.length - 1] + '</div>');
                tail.after(card);
                showCard(card, duration/1000 ,function(){
                   Node.one('#play').addClass('animated bounceOut');
                   setTimeout(function() {
                     self.stepBirth();                    
                   }, 1000);
                });
                return;
              }
              duration = slidecount > 32? 800: 
                  (slidecount > 25? 400: 
                   (slidecount > 20? 200: 
                    (slidecount > 15? 150: 100)));
              card = Node.one('<div class="card">'+ timeEvent[self.random(timeEvent.length)] + '</div>');
              tail.after(card);
              tail = card;
              slidecount++;
              showCard(card, duration/1000, slide);
            }
            slide();
        },
        stepBirth: function() {
           var self = this;
           var births = BIRTH;
           var $main = Node.one('#histroy') || document.body;
           var count = 0;
           var animateFn = function (selector, action, duration, callback) {
               Node.one(selector).animate( (action || {}) , duration, 'swing', callback);
           }
           var speed = 1;
           var birthAni = function () {
              if (count > births.length - 1) {
                 return;
              }
              var txt = births[count].split(':');
              var mlen = 2;
              var time = Node.one('<h1 class="year">'+ txt[0] + '</h1>').appendTo($main);
              var des = Node.one('<div class="des">' + txt[1] + '</div>').appendTo($main);
              var next = function() {
                 count ++;
                 requestAnimationFrame(birthAni);      
              }
              var over = function() {
                 --mlen || (function() {
                    Node.one('#histroy').addClass('animated bounceOut');
                    self.step1();
                 }());
              }
              //时间的滚动
              animateFn(time, {left:-50,opacity:1}, speed, function() {
                 if (count == births.length - 1) {
                    over();
                    return;
                 }
                 animateFn(time, {top:-40,opacity:0}, speed, function() {
                      --mlen || next();
                 });
              });
              //事件的滚动
              animateFn(des, {right: 0, opacity:1},speed, function() {
                 if (count == births.length - 1) {
                    over();
                    return;
                 }
                 animateFn(des, {top: 150, opacity:0},speed, function(){
                      --mlen || next();
                 });
              });
      
           }
           // birthAni();
           requestAnimationFrame(birthAni);
        },
        step1: function(speed) {
            var content = S.get('#flower7').innerHTML;
            var len = content.length;
            var count = 0;
            var speed = speed || 3;
            var scrollBottom = function () {
               var _h = Node.one(document).height();
               Node.one(document).scrollTop(_h);
               Node.one('#bubble').css('height', _h + 'px');
               onresize();
            }
            var write = function () {
                S.get('#show').innerHTML = content.substring(0, count) + '_';
                count = count + speed;
                if (count > 6000) {
                    scrollBottom();                  
                }
            }
            var loopGo = false;
            var loop = function () {
              if (count < len) {
                if (count > 8000 && !loopGo) {
                   speed += 20;
                   loopGo = true;
                }
                write();
                requestAnimationFrame(loop);    
              } else {
                 Node.one(document).animate({
                   scrollTop: 0
                 }, 1.5, 'swing', function() {

                 });
              }
            }
            requestAnimationFrame(loop);
        },
        //音效事件管理
        initAudio: function() {
           var self = this;
           //推荐下面这首歌，讲述的是一个保护自然的问题
           //http://www.theleisuresociety.co.uk/fightforeveryone/audio/FightForEveryone.mp3
           var Melody = {
               back: 'danlian.mp3'
           };
           var MelodyObj = new Audio(Melody.back);
           self.MelodyObj = MelodyObj;
        }
        /**
         * 随机数
         */
        ,random: function (num) {
            var r = Math.floor(Math.random() * num);
            return r;
        }

    });
    return Flower7;
},{
    requires: [
       'node',
       'event',
       './audio.js',
       './ball.css'
    ]
});