+--------------------------------------+
| readme-файлы читать в таком порядке: |
| free, online, rus, store, main       |
+--------------------------------------+


В корне две папки: development/ и production/ - очевидно исходник и результат "сборки". И там и там можно двойным кликом открывать и смотреть файлы. Не нужны никакие сервера и вотчеры. Я вообще очень сильно упростил свой стэк: выкинул перепроцессоры, пишу чистый HTML и CSS, никаких левых конструкций и сладких синтаксисов. Никаких бутстрапов, reset`ов, зависимости от миксинов. Все по стандартам.

Другими словами папка development/ - это то, что можно было получить от верстальщика 10 лет назад. Ничего левого. Но без оптимизации тоже никуда. И здесь рулит ПОСТ-процессорный подход. Добавляем префиксы, склеиваем и оптимизируем CSS, фоллбечим переменные, собираем спрайты и т.д. Фишка в том, что я все это делаю основываясь на реальном синтаксисах HTML/CSS. И вот таким образом появляется папка production/

Там рулит GULP и частично postCSS. Чтобы запустить эту сборку нужна нода.
Дальше команды:
npm install
gulp

----

По папкам:

• markups/ - доки по компонентам. Обычно тут же я и верстаю большинство блоков. Ну типа сразу видишь что может затрагивать блок на одний странице, на что влиять. Но у нас тут простейший лендинг и документировать, и, там, с ума сходить по отдельным блокам незачем.

• styles/ - весь CSS. Один файл - один БЭМ-блок. В названиях файлов нижнее подчеркивание - это типа означает, что блок - часть чего-то большего. Ну как в препроцессорах.

_root.css - переменные. Выбивается из общей схемы ну потому что хз как его назвать.
_universal.css потому что нельзя назвать файл звездочкой :)
style.css - индексный файл, чтобы без сборки все это работало и можно было версть файл просто открытый через браузер.

• scripts/ - жаба-скрит. Его я обычно не пишу. Ну там наброски делаю какие-то, чтобы демонстрировать верстку. Тут практически ничего нет. Сделал залипания при скроллировани, инициализировал плагины. Если ты - тыжпрогарммист, то перепроверь и напиши оптимальнее :)

• vendors/ - библиотечки. jquery - понятно, magnific-popup - модалка:
http://dimsemenov.com/plugins/magnific-popup/
normalize.css - это версточное
outline.js - это простейшая штука для убиства ссаных синих аутлайнов, ибо стилями с ними никак.

А дальше у меня идет шесть папок с картинками:

• images/ - самые обычные большие картинки, фоны и все такое. То, что не поддается оптимизации.

• sprites/ - растровые спрайты, но без них, слава богу, все обошлось, лол.

• vectors/ - векторные картинки - их я через base64 инлайню прямо в CSS. Обычно их совсем немного. В этом проекте 30кб. Это весь наш графон.

• symbols/ - векторыне спрайты. С ними геморройно. Но опять, в этом проекте смысла особого не было их делать. Там было всего штук 6-8 картинок, которые имело смысл убирать в спрайт. В итоге я их в vectors/ запихал.

• temp/ - мусор

• content/ - мусор, но который может еще пригодиться. Ну типа если в макете использовали уже реальные картинки, то че бы их сразу и не экспортнуть.

----


Особенности:

• Все по БЭМ. Читай про БЭМ: bem.info

• Глобальный бокс-сайзинг установлен в border-box. Тут я немного лукавлю, что все по стандартам :)

• Если в картинке <img> видишь SRCSET и @2x файл - это версия для ретины. Аналогично в стилях там есть фоны в запросах resolution: 2dppx - тоже для ретины.

• Если будут новые картинки, то для обычных экранов жми JPG с компрессией процентов в 80%, а для ретины процентов в 50%. Ретине важно разрешение, но не качество. А трафик тоже надо экономить.

• В шапке и в последней форме подписки есть скрытые чекбоксы. В данном случае они выступают не как элеметы форм, а как хранители бинарной информации. В шапке это открыта/закрыта выпадайка с контактами. В форме подписки от свернута/развернута панелька. Дальше CSS-ом я матчюсь на эти чекбоксы и скрываю/показываю там че нужно. JS для этого не нужен. Короч не трогать эти чекбоксы.

• В формах связывай лейблы с полями через id/for - это тип важно.
  http://prntscr.com/fy12iy
  Пофиг какими именами, главное связывай.

• Страницу прогнал через Типограф: artlebedev.ru/typograf/ - отсюда куча неразрывных пробелов &nbsp; в текстах. Не трогай их. Они нужны. Если пишешь новый текст, то
  его тоже прогоняй.

• По схожим причинам там встречается класс .nobr - он запрещает переносы внутри. Например <span class="nobr">ЕГЭ-студия</span> или <span class="nobr">60-80</span>. Ну чтобы не получилось так, что "60-" осталось в начале строки, а "80" в конце. НЕ заменять эту конструкцию на символ неразрывного тире. Это другой символ.

• Вообще, кстати, в верстке айдишники не используются. И если видишь айдишник то это либо для связи с лейблом, либо для открытия модалки, либо для якоря - что-нибудь в таком духе. Можно их менять или убирать.

• Еще есть вспомогательный блок .hide Моддификаторами типа .hide-on-smartphone можно скрывать или показывать что-то на определенных диапазонах. Но это скорее для текста, а не для разметки. Можно скрыть таким образом неугодный предлог или неугодный <br> на определенном диапазоне.

• Во всех формах с подпиской проработаны все возможные кейсы отправки и ошибок. Ошибки у поля инпута смотри в markups/_input.html - там модификатор .input_error и элемент .input__note

• Дальше у кнопок есть классы .button_loading (отправляем данные) - на кнопке появляется крутилка. Если все окей, то .button_success и появляется галочка. В случае ошибки у нас там, получается, бесконечная крутилка.

• Потом выводим алерты. Пихаем их в DOM через fadeIn(200) и убираем через fadeOut(200) Смотри markups/_alert.html Либо хорошие с текстом "Все ок, щас пришлем материалы" / "Уже был подписан". Либо плохие с модификатором .alert_danger и текстом типа "отправка занимает слишком долго времени, попробуйте позже" / "сервер не отвечает, попробуйте позже".

• Отдельный момент с алертами. На мобилках их убиваем по клику/свайпу (крестик я там скрываю). На десктопах по клику на крестик. Хотя можно и на десктопах так же скрывать по клику на всю панель. Жалко что ли? :)


----

Шрифты. Там Roboto: 400, 500, 700 и Futura PT в одном начертании в 500 (demi).
Roboto бесплатный, можно взять с Google Fonts - он сейчас подрубается к странице.
А Futura покупали тут:
https://www.myfonts.com/users/rasz23uo8s/overview/
на почту d.gavrilov@ege-study.ru
как выкатите - проверь, что счетчики работают (смотри папку adobe/)

Если умеешь подключать шрифты по крутому, то подключай:
https://web-standards.ru/articles/web-font-loading-patterns/

----

Верстальщик здесь:
телеграм: t.me/cypher
скайп: cypher-kun
почта: a.a.shchukin@gmail.com
