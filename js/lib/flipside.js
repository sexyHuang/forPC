$(function () {
    var flipside = (function () {
        var btns = $('.flip-btn');

        var btnFront =  $('.flip-btn-front'),
            btnClose =  $('.flip-btn-back .close');
        for(var i = 0;i<btns.length;i++) {
            var btn = btns[i];
            btn.addEventListener('click', function (event) {
                if(event.target.className.indexOf('close')>=0){
                    this.classList.remove('is-open');
                    return;
                }
                if(event.target.className.indexOf('flip-btn-front')<0){
                    return;
                }
                var mx = event.offsetX;
                my = event.offsetY;

                var w = btn.offsetWidth,
                    h = btn.offsetHeight;

                var directions = [
                    {id: 'top', x: w / 2, y: 0},
                    {id: 'right', x: w, y: h / 2},
                    {id: 'bottom', x: w / 2, y: h},
                    {id: 'left', x: 0, y: h / 2}
                ];

                directions.sort(function (a, b) {
                    return distance(mx, my, a.x, a.y) - distance(mx, my, b.x, b.y);
                });

                this.setAttribute('data-direction', directions.shift().id);
                this.classList.add('is-open');
            });

        }
        function distance(x1, y1, x2, y2) {
            var dx = x1 - x2;
            var dy = y1 - y2;
            return Math.sqrt(dx * dx) + Math.sqrt(dy * dy);
        }

    })();
});



