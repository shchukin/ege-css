(function($) {

    $('.mfp-handler').magnificPopup({
        type: 'inline',
        removalDelay: 200,
        showCloseBtn: false
    });

    $('.mfp-image-handler').magnificPopup({
        type: 'image',
        removalDelay: 200
    });

    $('.mfp-iframe-handler').magnificPopup({
        type: 'iframe',
        removalDelay: 200
    });

})(jQuery);
