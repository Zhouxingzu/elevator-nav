/***电梯导航定位***/

function ElevatorNav(obj){
    this.floorClass = obj.floorClass;
    this.NavClass = obj.NavClass;
    this.NavDivClass = obj.NavDivClass;
    this.activeClass = obj.activeClass;
    this.toTopClass = obj.toTopClass;
    this.speed = obj.speed || 500;
    this.isRemoveAnimation = obj.isRemoveAnimation || false;
    this.isAdapt = obj.isAdapt || false;
    this.autoHidden = obj.autoHidden || false;
    this.floor = [];
    for(let i=0; i<this.floorClass.length; i++){
        this.floor[i] = $('.'+this.floorClass[i]).offset().top-100;
    }
    this.DiyFun = obj.DiyFun;
    this.init();
}

ElevatorNav.prototype = {
    constructor: ElevatorNav,

    //初始化
    init: function(){
        var me = this;
        me.statusChange();
        $(window).scroll(function(){
            me.statusChange()
        });
        me.Jump(me.NavClass,me.activeClass,me.speed);
        me.BackToTop();
        me.ShowNav();
        me.DiyFun();
    },

    //获取各楼层高度
    floorHieght: function(floorClass){
        return $('.'+floorClass).offset().top-100;
    },

    //左侧导航样式随定位变化
    statusChange: function(){
        var that = this;
        var windowScrollTop = $(window).scrollTop();
        for(let j=0; j<that.floor.length; j++){
            if(windowScrollTop >= that.floor[j]){
                $('.'+that.NavClass).removeClass(that.activeClass);
                $('.'+that.NavClass).eq(j).addClass(that.activeClass);
            }
        }
    },

    //点击跳转对应楼层
    Jump: function(NavClass,activeClass,speed){
        var that = this;
        $('.'+NavClass).click(function(event) {

            //如果这是回到顶部的按钮，则什么都不做
            if($(this).hasClass(that.toTopClass)){

            }
            else{
              if(that.isRemoveAnimation == true){
                    //在动画运动的过程中，不希望active-yellow特殊类名跟着满世界跑
                    $(window).off('scroll', that.statusChange());
                    //因为你解绑了检测事件，当前这个LI具备特殊类名还要再书写一次
                    $(this).addClass(activeClass).siblings().removeClass(activeClass);  
                }
                
                //需要知道现在要往几层楼跳
                var i=$(this).index();
                for(let j=0; j<that.floorClass.length; j++){
                    if(i==j){
                        $('html,body').stop().animate({'scrollTop':that.floor[j]+100}, speed,function(){
                            $(window).scroll(function(){that.statusChange()});
                            that.ShowNav();
                        });
                    }
                }  
            }
        });
    },

    //回到顶部按钮
    BackToTop: function(){
        var that = this;
        $('.'+that.toTopClass).on('click', function () {
          $('html, body').animate({scrollTop : 0}, that.speed);
        });
    },

    //导航自适应
    Adapt: function(){

    },

    //滑到一定位置出现左侧导航
    ShowNav: function(){
        var that = this;
        f1Top = that.floor[0];
        if(that.autoHidden == true){
            if ($(window).scrollTop() >= f1Top) {
                $('.'+that.NavDivClass).show();
            } else {
                $('.'+that.NavDivClass).hide();
            }
            $(window).scroll(function () {
              if ($(window).scrollTop() >= f1Top) {
                $('.'+that.NavDivClass).show();
              } else {
                $('.'+that.NavDivClass).hide();
              }
            })  
        }
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