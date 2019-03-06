window.onload = function () {
    // 1.顶部搜索
    search();
    // 2.轮播图
    banner();
    // 3.倒计时
    downTime();
};

var search = function () {
    // 1.默认透明
    // 2.上滑透明度变小
    // 3.下滑透明度变大
    var searchBox = document.querySelector('.jd_search_box');
    var banner = document.querySelector('.jd_banner');
    var  height = banner.offsetHeight;
    window.onscroll = function () {
        var scrollTop = document.body.scrollTop;
        console.log(scrollTop);
        var opacity = 0;
        if (scrollTop < height){
            opacity = scrollTop / height *0.85;
        }else {
            opacity = 0.85;
        }
        searchBox.style.background = 'rgba(201,21,35,'+opacity+')'
    }


};

var banner = function () {

    var banner = document.querySelector('.jd_banner');

    var width = banner.offsetWidth;

    var imageBox = banner.querySelector('ul:first-child');

    var  pointBox = banner.querySelector('ul:last-child');

    var points = pointBox.querySelectorAll('li');


    var index = 1;

    var setTranslateX = function (translateX) {
        imageBox.style.transform = 'translateX(' + translateX + 'px)';
        imageBox.style.webkitTransform = 'translateX(' + translateX + 'px)';
    }
    var  addTransition = function () {
        imageBox.style.transition = 'all 0.2s';
        imageBox.style.webkitTransition = 'all 0.2s';
    }
    var timer = setInterval(function () {
        index++;

        addTransition();
        setTranslateX(-index * width);

    },1000);
    imageBox.addEventListener('transitionend', function () {
        if (index >= 9){
            index = 1;
            removeTransition();
        }else if (index <= 0){
            index = 8;
        }
        setTranslateX(-index * width);
        setPoint();
    },false);

    var removeTransition = function () {
        imageBox.style.transition = 'none';
        imageBox.style.webkitTransition = 'none';
    }

    var setPoint = function () {
        for (var i = 0; i < points.length; i++){
            var obj = points[i];
            obj.classList.remove('now');
        }
        points[index - 1].classList.add('now');
    }


    var startX = 0;
    var distanceX = 0;
    var isMove = false;


    imageBox.addEventListener('touchstart',function (e) {

        //清除定时器
        clearInterval(timer);
        //记录其实坐标
        startX = e.touches[0].clientX;

    });

    imageBox.addEventListener('touchmove',function (e) {

        //记录移动坐标 不管正负
        distanceX = e.touches[0].clientX - startX;

        var translateX = -index * width + distanceX;

        removeTransition();
        setTranslateX(translateX);
        isMove = true;

    });
    imageBox.addEventListener('touchend', function (e) {
        /*4.  5.  实现*/
        /*要使用移动的距离*/
        if (isMove) {
            if (Math.abs(distanceX) < width / 3) {
                /*吸附*/
                addTransition();
                setTranslateX(-index * width);
            } else {
                /*切换*/
                /*右滑动 上一张*/
                if (distanceX > 0) {
                    index--;
                }
                /*左滑动 下一张*/
                else {
                    index++;
                }
                /*根据index去动画的移动*/
                addTransition();
                setTranslateX(-index * width);
            }
        }
        /*最好做一次参数的重置*/
        startX = 0;
        distanceX = 0;
        isMove = false;
        /*加上定时器*/
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            /*加过渡*/
            addTransition();
            /*做位移*/
            setTranslateX(-index * width);
        }, 1000);
    });




};

var downTime = function () {

};