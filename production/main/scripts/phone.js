(function ($) {
    'use strict';

    function decodeRtlPhone(el) {
        var txt = (el.textContent || el.innerText || '').trim();
        if (!txt) return null;

        // Разворачиваем RTL-текст посимвольно с зеркалированием скобок
        return Array.from(txt).reverse().map(function (c) {
            if (c === '(') return ')';
            if (c === ')') return '(';
            return c;
        }).join('');
    }

    function unmaskPhone(el) {
        if (!el || el.getAttribute('data-unmasked') === 'true') return;
        el.setAttribute('data-unmasked', 'true');

        var rawPhone = decodeRtlPhone(el);
        if (!rawPhone) return;

        var cleanPhone = rawPhone.replace(/[^\d+]/g, '');

        // Обновляем ссылку на месте
        el.href = 'tel:' + cleanPhone;
        el.textContent = rawPhone;

        // Удаляем служебные классы
        $(el).removeClass('js-smart-phone link_rtl');
    }

    function initSmartPhone() {
        $(document).on('pointerenter mouseover mousedown touchstart focusin', '.js-smart-phone', function () {
            unmaskPhone(this);
        });
    }

    $(document).ready(function () {
        initSmartPhone();
    });

})(jQuery);
