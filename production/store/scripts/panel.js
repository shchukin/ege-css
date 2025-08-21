(function($) {
    var $panel = $('.panel');
    var stickPosition = 200; /* Random number but same to up.js */
    var unStickPosition = 0;

    function countUnStickPosition() {
        unStickPosition = $panel.offset().top - $(window).outerHeight() + $('.panel__detachable').outerHeight();
    }

    function stickPanel() {

        if ( $(window).scrollTop() < stickPosition ) {
            $panel.removeClass('panel_sticky');
            $panel.removeClass('panel_static');
        }

        if ( $(window).scrollTop() >= stickPosition && $(window).scrollTop() < unStickPosition ) {
            $panel.addClass('panel_sticky');
            $panel.removeClass('panel_static');
        }

        if ( $(window).scrollTop() >= unStickPosition ) {
            $panel.addClass('panel_static');
            $panel.removeClass('panel_sticky');
        }
    }

    function groundPanel() {
        $(window).off('load', countUnStickPosition);
        $(window).off('resize', countUnStickPosition);
        $(window).off('scroll', stickPanel);
        $(window).off('resize', stickPanel);
        $panel.removeClass('panel_sticky');
        $panel.addClass('panel_static');
        $panel.addClass('panel_grounded');
    }

    $('.panel__close').on('click', groundPanel);

    if ($panel.length && ! $panel.hasClass('panel_grounded')) {
        $(document).ready(countUnStickPosition);
        $(window).on('load', countUnStickPosition);
        $(window).on('resize', countUnStickPosition);

        $(window).on('scroll', stickPanel);
        $(window).on('resize', stickPanel);
        $(document).ready(stickPanel);
    }

})(jQuery);





