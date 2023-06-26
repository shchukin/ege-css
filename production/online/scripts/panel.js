(function($) {
    var $panel = $('.panel');

    function groundPanel() {
        $panel.addClass('panel_grounded');
    }

    $('.panel__close').on('click', groundPanel);

})(jQuery);
