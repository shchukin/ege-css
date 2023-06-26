(function($) {

    $('.tabs__tag').on('click', function (event) {
        event.preventDefault();
        var $tabs = $(this).parents('.tabs');

        /* tag */
        $tabs.find('.tabs__tag--current').removeClass('tabs__tag--current');
        $(this).addClass('tabs__tag--current');

        $tabs.find('[aria-selected="true"]').attr('aria-selected', 'false');
        $(this).attr('aria-selected', 'true');


        /* body */

        $tabs.find('.tabs__item--current').removeClass('tabs__item--current');
        $tabs.find( $(this).attr('href') ).addClass('tabs__item--current');

    });

})(jQuery);
