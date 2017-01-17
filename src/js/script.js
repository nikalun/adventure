(function () {
    "use strict";

    $(function(){

        $(".js-fancybox").fancybox({
            openEffect	: 'none',
            closeEffect	: 'none'
        });

        $(".js-fancybox-video").fancybox({
            openEffect	: 'none',
            closeEffect	: 'none',
            helpers : {
                media : {}
            }
        });

        function linkClick() {
            var links  = document.getElementsByClassName('js-link'),
                el = document.getElementsByClassName('js-item');

                for (var i = 0; i < links.length; i++) {

                        links[i].onclick = function(e){

                            for(var j = 0; j < links.length; j++) {
                                links[j].classList.remove('active');
                            }

                            var target = e.target,
                                type = target.getAttribute('data-link');

                                target.parentNode.classList.add('active');

                                for (var n = 0; n < el.length; n++) {

                                        if(!el[n].classList.contains(type)) {
                                            el[n].classList.add('disable');
                                        } else {
                                            el[n].classList.remove('disable');
                                        }

                                        if(type == 'all') {
                                            el[n].classList.remove('disable');
                                        }
                                }
                        }
                }
        }

        linkClick();

        $('.js-container').masonry({
            itemSelector: '.item',
            singleMode: false,
            isResizable: false,
            isAnimated: true,
            gutter: 20,
            animationOptions: {
                queue: false,
                duration: 500
            }
        });

        $('.js-item').each(function(){

            $(this).slick({
                dots: false,
                infinite: true,
                speed: 500,
                fade: true,
                cssEase: 'linear',
                arrows: true,
                prevArrow: '<a  class="slick-prev" href="javascript:void(0)"></a>',
                nextArrow: '<a  class="slick-next" href="javascript:void(0)"></a>'
            });

        });



    });
}());