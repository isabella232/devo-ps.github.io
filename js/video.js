$(function() {
  // Replace youtube links with an embed
  var width  = 640;
  var height = 480;
  var embed = '<object width="'+ width +'" height="'+ height +'">'+
            '  <param name="movie" value="http://www.youtube.com/v/[vid]&amp;hl=en&amp;fs=1"></param>'+
            '  <param name="allowFullScreen" value="true"></param>'+
            '  <param name="allowscriptaccess" value="always"></param>'+
            '  <param name="wmode" value="transparent"></param>'+
            '  <embed src="http://www.youtube.com/v/[vid]&amp;hl=en&amp;fs=1" type="application/x-shockwave-flash" wmode="transparent" allowscriptaccess="always" allowfullscreen="true" width="'+ width +'" '+'height="'+ height +'"></embed>'+
            '</object>';

  $('.blog a[href*="youtube.com/watch"]').each(function() {
      var that = $(this);
      var video = that.attr('href').match(/(?:v=)([\w\-]+)/g);
      if (video.length) {
          $.each(video, function(i){
              that.replaceWith(embed.replace(/\[vid\]/g, this.replace('v=','')) );
          });
      }
  });

  $('a.preview[href*="youtube.com/watch"]').click(function() {
      var that = $(this);
      var video = that.attr('href').match(/(?:v=)([\w\-]+)/g);

      if (video.length) {
          $.each(video, function(i){
              $('#modal').html(embed.replace(/\[vid\]/g, this.replace('v=','')) );
          });
      }
      $('body').addClass('modal');

      return false;
  });
});