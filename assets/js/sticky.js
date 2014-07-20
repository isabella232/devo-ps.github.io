$(function() {
  // Make menu sticky on scroll
  var top = $('#main .sidebar').offset().top;
  var main = $('#main').offset().top;
  var sticky = function(){
    var scroll = $(window).scrollTop();
    if ((scroll + 20) > top) {
      if ($('#main').hasClass('blog')) {
        var left = 'auto';
        var right = 0;
      }
      else {
        var left = 0;
        var right = 'auto';
      }
      $('#main .sidebar').addClass('sticky').css({
        'left': left,
        'right': right,
        'top': scroll + 20 - main
      });
    }
    else {
      $('#main .sidebar').removeClass('sticky').css({
        'left': 'auto',
        'right': 'auto',
        'top': 'auto'
      });
    }
  };

  sticky();
  $(window).scroll(function() {
     sticky();
  });
});