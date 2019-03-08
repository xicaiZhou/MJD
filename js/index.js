window.onload = function () {
    /* 第一步：顶部搜索栏*/
    search();
    /* 第二部：轮播图*/
    banner();
    /*第三步；秒杀头部倒计时*/
    downTime();
}

var search = function () {
    //获取搜索box
    var searchBox = document.querySelector('.jd_search_box');
    //获取轮播图
    var banner = document.querySelector('.jd_banner');
    //获取轮播图高度
    var bannerHeight = banner.offsetHeight;

    //监听界面滑动
    window.onscroll = function () {
        // 获取滑动距离
        var scrollTop = window.document.body.scrollTop;

        if (scrollTop < bannerHeight){
            searchBox.style.background = 'rgba(201,21,35,'+ scrollTop / bannerHeight * 0.85 +')';
        }else {
            searchBox.style.background = 'rgba(201,21,35,0.85)';
        }
    }
}

var banner = function () {

    //获取轮播图
    var banner = document.querySelector('.jd_banner');
    //获取轮播图所有图片
    var imageBox = document.querySelector('ul:first-child');
    //获取轮播图上的点
    var pointBox = document.querySelector('ul:last-child');
    //获取轮播图宽度
    var imageWidth = banner.offsetWidth;


    var index = 1; /*我们默认index为1，因为在html中我们在第一章图片前加了第八张图，并且在css中向前移动了10%像素，我们一个有十张图片10%就是一张图片*/

    //定时器
    var timer = setInterval(function () {

        //1.图片index向前移动一位
        index++;

        //2.加载过渡动画transition
        addtransition();

        //3.开始移动
        setTransformX(-index * imageWidth);

    },2000);

    var addtransition = function () {

        imageBox.style.transition = 'all 0.5s';
        imageBox.style.webkitTransition = 'all 0.5s';
    };

    var removeTransition = function () {
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none';
    };

    var setTransformX = function (translateX) {
        imageBox.style.transform = 'translateX(' + translateX + 'px)';
        imageBox.style.webkitTransform = 'translateX('+translateX+'px)';
    };

    //执行完转场过渡动画化的回调
    banner.addEventListener('transitionend', function () {

        if (index >= 9){

            index = 1; //让其编程第一张图

            removeTransition(); //在轮回这个过程中取消转场过渡动画，直接切到第一张图；
            setTransformX(-index * imageWidth);

        }else if(index <= 0){
            index = 8;
            setTransformX(-index * imageWidth);
        }
        setPoint();

    });

    var setPoint = function () {
        //获取所有的点
        var allPoint = pointBox.querySelectorAll('li');
        //遍历所有点去掉class
        for (var i = 0; i <allPoint.length; i++ ){

            allPoint[i].classList.remove('now');
        }
        allPoint[index - 1].classList.add('now');

    };

    /**
     * 触摸事件
     * 1。定义属性
     * 2.计算移动值
     * 3.弹性判断移动
     */

    /*1.定义属性*/
    var startX = 0;
    var distanceX = 0;
    var isMove = false;

    // 开始触摸
    imageBox.addEventListener('touchstart',function (e) {

        //停止定时器
        clearInterval(timer);

        //2.赋值开始触摸位置
        startX = e.touches[0].clientX;
    });

    imageBox.addEventListener('touchmove', function (e) {

       distanceX = e.touches[0].clientX - startX;

       var translateX = -index * imageWidth + distanceX;

        setTransformX(translateX);

        isMove = true;

    });

    imageBox.addEventListener('touchend',function () {

        if (isMove){
            if (Math.abs(distanceX) < imageWidth / 3){

                addtransition();
                setTransformX(-index * imageWidth );

            } else {

                if (distanceX > 0){
                    index --
                } else {
                    index ++
                }

                addtransition();
                setTransformX(-index * imageWidth );
            }
        }

        //重置
        startX = 0;
        distanceX = 0;
        isMove = false;
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            /*加过渡*/
            addtransition();
            /*做位移*/
            setTransformX(-index * imageWidth);
        }, 2000);

    })





}

var downTime = function () {

    /*倒计时两个小时*/

    var spans = document.querySelector('.time').querySelectorAll('span');
    console.log(spans);
    var time = 2*60*60;
    var  timer = setInterval(function () {

        time--;

        /*格式转换*/
        var h = Math.floor(time / 3600);
        var m = Math.floor(time % 3600 / 60);
        var s = time % 60;

        spans[0].innerText = Math.floor(h/10);
        spans[1].innerText = h%10;
        spans[3].innerText = Math.floor(m/10);
        spans[4].innerText = m%10;
        spans[6].innerText = Math.floor(s/10);
        spans[7].innerText = s%10;





    },1000);

};