$(function() {
  function closeModal() {
    $('body').removeClass('modal');
    $('#modal .header h2').html('');
    $('#modal .body').html('');
  }

  $('#modal .close, body #overlay').click(function () {
      closeModal();
  });

  $(document).keyup(function(e) {
      if(e.keyCode == 27){
          closeModal();
      }
  });
});