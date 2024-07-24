(function($) {
    /*
    * Smooth scrolling
    */

    $(".discipline__option").click(function (event) {
        event.preventDefault();

        var offset = 40;
        var speed = 500;
        var target = $(this.hash);

        $("html,body").animate({
            scrollTop: target.offset().top - offset
        }, speed);
    });

})(jQuery);





