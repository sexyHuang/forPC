/**
 * Created by sexyi on 2016/9/12.
 */

function createLines(){
    var cns = $('.lines');
    $.each(cns,function (idx,ele) {
        var ctx = ele.getContext('2d');
        ele.width = ctx.width = 200;
        ele.height = ctx.height = 50;
        ctx.strokeStyle = '#8AAAB1';
        ctx.lineWidth = 4;
        ctx.beginPath();
        if(ele.className.indexOf('lt')>=0) {
            ctx.moveTo(0, 0);
            ctx.lineTo(130, 0);
            ctx.lineTo(200, 50);
        }else if(ele.className.indexOf('lb')>=0){
            ctx.moveTo(0, 50);
            ctx.lineTo(130, 50);
            ctx.lineTo(200, 0);
        }else if(ele.className.indexOf('rt')>=0){
            ctx.moveTo(0,50);
            ctx.lineTo(70,0);
            ctx.lineTo(200,0);
        }else if(ele.className.indexOf('rb')>=0){
            ctx.moveTo(0,0);
            ctx.lineTo(70,50);
            ctx.lineTo(200,50);
        }
        ctx.stroke();
    })
}


/**
 * 把数据添加到dom中
 * @param [Array]cfg 配置数据
 *        期望格式： cfg = [
         *          {    imgURL: '',
                         demoURL:'',
                         sourceURL:''},
                       .... ];
 * @param [$jQuery]$ele 目标元素的jQuery对象
 */
function addPortoDOM(cfg,$ele){
    var frag = document.createDocumentFragment();
    $.each(cfg,function (idx,ele) {
        var $li = $('<li>');
        $li.css({backgroundImage:'url('+ele.imgURL+')'});
        $li.html('<div><p><a href="'+ele.demoURL+'">View Demo</a><br><a href="'+ele.sourceURL+'">Source</a></p></div>')
        $(frag).append($li);
    });
    $ele.append($(frag));
}
var H5_loading = function (images) {

    if (this._images === undefined) {
        this._images = (images || []).length;
        this._loaded = 0;

        var id = this.id;
        window.h5Loading = this; //把当前对象储存在全局对象window中，用来进行某个图片加载后的回调

        for (s in images) {
            var item = images[s];
            var img = new Image;
            img.onload = function () {
                window.h5Loading.loader();
            };
            img.src = item;
        }

        $('#rate').text('0%');
        return this;
    } else {

        this._loaded++;
        $('#rate').text(((this._loaded / this._images * 100) >> 0)+'%');
        if(this._loaded<this._images) {
            return this;
        }
    }
    window.h5Loading = null;
    $('.loading').hide();

    $('body').css({
        height: 'auto',
        overflow: 'auto'
    });
};
/**
 *
 * @constructor
 */
var H5 = function () {
    this.loader = H5_loading;
};


$(function () {
    $('.smooth').click(function () {
        var href = $(this).attr('href');
        var pos = $(href).offset().top;
        console.log(href);
        $('html,body').animate({scrollTop: pos}, 1000);
        return false;
    });
    createLines();
    $points = $('.points');
    $point = $points.find('.point')
    $.each($point, function (idx, ele) {
        var per = $(ele).find('.per').text();
        $(ele).width($points.width() * per).height($points.height() * per);
        $(ele).css({
            'top': ele.dataset.posy,
            'left': ele.dataset.posx
        });
        $(ele).find('.name').css({
            'fontSize': 50 * per / 0.6,
            'height': 50 * 1.8 * per / 0.6,
            'marginTop': -45 * per / 0.6
        });
    });

    $('.click').click(function (event) {
        console.log(this.style.opacity);
        if(this.style.opacity === '0'){
            return;
        }
        var siblings = $(this).siblings('.point');
        var description;
        if (!siblings[0].style.opacity || siblings[0].style.opacity == 1) {

            $(this).addClass('focus-point');
            description = $(this).find('.description');
            siblings.css('opacity', 0);
            $('.desText').append(description);
            description.fadeIn(1000);
        } else {

            $(this).removeClass('focus-point');
            description = $('.desText').find('.description');
            description.hide();
            siblings.css('opacity', 1);
            $(this).append(description);

        }
    });

    var cfg = [{
        imgURL: 'img/UI.png',
        demoURL: 'https://sexyhuang.github.io/JSprojects/UI',
        sourceURL: 'https://github.com/sexyHuang/JSprojects/tree/gh-pages/UI'
    }, {
        imgURL: 'img/API.png',
        demoURL: 'https://sexyhuang.github.io/JSprojects/apiTable/task5.html',
        sourceURL: 'https://github.com/sexyHuang/JSprojects/tree/gh-pages/apiTable'
    }, {
        imgURL: 'img/AutoForm.png',
        demoURL: 'https://sexyhuang.github.io/JSprojects/AutoForms/demo/',
        sourceURL: 'https://github.com/sexyHuang/JSprojects/tree/gh-pages/AutoForms'
    }, {
        imgURL: 'img/sortAnimate.png',
        demoURL: 'https://sexyhuang.github.io/JSprojects/sortAnimate/',
        sourceURL: 'https://github.com/sexyHuang/JSprojects/tree/gh-pages/sortAnimate'
    }, {
        imgURL: 'img/animate.png',
        demoURL: 'https://sexyhuang.github.io/JSprojects/animate/demo/index.html',
        sourceURL: 'https://github.com/sexyHuang/JSprojects/tree/gh-pages/animate'
    }, {
        imgURL: 'img/HTML&CSS.png',
        demoURL: 'https://sexyhuang.github.io/HTML-CSSprojects',
        sourceURL: 'https://github.com/sexyHuang/HTML-CSSprojects'
    }];

    addPortoDOM(cfg, $('.da-thumbs'));
    $('.da-thumbs li').hoverdir({hoverDelay: 50});

    $('.loading').height(window.innerHeight);
    $('body').css({
        height: window.innerHeight,
        overflow: 'hidden'
    });
    var imgs = ['img/animate.png','img/API.png','img/AutoForm.png','img/bg-min.jpg','img/bg-home.jpg','img/body-2-min.png','img/HTML&CSS.png',
        'img/jnu-logo-min.png','img/me.jpg','img/sortAnimate.png','img/UI.png'];
    var h5 = new H5();
    h5.loader(imgs);
});

