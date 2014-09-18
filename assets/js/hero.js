$(function() {
  if ($('body.page-front #main .hero').length) {
    var viewport = $(window).height();

    var position = $('body.page-front #main .hero .preview .body img').offset();
    $('body.page-front #main .hero .preview .body').css({
        'max-height': viewport - position.top,
        'overflow': 'hidden'
    });
  }
});