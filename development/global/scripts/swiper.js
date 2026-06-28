document.addEventListener('DOMContentLoaded', () => {

    /* Слайдер "info" */

    new Swiper('.swiper--info', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        autoHeight: true,
        spaceBetween: 0,
        effect: "fade",
        loop: true,
        autoplay: {
            delay: 8000,
        },
        navigation: {
            prevEl: '.swiper-control--prev',
            nextEl: '.swiper-control--next',
        },
    });


    /* Слайдер "main" */

    new Swiper('.swiper--main', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        autoHeight: true,
        spaceBetween: 0,
        loop: true,
        autoplay: {
            delay: 8000,
        },
        navigation: {
            prevEl: '.swiper-control--prev',
            nextEl: '.swiper-control--next',
            disabledClass: 'swiper-control--disabled',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });



});
