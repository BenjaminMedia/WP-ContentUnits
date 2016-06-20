(function( $ ) {
    $(function() {
        var defaultOffsets = [];
        var maxScrolls = [];

        $.stickybanners = function(elements) {
            $.each(elements, function() {
                var container = $($(this).data('container'));
                var offset = ((($(this).data('offset') && $(this).data('offset') > 0)) ? $(this).data('offset') : $(this).offset().top);

                defaultOffsets.push(offset);

                var max = 0;
                var container = $(this).data('container');
                if(container != '') {
                    container = $(container);
                    if(container.length > 0) {
                        max = (container.offset().top + container.outerHeight()) - $(this).outerHeight();
                    }
                }

                maxScrolls.push(max);
            });

            var checkBanner = function() {
                elements.each(function(i) {
                    var el = $(this);
                    var defaultOffset = defaultOffsets[i];
                    var maxScroll = maxScrolls[i];

                    if(maxScroll > 0) {
                        if($(window).scrollTop() > maxScroll && !el.hasClass('max')) {
                            el.removeClass('fixed').addClass('max');
                        }

                        if($(window).scrollTop() < maxScroll && el.hasClass('max')) {
                            el.removeClass('max');
                        }
                    }

                    if($(window).scrollTop() < defaultOffset && el.hasClass('fixed')) {
                        el.removeClass('fixed');
                    }

                    if($(window).scrollTop() > defaultOffset && !el.hasClass('fixed') && !el.hasClass('max')) {
                        el.addClass('fixed');
                    }
                });
            };

            $(document).off('scroll.stickybanners').on('scroll.stickybanners', function() {
                checkBanner();
            });

            // Initialize so it displays banners when offset < scroll
            checkBanner();
        };

        $.stickybanners($('[data-listen="sticky-banner"]'));

        $(window).off('resize.stickybanners').on('resize.stickybanners', function() {
            $.stickybanners($('[data-listen="sticky-banner"]'));
        });
    });

    /*
     This script makes sure that side banners in the middle of the page
     become fixed when scrolled into view, and reset when scrolled to top
     (to avoid clashing with the horseshoe banners).
     */
    $(document).on('page:change', function() {

        var $banner = $('[data-listen="sticky-banner"]'),
            docHeight = $(document).height();

        if ($banner.children().length && docHeight > 2200) {
            StickyBanner.init({
                $banner: $banner
            });
        } else {
            $banner.hide();
        }
    });

    console.log('inside Sticky Banner');

    var StickyBanner = (function() {
        var s;

        return {
            init: function(settings) {
                s = settings;

                var self = this;

                $(document).on('scroll', function() {

                    if (self.isScrolledIntoView(s.$banner)) {
                        s.$banner.removeClass('static');
                    }

                    if (s.$banner.offset().top < 800) {
                        s.$banner.fadeOut('slow', function() {
                            s.$banner.addClass('static').fadeIn().css('top', 0);
                        });
                    }
                });

            },
            isScrolledIntoView: function(elem) {
                var docViewTop = $(window).scrollTop(),
                    elemTop = $(elem).offset().top;

                if (elemTop < docViewTop) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    })();
})(jQuery);