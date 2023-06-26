(function($) {

    /* placeholder for select type */

    function selectPlaceholder($select) {
        if ( $select.val() === "placeholder" ) {
            $select.addClass('input__widget_faked-placeholder');
        }
        else {
            $select.removeClass('input__widget_faked-placeholder');
        }
    }

    $(document).ready(function () {
        $('.input_type_select .input__widget').each(function () {
            selectPlaceholder( $(this) );
        });
    });

    $('.input_type_select .input__widget').on('change', function () {
        selectPlaceholder( $(this) );
    });


    /* remove error state on focus */

    $('.input__widget').on('focus', function () {
        $(this).parents('.input').removeClass('input_error');
    });

})(jQuery);
