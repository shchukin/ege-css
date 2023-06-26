(function($) {
    var $panel = $('.panel');
    var $main = $('.main');
    var stickPosition = $main.offset().top + $main.outerHeight();

    function stickPanel() {
        if ( $(window).scrollTop() >= stickPosition ) {
            $panel.addClass('panel_visible');
        } else {
            $panel.removeClass('panel_visible');
        }
    }

    function groundPanel() {
        $(window).off('scroll', stickPanel);
        $(window).off('resize', stickPanel);
        $panel.removeClass('panel_visible');
        $panel.addClass('panel_static');
        $panel.addClass('panel_grounded');
    }

    $('.panel__close').on('click', groundPanel);

    $(window).on('scroll', stickPanel);
    $(window).on('resize', stickPanel);
    $(document).ready(stickPanel);

})(jQuery);
