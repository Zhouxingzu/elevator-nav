# 电梯导航组件
demo效果预览：[https://zhouxingzu.github.io/elevator-nav/](https://zhouxingzu.github.io/elevator-nav/)

### 使用方法
#### 一、安装
```
npm install elevator-nav
```

#### 二、引入使用：
```
import ElevatorNav from 'elevator-nav';

var nav = new ElevatorNav({
    floorClass: ['floor1','floor2','floor3','floor4'],  //对应楼层的class名
    navClass: "nav-item",  //电梯菜单的class名
    activeClass: "active",  //当前楼层高亮状态的class名
})
```
注：由于项目依赖jquery，所以请在渲染出DOM元素后再进行初始化
#### 三、详细API文档说明
参数 | 描述 | 类型 | 默认值
----|---|---|---
floorClass | 对应DIV楼层的class名 | string |
navClass | 导航菜单的class名 | string |
activeClass | 当前楼层需要高亮显示的class名 | string | 'active'
toTopClass | 回到顶部按钮的class名 | string |
scrollContent | 滑动容器的class名 | string | window
isRemoveAnimation | 是否移除类名随点击跟着跑的效果，注意如果使用此参数，滚动事件将会失效 | boolean | false
autoHidden | 默认是否隐藏菜单，滑到第一层才出现 | boolean | false
navDivClass | 如果设置了autoHidden:true, 则需要设置导航菜单的class名 | string |
offset | 滑动定位时需要偏移的数值 | number | 0
speed | 滚动速度 | number | 500
diyFun | 绑定自定义方法 | Function |

例如：
```
var nav = new ElevatorNav({
    floorClass: ['floor1','floor2','floor3','floor4'],  //楼层的class名
    navClass: "nav-item",  //电梯菜单的class名
    activeClass: "active",  //状态高亮的class名
    toTopClass: "toTop",    //回到顶部的class名
    scrollContent: 'content',  //滑动容器的class名
    isRemoveAnimation: true,    //是否移除类名随点击跟着跑的效果，默认为false
    autoHidden: true,   //是否隐藏菜单，滑到第一层才出现，默认为false
    navDivClass: "left-nav",    //需要默认隐藏菜单的class名
    speed: 500,     //滚动速度，默认为500
    diyFun: function(){
        console.log('自定义方法');
    }
})
```
