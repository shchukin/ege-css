(function($) {

    $('.gallery').each(function() {
      var $gallery = $(this);
      var $items = $gallery.find('.gallery__item');
      var $previews = $gallery.find('.gallery__preview');

      $previews.on('click', function(e) {
        e.preventDefault();
        const index = $previews.index(this);
        if (index === -1) return;

        $items.removeClass('gallery__item--current');
        $previews.removeClass('gallery__preview--current');
        
        $items.eq(index).addClass('gallery__item--current');
        $previews.eq(index).addClass('gallery__preview--current');
      });
    });

})(jQuery);
