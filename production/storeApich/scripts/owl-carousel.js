(function($) {

    $(".owl-carousel").on('initialized.owl.carousel', function(e) {
        $( '<div class="owl-status">' + (e.item.index + 1) + '/' + e.item.count + '</div>').appendTo(this);
    }).owlCarousel({
        'items': 1,
        'dots': false,
        'nav': true,
        'navText': ['Предыдущий', 'Следующий']
    }).on('changed.owl.carousel', function(e) {
        $(this).find('.owl-status').html( (e.item.index + 1) + '/' + e.item.count);
    });

})(jQuery);
