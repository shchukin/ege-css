(function($) {
    $('.alert').on('click', function () {
        $('.alert').fadeOut();
    });

    $(document).on('keyup', function(event) {
        if (event.keyCode === 27) { /* Esc */
            $('.alert').fadeOut();
        }
    });
})(jQuery);
