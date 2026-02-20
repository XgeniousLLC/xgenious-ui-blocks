/**
 * Frontend JavaScript for Xgenious UI Blocks.
 * This file is loaded on the public-facing side.
 */

(function($) {
    'use strict';

    const XgeniousUIBlocks = {
        /**
         * Initialize all blocks.
         */
        init: function() {
            console.log('Xgenious UI Blocks: Initializing all blocks');
            this.initCounters();
            this.initAccordions();
            this.initFaqAccordions();
            this.initTabs();
            this.initProgressBars();
            this.initAnimations();
            this.initTestimonialSliders();
            this.initVideoPopups();
        },

        /**
         * Initialize counter blocks.
         */
        initCounters: function() {
            $('.xgenious-counter').each(function() {
                const $counter = $(this);
                const $number = $counter.find('.counter-number');
                const targetValue = parseInt($number.data('target'), 10);
                const duration = parseInt($number.data('duration') || 2000, 10);

                // Animate counter when visible
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && !$counter.hasClass('animated')) {
                            $counter.addClass('animated');
                            animateCounter($number, targetValue, duration);
                        }
                    });
                }, { threshold: 0.5 });

                observer.observe($counter[0]);
            });

            function animateCounter($element, target, duration) {
                const start = 0;
                const increment = target / (duration / 16);
                let current = start;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    $element.text(Math.floor(current));
                }, 16);
            }
        },

        /**
         * Initialize accordion blocks.
         */
        initAccordions: function() {
            $('.xgenious-accordion').each(function() {
                const $accordion = $(this);
                const allowMultiple = $accordion.data('allow-multiple');

                $accordion.find('.accordion-header').on('click', function() {
                    const $header = $(this);
                    const $item = $header.closest('.accordion-item');
                    const $content = $item.find('.accordion-content');

                    if (!allowMultiple) {
                        // Close other items
                        $accordion.find('.accordion-item').not($item).removeClass('active');
                        $accordion.find('.accordion-content').not($content).slideUp(300);
                    }

                    // Toggle current item
                    $item.toggleClass('active');
                    $content.slideToggle(300);
                });
            });
        },

        /**
         * Initialize FAQ accordion blocks.
         */
        initFaqAccordions: function() {
            console.log('Xgenious UI Blocks: Initializing FAQ accordions');

            // Use event delegation - CSS handles the animation
            $(document).on('click', '.xg-faq-accordion .faq-question', function(e) {
                e.preventDefault();

                const $question = $(this);
                const $item = $question.closest('.faq-item');
                const $accordion = $item.closest('.xg-faq-accordion');
                const faqId = $item.data('faq-id');
                const isCurrentlyOpen = $item.hasClass('is-open');

                console.log('FAQ #' + faqId + ' clicked!');

                // Close all other FAQ items in this accordion
                $accordion.find('.faq-item').not($item).each(function() {
                    const $otherItem = $(this);
                    const $otherQuestion = $otherItem.find('.faq-question');
                    $otherItem.removeClass('is-open');
                    $otherQuestion.attr('aria-expanded', 'false');
                    console.log('Closing FAQ #' + $otherItem.data('faq-id'));
                });

                // Toggle the clicked item
                if (isCurrentlyOpen) {
                    $item.removeClass('is-open');
                    $question.attr('aria-expanded', 'false');
                    console.log('Closing FAQ #' + faqId);
                } else {
                    $item.addClass('is-open');
                    $question.attr('aria-expanded', 'true');
                    console.log('Opening FAQ #' + faqId);
                }
            });

            console.log('FAQ accordion initialized with CSS transitions');
        },

        /**
         * Initialize tabs blocks.
         */
        initTabs: function() {
            $('.xgenious-tabs').each(function() {
                const $tabs = $(this);
                const $tabButtons = $tabs.find('.tab-button');
                const $tabPanels = $tabs.find('.tab-panel');

                $tabButtons.on('click', function() {
                    const $button = $(this);
                    const tabId = $button.data('tab');

                    // Update active states
                    $tabButtons.removeClass('active');
                    $button.addClass('active');

                    $tabPanels.removeClass('active');
                    $tabs.find(`[data-tab-panel="${tabId}"]`).addClass('active');
                });
            });
        },

        /**
         * Initialize progress bar blocks.
         */
        initProgressBars: function() {
            $('.xgenious-progress-bar').each(function() {
                const $progressBar = $(this);
                const $fill = $progressBar.find('.progress-fill');
                const percentage = parseInt($fill.data('percentage'), 10);

                // Animate progress bar when visible
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting && !$progressBar.hasClass('animated')) {
                            $progressBar.addClass('animated');
                            $fill.css('width', percentage + '%');
                        }
                    });
                }, { threshold: 0.5 });

                observer.observe($progressBar[0]);
            });
        },

        /**
         * Initialize scroll animations.
         */
        initAnimations: function() {
            const $animatedElements = $('.animate-on-scroll');

            if ($animatedElements.length === 0) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const $element = $(entry.target);
                        const animationClass = $element.data('animation') || 'fadeIn';

                        $element.addClass('animate__animated animate__' + animationClass);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            $animatedElements.each(function() {
                observer.observe(this);
            });
        },

        /**
         * Initialize testimonial sliders.
         */
        initTestimonialSliders: function() {
            $('.xg-testimonial-slider').each(function() {
                const $slider = $(this);
                const $wrapper = $slider.find('.testimonial-slider-wrapper');
                const $prevBtn = $slider.find('.nav-prev');
                const $nextBtn = $slider.find('.nav-next');
                const slidesPerView = parseInt($slider.attr('data-slides-per-view') || 2);
                const autoplay = $slider.data('autoplay');

                // Initialize Slick Slider
                $wrapper.slick({
                    slidesToShow: slidesPerView,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: true,
                    prevArrow: $prevBtn,
                    nextArrow: $nextBtn,
                    autoplay: autoplay || false,
                    autoplaySpeed: 5000,
                    speed: 600,
                    cssEase: 'ease-in-out',
                    responsive: [
                        {
                            breakpoint: 1024,
                            settings: {
                                slidesToShow: Math.min(slidesPerView, 2),
                                slidesToScroll: 1
                            }
                        },
                        {
                            breakpoint: 768,
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1
                            }
                        }
                    ]
                });
            });
        },

        /**
         * Initialize video popups for testimonial sliders.
         */
        initVideoPopups: function() {
            $(document).on('click', '.xg-testimonial-slider .play-button-overlay[data-video-url]', function(e) {
                e.preventDefault();
                e.stopPropagation();

                var videoUrl = $(this).data('video-url');
                var $slider = $(this).closest('.xg-testimonial-slider');
                var $popup = $slider.find('.xg-video-popup');

                if (videoUrl && $popup.length) {
                    $popup.find('.xg-video-popup-iframe').attr('src', videoUrl);
                    $popup.fadeIn(300);
                    $('body').css('overflow', 'hidden');
                }
            });

            $(document).on('click', '.xg-video-popup-close, .xg-video-popup-overlay', function() {
                var $popup = $(this).closest('.xg-video-popup');
                $popup.find('.xg-video-popup-iframe').attr('src', '');
                $popup.fadeOut(300);
                $('body').css('overflow', '');
            });

            $(document).on('keydown', function(e) {
                if (e.key === 'Escape') {
                    var $popup = $('.xg-video-popup:visible');
                    if ($popup.length) {
                        $popup.find('.xg-video-popup-iframe').attr('src', '');
                        $popup.fadeOut(300);
                        $('body').css('overflow', '');
                    }
                }
            });
        }
    };

    // Initialize on document ready
    $(document).ready(function() {
        console.log('Xgenious UI Blocks: Document ready');
        XgeniousUIBlocks.init();
    });

    // Expose to global scope for external access
    window.XgeniousUIBlocks = XgeniousUIBlocks;

})(jQuery);
