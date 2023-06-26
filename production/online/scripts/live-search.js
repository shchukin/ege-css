(function($) {

    $('.live-search .input__widget').on('focus', function (event) {
        $(this).parents('.live-search').addClass('live-search_active');
    });

})(jQuery);
