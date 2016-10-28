/*
 This script makes sure that side banners in the middle of the page
 become fixed when scrolled into view, and reset when scrolled to top
 (to avoid clashing with the horseshoe banners).
 */
var StickyBanner;

StickyBanner = (function() {

    $ = jQuery;
    var MAX_DOC_HEIGHT, MIN_DOC_HEIGHT;

    MAX_DOC_HEIGHT = 2200;

    MIN_DOC_HEIGHT = 800;

    function StickyBanner() {
        $(document).on('ready', (function(_this) {
            return function() {
                return _this.init();
            };
        })(this));
        $(document).on('scroll', (function(_this) {
            return function() {
                if (_this.initialized) {
                    return _this.onScroll();
                }
            };
        })(this));
    }

    StickyBanner.prototype.init = function() {
        this.banner = $('[data-listen="sticky-banner"]');
        return this.initialized = true;
    };

    StickyBanner.prototype.onScroll = function() {
        var docHeight;
        docHeight = $(document).height();
        console.log(this.banner.length);
        if (this.banner.children.length && docHeight > MAX_DOC_HEIGHT) {
            return this.stickyBanner();
        } else {
            return this.banner.hide();
        }
    };

    StickyBanner.prototype.stickyBanner = function() {
        if (this.isScrolledIntoView(this.banner)) {
            this.banner.removeClass('static');
            console.log('static');
        }
        if (this.banner.offset().top < MIN_DOC_HEIGHT) {
            return this.banner.fadeOut('slow', (function(_this) {
                return function() {
                    return _this.banner.addClass('static').fadeIn().css('top', 0);
                };
            })(this));
        }
    };

    StickyBanner.prototype.isScrolledIntoView = function(elem) {
        var docViewTop, elemTop;
        docViewTop = $(window).scrollTop();
        elemTop = $(elem).offset().top;
        return elemTop < docViewTop;
    };

    return StickyBanner;

})();

window.StickyBanner = new StickyBanner();