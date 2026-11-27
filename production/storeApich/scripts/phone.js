(function ($) {
    'use strict';

    function decodeRtlText(el, mirrorBrackets) {
        var txt = (el.textContent || el.innerText || '').trim();
        if (!txt) return null;

        // Разворачиваем RTL-текст посимвольно (для телефонов дополнительно зеркалируем скобки)
        return Array.from(txt).reverse().map(function (c) {
            if (mirrorBrackets) {
                if (c === '(') return ')';
                if (c === ')') return '(';
            }
            return c;
        }).join('');
    }

    function unmaskPhone(el) {
        if (!el || el.getAttribute('data-unmasked') === 'true') return;
        el.setAttribute('data-unmasked', 'true');

        var rawPhone = decodeRtlText(el, true);
        if (!rawPhone) return;

        var cleanPhone = rawPhone.replace(/[^\d+]/g, '');

        // Обновляем ссылку на месте
        el.href = 'tel:' + cleanPhone;
        el.textContent = rawPhone;

        // Удаляем служебные классы
        $(el).removeClass('js-smart-phone link_rtl');
    }

    function unmaskEmail(el) {
        if (!el || el.getAttribute('data-unmasked') === 'true') return;
        el.setAttribute('data-unmasked', 'true');

        var rawEmail = decodeRtlText(el, false);
        if (!rawEmail) return;

        // Обновляем ссылку на месте
        el.href = 'mailto:' + rawEmail;
        el.textContent = rawEmail;

        // Удаляем служебные классы
        $(el).removeClass('js-smart-email link_rtl');
    }

    function initSmartContacts() {
        var events = 'pointerenter mouseover mousedown touchstart focusin click';

        $(document).on(events, '.js-smart-phone', function () {
            unmaskPhone(this);
        });

        $(document).on(events, '.js-smart-email', function () {
            unmaskEmail(this);
        });
    }

    $(document).ready(function () {
        initSmartContacts();
    });

})(jQuery);
