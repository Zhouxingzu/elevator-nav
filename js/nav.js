/***电梯导航定位***/

function ElevatorNav(config) {
    var me = this;
    me.config = $.extend({
        floorClass: null,  //楼层的class名
        NavClass: null,  //电梯菜单的class名
        NavDivClass: null,  //需要默认隐藏菜单的class名
        activeClass: 'active',  //状态高亮的class名
        toTopClass: null,  //回到顶部的class名
        speed: 500,  //滚动速度，默认为500
        scrollContent: null,  //滑动容器的class名
        isRemoveAnimation: false,  //是否移除类名随点击跟着跑的效果，默认为false
        isAdapt: false,  //导航自适应
        autoHidden: false,  //是否隐藏菜单，滑到第一层才出现，默认为false
        floor: [],
        DiyFun: null  //自定义方法
    }, config);
    //计算各楼层高度位置
    for(let i = 0; i < me.config.floorClass.length; i++) {
        me.config.floor[i] = $('.' + me.config.floorClass[i]).offset().top - 100;
    }
    this.scrollContent = me.config.scrollContent ? ('.' + me.config.scrollContent) : null;
    me.init();
}

ElevatorNav.prototype = {
    constructor: ElevatorNav,

    //初始化
    init: function() {
        var me = this;
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
    floorHieght: function(floorClass) {
        return $('.' + floorClass).offset().top - 100;
    },

    //左侧导航样式随定位变化
    statusChange: function() {
        var me = this;
        var windowScrollTop = $(me.scrollContent || window).scrollTop();
        var NavDiv = $('.' + me.config.NavDivClass);
        var NavLi = $('.' + me.config.NavClass);
        for(var j = 0; j < me.config.floor.length; j++) {
            if(windowScrollTop >= me.config.floor[j]) {
                if(NavDiv && NavDiv.length > 1) {
                    //如果有多个相同导航
                    for(var k = 0; k < NavDiv.length; k++) {
                        $(NavDiv[k]).find(NavLi).removeClass(me.config.activeClass);
                        $(NavDiv[k]).find(NavLi).eq(j).addClass(me.config.activeClass);
                    }
                }
                else {
                    $('.' + me.config.NavClass).removeClass(me.config.activeClass);
                    $('.' + me.config.NavClass).eq(j).addClass(me.config.activeClass);
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
                    $(me.scrollContent || 'html, body').stop().animate({'scrollTop': me.config.floor[j] + 100}, speed, function() {
                        $(me.scrollContent || window).scroll(function(){me.statusChange()});
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
                $('.' + me.config.NavDivClass).show();
            } else {
                $('.' + me.config.NavDivClass).hide();
            }
            $(window).scroll(function () {
                if ($(window).scrollTop() >= f1Top) {
                    $('.' + me.config.NavDivClass).show();
                } else {
                    $('.' + me.config.NavDivClass).hide();
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

// module.exports = ElevatorNav;



/***
使用配置方法：

var nav = new ElevatorNav({
    floorClass: ['floor1','floor2','floor3','floor4'],  //楼层的class名
    NavClass: "nav-ul li",  //电梯菜单的class名
    activeClass: "active",  //状态高亮的class名
    toTopClass: "toTop",    //回到顶部的class名
    scrollContent: 'ipr-content',  //滑动容器的class名
    isRemoveAnimation: true,    //是否移除类名随点击跟着跑的效果，默认为false
    autoHidden: true,   //是否隐藏菜单，滑到第一层才出现，默认为false
    NavDivClass: "left-nav",    //需要默认隐藏菜单的class名
    speed: 500,     //滚动速度，默认为500
    DiyFun: function(){
        console.log('自定义方法');
    }
})

***/