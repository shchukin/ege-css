(function ($) {

    /* Вспомогательная функция для подсчёта количества строк в flex-е.
     * Понадобится ниже для подсчёта высоты.
     */
    function getFlexRows($container) {
        const $children = $container.children();
        let rows = 1;
        let previousOffsetTop = $children.first().offset().top;

        $children.each(function () {
            const currentOffsetTop = $(this).offset().top;
            if (currentOffsetTop !== previousOffsetTop) {
                rows++;
                previousOffsetTop = currentOffsetTop;
            }
        });

        return rows;
    }

    /* Вёрстке важно знать значение высоты навигации, и оно может варьироваться в зависимости
     * от количества строк: мало айтемов -- одна строка, много -- две.
     * Более того может быть такой, кейс, что на планшетах две строки, а на десктопах -- одна
     *
     * По-умолчанию в стилях проставлено это значение: кастомное свойство --navigation-height в :root,
     * но оно там в каком-то смысле захардкожено, потому что вёрстка не знает ничего о количестве строк.
     * Этим скриптом мы замеряем высоту и явно её проставляем.
     *
     * Важно, что замерять надо не высоту содиржимого, которая при скроллировании меняется,
     * а именно количество строк.
     */

    const $html = $('html');
    const $navigation = $('.navigation');
    const $navigationList = $('.navigation__list');
    let navigationHeight;

    function setNavigationHeight() {
        const rowsAmount = getFlexRows($navigationList);
        const height = rowsAmount * 32 + 29; // 32 -- высота одной строки, 29 -- паддинги и бордюры навигации
        $html.css('--navigation-height', height);
    }

    $(document).on('ready', setNavigationHeight); /* Если сразу понятно, что строк две */
    $(window).on('load', setNavigationHeight); /* Перепроверяем в момент, когда загрузились шрифты */
    $(window).on('resize', setNavigationHeight); /* При изменении окна, потому что на планшетах может быть 2 строки, а на десктопах одна */

})(jQuery);
