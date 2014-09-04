(function($) {
    $.fn.typeText = function(content) {
        if (content.length > 0) {
            var line = content.shift(),
                elem = this;

            if (line.charAt(0) == '$') {
                var cursor = $('<span class="cursor">|</span>');
                var blinking = setInterval(function () {
                    cursor.toggle();
                }, 500);
                elem.append('$ ');
                elem.append(cursor);
                elem.scrollTop(elem[0].scrollHeight);
                
                var lineArray = line.substring(2).split(''),
                    current = 0;

                setTimeout(function() {
                    var typing = setInterval(function() {
                        if (current < lineArray.length) {
                            cursor.before(lineArray[current++]);
                        }
                        else {
                            clearInterval(typing);
                            setTimeout(function() {
                                cursor.after("\n");
                                if (content.length > 0) {
                                    cursor.remove();
                                    elem.typeText(content);
                                }
                            }, 1000);
                        }
                        return;
                    }, 40);
                }, 1000);
            }
            else {
                setTimeout(function() {
                    elem.append(line + "\n");
                    elem.scrollTop(elem[0].scrollHeight);
                    elem.typeText(content);
                }, 120);
            }
        }
    };
})(jQuery);

$(function() {
    var slideshow_lock = false; // Disable slideshow on hover
    var browser_lock = false;
    var console_lock = false;
    var editor_lock = false;

    if ($('#main .console').length) {
        var terminal = $('#main .how .console .body pre'),
            content = terminal.html(),
            lines = content.split("\n"),
            container = $('<span></span>');
        terminal.empty();
    }

    $('#main .how .steps .step:first-child').addClass('active');
    $('#main .how .illustration.'+ $('#main .how .steps .step:first-child').attr('rel')).addClass('active');
    
    $('#main .how .steps .step').hover(function () {
        slideshow_lock = true;
        $('#main .how .steps .step').removeClass('active');
        $(this).addClass('active');
        $('#main .how .illustration').removeClass('active');
        $('#main .how .illustration.'+ $(this).attr('rel')).addClass('active');
        switch ($(this).attr('rel')) {
            case 'browser':
                if (browser_lock) return;
                browser_lock = true;
                setTimeout(function() {
                    $('#main .how .browser ul li:first-child').removeClass('running').addClass('success');
                }, 3000);
                break;

            case 'console':
                terminal.scrollTop(terminal[0].scrollHeight);
                if (console_lock) return;
                console_lock = true;
                terminal.typeText(lines);
                break;
        }
    });

    setInterval(function() {
        if (!slideshow_lock) {
            var active = $('#main .how .steps .step.active');
            
            if (active.next('.step').length) {
                var next = active.next('.step');
            }
            else {
                var next = $('.steps .step:first-child');
            }
            next.trigger('hover');
            slideshow_lock = false;
        }
    }, 8000);
});
