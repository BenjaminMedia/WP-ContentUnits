function EAS_load_fif(divId, fifSrc, easSrc, width, height, fixedSrc) {
    var d = document;
    var fif = d.createElement("iframe");
    var div = d.getElementById(divId);

    fif.src = fifSrc;
    fif.style.width = width + "px";
    fif.style.height = height + "px";
    fif.style.margin = "0px";
    fif.style.borderWidth = "0px";
    fif.style.padding = "0px";
    fif.scrolling = "no";
    fif.frameBorder = "0";
    fif.allowTransparency = "true";
    easSrc = (fixedSrc) ? easSrc : easSrc + ";fif=y";
    easSrc += EAS_getCxProfileCookieData();
    fif.EAS_src = easSrc;
    div.appendChild(fif);
}

function EAS_getCookie(check_name) {
    var a_all_cookies = document.cookie.split(';');
    var a_temp_cookie = '';
    var cookie_name = '';
    var cookie_value = '';
    var b_cookie_found = false;

    for (var i = 0; i < a_all_cookies.length; i++) {
        a_temp_cookie = a_all_cookies[i].split('=');

        cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

        if (cookie_name == check_name) {
            b_cookie_found = true;
            if (a_temp_cookie.length > 1) {
                cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''));
            }
            return cookie_value;
        }

        a_temp_cookie = null;
        cookie_name = '';
    }

    if (!b_cookie_found) {
        return null;
    }
}

function EAS_getCxProfileCookieData() {
    var result = '';
    if (typeof EAS_getCookie != 'undefined') {
        var data = EAS_getCookie('cx_profile_data'),
            dataObj;
        if (data && data != 'undefined') {
            try {
                dataObj = JSON.parse(data);
            } catch (e) {
                if (window.console && console.error) {
                    console.error('EAS_fif: cannot parse cx_profile_data');
                    console.log(data);
                }

            }
            for (var category in dataObj) {
                result += '&EAST' + category + '=' + dataObj[category].join('|');
            }
        }
    }
    return result;
}
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
                        el.addClass('static');
                    }

                    if($(window).scrollTop() > defaultOffset && !el.hasClass('fixed') && !el.hasClass('max')) {
                        el.addClass('fixed');
                        el.removeClass('static');
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
})(jQuery);
//# sourceMappingURL=EAS_fif.js.map
