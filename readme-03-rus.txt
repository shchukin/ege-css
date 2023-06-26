+--------------------------------------+
| readme-файлы читать в таком порядке: |
| free, online, rus, store, main       |
+--------------------------------------+


Если уже начали прогать, то маленький апдейт:

В панели добавил многоточие (оно там скрывается / появляется хитрожопым образом):
http://prntscr.com/h1q10g
Ну и вообще там текста и цены и текст на кнопке поменял в этой панельке. А то до этого остался копипаст.

если нет, то игнорируй эту секцию.

----------

Глобальным стал блок .down
Ну вот та стрелочка вниз на первом экране. Соответствено в самом первом лендинге free
изменился HTML с
<a class="main__down">...
на
<a class="main__next down">...

В скриптах, соответствено, теперь отдельный файл down.js


----

В предыдущих двух лендингах я забыл вот тут дескриптор " 2x"
http://prntscr.com/h0lknb

Сейчас так:
<img class="tutor__image"
     srcset="content/anna-malkova@2x.jpg"
     src="content/anna-malkova.jpg"
     width="230"
     height="230"
     alt=""
>


А должно быть так:

<img class="tutor__image"
     srcset="content/anna-malkova@2x.jpg 2x" <--- здесь 2x
     src="content/anna-malkova.jpg"
     width="230"
     height="230"
     alt=""
>

----

В самом первом лендинге изменилась нижняя панелька .panel
Там был баг. Я все упростил и баг исчез. Нужно переписать скрипт запкрепления:
development/free/scripts/panel.js

(просто добавляем и убираем класс .panel_sticky)

(function($) {
    var $panel = $('.panel');
    var stickPosition = $('.main').offset().top + $('.main').outerHeight();

    $(window).on('scroll', function () {
        if ( $(window).scrollTop() >= stickPosition ) {
            $panel.addClass('panel_sticky');
        } else {
            $panel.removeClass('panel_sticky');
        }
    });
})(jQuery);

ну и обновить CSS-ку.

----

В предыдущий лендинг "online" добавил сертификат.
Сама картинка - это
development/online/content/full-certificate.jpg
а показывать ее можно все той же модалкой magnific popup.
Там гдя картинок и галерей есть отдельный тип. Так и  называется image:
http://dimsemenov.com/plugins/magnific-popup/documentation.html#image-type

Не знаю как ты там с программированием и скриптами все разруливаешь, но тут
у себя я сделал еще один селекто ".mfp-image-handler" и проставляю там,
где ссылка на картинку. Смотри файл:
development/global/scripts/mfp.js

(алсо обнови CSS-ку в этом проекте - там есть изменения для этого типа image)

----

Аналогично, в новом лендинге можно упростить модалки для видео. Раньше у нас
уже были видосы в модалках, но там они были вместе с формой подписки и приходилось
содержимое модалки верстать ручками (блоки .window и .theater). А в новом
лендинге "rus" у нас просто видяшки и пожно так же доверить плагину их
позиционирование:
http://dimsemenov.com/plugins/magnific-popup/documentation.html#iframe-type

Аналогично делаю новый селектор .mfp-iframe-handler и оставляю просто ссылку
на видос на ютубе.

----

Еще у нас была проблема со шрифтами. Я ее воспроизвести на компе не смог, но на телефоне воспроизводилась.
Переиминовал файл
global/fonts/MyFontsWebfontsKit.css
в
global/fonts/style.css
и вроде бы решилось.
Переиминуй тоже и почекай плиз.