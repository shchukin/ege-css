(function($) {

    function disableStylesAndDOM() {
        $('.header, .navigation, .info-panel, .customer, .panel, .portal-footer, .window').hide();

        $('html, body').css({
            'height': '100%',
            'margin': 0
        });

        $('link[rel="stylesheet"]').not('#yandex-delivery-widget-fixes').prop('disabled', true);
    }


    function enableStylesAndDOM() {
        $('.header, .navigation, .info-panel, .customer, .panel, .portal-footer, .window').show();

        $('html, body').css({
            'height': '',
            'margin': ''
        });

        $('link[rel="stylesheet"]').not('#yandex-delivery-widget-fixes').prop('disabled', false);
    }




    $('.shipping__change').on('click', function () {
        disableStylesAndDOM();


        (function(w) {
            function startWidget() {
                w.YaDelivery.createWidget({
                    containerId: 'delivery-widget',         // Идентификатор HTML-элемента (контейнера), в котором будет отображаться виджет
                    params: {
                        city: "Москва",                     // Город, отображаемый на карте при запуске
                        size:{                              // Размеры виджета
                            "height": "100%",               // !!! ВАЖНО !!!
                            "width": "100%"                 // Ширина
                        },
                        source_platform_station: "05e809bb-4521-42d9-a936-0fb0744c0fb3",  // Станция отгрузки
                        physical_dims_weight_gross: 10000,  // Вес отправления
                        delivery_price: "от 100",           // Стоимость доставки
                        delivery_term: "от 1 дня",          // Срок доставки
                        show_select_button: true,           // Отображение кнопки выбора ПВЗ (false — скрыть кнопку, true — показать кнопку)
                        filter: {
                            type: [                         // Тип способа доставки
                                "pickup_point",             // Пункт выдачи заказа
                                "terminal"                  // Постамат
                            ],
                            is_yandex_branded: false,       // Тип пункта выдачи заказа (false — Партнерские ПВЗ, true — ПВЗ Яндекса)
                            payment_methods: [              // Способ оплаты
                                "already_paid",             // Доступен для доставки предоплаченных заказов
                                "card_on_receipt"           // Доступна оплата картой при получении
                            ],
                            payment_methods_filter: "or"    // Фильтр по типам оплаты
                        }
                    },
                });
            }
            w.YaDelivery
                ? startWidget()
                : document.addEventListener('YaNddWidgetLoad', startWidget);
        })(window);

        // Подписка на событие
        document.addEventListener('YaNddWidgetPointSelected', function (data){
            // Обработка выбранных данных
            // Данные о выбранной точке содержатся в параметре data
            console.log(data.detail.id);
            console.log(data.detail.address.full_address);
            console.log(data.detail.address.country);
            console.log(data.detail.address.locality);
            console.log(data.detail.address.street);
            console.log(data.detail.address.house);
            console.log(data.detail.address.comment);
        });

    });

    $('#delivery-widget').on('click', function (){
        enableStylesAndDOM();
    });

})(jQuery);
