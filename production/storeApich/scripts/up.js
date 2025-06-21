/*
 * Оверрайд
 * Решаем в какой момент показывать/скрывать кнопку
 */

(function($) {

    var $up = $('.up');
    var stickPosition = 200;

    function stickUpButton() {

        if ( $(window).scrollTop() >= stickPosition ) {
            $up.addClass('up_visible');
        } else {
            $up.removeClass('up_visible');
        }
    }

    $(window).on('scroll', stickUpButton);
    $(window).on('resize', stickUpButton);
    $(document).ready(stickUpButton);

})(jQuery);
