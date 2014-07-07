$(function() {
  var top = $('#main .sidebar').offset().top;
  var main = $('#main').offset().top;
  var sticky = function(){
    var scroll = $(window).scrollTop();
    if ((scroll + 20) > top) {
      $('#main .sidebar').css({
        'position': 'absolute',
        'right': 0,
        'top': scroll + 20 - main
      });
    }
    else {
      $('#main .sidebar').css({
        'position': 'relative',
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