/*
 * Оверрайд
 * Решаем в какой момент показывать/скрывать кнопку
 */

(function($) {

    var $up = $('.up');
    var stickPosition = $('.main').offset().top + $('.main').outerHeight();

    function stickUpButton() {
        if ( $(window).scrollTop() >= stickPosition ) {
            $up.addClass('up_visible');
        } else {
            $up.removeClass('up_visible');
        }
    }

    $(window).on('scroll', stickUpButton);
    $(document).ready(stickUpButton);

})(jQuery);
