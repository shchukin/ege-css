(function($) {

    const $html = $('html');

    $('.alt-header__burger').on('click', function () {
        $html.toggleClass('burger-expanded');
    });

})(jQuery);
