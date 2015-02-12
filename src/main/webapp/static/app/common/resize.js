'use strict';

// Sets the min-height of #main-wrapper to window size
$(function () {
    $(window).bind('load resize', function () {
        var topOffset = 54,
            bottomOffset = 51,
            height = (this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height;

        height = height - topOffset - bottomOffset;
        if (height < 1) {
            height = 1;
        }
        if (height > topOffset) {
            $('#main-wrapper').css('min-height', height + 'px');
            $('#side-nav-wrapper').css('min-height', height + 'px');
        }
    });
});
