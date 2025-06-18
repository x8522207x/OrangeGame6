let startY = 0;

$(document).ready(() => {
    window.addEventListener('resize', updateMaxVH);

    $('.modal_wrap').css('display', 'none');
    setTimeout(() => {
        $('.loading').remove();
        $('.modal').toggleClass('hide');
        $('.modal_wrap').css('display', '');
    }, 1000);

    ['.event_banner', '.event_gnb_menu'].forEach(ele => $(ele).on('click', () => {
        $('.event_banner').toggleClass('-open');
    }));

    $('.event_gnb_gamestart').on('click', () => {
        window.open("https://galaxy.beanfun.com/webapi/view/login/twp?redirect_url=https://warsofprasia.beanfun.com/Main");
    });

    $('.modal_close').on('click', () => {
        $('.plate_modal').toggleClass('-active');
        $('.modal.type--youtube').toggleClass('hide');
        $('.modal_box_veil').toggleClass('-hide');
        $('.modal').css('opacity', '0');
        $('.youtube--2').remove();
    });

    $('._video-button').on('click', () => {
        openVideo('POTYvJrDwp4');
    });

    $('.btn_box button').on('click', function () {
        const index = $(this).index('.btn_box button');
        $('.area_modal').removeClass('--on');
        $('.area_modal')[index].classList.add('--on');
        $('.page--r-raid-forbiddenrock .mobile-content .section--reef').addClass('--dimOn');
    });

    $('.page--r-raid-forbiddenrock .pc-content .section--reef .modal_box .area_modal .area_modal_close').on('click', () => {
        $('.area_modal').removeClass('--on');
    });

    $('.page--r-raid-forbiddenrock .mobile-content .section--reef .modal_box .area_modal .area_modal_close').on('click', () => {
        $('.area_modal').removeClass('--on');
        $('.page--r-raid-forbiddenrock .mobile-content .section--reef').removeClass('--dimOn');
    });

    let pcSwiperPage;

    function pcTouchMove(swiper) {
        return (e) => {
            if ($(window).height() < 911) {
                handleSmallHeight(swiper, e);
            } else {
                swiper.allowTouchMove = true;
            }
        };
    }

    let pcWheelHandler;

    function pcTouchStart(e) {
        startY = e.touches[0].clientY;
    }

    function pcWheel(swiper) {
        return e => {
            e.stopPropagation();
            const currentSlide = swiper.slides[swiper.activeIndex];
            const slideScrollTop = currentSlide.scrollTop;
            const scrollHeight = currentSlide.scrollHeight;
            const clientHeight = currentSlide.clientHeight;
            const isAtTop = slideScrollTop === 0;
            const isAtBottom = (slideScrollTop + clientHeight >= scrollHeight);
            if (swiper.realIndex === 0) {
                if (isAtBottom && e.deltaY > 0) {
                    swiper.slideTo(swiper.realIndex + 1);
                }
            } else if ([1, 2, 3, 4].includes(swiper.realIndex)) {
                if (isAtTop && e.deltaY < 0) {
                    swiper.slideTo(swiper.realIndex - 1);
                } else if (isAtBottom && e.deltaY > 0) {
                    swiper.slideTo(swiper.realIndex + 1);
                }
            } else {
                if (isAtTop && e.deltaY < 0) {
                    swiper.slideTo(swiper.realIndex - 1);
                }
            }
        };
    }

    const pcSwiper = () => {
        pcSwiperPage = new Swiper('.section-pages', {
            direction: 'vertical',
            touchReleaseOnEdges: true,
            mousewheel: {
                releaseOnEdges: true,
            },
            loop: false,
            freeMode: false,
            noSwiping: true,
            noSwipingSelector: 'button',
            autoHeight: false,
            speed: 1000,
            slidesPerView: 1,
            spaceBetween: 0,
            watchSlidesProgress: true,
            allowTouchMove: false,
            on: {
                init: (swiper) => {
                    pcTouchMoveHandler = pcTouchMove(swiper);
                    pcWheelHandler = pcWheel(swiper);
                    $('.UNI-footer').clone().appendTo('.section--episode');
                    $('.UNI-footer')[1]?.remove();
                    $('.UNI-footer').css('z-index', 100).css('position', 'absolute').css('width', '100%').css('height', 80).css('bottom', 0);

                    $('.gotop').on('click', () => {
                        swiper.slideTo(0);
                        swiper.slides.forEach(slide => {
                            slide.scrollTop = 0;
                        })
                    });

                    $('.scroll').on('click', () => {
                        swiper.slideTo(1);
                    });

                    $('.UNI-footer').css('display', 'none');

                    $('._tab-button.--l').on('click', () => swiper.slideTo(2));
                    $('._tab-button.--r').on('click', () => swiper.slideTo(3));

                    document.querySelectorAll('.swiper-slide-page').forEach(node => {
                        node.addEventListener('wheel', pcWheelHandler, { passive: true });
                        node.addEventListener('touchstart', pcTouchStart, { passive: true });
                    });
                },
                slideChange: (swiper) => {
                    ['-active'].forEach(cl => ['.depth_1', '.depth_2'].forEach(ele => $(ele).removeClass(cl)));
                    $('.swiper-slide-page').off('scroll');
                    $('.swiper-slide-page').removeClass('scrollable');
                    $('.gotop').removeClass('show');
                    $('.UNI-footer').css('display', 'none');
                    $('.swiper-slide-page')[swiper.realIndex].classList.add('scrollable');

                    if (swiper.realIndex !== 0) {
                        $('.gotop').addClass('show');
                    }

                    if ([0, 1].includes(swiper.realIndex)) {
                        $('.depth_1')[swiper.realIndex].classList.add('-active');
                    } else if ([2, 3].includes(swiper.realIndex)) {
                        $('.depth_1')[2].classList.add('-active');
                        $('.depth_2')[swiper.realIndex - 2].classList.add('-active');
                    } else {
                        $('.depth_1')[swiper.realIndex - 1].classList.add('-active');
                    }

                    if (swiper.realIndex === 5) {
                        $('.UNI-footer').css('display', 'block');
                    }
                },
            }
        });

        $('.swiper-slide-page')[0].classList.add('scrollable');
        pcSwiperPage.slideTo(0);
        $('.depth_1')[0].classList.add('-active');

        for (let i = 0; i < 6; i++) {
            addPageClick(i, pcSwiperPage);
        }
    };

    const p4Swiper = () => {
        p4SwiperPage = new Swiper('.video_con', {
            touchReleaseOnEdges: true,
            mousewheel: {
                releaseOnEdges: true,
            },
            navigation: {
                nextEl: '.swiper-btn-next',
                prevEl: '.swiper-btn-prev',
            },
            loop: true,
            freeMode: false,
            noSwiping: true,
            noSwipingSelector: 'button',
            autoHeight: false,
            speed: 1000,
            slidesPerView: 1,
            spaceBetween: 0,
            watchSlidesProgress: true,
            allowTouchMove: false,
            on: {
                slideChange: (swiper) => {
                    const name = ['廢棄的收容所', '監視空地', '被侵蝕的埋葬地', '禁忌的實驗室'];
                    const videoUrl = ['sec3_bg_1.mp4', 'sec3_bg_2.mp4', 'sec3_bg_3.mp4', 'sec3_bg_4.mp4'];
                    const index = swiper.realIndex;
                    $('.swiper_video ._name span')[0].innerText = name[index];
                    $('.video_box video')[0].src = `./img/pc/${videoUrl[index]}`;
                    $('.swiper_video ._name span')[1].innerText = name[index];
                    $('.video_box video')[1].src = `./img/pc/${videoUrl[index]}`;
                },
            }
        });
    };

    if ($(window).width() > 1280) {
        $('.event_gnb').addClass('type_clear');
        $('.event_gnb').removeClass('type_default');
        pcSwiper();
    } else {
        if ($(window).width() > 768) {
            $('.event_gnb').addClass('type_clear');
            $('.event_gnb').removeClass('type_default');
        } else {
            $('.event_gnb').removeClass('type_clear');
            $('.event_gnb').addClass('type_default');
        }
        const visual1 = $('.page--r-raid-forbiddenrock .mobile-content .section--reef .area__visual1');
        const content1 = $('.page--r-raid-forbiddenrock .mobile-content .section--reef ._content .type--1');
        const visual2 = $('.page--r-raid-forbiddenrock .mobile-content .section--reef .area__visual2');
        const content2 = $('.page--r-raid-forbiddenrock .mobile-content .section--reef ._content .type--2');
        $('._tab-button.--l').on('click', (e) => {
            if (!e.currentTarget.classList.contains('-active')) {
                e.currentTarget.classList.add('-active');
            }

            $('._tab-button.--r').removeClass('-active');
            if (!visual1[0].classList.contains('--visualOn')) {
                visual1.addClass('--visualOn');
            }
            if (!content1[0].classList.contains('--typeOn')) {
                content1.addClass('--typeOn');
            }
            visual2.removeClass('--visualOn');
            content2.removeClass('--typeOn');
        });
        $('._tab-button.--r').on('click', (e) => {
            if (!e.currentTarget.classList.contains('-active')) {
                e.currentTarget.classList.add('-active');
            }

            $('._tab-button.--l').removeClass('-active');
            visual1.removeClass('--visualOn');
            content1.removeClass('--typeOn');
            if (!visual2[0].classList.contains('--visualOn')) {
                visual2.addClass('--visualOn');
            }
            if (!content2[0].classList.contains('--typeOn')) {
                content2.addClass('--typeOn');
            }
        });
    }
    p4Swiper();

    function updateMaxVH() {
        const root = document.documentElement;
        const newMaxVh = `${window.innerHeight}px`;
        root.style.setProperty('--maxvh', newMaxVh);
        if ($(window).width() > 1280) {
            $('.event_gnb').addClass('type_clear');
            $('.event_gnb').removeClass('type_default');

            if (pcSwiperPage) {
                pcSwiperPage.update();
            } else {
                setTimeout(() => pcSwiper());
            }
        } else {
            if (pcSwiperPage) {
                pcSwiperPage.destroy(true, true); // 銷毀 Swiper 實例
                pcSwiperPage = null; // 重置為 null
                document.querySelectorAll('.swiper-slide-page').forEach(node => {
                    node.removeEventListener('wheel', pcWheelHandler, { passive: true });
                    node.removeEventListener('touchstart', pcTouchStart, { passive: true });
                });
            }

            if ($(window).width() > 768) {
                $('.event_gnb').addClass('type_clear');
                $('.event_gnb').removeClass('type_default');
            } else {
                $('.event_gnb').removeClass('type_clear');
                $('.event_gnb').addClass('type_default');
            }
            const visual1 = $('.page--r-raid-forbiddenrock .mobile-content .section--reef .area__visual1');
            const content1 = $('.page--r-raid-forbiddenrock .mobile-content .section--reef ._content .type--1');
            const visual2 = $('.page--r-raid-forbiddenrock .mobile-content .section--reef .area__visual2');
            const content2 = $('.page--r-raid-forbiddenrock .mobile-content .section--reef ._content .type--2');
            $('._tab-button.--l').on('click', (e) => {
                if (!e.currentTarget.classList.contains('-active')) {
                    e.currentTarget.classList.add('-active');
                }

                $('._tab-button.--r').removeClass('-active');
                if (!visual1[0].classList.contains('--visualOn')) {
                    visual1.addClass('--visualOn');
                }
                if (!content1[0].classList.contains('--typeOn')) {
                    content1.addClass('--typeOn');
                }
                visual2.removeClass('--visualOn');
                content2.removeClass('--typeOn');
            });
            $('._tab-button.--r').on('click', (e) => {
                if (!e.currentTarget.classList.contains('-active')) {
                    e.currentTarget.classList.add('-active');
                }

                $('._tab-button.--l').removeClass('-active');
                visual1.removeClass('--visualOn');
                content1.removeClass('--typeOn');
                if (!visual2[0].classList.contains('--visualOn')) {
                    visual2.addClass('--visualOn');
                }
                if (!content2[0].classList.contains('--typeOn')) {
                    content2.addClass('--typeOn');
                }
            });
        }
    }
});

const handleSmallHeight = (swiper, event) => {
    swiper.allowTouchMove = false;
    event.stopPropagation();

    const currentY = event.touches[0].clientY;
    let direction = '';
    if (currentY > startY) {
        direction = 'down';  // 向下移动
    } else if (currentY < startY) {
        direction = 'up';    // 向上移动
    }

    const currentSlide = swiper.slides[swiper.activeIndex];
    const slideScrollTop = currentSlide.scrollTop;
    const scrollHeight = currentSlide.scrollHeight;
    const clientHeight = currentSlide.clientHeight;
    const isAtTop = slideScrollTop === 0;
    const isAtBottom = (slideScrollTop + clientHeight >= scrollHeight);

    if (isAtTop) {
        if (swiper.realIndex !== 0) {
            swiper.allowTouchMove = true;
            if (direction === 'down') {
                swiper.slideTo(swiper.realIndex - 1);
            }
        }
    } else if (isAtBottom) {
        swiper.allowTouchMove = true;
        if (direction === 'up') {
            swiper.slideTo(swiper.realIndex + 1);
        }
    }
};

const addPageClick = (index, swiper) => {
    $(`.page_p${index + 1}`).on('click', () => {
        swiper.slideTo(index);
    });
};

const openVideo = (video, path) => {
    $('.plate_modal').toggleClass('-active');
    $('.modal').css('opacity', '1').css('visibility', 'inherit');
    $('.modal.type--youtube').toggleClass('hide');
    $('.modal_box_veil').toggleClass('-hide');
    if (video) {
        $('.modal_source').append(
            `<iframe width="auto" height="auto" class="modal_youtube youtube--2"
        src="https://www.youtube.com/embed/${video}?autoplay=1"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen></iframe>`);
    } else if (path) {
        $('.modal_source').append(
            `<video class="modal_youtube youtube--2" loop autoplay playsinline controls controlslist="nodownload" preload="metadata"><source src=${path} type="video/mp4"></video>`);
    }
};

