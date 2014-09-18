$(function() {
  if ($('body.page-front #main .hero').length) {
    var viewport = $(window).height();

    var position = $('body.page-front #main .hero').offset();
    $('body.page-front #main .hero').css({
        'max-height': viewport - position.top,
        'overflow': 'hidden'
    });
  }
});