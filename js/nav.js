/***电梯导航定位***/

function ElevatorNav(config) {
    var me = this;
    me.config = $.extend({
        floorClass: [],  //楼层的class名集合
        NavClass: null,  //电梯菜单的class名
        NavDivClass: null,  //需要默认隐藏菜单的class名
        activeClass: 'active',  //状态高亮的class名
        toTopClass: null,  //回到顶部的class名
        speed: 500,  //滚动速度，默认为500
        scrollContent: null,  //滑动容器的class名
        isRemoveAnimation: false,  //是否移除类名随点击跟着跑的效果，默认为false
        offset: 0, //偏移值，滑动定位时需要偏移的数值
        isAdapt: false,  //导航自适应
        autoHidden: false,  //是否隐藏菜单，滑到第一层才出现，默认为false
        floor: [],
        DiyFun: null  //自定义方法
    }, config);

    this.scrollContent = me.config.scrollContent ? ('.' + me.config.scrollContent) : null;
    me.init();
}

ElevatorNav.prototype = {
    constructor: ElevatorNav,

    //初始化
    init: function() {
        var me = this;
        me.NavDiv = $('.' + me.config.NavDivClass);
        me.NavLi = $('.' + me.config.NavClass);
        me.floorHieght();
        me.statusChange();
        $(me.scrollContent || window).scroll(function() {
            me.statusChange();
        });
        me.Jump(me.config.NavClass, me.config.activeClass, me.config.speed);
        me.BackToTop();
        me.ShowNav();
        me.DiyFun();
    },

    //获取各楼层高度
    floorHieght: function() {
        var me = this;
        for(let i = 0; i < me.config.floorClass.length; i++) {
            me.config.floor[i] = $('.' + me.config.floorClass[i]).offset().top - 100;
        }
    },

    //左侧导航样式随定位变化
    statusChange: function() {
        var me = this;
        var windowScrollTop = $(me.scrollContent || window).scrollTop();
        for(var j = 0; j < me.config.floor.length; j++) {
            if(windowScrollTop >= me.config.floor[j] - (me.config.offset + 10)) {
                if(me.NavDiv && me.NavDiv.length > 1) {
                    //如果有多个相同导航
                    for(var k = 0; k < me.NavDiv.length; k++) {
                        $(me.NavDiv[k]).find(me.NavLi).removeClass(me.config.activeClass);
                        $(me.NavDiv[k]).find(me.NavLi).eq(j).addClass(me.config.activeClass);
                    }
                }
                else {
                    me.NavLi.removeClass(me.config.activeClass);
                    me.NavLi.eq(j).addClass(me.config.activeClass);
                }
            }
        }
    },

    //点击跳转对应楼层
    Jump: function(NavClass, activeClass, speed) {
        var me = this;
        $('.' + NavClass).click(function() {

            //如果这是回到顶部的按钮，则什么都不做
            if($(this).hasClass(me.config.toTopClass)) {
                return;
            }
            if(me.config.isRemoveAnimation == true) {
                //在动画运动的过程中，不希望active-yellow特殊类名跟着满世界跑
                $(window).off('scroll', me.statusChange());
                //因为你解绑了检测事件，当前这个LI具备特殊类名还要再书写一次
                $(this).addClass(activeClass).siblings().removeClass(activeClass);  
            }
                
            //需要知道现在要往几层楼跳
            var i = $(this).index();
            for(let j = 0; j < me.config.floorClass.length; j++) {
                if(i == j) {
                    $(me.scrollContent || 'html, body').stop().animate({'scrollTop': me.config.floor[j] - me.config.offset}, speed, function() {
                        $(me.scrollContent || window).scroll(function() {me.statusChange();});
                        me.ShowNav();
                    });
                }
            }  
        });
    },

    //回到顶部按钮
    BackToTop: function() {
        var me = this;
        $('.' + me.config.toTopClass).on('click', function () {
            $(me.scrollContent || 'html, body').animate({scrollTop: 0}, me.config.speed);
        });
    },

    //导航自适应
    Adapt: function() {

    },

    //滑到一定位置出现左侧导航
    ShowNav: function() {
        var me = this;
        var f1Top = me.config.floor[0];
        if(me.config.autoHidden == true) {
            if ($(window).scrollTop() >= f1Top) {
                me.NavDiv.show();
            } else {
                me.NavDiv.hide();
            }
            $(window).scroll(function () {
                if ($(window).scrollTop() >= f1Top) {
                    me.NavDiv.show();
                } else {
                    me.NavDiv.hide();
                }
            });
        }
    },

    //自定义方法
    DiyFun: function() {
        var me = this;
        if(typeof me.config.DiyFun != 'undefined' &&  typeof me.config.DiyFun == 'function') {
            me.config.DiyFun();
        }
    }
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = ElevatorNav;
}
else {
    if (typeof define === 'function' && define.amd) {
        define([], function() {
            return ElevatorNav;
        });
    }
    else {
        window.ElevatorNav = ElevatorNav;
    }
}

/***
使用配置方法：
var nav = new ElevatorNav({
    floorClass: ['floor1','floor2','floor3','floor4'],  //楼层的class名
    NavClass: "nav-ul li",  //电梯菜单的class名
    activeClass: "active",  //状态高亮的class名
    toTopClass: "toTop",    //回到顶部的class名
    isRemoveAnimation: true,    //是否移除类名随点击跟着跑的效果，默认为false
    autoHidden: true,   //是否隐藏菜单，滑到第一层才出现，默认为false
    NavDivClass: "left-nav",    //需要默认隐藏菜单的class名
    speed: 500,     //滚动速度，默认为500
    //自定义绑定方法
    DiyFun: function(){
        console.log('自定义方法');
    }
})
****/