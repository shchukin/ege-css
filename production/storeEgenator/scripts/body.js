(function($) {
    
    var $body = $('.body');
    var $contactsVisibility = $('.header__contacts-visibility');
    var scrolled = $(window).scrollTop();

    function stickHeader() {
        scrolled = $(window).scrollTop();
        if ( scrolled > 0 ) {
            $body.addClass('body_scrolled');
            $contactsVisibility.prop('checked', false); /* Если сначала открыли контакты, а потом проскроллировали, то при возвращении контакты должны быть скрыты
                                                           Да и влюбом случае незачем скроллировать страницу на которой открыты контакты */
        } else {
            $body.removeClass('body_scrolled');
        }
    }

    $(window).on('scroll', stickHeader);
    $(window).on('resize', stickHeader);
    $(document).ready(stickHeader);



    var scrolledBefore = scrolled;

    function hideNav() {
        scrolled = $(window).scrollTop();

        if ( scrolled > scrolledBefore ) {
            $body.addClass('body_scrolling-up').removeClass('body_scrolling-down');
        } else {
            $body.removeClass('body_scrolling-up').addClass('body_scrolling-down');
        }

        scrolledBefore = scrolled;
    }

    $(window).on('scroll', hideNav);
    $(window).on('resize', hideNav);
    $(document).ready(hideNav);

})(jQuery);
