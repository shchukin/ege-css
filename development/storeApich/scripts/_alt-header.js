(function($) {

    const $html = $('html');
    let rememberedPageScrollPosition = 0;

    function expandHeader() {
        rememberedPageScrollPosition = $(window).scrollTop(); /* Запомнить скролл пользователя, так как display: none на .page его сбросит (смотри .burger-expanded .page) */
        $html.addClass('burger-expanded');
        $(window).scrollTop(0); /* Скролл должен быть в начале (смотрим на меню) */
    }

    function closeHeader() {
        $html.removeClass('burger-expanded');
        $(window).scrollTop(rememberedPageScrollPosition); /* Скролл должен быть там, где пользователь его оставил */
    }

    $('.alt-header__burger').on('click', function () {
        $html.hasClass('burger-expanded') ? closeHeader() : expandHeader();
    });


    /* Закрытие по клику вне шапки.
       Но запускается в случае, если не идёт работа с модальным окном. А то там получался странный
       эффект если модалка открыта из шапки, то в фоне шапка закрывается при взаимодействии с модалкой.
    */
    $(document).on('click', function (event) {
        if (!$(event.target).closest('.alt-header').length && !$(event.target).closest('.mfp-wrap').length) {
            closeHeader();
        }
    });

})(jQuery);
