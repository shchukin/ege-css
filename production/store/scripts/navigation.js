(function($) {

    /* Вёрстке важно знать значение высоты навигации, и оно может варьироваться в зависимости от
     * количества строка: немного айтемов -- одна строка. Много -- две.
     * Более того может быть такой, кейс, что на планшетах две строки, а на десктопах -- одна
     *
     * По-умолчанию в стилях проставлено это значение: кастомное свойство --navigation-height в :root,
     * но оно там в каком-то смысле захардкожено, потому что вёрстка не знает ничего о количестве строк.
     * Этим скриптом мы замеряем высоту и явно её проставляем.
     */

    const $html = $('html');
    const $navigation = $('.navigation');
    const $navigationFixedPart = $('.navigation__fixed-part');
    let navigationHeight; // Значение по-умолчанию не важно, но пусть

    function setNavigationHeight() {
        navigationHeight = $('.navigation__fixed-part').outerHeight();
        $html.css('--navigation-height', navigationHeight);
    }

    $(document).on('ready', setNavigationHeight); /* Если сразу понятно, что строк две */
    $(window).on('load', setNavigationHeight); /* Перепроверяем в момент, когда загрузились шрифты */
    $(window).on('resize', setNavigationHeight); /* При изменении окна, потому что на планшетах может быть 2 строки, а на десктопах одна */

})(jQuery);
