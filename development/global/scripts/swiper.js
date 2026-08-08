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

    const containerPaddingStyle = window.getComputedStyle(document.documentElement).getPropertyValue('--container-padding');

    new Swiper('.swiper--main', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        autoHeight: true,
        spaceBetween: parseInt(containerPaddingStyle, 10) || 20,
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


    /* Слайдер "best-sellers" */

    new Swiper('.swiper--best-sellers', {
        slidesPerView: 3,
        slidesPerGroup: 3,
        autoHeight: true,
        spaceBetween: parseInt(containerPaddingStyle, 10) || 20,
        navigation: {
            prevEl: '.swiper-control--prev',
            nextEl: '.swiper-control--next',
            disabledClass: 'swiper-control--disabled',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                pagination: {
                    type: 'fraction',
                },
            },
            768: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                pagination: {
                    type: 'bullets',
                    clickable: true,
                },
            },
            1024: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                pagination: {
                    type: 'bullets',
                    clickable: true,
                },
            }
        }
    });


    /* Слайдер "summary" для новинок и рекомендаций */

    new Swiper('.swiper--summary', {
        autoHeight: true,
        spaceBetween: parseInt(containerPaddingStyle, 10) || 20,
        navigation: {
            prevEl: '.swiper-control--prev',
            nextEl: '.swiper-control--next',
            disabledClass: 'swiper-control--disabled',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                pagination: {
                    type: 'fraction',
                },
            },
            768: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                pagination: {
                    type: 'bullets',
                    clickable: true,
                },
            }
        }
    });



});
