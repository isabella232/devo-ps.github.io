$(function() {
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
      $('#main .sidebar').css({
        'position': 'absolute',
        'left': left,
        'right': right,
        'top': scroll + 20 - main
      });
    }
    else {
      $('#main .sidebar').css({
        'position': 'relative',
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