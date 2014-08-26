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
  if ($('#main .console').length) {
    var terminal = $('#main .console .body'),
        content = terminal.html(),
        lines = content.split("\n");
    
    terminal.html('');
    terminal.typeText(lines);
  }
});