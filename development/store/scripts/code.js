(function($) {
    $('.code__submit.button, .code__submit .button').on('click', function () {
        var $this = $(this);
        if ( ! $this.hasClass('button_loading') &&  ! $this.hasClass('button_success') ) {
            $this.addClass('button_loading');
            if ( ! $('.code .input__widget').val().length ) {
                setTimeout(function () {
                    $this.removeClass('button_loading').addClass('button_success');
                    $('.code__output').fadeIn(200);
                }, 3000);
            } else {
                setTimeout(function () {
                    $this.removeClass('button_loading').addClass('button_success');
                    $('.alert').fadeIn(200);
                    $('.cart__price').hide();
                    $('.cart__updated-price').fadeIn(200);
                    $('.code__visibility').prop('checked', false);
                }, 3000);
            }
            setTimeout(function () {
                $this.removeClass('button_success');
            }, 4500);
        }
    });
})(jQuery);
