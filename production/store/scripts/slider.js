(function($) {

    var slider = $('.slider');
    var sliderFirst = $('.slider__handler:first-of-type');
    var sliderLast = $('.slider__handler:last-of-type');
    var sliderCurrent;
    var sliderInterval;

    
    function slidePrev() {
        sliderCurrent = $('.slider__handler:checked');
        sliderCurrent.prop('checked', false);
        if ( sliderCurrent.prev('.slider__handler').length ) {
            sliderCurrent.prev().prop('checked', true);
        } else {
            sliderLast.prop('checked', true);
        }
    }

    function slideNext() {
        sliderCurrent = $('.slider__handler:checked');
        sliderCurrent.prop('checked', false);
        if ( sliderCurrent.next('.slider__handler').length ) {
            sliderCurrent.next().prop('checked', true);
        } else {
            sliderFirst.prop('checked', true);
        }
    }


    function startAutoSlide() {
        sliderInterval = setInterval(slideNext, 3000);
    }

    function stopAutoSlide() {
        clearInterval(sliderInterval);
    }


    $('.slider__control_prev').on('click', function (event) {
        stopAutoSlide();
        slidePrev();
    });

    $('.slider__control_next').on('click', function (event) {
        stopAutoSlide();
        slideNext();
    });


    // Start on document ready

    startAutoSlide();


    // Stop and Star on hover

    slider.on('mouseenter', function () {
        stopAutoSlide();
    });

    slider.on('mouseleave', function () {
        startAutoSlide();
    });

})(jQuery);
