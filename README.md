# 电梯导航组件
demo效果预览：[https://zhouxingzu.github.io/ElevatorNav/](https://zhouxingzu.github.io/ElevatorNav/)

### 使用方法
#### 一、首先引入JS文件到HTML中（需要引入jquery）
```
<head>
    <script src="js/jquery-3.2.1.min.js"></script>
    <script src="js/nav.js"></script>
</head>
```

#### 二、写好电梯导航的样式后，在JS中进行配置：
```
<script>
var nav = new ElevatorNav({
    floorClass: ['floor1','floor2','floor3','floor4'],  //对应楼层的class名
    NavClass: "nav-ul li",  //电梯菜单的class名
    activeClass: "active",  //当前楼层高亮状态的class名
})
</script>
```
#### 三、详细API文档说明
参数 | 描述
----|---
floorClass | 对应DIV楼层的class名
NavClass | 导航菜单的class名
activeClass | 当前楼层需要高亮显示的class名
toTopClass | 回到顶部按钮的class名
isRemoveAnimation | 是否移除类名随点击跟着跑的效果，默认为false
autoHidden | 默认是否隐藏菜单，滑到第一层才出现，默认为false
NavDivClass | 如果设置了autoHidden:true, 则需要设置导航菜单的class名
speed | 滚动速度，默认为500
DiyFun | 绑定自定义方法

例如：
```
var nav = new ElevatorNav({
    floorClass: ['floor1','floor2','floor3','floor4'],  //楼层的class名
    NavClass: "nav-ul li",  //电梯菜单的class名
    activeClass: "active",  //状态高亮的class名
    toTopClass: "toTop",    //回到顶部的class名
    isRemoveAnimation: true,    //是否移除类名随点击跟着跑的效果，默认为false
    autoHidden: true,   //是否隐藏菜单，滑到第一层才出现，默认为false
    NavDivClass: "left-nav",    //需要默认隐藏菜单的class名
    speed: 500,     //滚动速度，默认为500
    DiyFun: function(){
        console.log('自定义方法');
    }
})
```
